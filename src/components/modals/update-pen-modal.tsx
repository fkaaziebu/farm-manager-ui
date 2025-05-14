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
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePen } from "@/hooks/mutations";
import { HousingStatus } from "@/graphql/generated/graphql";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const penSchema = z.object({
  penUnitId: z.string().min(1, "Pen ID is required"),
  pen: z.object({
    name: z.string().min(1, "Name is required"),
    areaSqm: z.string().min(1, "Area is required"),
    beddingType: z.string().min(1, "Bedding type is required"),
    capacity: z.string().min(1, "Capacity is required"),
    feederType: z.string().min(1, "Feeder type is required"),
    status: z.enum([
      HousingStatus.Operational,
      HousingStatus.Maintenance,
      HousingStatus.Empty,
      HousingStatus.Full,
    ]),
    watererType: z.string().min(1, "Waterer type is required"),
  }),
});

export const UpdatePenModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-pen";
  const { updatePen } = useUpdatePen();
  const pen: {
    name?: string;
    areaSqm?: string;
    beddingType?: string;
    capacity?: string;
    feederType?: string;
    status?: string;
    watererType?: string;
  } = {
    name: data?.pen?.name,
    areaSqm: data?.pen?.area_sqm.toString(),
    capacity: data?.pen?.capacity.toString(),
    feederType: data?.pen?.feeder_type ?? "",
    status: data?.pen?.status as HousingStatus,
    watererType: data?.pen?.waterer_type ?? "",
    beddingType: data?.pen?.bedding_type ?? "",
  };

  const form = useForm<z.infer<typeof penSchema>>({
    resolver: zodResolver(penSchema),
    defaultValues: {
      penUnitId: data?.penUnitId ?? "",
      pen: {
        watererType: pen?.watererType ?? "",
        name: pen?.name,
        areaSqm: pen?.areaSqm?.toString() ?? "",
        capacity: pen?.capacity?.toString() ?? "",
        feederType: pen?.feederType ?? "",
        status: pen?.status as HousingStatus,
        beddingType: pen?.beddingType ?? "",
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      form.reset({
        penUnitId: data.penUnitId ?? "",
        pen: {
          watererType: pen?.watererType ?? "",
          name: pen?.name,
          areaSqm: pen?.areaSqm?.toString() ?? undefined,
          capacity: pen?.capacity?.toString() ?? undefined,
          feederType: pen?.feederType ?? "",
          status: pen?.status as HousingStatus,
          beddingType: pen?.beddingType ?? "",
        },
      });
    }
  }, [isModalOpen, data]);

  const onSubmit = async (values: z.infer<typeof penSchema>) => {
    console.log("Updating pen:", values);
    try {
      await updatePen({
        variables: {
          penUnitId: values.penUnitId,
          pen: {
            name: values.pen.name,
            areaSqm: parseFloat(values.pen.areaSqm),
            capacity: parseInt(values.pen.capacity),
            feederType: values.pen.feederType,
            status: values.pen.status,
            watererType: values.pen.watererType,
            beddingType: values.pen.beddingType,
          },
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Pen updated successfully",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating pen: ${error}`,
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
            className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Update Pen</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="penUnitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pen Unit ID</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pen.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Pen name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pen.areaSqm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area (sqm)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pen.capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 100 birds" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pen.feederType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feeder Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Linear, Circular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pen.watererType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waterer Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Bell, Nipple" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="pen.beddingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedding Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Straw, Sawdust" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pen.status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Pen Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(HousingStatus).map((type) => (
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

export default UpdatePenModal;
