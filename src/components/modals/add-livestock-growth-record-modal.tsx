"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Info } from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAddLivestockGrowthRecord } from "@/hooks/mutations";
import { GrowthRecordType, GrowthPeriod } from "@/graphql/generated/graphql";

const growthFormSchema = z.object({
  livestockTag: z.string().min(1, { message: "Livestock tag is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  height: z.string().optional(),
  length: z.string().optional(),
  feedConsumption: z.string().optional(),
  growthRate: z.string().optional(),
  notes: z.string().min(1, { message: "Notes are required" }),
  recordDate: z.string().min(1, { message: "Record date is required" }),
  period: z.enum(
    [
      GrowthPeriod.Birth,
      GrowthPeriod.FourWeeks,
      GrowthPeriod.EightWeeks,
      GrowthPeriod.TwelveWeeks,
      GrowthPeriod.SixteenWeeks,
      GrowthPeriod.TwentyWeeks,
      GrowthPeriod.Adulthood,
      GrowthPeriod.Custom,
    ],
    {
      required_error: "Category is required",
      invalid_type_error: "Invalid category",
    }
  ),
  recordType: z.enum([GrowthRecordType.Batch, GrowthRecordType.Individual], {
    required_error: "Record type is required",
    invalid_type_error: "Invalid category",
  }),
});

export const GrowthRecordModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { addLivestockGrowthRecord, loading } = useAddLivestockGrowthRecord();
  const isModalOpen = isOpen && type === "add-livestock-growth-record";

  const form = useForm<z.infer<typeof growthFormSchema>>({
    resolver: zodResolver(growthFormSchema),
    defaultValues: {
      livestockTag: data?.livestockTag || "",
      weight: "",
      height: "",
      length: "",
      feedConsumption: "",
      growthRate: "",
      notes: "",
      recordDate: format(new Date(), "yyyy-MM-dd"),
      period: undefined,
      recordType: undefined,
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        livestockTag: data?.livestockTag || "",
        weight: "",
        height: "",
        length: "",
        feedConsumption: "",
        growthRate: "",
        notes: "",
        recordDate: format(new Date(), "yyyy-MM-dd"),
        period: undefined,
        recordType: undefined,
      });
    }
  }, [isModalOpen, data?.livestockTag, form]);

  const onSubmit = async (values: z.infer<typeof growthFormSchema>) => {
    try {
      await addLivestockGrowthRecord({
        variables: {
          livestockTag: values.livestockTag,
          growthRecord: {
            weight: parseFloat(values.weight),
            height: values.height ? parseFloat(values.height) : undefined,
            length: values.length ? parseFloat(values.length) : undefined,
            feedConsumption: values.feedConsumption
              ? parseFloat(values.feedConsumption)
              : undefined,
            growthRate: values.growthRate
              ? parseFloat(values.growthRate)
              : undefined,
            notes: values.notes,
            recordDate: values.recordDate,
            period: values.period,
            recordType: values.recordType,
          },
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Growth record created successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Failed to create growth record. ${error}`,
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
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => onClose()}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-lg shadow-xl m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-green-50 p-4 border-b border-green-200">
              <div className="text-xl font-semibold text-green-800">
                Create Growth Record
              </div>
              <div className="text-sm text-green-700">
                Record the growth data for livestock.
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <Form {...form}>
                <form
                  id="growth-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Full-width field for Livestock Tag */}
                  <FormField
                    control={form.control}
                    name="livestockTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Livestock Tag <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Two fields side by side: Weight & Height */}
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Weight (kg) <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Two fields side by side: Length & Feed Conversion Ratio */}
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (cm)</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="feedConsumption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount of feed consumed (KG)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Two fields side by side: Growth Rate & Record Date */}
                  {/* <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="growthRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Growth Rate</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recordDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Record Date{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}

                  {/* Two fields side by side: Record Type & Growth Period */}
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="recordType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Select Record Type{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a record type" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(GrowthRecordType).map(
                                  (recordType) => (
                                    <SelectItem
                                      key={recordType}
                                      value={recordType}
                                    >
                                      {recordType
                                        .replace("_", " ")
                                        .toLowerCase()
                                        .replace(/^\w/, (c) => c.toUpperCase())}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="period"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Growth Period{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a growth period" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(GrowthPeriod).map((period) => (
                                  <SelectItem key={period} value={period}>
                                    {period
                                      .replace("_", " ")
                                      .toLowerCase()
                                      .replace(/^\w/, (c) => c.toUpperCase())}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Conditional full-width field for Custom Growth Period if "CUSTOM" is selected */}
                  {form.watch("period") === "CUSTOM" && (
                    <FormField
                      control={form.control}
                      name="recordType" // Note: if a separate field is desired, adjust the schema accordingly.
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Custom Growth Period{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter custom growth period"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Full-width field for Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Notes <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none min-h-[100px]"
                            placeholder="Additional notes on livestock growth..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Alert
                    variant="default"
                    className="bg-blue-50 border-blue-200"
                  >
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700 text-sm">
                      Keep track of growth patterns over time for performance
                      evaluation.
                    </AlertDescription>
                  </Alert>
                </form>
              </Form>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="growth-form"
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                Submit Growth Record
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GrowthRecordModal;
