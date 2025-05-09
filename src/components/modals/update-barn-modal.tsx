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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useUpdateBarn } from "@/hooks/mutations";
import { HousingStatus } from "@/graphql/generated/graphql";

const barnSchema = z.object({
  barnUnitId: z.string().min(1, "Barn ID is required"),
  barn: z.object({
    name: z.string().min(1, "Barn name is required"),
    areaSqm: z.string().min(1, "Area is required"),
    buildingMaterial: z.string().min(1, "Building material is required"),
    capacity: z.string().min(1, "Capacity is required"),
    climateControlled: z.boolean(),
    constructionDate: z.string().min(1, "Construction date is required"),
    status: z.enum([
      HousingStatus.Operational,
      HousingStatus.Maintenance,
      HousingStatus.Empty,
      HousingStatus.Full,
    ]),
    ventilationType: z.string().min(1, "Ventilation type is required"),
  }),
});

export const UpdateBarnModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-barn";
  const barn: {
    barnName?: string;
    areaSqm?: string;
    buildingMaterial?: string;
    capacity?: string;
    climateControlled?: boolean;
    constructionDate?: string;
    status?: HousingStatus;
    ventilationType?: string;
  } = {
    barnName: data?.barn?.name,
    areaSqm: data?.barn?.area_sqm.toString(),
    buildingMaterial: data?.barn?.building_material ?? "",
    capacity: data?.barn?.capacity.toString(),
    climateControlled: data?.barn?.climate_controlled,
    constructionDate: data?.barn?.construction_date,
    status: data?.barn?.status as HousingStatus,
    ventilationType: data?.barn?.ventilation_type ?? "",
  };

  const { updateBarn } = useUpdateBarn();

  const form = useForm<z.infer<typeof barnSchema>>({
    resolver: zodResolver(barnSchema),
    defaultValues: {
      barnUnitId: data?.barnUnitId ?? "",
      barn: {
        name: barn?.barnName ?? "",
        areaSqm: barn?.areaSqm ?? "",
        buildingMaterial: barn?.buildingMaterial ?? "",
        capacity: barn?.capacity ?? "",
        climateControlled: barn?.climateControlled ?? false,
        constructionDate: barn?.constructionDate ?? "",
        status: barn?.status ?? HousingStatus.Operational,
        ventilationType: barn?.ventilationType ?? "",
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      form.reset({
        barnUnitId: data.barnUnitId ?? "",
        barn: {
          name: barn?.barnName ?? "",
          areaSqm: barn?.areaSqm ?? "",
          buildingMaterial: barn?.buildingMaterial ?? "",
          capacity: barn?.capacity ?? "",
          climateControlled: barn?.climateControlled ?? false,
          constructionDate: barn?.constructionDate ?? "",
          status: barn?.status ?? HousingStatus.Operational,
          ventilationType: barn?.ventilationType ?? "",
        },
      });
    }
  }, [isModalOpen, data]);

  const onSubmit = async (values: z.infer<typeof barnSchema>) => {
    console.log("Updating barn:", values);
    try {
      await updateBarn({
        variables: {
          barnUnitId: values.barnUnitId,
          barn: {
            name: values.barn.name,
            areaSqm: parseFloat(values.barn.areaSqm),
            buildingMaterial: values.barn.buildingMaterial,
            capacity: parseInt(values.barn.capacity),
            climateControlled: values.barn.climateControlled,
            constructionDate: values.barn.constructionDate,
            status: values.barn.status as HousingStatus,
            ventilationType: values.barn.ventilationType,
          },
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Barn updated successfully",
      });
    } catch (error) {
      console.error("Error updating barn:", error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating barn: ${error}`,
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
            <h2 className="text-lg font-semibold mb-4">Update Barn</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="barnUnitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barn Unit ID</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barn.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Barn Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="barn.areaSqm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area (sqm)</FormLabel>
                        <FormControl>
                          <Input placeholder="Area in sqm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barn.capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 150 animals" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="barn.buildingMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Material</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Concrete, Wood" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barn.ventilationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ventilation Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Natural, Mechanical"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barn.status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select barn status" />
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

                <FormField
                  control={form.control}
                  name="barn.constructionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Construction Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barn.climateControlled"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel>Climate Controlled</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
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

export default UpdateBarnModal;
