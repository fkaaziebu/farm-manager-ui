"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Calendar, Info, Edit, Plus, Trash2, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useUpdateLivestockBreedingRecord } from "@/hooks/mutations";
import {
  BreedingStatus,
  Livestock,
  LivestockGender,
} from "@/graphql/generated/graphql";

// Schema for individual offspring
const offspringSchema = z.object({
  breed: z.string().optional().nullable(),
  gender: z
    .enum([LivestockGender.Male, LivestockGender.Female])
    .optional()
    .nullable(),
  livestockTag: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
});

// Form schema for updating breeding record
const updateFormSchema = z.object({
  breedingMethod: z.string().optional().nullable(),
  matingDate: z.string().min(1, { message: "Mating date is required" }),
  expectedDelivery: z.string().optional().nullable(),
  actualDelivery: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  status: z
    .enum([
      BreedingStatus.Planned,
      BreedingStatus.InProgress,
      BreedingStatus.Successful,
      BreedingStatus.Failed,
      BreedingStatus.Cancelled,
    ])
    .default(BreedingStatus.Planned),
  cost: z.string().optional().nullable(),
  offsprings: z.array(offspringSchema).optional(),
});

export const UpdateBreedingRecordModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { updateLivestockBreedingRecord, loading } =
    useUpdateLivestockBreedingRecord();

  const breedingRecordId = data?.breedingRecordId || null;
  const breedingRecord = data?.breedingRecord || null;

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      breedingMethod: "",
      matingDate: "",
      expectedDelivery: "",
      actualDelivery: "",
      notes: "",
      status: BreedingStatus.Planned,
      cost: "",
      offsprings: [],
    },
  });

  // Use field array for managing offspring
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "offsprings",
  });

  // Set form values when modal opens or data changes
  useEffect(() => {
    if (
      isOpen &&
      type === "update-livestock-breeding-record" &&
      breedingRecord
    ) {
      const formData = {
        breedingMethod:
          breedingRecord.breedingMethod || breedingRecord.breedingMethod || "",
        matingDate: breedingRecord.matingDate
          ? format(new Date(breedingRecord.matingDate), "yyyy-MM-dd")
          : "",
        expectedDelivery: breedingRecord.expectedDelivery
          ? format(new Date(breedingRecord.expectedDelivery), "yyyy-MM-dd")
          : "",
        actualDelivery: breedingRecord.actualDelivery
          ? format(new Date(breedingRecord.actualDelivery), "yyyy-MM-dd")
          : "",
        notes: breedingRecord.notes || "",
        status: breedingRecord.status || BreedingStatus.Planned,
        cost: breedingRecord.cost ? breedingRecord.cost.toString() : "",
        offsprings: Array.isArray(breedingRecord.offsprings)
          ? breedingRecord.offsprings.map((offspring: Livestock) => ({
              breed: offspring.breed ?? "",
              livestockTag: offspring.livestock_tag ?? "",
              gender: (offspring.gender as LivestockGender) ?? null,
              weight:
                offspring.weight !== undefined && offspring.weight !== null
                  ? offspring.weight.toString()
                  : null,
            }))
          : [],
      };

      form.reset(formData);
    }
  }, [isOpen, breedingRecord, form, type]);

  // Calculate expected delivery date based on mating date
  const calculateExpectedDelivery = (matingDate: string) => {
    if (!matingDate) return null;

    const date = new Date(matingDate);
    // Assuming 283 days gestation period - adjust based on livestock type
    date.setDate(date.getDate() + 283);
    return format(date, "yyyy-MM-dd");
  };

  // Update expected delivery when mating date changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "matingDate" && value.matingDate) {
        const deliveryDate = calculateExpectedDelivery(
          value.matingDate as string
        );
        if (deliveryDate && !form.getValues("expectedDelivery")) {
          form.setValue("expectedDelivery", deliveryDate);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const isModalOpen = isOpen && type === "update-livestock-breeding-record";

  // Add new offspring
  const addOffspring = () => {
    append({
      breed: "",
      gender: null,
      livestockTag: "",
      weight: "",
    });
  };

  // Remove offspring
  const removeOffspring = (index: number) => {
    remove(index);
  };

  async function onSubmit(data: z.infer<typeof updateFormSchema>) {
    try {
      console.log("Updating breeding record:", data);

      // Format offspring data for API
      const formattedOffsprings =
        data.offsprings?.map((offspring) => ({
          breed: offspring.breed ?? "",
          gender: (offspring.gender as LivestockGender) ?? "",
          livestockTag: offspring.livestockTag ?? "",
          weight: offspring.weight ? Number(offspring.weight) : null,
        })) || [];

      await updateLivestockBreedingRecord({
        variables: {
          breedingRecordId: Number(breedingRecordId),
          breedingRecord: {
            breedingMethod: data.breedingMethod || undefined,
            expectedDelivery: data.expectedDelivery || undefined,
            actualDelivery: data.actualDelivery || undefined,
            matingDate: data.matingDate,
            notes: data.notes || undefined,
            status: data.status,
            cost: data.cost ? Number(data.cost) : undefined,
            // @ts-expect-error err
            offsprings: formattedOffsprings,
          },
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Breeding record updated successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating breeding record: ${error}`,
      });
      console.error("Error updating breeding record:", error);
    }
  }

  // Check if breeding is successful to show offspring fields
  const isSuccessful = form.watch("status") === BreedingStatus.Successful;
  const isCompleted =
    form.watch("status") === BreedingStatus.Successful ||
    form.watch("status") === BreedingStatus.Failed;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => onClose()}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-blue-50 p-4 sm:p-6 border-b border-blue-200">
                <div className="text-xl font-semibold text-blue-800 flex items-center">
                  <Edit className="h-5 w-5 mr-2 text-blue-600" />
                  Update Breeding Record
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  Update breeding record details and track progress
                </div>
              </div>

              <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                <Form {...form}>
                  <form
                    id="update-breeding-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="breedingMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Breeding Method</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select breeding method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Natural">Natural</SelectItem>
                                <SelectItem value="Artificial Insemination">
                                  Artificial Insemination
                                </SelectItem>
                                <SelectItem value="Embryo Transfer">
                                  Embryo Transfer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Breeding Status{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select breeding status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(BreedingStatus).map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status.charAt(0) +
                                      status.slice(1).toLowerCase()}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="matingDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Mating Date{" "}
                              <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                max={format(new Date(), "yyyy-MM-dd")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="expectedDelivery"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Expected Delivery Date
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Automatically calculated based on mating date
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {isCompleted && (
                      <FormField
                        control={form.control}
                        name="actualDelivery"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Actual Delivery Date
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value || ""}
                                max={format(new Date(), "yyyy-MM-dd")}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Enter the actual date when delivery occurred
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Offspring Section */}
                    {isSuccessful && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Baby className="h-5 w-5 mr-2 text-green-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                              Offspring Details
                            </h3>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {fields.length}{" "}
                            {fields.length === 1 ? "offspring" : "offsprings"}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-medium text-gray-700">
                                  Offspring {index + 1}
                                </h4>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeOffspring(index)}
                                  className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">
                                    Remove offspring
                                  </span>
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`offsprings.${index}.livestockTag`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm">
                                        Livestock Tag
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Auto-generated if empty"
                                          {...field}
                                          value={field.value || ""}
                                          className="text-sm"
                                        />
                                      </FormControl>
                                      <FormDescription className="text-xs">
                                        Leave empty for auto-generation
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`offsprings.${index}.gender`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm">
                                        Gender
                                      </FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value || ""}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="text-sm">
                                            <SelectValue placeholder="Select gender" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem
                                            value={LivestockGender.Male}
                                          >
                                            Male
                                          </SelectItem>
                                          <SelectItem
                                            value={LivestockGender.Female}
                                          >
                                            Female
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`offsprings.${index}.breed`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm">
                                        Breed
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g. Holstein"
                                          {...field}
                                          value={field.value || ""}
                                          className="text-sm"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`offsprings.${index}.weight`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm">
                                        Weight (kg)
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          placeholder="0.0"
                                          {...field}
                                          value={field.value || ""}
                                          className="text-sm"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={addOffspring}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Offspring
                          </Button>
                        </div>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost (GHc)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              className="max-w-32"
                              {...field}
                              value={field.value || ""}
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any additional notes about this breeding record..."
                              className="resize-none min-h-[100px]"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Alert
                      variant="default"
                      className="bg-blue-50 border-blue-200"
                    >
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700 text-sm">
                        {isSuccessful
                          ? "Add detailed information for each offspring. Livestock tags will be auto-generated if left empty using your system settings."
                          : "Update the breeding status to track progress. Set to 'Successful' to record offspring details."}
                      </AlertDescription>
                    </Alert>
                  </form>
                </Form>
              </div>

              <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onClose()}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="update-breeding-form"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Breeding Record"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateBreedingRecordModal;
