"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Calendar, Heart, Info } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useAddLivestockBreedingRecord } from "@/hooks/mutations";
import {
  BreedingStatus,
  type Livestock,
  LivestockGender,
} from "@/graphql/generated/graphql";

// Form schema
const formSchema = z.object({
  maleLivestockTag: z
    .string()
    .min(1, { message: "Male livestock is required" }),
  femaleLivestockTag: z
    .string()
    .min(1, { message: "Female livestock is required" }),
  breedingDate: z.string().min(1, { message: "Breeding date is required" }),
  expectedBirthDate: z.string().optional().nullable(),
  notes: z.string().optional(),
  success: z
    .enum([
      BreedingStatus.Planned,
      BreedingStatus.InProgress,
      BreedingStatus.Successful,
      BreedingStatus.Failed,
      BreedingStatus.Cancelled,
    ])
    .default(BreedingStatus.Planned),
  cost: z.string().optional(),
});

export const BreedingRecordModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { addLivestockBreedingRecord, loading } =
    useAddLivestockBreedingRecord();

  const penName = data?.penName || "this pen";
  const livestock = data?.penLivestock || null;

  const initialAnimalTag = data?.livestockTag || null;
  const initialAnimalGender =
    data.penLivestock?.find(
      (animal) => animal.livestock_tag === initialAnimalTag
    )?.gender || null;
  const initialAnimalType = data?.livestockType;

  // State to track which gender we're starting with
  // const [startingGender, setStartingGender] = useState<
  //   "MALE" | "FEMALE" | null
  // >(initialAnimalGender as "MALE" | "FEMALE" | null);

  // Filter livestock by gender
  const maleLivestock =
    livestock?.filter(
      (animal) =>
        animal.gender === LivestockGender.Male &&
        animal.livestock_type === initialAnimalType
    ) || [];
  const femaleLivestock =
    livestock?.filter(
      (animal) =>
        animal.gender === LivestockGender.Female &&
        animal.livestock_type === initialAnimalType
    ) || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maleLivestockTag:
        initialAnimalGender === "MALE" ? initialAnimalTag || "" : "",
      femaleLivestockTag:
        initialAnimalGender === "FEMALE" ? initialAnimalTag || "" : "",
      breedingDate: format(new Date(), "yyyy-MM-dd"),
      expectedBirthDate: null,
      notes: "",
      success: BreedingStatus.Planned,
      cost: undefined,
    },
  });

  // Set default values when modal opens or data changes
  useEffect(() => {
    if (isOpen && type === "add-livestock-breeding-record") {
      form.reset({
        maleLivestockTag:
          initialAnimalGender === "MALE" ? initialAnimalTag || "" : "",
        femaleLivestockTag:
          initialAnimalGender === "FEMALE" ? initialAnimalTag || "" : "",
        breedingDate: format(new Date(), "yyyy-MM-dd"),
        expectedBirthDate: null,
        notes: "",
        success: BreedingStatus.Planned,
        cost: undefined,
      });

      // form.setValue("breedingDate", format(new Date(), "yyyy-MM-dd"));
      // form.setValue("expectedBirthDate", null);
      // form.setValue("notes", "");
      // form.setValue("success", BreedingStatus.Planned);
      // form.setValue("maleLivestockTag", initialAnimalTag || "");
      // form.setValue("femaleLivestockTag", initialAnimalTag || "");
      // form.setValue("success", BreedingStatus.Planned);
      // form.setValue("cost", undefined);

      // setStartingGender(initialAnimalGender as "MALE" | "FEMALE");
    }
  }, [isOpen, initialAnimalTag, initialAnimalGender, form, type]);

  // Calculate expected birth date (e.g., 283 days for cattle)
  const calculateExpectedBirthDate = (breedingDate: string) => {
    if (!breedingDate) return null;

    const date = new Date(breedingDate);
    // This is an example for cattle - adjust gestation period based on livestock type
    date.setDate(date.getDate() + 283); // ~9 months gestation for cattle
    return format(date, "yyyy-MM-dd");
  };

  // Update expected birth date when breeding date changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "breedingDate") {
        const birthDate = calculateExpectedBirthDate(
          value.breedingDate as string
        );
        if (birthDate) {
          form.setValue("expectedBirthDate", birthDate);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const isModalOpen = isOpen && type === "add-livestock-breeding-record";

  // Check if we have eligible animals for breeding
  const hasMaleLivestock = maleLivestock.length > 0;
  const hasFemaleLivestock = femaleLivestock.length > 0;
  const canBreed = hasMaleLivestock && hasFemaleLivestock;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting breeding record:", data);

      await addLivestockBreedingRecord({
        variables: {
          maleLivestockTag: data.maleLivestockTag,
          femaleLivestockTag: data.femaleLivestockTag,
          breedingRecord: {
            breedingMethod: "Natural", // Example value, adjust as needed
            expectedDelivery: data.expectedBirthDate || undefined,
            matingDate: data.breedingDate,
            notes: data.notes || undefined,
            status: data.success, // Adjust status based on success
            cost: Number(data.cost) || undefined,
          },
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Breeding record created successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error creating breeding record: ${error}`,
      });
      console.error("Error creating breeding record:", error);
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => onClose()}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-pink-50 p-4 border-b border-pink-200">
                <div className="text-xl font-semibold text-pink-800 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-600" />
                  Create Breeding Record
                </div>
                <div className="text-sm text-pink-700 mt-1">
                  Record breeding between male and female livestock in {penName}
                </div>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <Form {...form}>
                  <form
                    id="breeding-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="maleLivestockTag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Male Animal{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue("maleLivestockTag", value);
                              }}
                              value={
                                field.value
                                // field.value ||
                                // (startingGender === "MALE"
                                //   ? initialAnimalTag
                                //   : "")
                              }
                              defaultValue={
                                field.value
                                // field.value ||
                                // (startingGender === "MALE"
                                //   ? initialAnimalTag
                                //   : "")
                              }
                              // disabled={
                              //   !!(
                              //     startingGender === "MALE" && initialAnimalTag
                              //   )
                              // }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select male animal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {maleLivestock.length === 0 ? (
                                  <SelectItem value="none" disabled>
                                    No male animals available
                                  </SelectItem>
                                ) : (
                                  maleLivestock.map((animal: Livestock) => (
                                    <SelectItem
                                      key={animal.livestock_tag}
                                      value={animal.livestock_tag}
                                    >
                                      {animal.livestock_tag} ({animal.breed})
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="femaleLivestockTag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Female Animal{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue("femaleLivestockTag", value);
                              }}
                              value={
                                field.value
                                // field.value ||
                                // (startingGender === "FEMALE"
                                //   ? initialAnimalTag
                                //   : "")
                              }
                              defaultValue={
                                field.value
                                // field.value ||
                                // (startingGender === "FEMALE"
                                //   ? initialAnimalTag
                                //   : "")
                              }
                              // disabled={
                              //   !!(
                              //     startingGender === "FEMALE" &&
                              //     initialAnimalTag
                              //   )
                              // }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select female animal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {femaleLivestock.length === 0 ? (
                                  <SelectItem value="none" disabled>
                                    No female animals available
                                  </SelectItem>
                                ) : (
                                  femaleLivestock.map((animal: Livestock) => (
                                    <SelectItem
                                      key={animal.livestock_tag}
                                      value={animal.livestock_tag}
                                    >
                                      {animal.livestock_tag} ({animal.breed})
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>

                              {/* Updated to use field.value */}
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="breedingDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Breeding Date{" "}
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
                        name="expectedBirthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Expected Birth Date
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value || ""}
                                className="bg-gray-50"
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Automatically calculated based on breeding date
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="success"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breeding Status</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost GHc</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="max-w-24"
                              {...field}
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
                          <FormLabel>
                            <span className="text-red-500 ml-1">*</span>
                            Notes
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any additional notes about this breeding record..."
                              className="resize-none min-h-[100px]"
                              {...field}
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
                        Both animals must be in the same pen to record breeding.
                        The expected birth date is automatically calculated
                        based on standard gestation periods.
                      </AlertDescription>
                    </Alert>
                  </form>
                </Form>
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="breeding-form"
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                  disabled={loading || !canBreed}
                >
                  {loading ? "Creating..." : "Create Breeding Record"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BreedingRecordModal;
