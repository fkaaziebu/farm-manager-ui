"use client";

import { useEffect } from "react";
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

// Zod schema
const updateFarmSchema = z.object({
  farmTag: z.string().min(1, "Farm tag is required"),
  name: z.string().min(1, "Farm name is required"),
  location: z.string().min(1, "Location is required"),
  area: z.string().min(1, "Area is required"),
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

  const farm: {
    farmName?: string;
    location?: string;
    area?: string;
    farmType?: FarmType;
  } = {
    farmName: data?.farm?.[0]?.name,
    location: data?.farm?.[0]?.location ?? undefined,
    area: data?.farm?.[0]?.area ?? undefined,
    farmType: data?.farm?.[0]?.farm_type,
  };

  const form = useForm<z.infer<typeof updateFarmSchema>>({
    resolver: zodResolver(updateFarmSchema),
    defaultValues: {
      farmTag: data?.farmTag ?? "",
      name: farm.farmName ?? "",
      location: farm.location ?? "",
      area: farm.area ?? "",
      farmType: farm.farmType ?? FarmType.Livestock,
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      form.reset({
        farmTag: data.farmTag ?? "",
        name: farm.farmName ?? "",
        location: farm.location ?? "",
        area: farm.area ?? "",
        farmType: farm.farmType ?? FarmType.Livestock,
      });
    }
  }, [isModalOpen, data]);

  const onSubmit = async (values: z.infer<typeof updateFarmSchema>) => {
    console.log("Updating farm:", values);
    try {
      await updateFarm({
        variables: {
          farmTag: values.farmTag,
          name: values.name,
          location: values.location,
          area: values.area,
          farmType: values.farmType,
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Farm updated successfully",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating farm: ${error}`,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="w-full max-w-md bg-white rounded-lg shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Update Farm</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="farmTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Tag</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Farm name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Farm location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Farm area (e.g. 50 acres)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="farmType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Type</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select farm type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(FarmType).map((type) => (
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

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateFarmModal;
