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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePen } from "@/hooks/mutations";
import { HousingStatus } from "@/graphql/generated/graphql";
import {
  Edit,
  Home,
  Ruler,
  Users,
  Utensils,
  Droplets,
  Bed,
  Activity,
  Info,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

// Status display configuration
const statusConfig = {
  [HousingStatus.Operational]: {
    color: "text-green-600",
    bg: "bg-green-50",
    label: "Operational",
  },
  [HousingStatus.Maintenance]: {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    label: "Maintenance",
  },
  [HousingStatus.Empty]: {
    color: "text-gray-600",
    bg: "bg-gray-50",
    label: "Empty",
  },
  [HousingStatus.Full]: {
    color: "text-red-600",
    bg: "bg-red-50",
    label: "Full",
  },
};

export const UpdatePenModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-pen";
  const { updatePen, loading } = useUpdatePen();

  const form = useForm<z.infer<typeof penSchema>>({
    resolver: zodResolver(penSchema),
    defaultValues: {
      penUnitId: "",
      pen: {
        watererType: "",
        name: "",
        areaSqm: "",
        capacity: "",
        feederType: "",
        status: HousingStatus.Operational,
        beddingType: "",
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      const penData = {
        name: data?.pen?.name ?? "",
        areaSqm: data?.pen?.area_sqm?.toString() ?? "",
        capacity: data?.pen?.capacity?.toString() ?? "",
        feederType: data?.pen?.feeder_type ?? "",
        status: data?.pen?.status as HousingStatus,
        watererType: data?.pen?.waterer_type ?? "",
        beddingType: data?.pen?.bedding_type ?? "",
      };

      form.reset({
        penUnitId: data.penUnitId ?? "",
        pen: penData,
      });
    }
  }, [isModalOpen, data, form]);

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
        notificationMessage: "Pen updated successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating pen: ${error}`,
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
            className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b border-blue-100">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
                  <Edit className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
                    Update Pen
                  </h2>
                  <p className="text-sm text-blue-700 mt-1">
                    Modify pen configuration and settings
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
                  {/* Pen ID Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <FormField
                      control={form.control}
                      name="penUnitId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700">
                            <Home className="h-4 w-4 mr-2" />
                            Pen Unit ID
                          </FormLabel>
                          <FormControl>
                            <Input
                              readOnly
                              {...field}
                              className="bg-gray-100 cursor-not-allowed font-mono text-gray-600"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            This ID cannot be changed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-blue-600" />
                      Basic Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="pen.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Home className="h-4 w-4 mr-2 text-green-600" />
                            Pen Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter pen name (e.g., Chicken Coop A)"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
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
                            <FormLabel className="flex items-center">
                              <Ruler className="h-4 w-4 mr-2 text-purple-600" />
                              Area (m²)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="30"
                                type="number"
                                step="0.1"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
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
                            <FormLabel className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-orange-600" />
                              Capacity
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="100"
                                type="number"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Equipment Configuration */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-blue-600" />
                      Equipment Configuration
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pen.feederType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Utensils className="h-4 w-4 mr-2 text-yellow-600" />
                              Feeder Type
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Linear, Circular, Trough"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
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
                            <FormLabel className="flex items-center">
                              <Droplets className="h-4 w-4 mr-2 text-blue-600" />
                              Waterer Type
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Bell, Nipple, Trough"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
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
                          <FormLabel className="flex items-center">
                            <Bed className="h-4 w-4 mr-2 text-amber-600" />
                            Bedding Type
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Straw, Sawdust, Wood Shavings, Sand"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Status Configuration */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-blue-600" />
                      Status Configuration
                    </h3>

                    <FormField
                      control={form.control}
                      name="pen.status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Status</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select pen status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(HousingStatus).map((status) => {
                                const config =
                                  statusConfig[status as HousingStatus];
                                return (
                                  <SelectItem key={status} value={status}>
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full ${config.bg} mr-2`}
                                      />
                                      <span className={config.color}>
                                        {config.label}
                                      </span>
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
                  </div>

                  {/* Information Alert */}
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800 text-sm">
                      Changes will take effect immediately. Ensure all livestock
                      are safely relocated before changing the status to{" "}
                      {"Maintenance"}.
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
                  form="pen-update-form"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={loading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Pen"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatePenModal;
