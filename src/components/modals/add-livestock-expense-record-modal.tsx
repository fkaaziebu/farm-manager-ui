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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useAddLivestockExpenseRecord } from "@/hooks/mutations";
import { ExpenseCategory } from "@/graphql/generated/graphql";

const expenseFormSchema = z.object({
  livestockTag: z.string().min(1, { message: "Livestock tag is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  category: z.enum(
    [
      ExpenseCategory.Bedding,
      ExpenseCategory.Feed,
      ExpenseCategory.Breeding,
      ExpenseCategory.Cleaning,
      ExpenseCategory.Equipment,
      ExpenseCategory.Fertilizer,
      ExpenseCategory.Grooming,
      ExpenseCategory.Harvesting,
      ExpenseCategory.Herbicide,
      ExpenseCategory.Housing,
      ExpenseCategory.Identification,
      ExpenseCategory.Irrigation,
      ExpenseCategory.Labor,
      ExpenseCategory.Maintenance,
      ExpenseCategory.Medical,
      ExpenseCategory.Pesticide,
      ExpenseCategory.Seeds,
      ExpenseCategory.Supplements,
      ExpenseCategory.Testing,
      ExpenseCategory.Transport,
      ExpenseCategory.Utilities,
      ExpenseCategory.Vaccination,
      ExpenseCategory.Other,
    ],
    {
      required_error: "Category is required",
      invalid_type_error: "Invalid category",
    }
  ),
  expenseDate: z.string().min(1, { message: "Date is required" }),
  notes: z.string().min(1, {
    message: "Notes are required",
  }),
});

export const ExpenseRecordModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { addLivestockExpenseRecord, loading } = useAddLivestockExpenseRecord();

  const isModalOpen = isOpen && type === "add-livestock-expense-record";

  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      livestockTag: data?.livestockTag || "",
      amount: "",
      category: undefined,
      expenseDate: format(new Date(), "yyyy-MM-dd"),
      notes: "",
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        livestockTag: data?.livestockTag || "",
        amount: "",
        category: undefined,
        expenseDate: format(new Date(), "yyyy-MM-dd"),
        notes: "",
      });
    }
  }, [isModalOpen, data?.livestockTag, form]);

  const onSubmit = async (values: z.infer<typeof expenseFormSchema>) => {
    try {
      console.log("Submitting expense record:", values);

      await addLivestockExpenseRecord({
        variables: {
          livestockTag: values.livestockTag,
          expenseRecord: {
            amount: parseFloat(values.amount),
            category: values.category,
            expenseDate: values.expenseDate,
            notes: values.notes,
          },
        },
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Expense record created successfully!",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Failed to create expense record. ${error}`,
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
            className="w-full max-w-xl bg-white rounded-lg shadow-xl m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-yellow-50 p-4 border-b border-yellow-200">
              <div className="text-xl font-semibold text-yellow-800">
                Record Expense
              </div>
              <div className="text-sm text-yellow-700">
                Track costs related to a specific livestock.
              </div>
            </div>

            <div className="p-6">
              <Form {...form}>
                <form
                  id="expense-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="livestockTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Livestock Tag<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Amount (₦)<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Category<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                                {Object.values(ExpenseCategory).map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat.charAt(0) +
                                      cat
                                        .slice(1)
                                        .toLowerCase()
                                        .replace(/_/g, " ")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("category") === "OTHER" && (
                      <FormField
                        control={form.control}
                        name="category" // Note: if a separate field is desired, adjust the schema accordingly.
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Custom category
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter custom category"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="expenseDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Date<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Optional notes..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="expense-form"
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                disabled={loading}
              >
                {!loading ? "Save Expense Record" : "Saving..."}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpenseRecordModal;
