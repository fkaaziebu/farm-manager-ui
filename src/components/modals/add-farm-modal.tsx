"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { FarmType } from "@/graphql/generated/graphql";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateFarm } from "@/hooks/mutations";
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
import { Switch } from "@/components/ui/switch";
import { ChevronDown, Loader2, X, Info } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Farm name must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  area: z
    .number({
      required_error: "Area is required.",
      invalid_type_error: "Area must be a valid number.",
    })
    .min(0.1, "Area must be greater than 0."),
  farmType: z.enum(Object.values(FarmType) as [string, ...string[]], {
    required_error: "Please select a farm type.",
  }),
  latitude: z
    .number({
      required_error: "Latitude is required.",
      invalid_type_error: "Latitude must be a valid number.",
    })
    .optional(),
  longitude: z
    .number({
      required_error: "Longitude is required.",
      invalid_type_error: "Longitude must be a valid number.",
    })
    .optional(),
});

export const AddFarmModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const { createFarm } = useCreateFarm();
  const isModalOpen = isOpen && type === "add-farm";

  const [useManualLocation, setUseManualLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoCoords, setAutoCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      area: undefined,
      farmType: undefined,
      latitude: undefined,
      longitude: undefined,
    },
  });

  // Fetch browser location on mount if not using manual input
  useEffect(() => {
    if (isModalOpen && !useManualLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAutoCoords({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
      );
    }
  }, [useManualLocation, type, isModalOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const { name, location, area, farmType, latitude, longitude } = values;
      const coords = useManualLocation
        ? { latitude, longitude }
        : autoCoords
          ? { latitude: autoCoords.lat, longitude: autoCoords.lng }
          : { latitude: undefined, longitude: undefined };

      if (!coords.latitude || !coords.longitude) {
        onOpen("notification", {
          notificationType: "error",
          notificationMessage: "Coordinates are required for farm creation.",
        });
        return;
      }

      await createFarm({
        variables: {
          name,
          location,
          area: `${area} acres`,
          farmType: farmType as FarmType,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      });

      form.reset();
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Farm created successfully",
        createFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Farm creation failed: ${
          // @ts-expect-error error
          error.response?.message || "Unknown error"
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      setUseManualLocation(false);
      setAutoCoords(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 5, opacity: 0 }}
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
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Farm
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details below to create a new farm.
              </p>
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
                  id="farm-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Farm Type - Enhanced Select */}
                  <FormField
                    control={form.control}
                    name="farmType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Farm Type *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              {...field}
                              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            >
                              <option value="">Select farm type</option>
                              {Object.entries(FarmType).map(([key, value]) => (
                                <option key={key} value={value}>
                                  {value.charAt(0) +
                                    value.slice(1).toLowerCase()}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                          </div>
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
                            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
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
                            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Area */}
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
                            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
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

                  {/* Toggle for manual coordinates */}
                  <div className="flex items-center gap-3 py-2">
                    <Switch
                      checked={useManualLocation}
                      onCheckedChange={setUseManualLocation}
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-700">
                      Enter coordinates manually
                    </span>
                  </div>

                  {/* Information Banner */}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Info
                      size={16}
                      className="text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-blue-800">
                      {useManualLocation
                        ? "Please enter the latitude and longitude coordinates for your farm location."
                        : "Your browser location will be used automatically for farm coordinates."}
                    </span>
                  </div>

                  {/* Manual Coordinates */}
                  {useManualLocation && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Latitude *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="e.g. 5.6589"
                                className="border-gray-300 focus:ring-green-500 focus:border-green-500"
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

                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Longitude *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="e.g. 7.4583"
                                className="border-gray-300 focus:ring-green-500 focus:border-green-500"
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
                    </div>
                  )}
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
                form="farm-form"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Creating...
                  </div>
                ) : (
                  "Create Farm"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
