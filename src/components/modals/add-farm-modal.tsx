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

const formSchema = z.object({
  name: z.string().min(2, "Farm name must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  area: z.string().min(1, "Area is required."),
  farmType: z.enum(Object.values(FarmType) as [string, ...string[]]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const AddFarmModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const { createFarm } = useCreateFarm();
  const isModalOpen = isOpen && type === "add-farm";

  const [useManualLocation, setUseManualLocation] = useState(false);
  const [autoCoords, setAutoCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      area: "",
      farmType: FarmType.Livestock,
      latitude: undefined,
      longitude: undefined,
    },
  });

  // Fetch browser location on mount if not using manual input
  useEffect(() => {
    if (!useManualLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAutoCoords({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error("Geolocation error:", err);
          onOpen("notification", {
            notificationType: "error",
            notificationMessage: "Failed to retrieve browser location.",
          });
        }
      );
    }
  }, [useManualLocation]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, location, area, farmType, latitude, longitude } = values;
      const coords = useManualLocation
        ? { latitude, longitude }
        : autoCoords
        ? { latitude: autoCoords.lat, longitude: autoCoords.lng }
        : { latitude: undefined, longitude: undefined };

      if (!coords.latitude || !coords.longitude) {
        return onOpen("notification", {
          notificationType: "error",
          notificationMessage: "Coordinates are required for farm creation.",
        });
      }

      await createFarm({
        variables: {
          name,
          location,
          area,
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
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Farm creation failed: ${
          // @ts-expect-error error
          error.response?.message || "Unknown error"
        }`,
      });
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 5, opacity: 0 }}
          className="fixed inset-0 bg-gray-400/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => onClose()}
        >
          <div
            className="w-full max-w-md bg-white rounded-lg shadow-xl m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 relative">
              <h2 className="text-xl font-semibold">Add New Farm</h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details below to create a new farm.
              </p>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <Form {...form}>
                <form
                  id="farm-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  {/* Farm Type */}
                  <FormField
                    control={form.control}
                    name="farmType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-green-500"
                          >
                            <option value="">Select farm type</option>
                            {Object.entries(FarmType).map(([key, value]) => (
                              <option key={key} value={value}>
                                {value.charAt(0) + value.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
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
                        <FormLabel>Farm Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter farm name" {...field} />
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
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter address or city"
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
                        <FormLabel>Area (acres)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Toggle for manual coordinates */}
                  <div className="flex items-center gap-2 mt-2">
                    <Switch
                      checked={useManualLocation}
                      onCheckedChange={setUseManualLocation}
                    />
                    <span className="text-sm text-gray-700">
                      Enter coordinates manually?
                    </span>
                  </div>

                  {/* svg for information */}

                  <span className="border flex gap-3 p-1 bg-red-300 text-gray-800 text-sm text-center items-center rounded-md">
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0V9a1 1 0 112 0v4zm-1-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Location will be auto-filled if not checked.
                  </span>

                  {useManualLocation && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="e.g. 5.6589"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
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
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="e.g. 7.4583"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
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

            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="farm-form"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Create Farm
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
