"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import {
  Sprout,
  MapPin,
  Calendar,
  Droplets,
  Activity,
  Loader2,
  Plus,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddCropBatchesToField } from "@/hooks/mutations";

// Form schema
const createCropBatchFormSchema = z.object({
  fieldUnitId: z.string().min(1, "Field Unit ID is required"),
  cropBatches: z.array(
    z.object({
      name: z.string().min(1, "Crop batch name is required"),
      cropType: z.string().min(1, "Crop type is required"),
      variety: z.string().optional(),
      areaPlanted: z
        .number()
        .min(0.1, "Area planted must be greater than 0")
        .optional(),
      areaUnit: z.string().optional(),
      plantsCount: z
        .number()
        .min(1, "Plants count must be greater than 0")
        .optional(),
      plantingDate: z.string().min(1, "Planting date is required"),
      harvestDate: z.string().optional(),
      plantingMethod: z.string().optional(),
      irrigationMethod: z.string().optional(),
      gpsCoordinates: z.string().optional(),
    })
  ),
});

export const AddCropBatchModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const fieldUnitId = data?.fieldUnitId || "";
  const [isLoading, setIsLoading] = useState(false);
  const { addCropBatchesToField, loading: addCropBatchLoading } =
    useAddCropBatchesToField();

  const isModalOpen = isOpen && type === "add-crop-batch-to-field";

  // Predefined options
  const cropTypes = [
    "Rice",
    "Wheat",
    "Corn",
    "Soybean",
    "Cotton",
    "Sugarcane",
    "Barley",
    "Oats",
    "Sorghum",
    "Millet",
    "Beans",
    "Peas",
    "Lentils",
    "Chickpeas",
    "Sunflower",
    "Canola",
    "Potato",
    "Sweet Potato",
    "Cassava",
    "Tomato",
    "Pepper",
    "Cucumber",
    "Lettuce",
    "Cabbage",
    "Carrot",
    "Onion",
    "Garlic",
    "Other",
  ];

  const areaUnits = ["hectares", "acres", "square meters", "square feet"];

  const plantingMethods = [
    "Direct Seeding",
    "Transplanting",
    "Broadcasting",
    "Drilling",
    "Precision Planting",
    "No-Till",
    "Minimum Till",
    "Conventional Till",
    "Hydroponics",
    "Greenhouse",
  ];

  const irrigationMethods = [
    "Drip Irrigation",
    "Sprinkler System",
    "Furrow Irrigation",
    "Flood Irrigation",
    "Subsurface Drip",
    "Center Pivot",
    "Rain-fed",
    "Manual Watering",
    "Micro-sprinkler",
    "Surface Irrigation",
  ];

  const form = useForm<z.infer<typeof createCropBatchFormSchema>>({
    resolver: zodResolver(createCropBatchFormSchema),
    defaultValues: {
      fieldUnitId: fieldUnitId,
      cropBatches: [
        {
          name: "",
          cropType: "",
          variety: "",
          areaPlanted: undefined,
          areaUnit: "",
          plantsCount: undefined,
          plantingDate: "",
          harvestDate: "",
          plantingMethod: "",
          irrigationMethod: "",
          gpsCoordinates: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (isModalOpen && fieldUnitId) {
      form.setValue("fieldUnitId", fieldUnitId);
    }
  }, [isModalOpen, fieldUnitId, form]);

  const onSubmit = async (data: z.infer<typeof createCropBatchFormSchema>) => {
    setIsLoading(true);
    try {
      console.log("Creating crop batch:", data);

      await addCropBatchesToField({
        variables: {
          fieldUnitId,
          // @ts-expect-error err
          cropBatches: data.cropBatches.map((batch) => ({
            name: batch.name,
            cropType: batch.cropType,
            variety: batch.variety || null,
            areaPlanted: batch.areaPlanted || null,
            areaUnit: batch.areaUnit || null,
            plantsCount: batch.plantsCount || null,
            plantingDate: batch.plantingDate,
            harvestDate: batch.harvestDate || null,
            plantingMethod: batch.plantingMethod || null,
            irrigationMethod: batch.irrigationMethod || null,
            gpsCoordinates: batch.gpsCoordinates || null,
          })),
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Crop batch created successfully!",
      });
    } catch (error) {
      console.error("Error creating crop batch:", error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Failed to create crop batch: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    form.reset();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      resetForm();
    }
  };

  // Add new crop batch
  const addNewCropBatch = () => {
    const currentBatches = form.getValues("cropBatches");
    form.setValue("cropBatches", [
      ...currentBatches,
      {
        name: "",
        cropType: "",
        variety: "",
        areaPlanted: undefined,
        areaUnit: "",
        plantsCount: undefined,
        plantingDate: "",
        harvestDate: "",
        plantingMethod: "",
        irrigationMethod: "",
        gpsCoordinates: "",
      },
    ]);
  };

  // Remove crop batch
  const removeCropBatch = (index: number) => {
    const currentBatches = form.getValues("cropBatches");
    if (currentBatches.length > 1) {
      const newBatches = currentBatches.filter((_, i) => i !== index);
      form.setValue("cropBatches", newBatches);
    }
  };

  const cropBatches = form.watch("cropBatches");

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-green-50 p-4 border-b border-green-200 w-full">
                <div className="text-xl font-semibold text-green-800 flex items-center">
                  <Sprout className="h-5 w-5 mr-2 text-green-600" />
                  Add Crop Batch
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Create new crop batches for field cultivation and management.
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto w-full">
                <Form {...form}>
                  <form
                    id="create-crop-batch-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Field Unit ID */}
                    <FormField
                      control={form.control}
                      name="fieldUnitId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field Unit ID</FormLabel>
                          <FormControl>
                            <Input readOnly {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Crop Batches */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
                          <Sprout className="h-5 w-5" />
                          Crop Batches
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addNewCropBatch}
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Batch
                        </Button>
                      </div>

                      {cropBatches.map((_, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-6 space-y-6 bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-900">
                              Crop Batch #{index + 1}
                            </h4>
                            {cropBatches.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeCropBatch(index)}
                                disabled={isLoading}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            )}
                          </div>

                          {/* Basic Information */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <Activity className="h-4 w-4" />
                              Basic Information
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Batch Name
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Rice Batch A-2024"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.cropType`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Crop Type
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select crop type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {cropTypes.map((type) => (
                                          <SelectItem key={type} value={type}>
                                            {type}
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
                                name={`cropBatches.${index}.variety`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Variety</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Basmati 385"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Specific variety or cultivar name
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.plantsCount`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Number of Plants</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 1000"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseInt(e.target.value) ||
                                              undefined
                                          )
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Area Information */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <MapPin className="h-4 w-4" />
                              Area Information
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.areaPlanted`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Area Planted</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        placeholder="e.g., 2.5"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseFloat(e.target.value) ||
                                              undefined
                                          )
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.areaUnit`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Area Unit</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {areaUnits.map((unit) => (
                                          <SelectItem key={unit} value={unit}>
                                            {unit}
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
                                name={`cropBatches.${index}.gpsCoordinates`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>GPS Coordinates</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., 40.7128, -74.0060"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Latitude, longitude format
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <Calendar className="h-4 w-4" />
                              Important Dates
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.plantingDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Planting Date
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.harvestDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expected Harvest Date</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      Expected or planned harvest date
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Methods */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <Droplets className="h-4 w-4" />
                              Cultivation Methods
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`cropBatches.${index}.plantingMethod`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Planting Method</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select planting method" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {plantingMethods.map((method) => (
                                          <SelectItem
                                            key={method}
                                            value={method}
                                          >
                                            {method}
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
                                name={`cropBatches.${index}.irrigationMethod`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Irrigation Method</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select irrigation method" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {irrigationMethods.map((method) => (
                                          <SelectItem
                                            key={method}
                                            value={method}
                                          >
                                            {method}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </form>
                </Form>
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={addCropBatchLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="create-crop-batch-form"
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={addCropBatchLoading}
                >
                  {addCropBatchLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Crop Batch...
                    </>
                  ) : (
                    <>
                      <Sprout className="mr-2 h-4 w-4" />
                      Create Crop Batch
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddCropBatchModal;
