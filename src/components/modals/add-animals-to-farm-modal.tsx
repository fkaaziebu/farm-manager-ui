"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Trash2, Calendar, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddLivestockToPen } from "@/hooks/mutations";
import { LivestockGender, LivestockType } from "@/graphql/generated/graphql";

// Define livestock types and gender options

const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

// Validation schema for a single livestock

const CattleBreeds = [
  "Holstein",
  "Jersey",
  "Angus",
  "Hereford",
  "Charolais",
  "Limousin",
  "Simmental",
  "Brahman",
  "Other",
];

const livestockSchema = z.object({
  livestockType: z.enum(
    [
      LivestockType.Cattle,
      LivestockType.Sheep,
      LivestockType.Goat,
      LivestockType.Pig,
      LivestockType.Other,
      LivestockType.Grasscutter,
    ],
    {
      errorMap: () => ({ message: "Livestock type is required" }),
    },
  ),
  breed: z.string().min(1, { message: "Breed is required" }),
  gender: z.enum([Gender.MALE, Gender.FEMALE], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  livestockTag: z.string().min(1, { message: "Tag number is required" }),
  birthDate: z.string().optional().nullable(),
  weight: z.coerce
    .number()
    .positive({ message: "Weight must be positive" })
    .optional()
    .nullable(),
});

// Form schema
const formSchema = z.object({
  penUnitId: z.string().min(1, { message: "Pen ID is required" }),
  livestock: z
    .array(livestockSchema)
    .min(1, { message: "At least one animal is required" }),
});

export const AddLivestockModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { addLivestockToPen, loading } = useAddLivestockToPen();

  const penUnitId = data?.penUnitId || "";
  const penName = data?.penName || "pen";
  const [animalCount, setAnimalCount] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      penUnitId: penUnitId,
      livestock: [
        {
          livestockType: LivestockType.Cattle,
          breed: "",
          gender: LivestockGender.Male,
          livestockTag: "",
          birthDate: null,
          weight: null,
        },
      ],
    },
  });

  // Update form when penUnitId changes
  useEffect(() => {
    if (isOpen && penUnitId) {
      form.setValue("penUnitId", penUnitId);
    }
  }, [isOpen, penUnitId, form]);

  const isModalOpen = isOpen && type === "add-livestock-to-pen";

  // Helper to add a new animal to the form
  const addAnimal = () => {
    const currentAnimals = form.getValues("livestock");
    form.setValue("livestock", [
      ...currentAnimals,
      {
        livestockType: LivestockType.Cattle,
        breed: "",
        gender: LivestockGender.Male,
        livestockTag: "",
        birthDate: null,
        weight: null,
      },
    ]);
    setAnimalCount(animalCount + 1);
  };

  // Helper to remove an animal from the form
  const removeAnimal = (index: number) => {
    const currentAnimals = form.getValues("livestock");
    if (currentAnimals.length > 1) {
      form.setValue(
        "livestock",
        currentAnimals.filter((_, i) => i !== index),
      );
      setAnimalCount(animalCount - 1);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting form data:", data);

      // Format the data for the API
      const formattedLivestock = data.livestock.map((animal) => ({
        livestockType: animal.livestockType,
        breed: animal.breed,
        gender: animal.gender as LivestockGender,
        livestockTag: animal.livestockTag,
        birthDate: animal.birthDate || null,
        weight: animal.weight ?? 0,
      }));

      await addLivestockToPen({
        variables: {
          penUnitId: data.penUnitId,
          livestock: formattedLivestock,
        },
      });

      // Reset form
      form.reset({
        penUnitId: penUnitId,
        livestock: [
          {
            livestockType: LivestockType.Cattle,
            breed: "",
            gender: LivestockGender.Male,
            livestockTag: "",
            birthDate: null,
            weight: null,
          },
        ],
      });
      setAnimalCount(1);

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: `Livestock added successfully!`,
        addLivestockToPenEvent: `${Math.random()}`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error adding livestock: ${error}`,
      });
      console.error("Error adding livestock:", error);
    }
  }

  useEffect(() => {
    if (isModalOpen && penUnitId) {
      form.setValue("penUnitId", penUnitId);
    }
  }, [isModalOpen, penUnitId, form]);

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
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-green-50 p-4 border-b border-green-200">
                <div className="text-xl font-semibold text-green-800">
                  Add Livestock to {penName}
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Add one or more animals to your pen. You can add multiple
                  animals at once.
                </div>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <Form {...form}>
                  <form
                    id="livestock-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="penUnitId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pen unit</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Farm identifier"
                              {...field}
                              readOnly={!!penUnitId}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700">
                          Animals
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {animalCount}{" "}
                          {animalCount === 1 ? "animal" : "animals"}
                        </span>
                      </div>

                      {form.watch("livestock").map((_, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-md space-y-4 bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700">
                              Animal {index + 1}
                            </h4>
                            {form.watch("livestock").length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAnimal(index)}
                                className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove animal</span>
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`livestock.${index}.livestockType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Type <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value={LivestockType.Cattle}>
                                        Cattle
                                      </SelectItem>
                                      <SelectItem value={LivestockType.Sheep}>
                                        Sheep
                                      </SelectItem>
                                      <SelectItem value={LivestockType.Goat}>
                                        Goat
                                      </SelectItem>
                                      <SelectItem value={LivestockType.Pig}>
                                        Pig
                                      </SelectItem>
                                      <SelectItem
                                        value={LivestockType.Grasscutter}
                                      >
                                        Grasscutter
                                      </SelectItem>

                                      <SelectItem value={LivestockType.Other}>
                                        Other
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`livestock.${index}.breed`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Breed{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  {form.watch(
                                    `livestock.${index}.livestockType`,
                                  ) === LivestockType.Cattle ? (
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value || ""}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select breed" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {CattleBreeds.map((breed) => (
                                          <SelectItem key={breed} value={breed}>
                                            {breed}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <FormControl>
                                      <Input
                                        placeholder="e.g. Holstein"
                                        {...field}
                                      />
                                    </FormControl>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`livestock.${index}.gender`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Gender{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value={Gender.MALE}>
                                        Male
                                      </SelectItem>
                                      <SelectItem value={Gender.FEMALE}>
                                        Female
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`livestock.${index}.livestockTag`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Tag Number{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. A12345"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`livestock.${index}.birthDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    Birth Date
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="date"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`livestock.${index}.weight`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    <Scale className="h-3.5 w-3.5 mr-1" />
                                    Weight (lbs)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Weight in pounds"
                                      {...field}
                                      value={
                                        field.value === null ? "" : field.value
                                      }
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ""
                                            ? null
                                            : Number(e.target.value);
                                        field.onChange(value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={addAnimal}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Animal
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
                  form="livestock-form"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading
                    ? "Adding..."
                    : `Add ${animalCount} ${
                        animalCount === 1 ? "Animal" : "Animals"
                      }`}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddLivestockModal;
