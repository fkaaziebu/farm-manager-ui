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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateLivestock } from "@/hooks/mutations";
import { LivestockGender, LivestockType } from "@/graphql/generated/graphql";

const livestockSchema = z.object({
  livestockTag: z.string().min(1, "Livestock tag is required"),
  livestock: z.object({
    birthDate: z.string().min(1, "Birth date is required"),
    breed: z.string().min(1, "Breed is required"),
    fatherTag: z.string().optional(),
    gender: z.enum([LivestockGender.Female, LivestockGender.Male]),
    livestockType: z.enum([
      LivestockType.Cattle,
      LivestockType.Goat,
      LivestockType.Sheep,
      LivestockType.Pig,
      LivestockType.Grasscutter,
      LivestockType.Sheep,
      LivestockType.Other,
    ]),
    meatGrade: z.string().optional(),
    milkProduction: z.string().optional(),
    motherTag: z.string().optional(),
    offspringTags: z.string().optional(),
    weight: z.string().min(1, "Weight is required"),
  }),
});

export const UpdateLivestockModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-livestock";

  const { updateLivestock } = useUpdateLivestock();

  const livestock: {
    livestockTag?: string;
    birthDate?: string;
    breed?: string;
    fatherTag?: string;
    gender?: string;
    livestockType?: string;
    meatGrade?: string;
    milkProduction?: string;
    motherTag?: string;
    offspringTags?: string;
    weight?: string;
  } = {
    livestockTag: data?.livestockTag,
    birthDate: data?.penLivestock?.[0]?.birth_date ?? undefined,
    breed: data?.penLivestock?.[0].breed ?? undefined,
    fatherTag: data?.penLivestock?.[0]?.father?.livestock_type ?? undefined,
    gender: data?.penLivestock?.[0].gender ?? undefined,
    livestockType: data?.penLivestock?.[0].livestock_type ?? undefined,
    meatGrade: data?.penLivestock?.[0].meat_grade ?? undefined,
    milkProduction:
      data?.penLivestock?.[0].milk_production?.toString() ?? undefined,
    motherTag: data?.penLivestock?.[0].mother?.livestock_tag ?? undefined,
    offspringTags:
      data?.penLivestock?.[0]?.maternalOffspring
        ?.map((offspring) => offspring.livestock_tag)
        .join(", ") ?? undefined,
    weight: data?.penLivestock?.[0].weight.toString() ?? undefined,
  };

  const form = useForm<z.infer<typeof livestockSchema>>({
    resolver: zodResolver(livestockSchema),
    defaultValues: {
      livestockTag: data?.livestockTag ?? "",
      livestock: {
        birthDate: livestock?.birthDate ?? undefined,
        breed: livestock?.breed ?? undefined,
        fatherTag: livestock?.fatherTag ?? undefined,
        gender: livestock?.gender as LivestockGender,
        livestockType: livestock?.livestockType as LivestockType,
        meatGrade: livestock?.meatGrade ?? undefined,
        milkProduction: livestock?.milkProduction?.toString() ?? undefined,
        motherTag: livestock?.motherTag ?? undefined,
        offspringTags: livestock?.offspringTags ?? undefined,
        weight: livestock?.weight?.toString() ?? undefined,
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      form.reset({
        livestockTag: data?.livestockTag ?? "",
        livestock: {
          birthDate: livestock?.birthDate ?? undefined,
          breed: livestock?.breed ?? undefined,
          fatherTag: livestock?.fatherTag ?? undefined,
          gender: livestock?.gender as LivestockGender,
          livestockType: livestock?.livestockType as LivestockType,
          meatGrade: livestock?.meatGrade ?? undefined,
          milkProduction: livestock?.milkProduction?.toString() ?? undefined,
          motherTag: livestock?.motherTag ?? undefined,
          offspringTags: livestock?.offspringTags ?? undefined,
          weight: livestock?.weight?.toString() ?? undefined,
        },
      });
    }
  }, [isModalOpen, data]);

  const onSubmit = async (values: z.infer<typeof livestockSchema>) => {
    console.log("Updating livestock:", values);
    try {
      await updateLivestock({
        variables: {
          livestockTag: values.livestockTag,
          livestock: {
            birthDate: values.livestock.birthDate,
            breed: values.livestock.breed,
            fatherTag: values.livestock.fatherTag,
            gender: values.livestock.gender,
            livestockType: values.livestock.livestockType as LivestockType,
            meatGrade: values.livestock.meatGrade,
            milkProduction: values.livestock.milkProduction
              ? parseFloat(values.livestock.milkProduction)
              : undefined,
            motherTag: values.livestock.motherTag,
            offspringTags: values.livestock.offspringTags
              ? values.livestock.offspringTags
                  .split(",")
                  .map((tag) => tag.trim())
              : undefined,
            weight: parseFloat(values.livestock.weight),
          },
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Livestock updated successfully",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating livestock: ${error}`,
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
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Update Livestock</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="livestockTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Livestock Tag</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="livestock.birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="livestock.weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 150" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="livestock.breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Friesian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="livestock.gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Male or Female" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="livestock.livestockType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Livestock Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cow, Goat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="livestock.fatherTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father Tag</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="livestock.motherTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother Tag</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="livestock.offspringTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offspring Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Comma-separated (e.g. LT01,LT02)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="livestock.meatGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meat Grade</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="livestock.milkProduction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Milk Production</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 10L/day" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

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

export default UpdateLivestockModal;
