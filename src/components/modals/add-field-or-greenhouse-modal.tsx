"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Sprout, Home, MapPin, Layers, TestTube, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddFieldToFarm, useAddGreenhouseToFarm } from "@/hooks/mutations";

// Form schemas
const createFieldFormSchema = z.object({
  farmTag: z.string().min(1, "Farm ID is required"),
  field: z.object({
    name: z.string().min(1, "Field name is required"),
    unitId: z.string().min(1, "Unit ID is required"),
    areaHectares: z.number().min(0.1, "Area must be greater than 0"),
    capacity: z.number().min(1, "Capacity must be greater than 0"),
    soilType: z.string().optional(),
    irrigationType: z.string().optional(),
    drainage: z.string().optional(),
    slope: z.string().optional(),
    soilTestResults: z
      .object({
        ph: z.number().min(0).max(14).optional(),
        nitrogen: z.number().min(0).max(100).optional(),
        phosphorus: z.number().min(0).max(100).optional(),
        potassium: z.number().min(0).max(100).optional(),
        organicMatter: z.number().min(0).max(100).optional(),
        testDate: z.string().optional(),
        recommendations: z.string().optional(),
      })
      .optional(),
  }),
});

const createGreenhouseFormSchema = z.object({
  farmTag: z.string().min(1, "Farm ID is required"),
  greenhouse: z.object({
    name: z.string().min(1, "Greenhouse name is required"),
    unitId: z.string().min(1, "Unit ID is required"),
    areaSqm: z.number().min(0.1, "Area must be greater than 0"),
    capacity: z.number().optional(),
    climateControlled: z.boolean().optional(),
    constructionDate: z.string().optional(),
    coveringMaterial: z.string().optional(),
    irrigationSystem: z.string().optional(),
    lightingSystem: z.string().optional(),
    temperatureControl: z.string().optional(),
    ventilationSystem: z.string().optional(),
  }),
});

export const AddFieldModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const farmTag = data?.farmTag || "";
  const [activeTab, setActiveTab] = useState("field");
  const [showSoilTest, setShowSoilTest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addField, loading: fieldLoading } = useAddFieldToFarm();
  const { addGreenhouse, loading: greenhouseloading } =
    useAddGreenhouseToFarm();

  const isModalOpen = isOpen && type === "add-field-or-greenhouse";

  // Predefined options for fields
  const soilTypes = [
    "Clay",
    "Sandy",
    "Loam",
    "Silt",
    "Peaty",
    "Chalky",
    "Sandy Loam",
    "Clay Loam",
    "Silty Clay",
    "Sandy Clay",
  ];

  const irrigationTypes = [
    "Drip Irrigation",
    "Sprinkler System",
    "Furrow Irrigation",
    "Flood Irrigation",
    "Subsurface Drip",
    "Center Pivot",
    "Rain-fed",
    "Manual Watering",
  ];

  const drainageOptions = [
    "Excellent",
    "Good",
    "Moderate",
    "Poor",
    "Very Poor",
  ];
  const slopeOptions = [
    "Flat (0-2%)",
    "Gentle (2-5%)",
    "Moderate (5-10%)",
    "Steep (10-20%)",
    "Very Steep (>20%)",
  ];

  // Predefined options for greenhouses
  const coveringMaterials = [
    "Glass",
    "Polycarbonate",
    "Polyethylene",
    "Acrylic",
    "Fiberglass",
    "Shade Cloth",
  ];

  const irrigationSystems = [
    "Drip Irrigation",
    "Mist System",
    "Sprinkler System",
    "Flood and Drain",
    "NFT (Nutrient Film Technique)",
    "Manual Watering",
  ];

  const lightingSystems = [
    "LED Grow Lights",
    "High-Pressure Sodium (HPS)",
    "Fluorescent",
    "Metal Halide",
    "Natural Light Only",
    "Hybrid System",
  ];

  const temperatureControls = [
    "Automated HVAC",
    "Heating System",
    "Cooling System",
    "Ventilation Only",
    "Manual Control",
    "Smart Thermostat",
  ];

  const ventilationSystems = [
    "Natural Ventilation",
    "Exhaust Fans",
    "Circulation Fans",
    "Automated Vents",
    "Ridge Vents",
    "Side Wall Vents",
  ];

  const fieldForm = useForm<z.infer<typeof createFieldFormSchema>>({
    resolver: zodResolver(createFieldFormSchema),
    defaultValues: {
      farmTag: farmTag,
      field: {
        name: "",
        unitId: "",
        areaHectares: 0,
        capacity: 0,
        soilType: "",
        irrigationType: "",
        drainage: "",
        slope: "",
        soilTestResults: {
          ph: undefined,
          nitrogen: undefined,
          phosphorus: undefined,
          potassium: undefined,
          organicMatter: undefined,
          testDate: "",
          recommendations: "",
        },
      },
    },
  });

  const greenhouseForm = useForm<z.infer<typeof createGreenhouseFormSchema>>({
    resolver: zodResolver(createGreenhouseFormSchema),
    defaultValues: {
      farmTag: farmTag,
      greenhouse: {
        name: "",
        unitId: "",
        areaSqm: 0,
        capacity: undefined,
        climateControlled: undefined,
        constructionDate: "",
        coveringMaterial: "",
        irrigationSystem: "",
        lightingSystem: "",
        temperatureControl: "",
        ventilationSystem: "",
      },
    },
  });

  // Generate unit ID automatically based on active tab
  useEffect(() => {
    if (activeTab === "field") {
      const fieldName = fieldForm.watch("field.name");
      if (fieldName && !fieldForm.getValues("field.unitId")) {
        const generatedId = `FIELD_${fieldName
          .toUpperCase()
          .replace(/\s+/g, "_")}_${Date.now().toString().slice(-4)}`;
        fieldForm.setValue("field.unitId", generatedId);
      }
    } else {
      const greenhouseName = greenhouseForm.watch("greenhouse.name");
      if (greenhouseName && !greenhouseForm.getValues("greenhouse.unitId")) {
        const generatedId = `GH_${greenhouseName
          .toUpperCase()
          .replace(/\s+/g, "_")}_${Date.now().toString().slice(-4)}`;
        greenhouseForm.setValue("greenhouse.unitId", generatedId);
      }
    }
  }, [
    fieldForm.watch("field.name"),
    greenhouseForm.watch("greenhouse.name"),
    activeTab,
  ]);

  useEffect(() => {
    if (isModalOpen && farmTag) {
      fieldForm.setValue("farmTag", farmTag);
      greenhouseForm.setValue("farmTag", farmTag);
    }
  }, [isModalOpen, farmTag]);

  const onFieldSubmit = async (data: z.infer<typeof createFieldFormSchema>) => {
    setIsLoading(true);
    try {
      console.log("Creating field:", data);

      // Simulate API call
      await addField({
        variables: {
          farmTag: data.farmTag,
          fields: {
            areaHectares: data.field.areaHectares,
            capacity: data.field.capacity,
            drainage: data.field.drainage,
            irrigationType: data.field.irrigationType,
            name: data.field.name,
            slope: data.field.slope,
            soilType: data.field.soilType,
            soilTestResults: {
              ph: data.field.soilTestResults?.ph,
              nitrogen: data.field.soilTestResults?.nitrogen,
              phosphorus: data.field.soilTestResults?.phosphorus,
              potassium: data.field.soilTestResults?.potassium,
              organicMatter: data.field.soilTestResults?.organicMatter,
              testDate: data.field.soilTestResults?.testDate,
              recommendations: data.field.soilTestResults?.recommendations,
            },
            unitId: data.field.unitId,
          },
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Field created successfully!",
        addFieldsToFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      console.error("Error creating field:", error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Failed to create greenhouse: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onGreenhouseSubmit = async (
    data: z.infer<typeof createGreenhouseFormSchema>,
  ) => {
    setIsLoading(true);
    try {
      const submitData = {
        greenhouses: [
          {
            name: data.greenhouse.name || "",
            unitId: data.greenhouse.unitId || "",
            areaSqm: data.greenhouse.areaSqm || 0,
            capacity: data.greenhouse.capacity || 0,
            climateControlled: data.greenhouse.climateControlled || false,
            constructionDate: data.greenhouse.constructionDate || "",
            coveringMaterial: data.greenhouse.coveringMaterial || "",
            irrigationSystem: data.greenhouse.irrigationSystem || "",
            lightingSystem: data.greenhouse.lightingSystem || "",
            temperatureControl: data.greenhouse.temperatureControl || "",
            ventilationSystem: data.greenhouse.ventilationSystem || "",
          },
        ],
        farmTag: data.farmTag,
      };

      console.log("Creating greenhouse:", submitData);

      // Simulate API call
      await addGreenhouse({
        variables: {
          farmTag: submitData.farmTag,
          greenhouses: submitData.greenhouses,
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Greenhouse created successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Failed to create greenhouse: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    fieldForm.reset();
    greenhouseForm.reset();
    setShowSoilTest(false);
    setActiveTab("field");
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      resetForms();
    }
  };

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
              className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-green-50 p-4 border-b border-green-200  w-full">
                <div className="text-xl font-semibold text-green-800">
                  Add New {activeTab === "field" ? "Field" : "Greenhouse"}
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Create a new{" "}
                  {activeTab === "field"
                    ? "field for crop production"
                    : "greenhouse for controlled growing"}
                  .
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full flex flex-col flex-1 overflow-hidden"
              >
                <div className="border-b px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="field" className="text-sm">
                      <Sprout className="h-4 w-4 mr-2" />
                      Field
                    </TabsTrigger>
                    <TabsTrigger value="greenhouse" className="text-sm">
                      <Home className="h-4 w-4 mr-2" />
                      Greenhouse
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  <TabsContent value="field" className="h-full">
                    <Form {...fieldForm}>
                      <form
                        id="create-field-form"
                        onSubmit={fieldForm.handleSubmit(onFieldSubmit)}
                        className="space-y-6"
                      >
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <MapPin className="h-4 w-4" />
                            Basic Information
                          </div>

                          <FormField
                            control={fieldForm.control}
                            name="farmTag"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Farm ID</FormLabel>
                                <FormControl>
                                  <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={fieldForm.control}
                              name="field.name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Field Name
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., North Field A"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        // Auto-generate unit ID
                                        if (e.target.value) {
                                          const generatedId = `FIELD_${e.target.value
                                            .toUpperCase()
                                            .replace(/\s+/g, "_")}_${Date.now()
                                            .toString()
                                            .slice(-4)}`;
                                          fieldForm.setValue(
                                            "field.unitId",
                                            generatedId,
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={fieldForm.control}
                              name="field.unitId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Unit ID
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Auto-generated from name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={fieldForm.control}
                              name="field.areaHectares"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Area (Hectares)
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0.1"
                                      placeholder="e.g., 2.5"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0,
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={fieldForm.control}
                              name="field.capacity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Capacity (Plants)
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      placeholder="e.g., 1000"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0,
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

                        {/* Field Characteristics */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <Layers className="h-4 w-4" />
                            Field Characteristics
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={fieldForm.control}
                              name="field.soilType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Soil Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select soil type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {soilTypes.map((type) => (
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
                              control={fieldForm.control}
                              name="field.irrigationType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Irrigation Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select irrigation type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {irrigationTypes.map((type) => (
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
                              control={fieldForm.control}
                              name="field.drainage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Drainage</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select drainage quality" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {drainageOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={fieldForm.control}
                              name="field.slope"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Slope</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select slope grade" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {slopeOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
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

                        {/* Soil Test Results */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <TestTube className="h-4 w-4" />
                              Soil Test Results (Optional)
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setShowSoilTest(!showSoilTest)}
                              disabled={isLoading}
                            >
                              {showSoilTest ? "Hide" : "Add"} Soil Test
                            </Button>
                          </div>

                          {showSoilTest && (
                            <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                  control={fieldForm.control}
                                  name="field.soilTestResults.ph"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>pH Level</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="14"
                                          placeholder="e.g., 6.5"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              parseFloat(e.target.value) ||
                                                undefined,
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={fieldForm.control}
                                  name="field.soilTestResults.nitrogen"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nitrogen (%)</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          placeholder="e.g., 2.5"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              parseFloat(e.target.value) ||
                                                undefined,
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={fieldForm.control}
                                  name="field.soilTestResults.phosphorus"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Phosphorus (%)</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          placeholder="e.g., 1.8"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              parseFloat(e.target.value) ||
                                                undefined,
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={fieldForm.control}
                                  name="field.soilTestResults.potassium"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Potassium (%)</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          placeholder="e.g., 3.2"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              parseFloat(e.target.value) ||
                                                undefined,
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={fieldForm.control}
                                  name="field.soilTestResults.organicMatter"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Organic Matter (%)</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          placeholder="e.g., 4.5"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              parseFloat(e.target.value) ||
                                                undefined,
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={fieldForm.control}
                                  name="field.soilTestResults.testDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Test Date</FormLabel>
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={fieldForm.control}
                                name="field.soilTestResults.recommendations"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Recommendations</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Add any recommendations from soil test results..."
                                        rows={3}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="greenhouse" className="h-full">
                    <Form {...greenhouseForm}>
                      <form
                        id="create-greenhouse-form"
                        onSubmit={greenhouseForm.handleSubmit(
                          onGreenhouseSubmit,
                        )}
                        className="space-y-6"
                      >
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <Home className="h-4 w-4" />
                            Basic Information
                          </div>

                          <FormField
                            control={greenhouseForm.control}
                            name="farmTag"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Farm ID</FormLabel>
                                <FormControl>
                                  <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Greenhouse Name
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Greenhouse A1"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        // Auto-generate unit ID
                                        if (e.target.value) {
                                          const generatedId = `GH_${e.target.value
                                            .toUpperCase()
                                            .replace(/\s+/g, "_")}_${Date.now()
                                            .toString()
                                            .slice(-4)}`;
                                          greenhouseForm.setValue(
                                            "greenhouse.unitId",
                                            generatedId,
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.unitId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Unit ID
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Auto-generated from name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.areaSqm"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Area (Square Meters)
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0.1"
                                      placeholder="e.g., 500"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0,
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.capacity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Capacity (Plants)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      placeholder="e.g., 200"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) ||
                                            undefined,
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.constructionDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Construction Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.climateControlled"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Climate Controlled</FormLabel>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value === "true")
                                    }
                                    value={field.value?.toString()}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select option" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="true">Yes</SelectItem>
                                      <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Greenhouse Systems */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <Activity className="h-4 w-4" />
                            Greenhouse Systems
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.coveringMaterial"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Covering Material</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select covering material" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {coveringMaterials.map((material) => (
                                        <SelectItem
                                          key={material}
                                          value={material}
                                        >
                                          {material}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.irrigationSystem"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Irrigation System</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select irrigation system" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {irrigationSystems.map((system) => (
                                        <SelectItem key={system} value={system}>
                                          {system}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.lightingSystem"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Lighting System</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select lighting system" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {lightingSystems.map((system) => (
                                        <SelectItem key={system} value={system}>
                                          {system}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.temperatureControl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Temperature Control</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select temperature control" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {temperatureControls.map((control) => (
                                        <SelectItem
                                          key={control}
                                          value={control}
                                        >
                                          {control}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={greenhouseForm.control}
                              name="greenhouse.ventilationSystem"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Ventilation System</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select ventilation system" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {ventilationSystems.map((system) => (
                                        <SelectItem key={system} value={system}>
                                          {system}
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
                      </form>
                    </Form>
                  </TabsContent>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  {activeTab === "field" ? (
                    <Button
                      type="submit"
                      form="create-field-form"
                      className="bg-green-600 text-white hover:bg-green-700"
                      disabled={fieldLoading}
                    >
                      {fieldLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Creating Field...
                        </>
                      ) : (
                        <>
                          <Sprout className="mr-2 h-4 w-4" />
                          Create Field
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      form="create-greenhouse-form"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      disabled={greenhouseloading}
                    >
                      {greenhouseloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Creating Greenhouse...
                        </>
                      ) : (
                        <>
                          <Home className="mr-2 h-4 w-4" />
                          Create Greenhouse
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddFieldModal;
