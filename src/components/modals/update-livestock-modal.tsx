"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUpdateLivestock } from "@/hooks/mutations";
import { LivestockGender, LivestockType } from "@/graphql/generated/graphql";
import { 
  Edit, 
  Calendar, 
  Scale, 
  Heart, 
  Tag, 
  Users, 
  Milk,
  Beef,
  Info,
  Baby,
  UserCheck,
  UserX
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const livestockSchema = z.object({
  livestockTag: z.string().min(1, "Livestock tag is required"),
  livestock: z.object({
    birthDate: z.string().min(1, "Birth date is required"),
    breed: z.string().min(1, "Breed is required"),
    fatherTag: z.string().optional(),
    gender: z.enum([LivestockGender.Female, LivestockGender.Male]),
    livestockType: z.enum([
      LivestockType.Cattle,
      LivestockType.Goat,
      LivestockType.Sheep,
      LivestockType.Pig,
      LivestockType.Grasscutter,
      LivestockType.Other,
    ]),
    meatGrade: z.string().optional(),
    milkProduction: z.string().optional(),
    motherTag: z.string().optional(),
    offspringTags: z.string().optional(),
    weight: z.string().min(1, "Weight is required"),
  }),
});

// Gender display configuration
const genderConfig = {
  [LivestockGender.Male]: { color: "text-blue-600", bg: "bg-blue-50", icon: "♂", label: "Male" },
  [LivestockGender.Female]: { color: "text-pink-600", bg: "bg-pink-50", icon: "♀", label: "Female" },
};

// Livestock type display configuration
const typeConfig = {
  [LivestockType.Cattle]: { color: "text-amber-600", label: "Cattle" },
  [LivestockType.Goat]: { color: "text-green-600", label: "Goat" },
  [LivestockType.Sheep]: { color: "text-gray-600", label: "Sheep" },
  [LivestockType.Pig]: { color: "text-pink-600", label: "Pig" },
  [LivestockType.Grasscutter]: { color: "text-emerald-600", label: "Grasscutter" },
  [LivestockType.Other]: { color: "text-purple-600", label: "Other" },
};

export const UpdateLivestockModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-livestock";
  const { updateLivestock, loading } = useUpdateLivestock();

  const form = useForm<z.infer<typeof livestockSchema>>({
    resolver: zodResolver(livestockSchema),
    defaultValues: {
      livestockTag: "",
      livestock: {
        birthDate: "",
        breed: "",
        fatherTag: "",
        gender: LivestockGender.Female,
        livestockType: LivestockType.Cattle,
        meatGrade: "",
        milkProduction: "",
        motherTag: "",
        offspringTags: "",
        weight: "",
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      const livestockData = {
        birthDate: data?.penLivestock?.[0]?.birth_date ?? "",
        breed: data?.penLivestock?.[0]?.breed ?? "",
        fatherTag: data?.penLivestock?.[0]?.father?.livestock_tag ?? "",
        gender: data?.penLivestock?.[0]?.gender as LivestockGender ?? LivestockGender.Female,
        livestockType: data?.penLivestock?.[0]?.livestock_type as LivestockType ?? LivestockType.Cattle,
        meatGrade: data?.penLivestock?.[0]?.meat_grade ?? "",
        milkProduction: data?.penLivestock?.[0]?.milk_production?.toString() ?? "",
        motherTag: data?.penLivestock?.[0]?.mother?.livestock_tag ?? "",
        offspringTags: data?.penLivestock?.[0]?.maternalOffspring
          ?.map((offspring) => offspring.livestock_tag)
          .join(", ") ?? "",
        weight: data?.penLivestock?.[0]?.weight?.toString() ?? "",
      };

      form.reset({
        livestockTag: data?.livestockTag ?? "",
        livestock: livestockData,
      });
    }
  }, [isModalOpen, data, form]);

  const onSubmit = async (values: z.infer<typeof livestockSchema>) => {
    console.log("Updating livestock:", values);
    try {
      await updateLivestock({
        variables: {
          livestockTag: values.livestockTag,
          livestock: {
            birthDate: values.livestock.birthDate,
            breed: values.livestock.breed,
            fatherTag: values.livestock.fatherTag || undefined,
            gender: values.livestock.gender,
            livestockType: values.livestock.livestockType,
            meatGrade: values.livestock.meatGrade || undefined,
            milkProduction: values.livestock.milkProduction
              ? parseFloat(values.livestock.milkProduction)
              : undefined,
            motherTag: values.livestock.motherTag || undefined,
            offspringTags: values.livestock.offspringTags
              ? values.livestock.offspringTags
                  .split(",")
                  .map((tag) => tag.trim())
              : undefined,
            weight: parseFloat(values.livestock.weight),
          },
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Livestock updated successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating livestock: ${error}`,
      });
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
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 border-b border-green-100">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mr-3">
                  <Edit className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-green-900">
                    Update Livestock
                  </h2>
                  <p className="text-sm text-green-700 mt-1">
                    Modify livestock information and characteristics
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Livestock ID Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <FormField
                      control={form.control}
                      name="livestockTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700">
                            <Tag className="h-4 w-4 mr-2" />
                            Livestock Tag
                          </FormLabel>
                          <FormControl>
                            <Input 
                              readOnly 
                              {...field} 
                              className="bg-gray-100 cursor-not-allowed font-mono text-gray-600"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            This tag cannot be changed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-green-600" />
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="livestock.birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                              Birth Date
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="livestock.weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Scale className="h-4 w-4 mr-2 text-purple-600" />
                              Weight (kg)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="150" 
                                type="number"
                                step="0.1"
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="livestock.breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-red-600" />
                            Breed
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Holstein, Angus, Boer, etc." 
                              {...field} 
                              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="livestock.gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(LivestockGender).map((gender) => {
                                  const config = genderConfig[gender];
                                  return (
                                    <SelectItem key={gender} value={gender}>
                                      <div className="flex items-center">
                                        <span className={`text-lg mr-2 ${config.color}`}>
                                          {config.icon}
                                        </span>
                                        <span className={config.color}>{config.label}</span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="livestock.livestockType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Livestock Type</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(LivestockType).map((type) => {
                                  const config = typeConfig[type];
                                  return (
                                    <SelectItem key={type} value={type}>
                                      <span className={config.color}>{config.label}</span>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Family Relations */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      Family Relations
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="livestock.fatherTag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <UserCheck className="h-4 w-4 mr-2 text-blue-600" />
                              Father Tag
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Optional - Father's livestock tag" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="livestock.motherTag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <UserX className="h-4 w-4 mr-2 text-pink-600" />
                              Mother Tag
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Optional - Mother's livestock tag" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="livestock.offspringTags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Baby className="h-4 w-4 mr-2 text-orange-600" />
                            Offspring Tags
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Comma-separated tags (e.g., LT001, LT002, LT003)"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Enter multiple offspring tags separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Production Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Scale className="h-4 w-4 mr-2 text-green-600" />
                      Production Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="livestock.meatGrade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Beef className="h-4 w-4 mr-2 text-red-600" />
                              Meat Grade
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="A, B, C or Premium, Standard" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="livestock.milkProduction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Milk className="h-4 w-4 mr-2 text-blue-600" />
                              Milk Production (L/day)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="25.5" 
                                type="number"
                                step="0.1"
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Information Alert */}
                  <Alert className="bg-green-50 border-green-200">
                    <Info className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 text-sm">
                      Changes will be saved immediately. Ensure all information is accurate before updating. Family relations help track genetic lineage and breeding history.
                    </AlertDescription>
                  </Alert>
                </form>
              </Form>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-200">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="w-full sm:w-auto transition-all duration-200 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={loading}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Livestock"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateLivestockModal;
