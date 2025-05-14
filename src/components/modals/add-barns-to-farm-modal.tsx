"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Trash2 } from "lucide-react";
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

// Barn schema now matches the new mutation input
const barnSchema = z.object({
  name: z.string().min(1, { message: "Barn name is required" }),
  areaSqm: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Area must be a number" })
    .optional(),
  capacity: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Capacity must be a number",
    })
    .optional(),
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

  const farmTag = data?.farmTag || "";
  const [barnCount, setBarnCount] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmTag: farmTag,
      barns: [
        {
          name: "",
          areaSqm: "",
          capacity: "",
          climateControlled: false,
          unitId: "",
        },
      ],
    },
  });

  const isModalOpen = isOpen && type === "add-house-to-farm";

  // Helper to add a new barn to the form
  const addBarn = () => {
    const currentBarns = form.getValues("barns");
    form.setValue("barns", [
      ...currentBarns,
      {
        name: "",
        areaSqm: "",
        capacity: "",
        climateControlled: false,
        unitId: "",
      },
    ]);
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
    console.log("Form data:", data);
    try {
      // Transform form data to match mutation input format
      const { farmTag, barns } = data;

      const formattedBarns = barns.map((barn) => {
        const formattedBarn: Record<string, any> = {
          name: barn.name,
          climateControlled: barn.climateControlled || false,
        };

        if (barn.areaSqm) {
          formattedBarn.areaSqm = parseFloat(barn.areaSqm);
        }

        if (barn.capacity) {
          formattedBarn.capacity = parseInt(barn.capacity);
        }

        if (barn.unitId) {
          formattedBarn.unitId = barn.unitId;
        }

        return formattedBarn;
      });

      await addBarnsToFarm({
        variables: {
          farmTag: farmTag,
          barns: formattedBarns,
        },
      });

      // Reset form
      form.reset({
        farmTag: farmTag,
        barns: [
          {
            name: "",
            areaSqm: "",
            capacity: "",
            climateControlled: false,
            unitId: "",
          },
        ],
      });
      setBarnCount(1);

      onOpen("notification", {
        notificationMessage: "Barns added successfully",
        notificationType: "success",
        addBansToFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      console.error("Error adding barns to farm:", error);
      toast.error("Error adding barns to farm");
    }
  }

  useEffect(() => {
    if (isModalOpen && farmTag) {
      form.setValue("farmTag", farmTag);
    }
  }, [isModalOpen, farmTag, form]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ y: 5, opacity: 0, display: "none" }}
          animate={{ y: 0, opacity: 1, display: "block" }}
          exit={{ y: 5, opacity: 0, display: "none" }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => onClose()}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="text-xl font-semibold text-gray-900">
                  Add Barns to Farm
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Fill in the details below to add one or more barns.
                </div>
                <button
                  onClick={() => onClose()}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <Form {...form}>
                  <form
                    id="barn-form"
                    onSubmit={form.handleSubmit((data) =>
                      onSubmit({ ...data, farmTag }),
                    )}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="farmTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Tag</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Farm identifier"
                              {...field}
                              readOnly={!!farmTag}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Barns section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700">
                          Barns
                        </h3>
                        <span className="text-xs text-gray-500">
                          ({barnCount} {barnCount === 1 ? "barn" : "barns"})
                        </span>
                      </div>

                      {form.watch("barns").map((_, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-md space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700">
                              Barn {index + 1}
                            </h4>
                            {form.watch("barns").length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBarn(index)}
                                className="h-8 px-2 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <FormField
                            control={form.control}
                            name={`barns.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Barn Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. North Barn"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`barns.${index}.areaSqm`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Area (sq m)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Area"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`barns.${index}.capacity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Capacity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Animal capacity"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`barns.${index}.climateControlled`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Climate Controlled</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`barns.${index}.unitId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Unit ID (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="External identifier"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={addBarn}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Barn
                      </Button>
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
                  form="barn-form"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Barns"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
