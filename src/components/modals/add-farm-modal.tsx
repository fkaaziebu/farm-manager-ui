"use client";

import React, { useState } from "react";
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
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Farm name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  area: z.string().min(2, {
    message: "Area must be at least 2 characters.",
  }),
  farmType: z.enum(Object.values(FarmType) as [string, ...string[]]),
  // Add any other fields you need for the farm creation
});

export const AddFarmModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const { createFarm } = useCreateFarm();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      area: "",
      farmType: FarmType.Livestock,
    },
  });

  const isModalOpen = isOpen && type === "add-farm";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { name, location, area, farmType } = values;

      await createFarm({
        variables: {
          name,
          location,
          area,
          farmType: farmType as FarmType,
        },
      });

      onOpen("notification", {
        notificationMessage: "Farm creation successful",
        notificationType: "success",
        createFarmEvent: `${Math.random()}`,
      });
      form.reset();
    } catch (error) {
      onOpen("notification", {
        notificationMessage: `Farm Creation Error ${error?.message}`,
        notificationType: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ y: 5, opacity: 0, display: "none" }}
          animate={{ y: 0, opacity: 1, display: "block" }}
          exit={{ y: 5, opacity: 0, display: "none" }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center "
          onClick={() => onClose()}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className=" w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="text-xl font-semibold text-gray-900">
                  Add New Farm
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Fill in the details below to create a new farm.
                </div>
                <button
                  onClick={() => onClose()}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <Form {...form}>
                  <form id="farm-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="farmType"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-animal-type">
                              Farm Type
                            </FormLabel>
                            <FormControl>
                              <select
                                id="farm-animal-type"
                                {...field}
                                className="border-gray-300 rounded-sm shadow-none focus:ring focus:ring-opacity-50 focus:ring-green-500"
                              >
                                <option value="">Select farm type</option>
                                {Object.entries(FarmType).map(
                                  ([key, value]) => (
                                    <option key={key} value={value}>
                                      {value}
                                    </option>
                                  ),
                                )}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-name">Farm Name</FormLabel>
                            <FormControl>
                              <Input
                                id="farm-name"
                                placeholder="Enter farm name"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-location">
                              Location
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="farm-location"
                                placeholder="Enter location"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-area">
                              Area (acres)
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="farm-area"
                                placeholder="Enter area in acres"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                  disabled={isLoading}
                  form="farm-form"
                  className="text-white bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "Creating..." : "Create Farm"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
