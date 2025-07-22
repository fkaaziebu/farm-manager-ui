"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUpdateFarm } from "@/hooks/mutations";
import { FarmType } from "@/graphql/generated/graphql";
import { Loader2, X, Edit } from "lucide-react";

// Zod schema with number validation for area
const updateFarmSchema = z.object({
  farmTag: z.string().min(1, "Farm tag is required"),
  name: z.string().min(1, "Farm name is required"),
  location: z.string().min(1, "Location is required"),
  area: z
    .number({
      required_error: "Area is required.",
      invalid_type_error: "Area must be a valid number.",
    })
    .min(0.1, "Area must be greater than 0."),
  farmType: z
    .enum([
      FarmType.Apiary,
      FarmType.Aquaculture,
      FarmType.Crop,
      FarmType.Livestock,
      FarmType.Mixed,
      FarmType.Poultry,
    ])
    .optional(),
});

export const UpdateFarmModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-farm";
  const { updateFarm } = useUpdateFarm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract area number from string like "120 acres"
  const extractAreaNumber = (areaString?: string): number | undefined => {
    if (!areaString) return undefined;
    const match = areaString.match(/^(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : undefined;
  };

  const farm = {
    farmName: data?.farm?.name,
    location: data?.farm?.location ?? undefined,
    area: extractAreaNumber(data?.farm?.area || "0 acres"),
    farmType: data?.farm?.farm_type,
  };

  const form = useForm<z.infer<typeof updateFarmSchema>>({
    resolver: zodResolver(updateFarmSchema),
    defaultValues: {
      farmTag: data?.farm?.farm_tag ?? "",
      name: farm.farmName ?? "",
      location: farm.location ?? "",
      area: farm.area ?? undefined,
      farmType: farm.farmType ?? FarmType.Livestock,
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      form.reset({
        farmTag: data?.farm?.farm_tag ?? "",
        name: farm.farmName ?? "",
        location: farm.location ?? "",
        area: farm.area ?? undefined,
        farmType: farm.farmType ?? FarmType.Livestock,
      });
    }
  }, [
    isModalOpen,
    data,
    farm.farmName,
    farm.location,
    farm.area,
    farm.farmType,
    form,
  ]);

  const onSubmit = async (values: z.infer<typeof updateFarmSchema>) => {
    try {
      setIsSubmitting(true);

      await updateFarm({
        variables: {
          farmTag: values.farmTag,
          name: values.name,
          location: values.location,
          area: `${values.area} acres`, // Append "acres" to the number
          farmType: values.farmType,
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Farm updated successfully",
        updateFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating farm: ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
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
          className="fixed inset-0 bg-gray-400/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="w-full max-w-lg bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 relative">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Edit size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Update Farm
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Modify your farm details below.
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Farm Tag - Read Only */}
                  <FormField
                    control={form.control}
                    name="farmTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Farm Tag
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            className="bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Farm Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Farm Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter farm name"
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Location *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter address or city"
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Area - Number Input */}
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Area (acres) *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.1"
                            placeholder="e.g. 25"
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Farm Type - Enhanced Select */}
                  <FormField
                    control={form.control}
                    name="farmType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Farm Type
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                              <SelectValue placeholder="Select farm type" />
                              {/* <ChevronDown size={16} className="opacity-50" /> */}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(FarmType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="update-farm-form"
                disabled={isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </div>
                ) : (
                  "Update Farm"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateFarmModal;
