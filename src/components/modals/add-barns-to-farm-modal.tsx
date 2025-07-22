"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Trash2, Home, X, Loader2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddBarnsToFarm } from "@/hooks/mutations";
import { toast } from "sonner";

// Enhanced barn schema with proper number validation
const barnSchema = z.object({
  name: z.string().min(1, { message: "Barn name is required" }),
  areaSqm: z
    .number({
      required_error: "Area is required",
      invalid_type_error: "Area must be a valid number",
    })
    .min(1, { message: "Area must be greater than 0" }),
  capacity: z
    .number({
      required_error: "Capacity is required",
      invalid_type_error: "Capacity must be a valid number",
    })
    .min(1, { message: "Capacity must be greater than 0" }),
  climateControlled: z.boolean().optional(),
  unitId: z.string().optional(),
});

const formSchema = z.object({
  farmTag: z.string().min(1, { message: "Farm tag is required" }),
  barns: z
    .array(barnSchema)
    .min(1, { message: "At least one barn is required" }),
});

export const AddHouseModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { addBarnsToFarm, loading } = useAddBarnsToFarm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const farmTag = data?.farmTag || "";
  const [barnCount, setBarnCount] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmTag: farmTag,
      barns: [
        {
          name: "",
          areaSqm: 0,
          capacity: 0,
          climateControlled: false,
          unitId: "",
        },
      ],
    },
  });

  const isModalOpen = isOpen && type === "add-barns-to-farm";

  // Helper to add a new barn to the form
  const addBarn = () => {
    const currentBarns = form.getValues("barns");
    form.setValue(
      "barns",
      [
        ...currentBarns,
        {
          name: "",
          areaSqm: 0,
          capacity: 0,
          climateControlled: false,
          unitId: "",
        },
      ].reverse(),
    );
    setBarnCount(barnCount + 1);
  };

  // Helper to remove a barn from the form
  const removeBarn = (index: number) => {
    const currentBarns = form.getValues("barns");
    if (currentBarns.length > 1) {
      form.setValue(
        "barns",
        currentBarns.filter((_, i) => i !== index),
      );
      setBarnCount(barnCount - 1);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const { farmTag, barns } = data;

      const formattedBarns = barns.map((barn) => {
        const formattedBarn: {
          name: string;
          climateControlled: boolean;
          areaSqm?: number;
          capacity?: number;
          unitId?: string;
        } = {
          name: barn.name,
          climateControlled: barn.climateControlled || false,
        };

        if (barn.areaSqm !== undefined) {
          formattedBarn.areaSqm = barn.areaSqm;
        }

        if (barn.capacity !== undefined) {
          formattedBarn.capacity = barn.capacity;
        }

        if (barn.unitId && barn.unitId !== "") {
          formattedBarn.unitId = barn.unitId;
        }

        return formattedBarn;
      });

      await addBarnsToFarm({
        variables: {
          farmTag: farmTag,
          // @ts-expect-error error
          barns: formattedBarns,
        },
      });

      // Reset form
      form.reset({
        farmTag: farmTag,
        barns: [
          {
            name: "",
            areaSqm: undefined,
            capacity: undefined,
            climateControlled: false,
            unitId: "",
          },
        ],
      });
      setBarnCount(1);
      onClose();

      onOpen("notification", {
        notificationMessage: "Barns added successfully",
        notificationType: "success",
        addBansToFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      console.error("Error adding barns to farm:", error);
      toast.error("Error adding barns to farm");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      setBarnCount(1);
      onClose();
    }
  };

  useEffect(() => {
    if (isModalOpen && farmTag) {
      form.setValue("farmTag", farmTag);
    }
  }, [isModalOpen, farmTag, form]);

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
            className="w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 relative flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Home size={20} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Add Barns to Farm
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Create housing structures for your farm operations.
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

            {/* Form Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <Form {...form}>
                <form
                  id="barn-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Farm Tag Field */}
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
                            placeholder="Farm identifier"
                            className="bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Barns Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Barn Details
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">
                          {barnCount} {barnCount === 1 ? "barn" : "barns"}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={addBarn}
                          disabled={isSubmitting}
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          <Plus size={14} className="mr-1" />
                          Add Barn
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {form.watch("barns").map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="p-5 border border-gray-200 rounded-lg bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-base font-medium text-gray-900 flex items-center">
                              <Home
                                size={16}
                                className="mr-2 text-purple-600"
                              />
                              Barn {barnCount - index}
                            </h4>
                            {form.watch("barns").length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBarn(index)}
                                disabled={isSubmitting}
                                className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Barn Name */}
                            <div className="md:col-span-2">
                              <FormField
                                control={form.control}
                                name={`barns.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                      Barn Name *
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g. North Barn, Cattle House A"
                                        className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Area */}
                            <FormField
                              control={form.control}
                              name={`barns.${index}.areaSqm`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">
                                    Area (sq m) *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="1"
                                      placeholder="e.g. 500"
                                      className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
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

                            {/* Capacity */}
                            <FormField
                              control={form.control}
                              name={`barns.${index}.capacity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">
                                    Animal Capacity *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      placeholder="e.g. 100"
                                      className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                      value={field.value ?? ""}
                                      onChange={(e) =>
                                        field.onChange(
                                          e.target.value
                                            ? parseInt(e.target.value)
                                            : undefined,
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Unit ID */}
                            <FormField
                              control={form.control}
                              name={`barns.${index}.unitId`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">
                                    Unit ID (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. BARN-001"
                                      className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Climate Controlled */}
                            <FormField
                              control={form.control}
                              name={`barns.${index}.climateControlled`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 bg-white border border-gray-200">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                      Climate Controlled
                                    </FormLabel>
                                    <p className="text-xs text-gray-500">
                                      Has heating, cooling, or ventilation
                                      systems
                                    </p>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
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
                form="barn-form"
                disabled={isSubmitting || loading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 min-w-[140px]"
              >
                {isSubmitting || loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Adding Barns...
                  </div>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" />
                    Add {barnCount} {barnCount === 1 ? "Barn" : "Barns"}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
