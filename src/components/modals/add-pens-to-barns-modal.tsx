"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Trash2 } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddPensToBarn } from "@/hooks/mutations";
import { toast } from "sonner";

// Define enums for dropdown options
const BeddingType = {
  STRAW: "STRAW",
  HAY: "HAY",
  SAWDUST: "SAWDUST",
  SAND: "SAND",
  RUBBER_MAT: "RUBBER_MAT",
  NONE: "NONE",
} as const;

const WatererType = {
  BOWL: "BOWL",
  NIPPLE: "NIPPLE",
  TROUGH: "TROUGH",
} as const;

const FeederType = {
  TROUGH: "TROUGH",
  AUTOMATIC: "AUTOMATIC",
  HAY_RACK: "HAY_RACK",
  FEED_BUNK: "FEED_BUNK",
} as const;

// Validation schema for a single pen
const penSchema = z.object({
  name: z.string().min(1, { message: "Pen name is required" }),
  areaSqm: z.coerce
    .number()
    .min(0, { message: "Area must be a positive number" })
    .optional()
    .nullable(),
  capacity: z.coerce
    .number()
    .min(1, { message: "Capacity must be at least 1" })
    .optional()
    .nullable(),
  beddingType: z
    .enum([
      BeddingType.STRAW,
      BeddingType.HAY,
      BeddingType.SAWDUST,
      BeddingType.SAND,
      BeddingType.RUBBER_MAT,
      BeddingType.NONE,
    ])
    .nullable()
    .optional(),
  feederType: z
    .enum([
      FeederType.TROUGH,
      FeederType.AUTOMATIC,
      FeederType.HAY_RACK,
      FeederType.FEED_BUNK,
    ])
    .nullable()
    .optional(),
  watererType: z
    .enum([WatererType.BOWL, WatererType.NIPPLE, WatererType.TROUGH])
    .nullable()
    .optional(),
  unitId: z.string().optional(),
});

// Form schema
const formSchema = z.object({
  barnUnitId: z.string().min(1, { message: "Barn ID is required" }),
  pens: z.array(penSchema).min(1, { message: "At least one pen is required" }),
});

export const AddPensModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { addPensToBarn, loading } = useAddPensToBarn();

  const barnUnitId = data?.barnUnitId || "";
  const barnName = data?.barnName || "barn";
  const [penCount, setPenCount] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barnUnitId: barnUnitId,
      pens: [
        {
          name: "",
          areaSqm: null,
          capacity: null,
          beddingType: null,
          feederType: null,
          watererType: null,
          unitId: "",
        },
      ],
    },
  });

  // Update form when barnUnitId changes
  useEffect(() => {
    if (isOpen && barnUnitId) {
      form.setValue("barnUnitId", barnUnitId);
    }
  }, [isOpen, barnUnitId, form]);

  const isModalOpen = isOpen && type === "add-pens-to-barn";

  // Helper to add a new pen to the form
  const addPen = () => {
    const currentPens = form.getValues("pens");
    form.setValue("pens", [
      ...currentPens,
      {
        name: "",
        areaSqm: null,
        capacity: null,
        beddingType: null,
        feederType: null,
        watererType: null,
        unitId: "",
      },
    ]);
    setPenCount(penCount + 1);
  };

  // Helper to remove a pen from the form
  const removePen = (index: number) => {
    const currentPens = form.getValues("pens");
    if (currentPens.length > 1) {
      form.setValue(
        "pens",
        currentPens.filter((_, i) => i !== index)
      );
      setPenCount(penCount - 1);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting form data:", data);

      // Format the data for the API
      const formattedPens = data.pens.map((pen) => ({
        name: pen.name,
        areaSqm: pen.areaSqm || null,
        capacity: pen.capacity || null,
        beddingType: pen.beddingType || null,
        feederType: pen.feederType || null,
        watererType: pen.watererType || null,
        unitId: pen.unitId || null,
      }));

      await addPensToBarn({
        variables: {
          barnUnitId: data.barnUnitId,
          pens: formattedPens,
        },
      });

      // Reset form
      form.reset({
        barnUnitId: barnUnitId,
        pens: [
          {
            name: "",
            areaSqm: null,
            capacity: null,
            beddingType: null,
            feederType: null,
            watererType: null,
            unitId: "",
          },
        ],
      });
      setPenCount(1);

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: `Pens added successfully!`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error adding pens: ${error}`,
      });
      console.error("Error adding pens:", error);
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
              <div className="p-4 border-b border-gray-200">
                <div className="text-xl font-semibold text-gray-900">
                  Add Pens to {barnName}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Add one or more pens to organize and manage your livestock.
                </div>
                <button
                  onClick={() => onClose()}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <Form {...form}>
                  <form
                    id="pen-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="barnUnitId"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} type="hidden" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700">
                          Pens
                        </h3>
                        <span className="text-xs text-gray-500">
                          ({penCount} {penCount === 1 ? "pen" : "pens"})
                        </span>
                      </div>

                      {form.watch("pens").map((_, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-md space-y-4 bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700">
                              Pen {index + 1}
                            </h4>
                            {form.watch("pens").length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removePen(index)}
                                className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove pen</span>
                              </Button>
                            )}
                          </div>

                          <FormField
                            control={form.control}
                            name={`pens.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Pen Name/Number{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. Pen 1 or North Pen"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`pens.${index}.areaSqm`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Area (sq. m)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Area size"
                                      {...field}
                                      value={
                                        field.value === null ? "" : field.value
                                      }
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ""
                                            ? null
                                            : Number(e.target.value);
                                        field.onChange(value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`pens.${index}.capacity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Animal Capacity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Maximum number of animals"
                                      {...field}
                                      value={
                                        field.value === null ? "" : field.value
                                      }
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ""
                                            ? null
                                            : Number(e.target.value);
                                        field.onChange(value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`pens.${index}.beddingType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bedding Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select bedding type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="None">None</SelectItem>
                                      <SelectItem value={BeddingType.STRAW}>
                                        Straw
                                      </SelectItem>
                                      <SelectItem value={BeddingType.HAY}>
                                        Hay
                                      </SelectItem>
                                      <SelectItem value={BeddingType.SAWDUST}>
                                        Sawdust
                                      </SelectItem>
                                      <SelectItem value={BeddingType.SAND}>
                                        Sand
                                      </SelectItem>
                                      <SelectItem
                                        value={BeddingType.RUBBER_MAT}
                                      >
                                        Rubber Mat
                                      </SelectItem>
                                      <SelectItem value={BeddingType.NONE}>
                                        No Bedding
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`pens.${index}.feederType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Feeder Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select feeder type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="None">None</SelectItem>
                                      <SelectItem value={FeederType.TROUGH}>
                                        Trough
                                      </SelectItem>
                                      <SelectItem value={FeederType.AUTOMATIC}>
                                        Automatic
                                      </SelectItem>
                                      <SelectItem value={FeederType.HAY_RACK}>
                                        Hay Rack
                                      </SelectItem>
                                      <SelectItem value={FeederType.FEED_BUNK}>
                                        Feed Bunk
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`pens.${index}.watererType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Waterer Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select waterer type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="None">None</SelectItem>
                                      <SelectItem value={WatererType.BOWL}>
                                        Bowl
                                      </SelectItem>
                                      <SelectItem value={WatererType.NIPPLE}>
                                        Nipple
                                      </SelectItem>
                                      <SelectItem value={WatererType.TROUGH}>
                                        Trough
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`pens.${index}.unitId`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>External ID (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="External system ID"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs">
                                    For integration with external systems
                                  </FormDescription>
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
                        onClick={addPen}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Pen
                      </Button>
                    </div>
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
                  form="pen-form"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Save Pens"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPensModal;
