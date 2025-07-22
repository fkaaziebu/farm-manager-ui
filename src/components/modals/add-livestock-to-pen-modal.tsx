"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import {
  Calendar,
  Scale,
  Home,
  Building,
  Shuffle,
  ChevronLeft,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
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

// Function to generate random tag number
const generateTagNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length)),
  ).join("");

  const randomDigits = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  return `${randomLetters}_${randomDigits}`;
};

// Validation schema for a single livestock
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

// Form schema for stepper
const formSchema = z.object({
  barnId: z.string().min(1, { message: "Please select a barn" }),
  penUnitId: z.string().min(1, { message: "Please select a pen" }),
  livestock: z
    .array(livestockSchema)
    .min(1, { message: "At least one animal is required" }),
});

// Stepper steps
const STEPS = {
  SELECT_BARN: 0,
  SELECT_PEN: 1,
  ADD_LIVESTOCK: 2,
} as const;

export const AddLivestockToPenModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { addLivestockToPen, loading } = useAddLivestockToPen();

  // Get farm data from modal data
  const farmTag = data?.farmTag || "";
  const allBarns = data?.barns || [];
  // Filter barns that have pens
  const barns = allBarns.filter((barn) => barn.pens && barn.pens.length > 0);
  const defaultBarnUnitId = data?.barnUnitId || "";
  const defaultPenId = data?.penUnitId || "";

  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(STEPS.SELECT_BARN);
  const [animalCount, setAnimalCount] = useState(1);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [selectedBarnUnitId, setSelectedBarnUnitId] =
    useState(defaultBarnUnitId);
  const [barnSearchTerm, setBarnSearchTerm] = useState("");
  const [penSearchTerm, setPenSearchTerm] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barnId: defaultBarnUnitId,
      penUnitId: defaultPenId,
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

  // Reset stepper and form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(STEPS.SELECT_BARN);
      setAnimalCount(1);
      setCurrentAnimalIndex(0);
      setBarnSearchTerm("");
      setPenSearchTerm("");
      if (defaultBarnUnitId) {
        form.setValue("barnId", defaultBarnUnitId);
        setSelectedBarnUnitId(defaultBarnUnitId);
        setCurrentStep(STEPS.SELECT_PEN);
      }
      if (defaultPenId) {
        form.setValue("penUnitId", defaultPenId);
        setCurrentStep(STEPS.ADD_LIVESTOCK);
      }
    }
  }, [isOpen, defaultBarnUnitId, defaultPenId, form]);

  const isModalOpen = isOpen && type === "add-livestock-to-pen";

  // Get available pens based on selected barn
  const selectedBarn = barns.find((barn) => barn.id === selectedBarnUnitId);
  const availablePens = selectedBarn?.pens || [];

  // Filter barns based on search term
  const filteredBarns = barns.filter((barn) =>
    barn.name.toLowerCase().includes(barnSearchTerm.toLowerCase()),
  );

  // Filter pens based on search term
  const filteredPens = availablePens.filter((pen) =>
    pen.name.toLowerCase().includes(penSearchTerm.toLowerCase()),
  );

  // Handle barn selection
  const handleBarnSelect = (barnId: string) => {
    setSelectedBarnUnitId(barnId);
    form.setValue("barnId", barnId);
    form.setValue("penUnitId", "");
    setCurrentStep(STEPS.SELECT_PEN);
  };

  // Handle pen selection
  const handlePenSelect = (penId: string) => {
    form.setValue("penUnitId", penId);
    setPenSearchTerm("");
    setCurrentStep(STEPS.ADD_LIVESTOCK);
  };

  // Update form when animal count changes
  const updateAnimalCount = (newCount: number) => {
    const currentLivestock = form.getValues("livestock");
    const baseAnimal = currentLivestock[0] || {
      livestockType: LivestockType.Cattle,
      breed: "",
      gender: LivestockGender.Male,
      livestockTag: "",
      birthDate: null,
      weight: null,
    };

    if (newCount > currentLivestock.length) {
      // Add new animals
      const newAnimals = Array.from(
        { length: newCount - currentLivestock.length },
        () => ({
          ...baseAnimal,
          livestockTag: generateTagNumber(),
        }),
      );
      form.setValue("livestock", [...currentLivestock, ...newAnimals]);
    } else if (newCount < currentLivestock.length) {
      // Remove animals
      form.setValue("livestock", currentLivestock.slice(0, newCount));
      // Adjust current index if needed
      if (currentAnimalIndex >= newCount) {
        setCurrentAnimalIndex(Math.max(0, newCount - 1));
      }
    }

    setAnimalCount(newCount);
  };

  // Navigation functions for animals
  const goToNextAnimal = () => {
    if (currentAnimalIndex < animalCount - 1) {
      setCurrentAnimalIndex(currentAnimalIndex + 1);
    }
  };

  const goToPrevAnimal = () => {
    if (currentAnimalIndex > 0) {
      setCurrentAnimalIndex(currentAnimalIndex - 1);
    }
  };

  const goToAnimal = (index: number) => {
    setCurrentAnimalIndex(index);
  };

  // Get step status
  const getStepStatus = (step: number) => {
    if (currentStep > step) return "completed";
    if (currentStep === step) return "current";
    return "upcoming";
  };

  // Get selected barn and pen names for display
  const selectedPen = availablePens.find(
    (pen) => pen.unit_id === form.watch("penUnitId"),
  );
  const selectedBarnName = selectedBarn?.name || null;
  const selectedPenName = selectedPen?.name || null;

  // Generate unique tags for all animals
  const generateAllTags = () => {
    const currentLivestock = form.getValues("livestock");
    const updatedLivestock = currentLivestock.map((animal) => ({
      ...animal,
      livestockTag: generateTagNumber(),
    }));
    form.setValue("livestock", updatedLivestock);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting form data:", data);

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

      // Reset form and stepper
      form.reset({
        barnId: "",
        penUnitId: "",
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
      setCurrentAnimalIndex(0);
      setSelectedBarnUnitId("");
      setCurrentStep(STEPS.SELECT_BARN);

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: `Livestock added successfully to ${selectedPenName} in ${selectedBarnName}!`,
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

  // Handle case when there are no barns with pens
  const handleAddPens = () => {
    onClose();
    onOpen("add-pens-to-barn", { farmTag });
  };

  // Check if we have any barns with pens
  const hasBarnsWithPens = barns.length > 0;

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
              {/* Header */}
              <div className="bg-green-50 p-4 border-b border-green-200">
                <div className="text-xl font-semibold text-green-800">
                  Add Livestock to Farm
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Follow the 3-step process to add animals to your farm.
                </div>
              </div>

              {/* Stepper Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  {/* Step 1: Select Barn */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        getStepStatus(STEPS.SELECT_BARN) === "completed"
                          ? "bg-green-600 text-white"
                          : getStepStatus(STEPS.SELECT_BARN) === "current"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {getStepStatus(STEPS.SELECT_BARN) === "completed" ? (
                        <Check size={16} />
                      ) : (
                        "1"
                      )}
                    </div>
                    <div className="ml-3">
                      <div
                        className={`text-sm font-medium ${
                          getStepStatus(STEPS.SELECT_BARN) === "current"
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        Select Barn
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      getStepStatus(STEPS.SELECT_PEN) !== "upcoming"
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  {/* Step 2: Select Pen */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        getStepStatus(STEPS.SELECT_PEN) === "completed"
                          ? "bg-green-600 text-white"
                          : getStepStatus(STEPS.SELECT_PEN) === "current"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {getStepStatus(STEPS.SELECT_PEN) === "completed" ? (
                        <Check size={16} />
                      ) : (
                        "2"
                      )}
                    </div>
                    <div className="ml-3">
                      <div
                        className={`text-sm font-medium ${
                          getStepStatus(STEPS.SELECT_PEN) === "current"
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        Choose Pen
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      getStepStatus(STEPS.ADD_LIVESTOCK) !== "upcoming"
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  {/* Step 3: Add Livestock */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        getStepStatus(STEPS.ADD_LIVESTOCK) === "completed"
                          ? "bg-green-600 text-white"
                          : getStepStatus(STEPS.ADD_LIVESTOCK) === "current"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {getStepStatus(STEPS.ADD_LIVESTOCK) === "completed" ? (
                        <Check size={16} />
                      ) : (
                        "3"
                      )}
                    </div>
                    <div className="ml-3">
                      <div
                        className={`text-sm font-medium ${
                          getStepStatus(STEPS.ADD_LIVESTOCK) === "current"
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        Add Animals
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* No barns with pens available state */}
                {!hasBarnsWithPens ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Barns with Pens Available
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                      You need barns with pens before adding livestock. Please
                      create pens in your barns first.
                    </p>
                    <div className="space-y-3">
                      <Button
                        onClick={handleAddPens}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Add Pens to Barns
                      </Button>
                      <div>
                        <Button variant="outline" onClick={() => onClose()}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Step 1: Barn Selection */}
                    {currentStep === STEPS.SELECT_BARN && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Select a Barn
                          </h3>
                          <p className="text-gray-600">
                            Choose the barn where you want to add livestock
                          </p>
                        </div>

                        {/* Search Box */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="Search barns..."
                            value={barnSearchTerm}
                            onChange={(e) => setBarnSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Barn Count */}
                        <div className="text-center">
                          <span className="text-sm text-gray-500">
                            {filteredBarns.length} of {barns.length} barn
                            {barns.length !== 1 ? "s" : ""} shown
                          </span>
                        </div>

                        {/* Barns List */}
                        <div className="max-h-80 overflow-y-auto">
                          {filteredBarns.length === 0 ? (
                            <div className="text-center py-8">
                              <Building className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                              <p className="text-gray-500">No barns found</p>
                              <p className="text-sm text-gray-400 mt-1">
                                Try adjusting your search term
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {filteredBarns.map((barn) => (
                                <button
                                  key={barn.id}
                                  onClick={() => handleBarnSelect(barn.id)}
                                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center min-w-0 flex-1">
                                      <div className="flex-shrink-0">
                                        <Building className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                                      </div>
                                      <div className="ml-3 min-w-0 flex-1">
                                        <div className="font-medium text-gray-900 group-hover:text-blue-900 truncate">
                                          {barn.name}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          {barn.pens?.length || 0} pen
                                          {(barn.pens?.length || 0) !== 1
                                            ? "s"
                                            : ""}{" "}
                                          available
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                      <svg
                                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Pen Selection */}
                    {currentStep === STEPS.SELECT_PEN && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Choose a Pen
                          </h3>
                          <p className="text-gray-600">
                            Select a pen in{" "}
                            <span className="font-medium">
                              {selectedBarn?.name}
                            </span>
                          </p>
                        </div>

                        {/* Search Box */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="Search pens..."
                            value={penSearchTerm}
                            onChange={(e) => setPenSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>

                        {/* Pen Count */}
                        <div className="text-center">
                          <span className="text-sm text-gray-500">
                            {filteredPens.length} of {availablePens.length} pen
                            {availablePens.length !== 1 ? "s" : ""} shown
                          </span>
                        </div>

                        {/* Pens List */}
                        <div className="max-h-80 overflow-y-auto">
                          {filteredPens.length === 0 ? (
                            <div className="text-center py-8">
                              <Home className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                              <p className="text-gray-500">No pens found</p>
                              <p className="text-sm text-gray-400 mt-1">
                                Try adjusting your search term
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {filteredPens.map((pen) => (
                                <button
                                  key={pen.unit_id}
                                  onClick={() => handlePenSelect(pen.unit_id)}
                                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center min-w-0 flex-1">
                                      <div className="flex-shrink-0">
                                        <Home className="w-5 h-5 text-gray-500 group-hover:text-green-600" />
                                      </div>
                                      <div className="ml-3 min-w-0 flex-1">
                                        <div className="font-medium text-gray-900 group-hover:text-green-900 truncate">
                                          {pen.name}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          ID: {pen.unit_id}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                      <svg
                                        className="w-4 h-4 text-gray-400 group-hover:text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center mt-6">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep(STEPS.SELECT_BARN)}
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Barn Selection
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Add Livestock */}
                    {currentStep === STEPS.ADD_LIVESTOCK && (
                      <Form {...form}>
                        <div className="space-y-6">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Add Your Animals
                            </h3>
                            <p className="text-gray-600">
                              Adding to{" "}
                              <span className="font-medium">
                                {selectedPenName}
                              </span>{" "}
                              in{" "}
                              <span className="font-medium">
                                {selectedBarnName}
                              </span>
                            </p>
                          </div>

                          {/* Animal Count Control */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">
                                Number of Animals
                              </label>
                              <div className="flex items-center space-x-3">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    animalCount > 1 &&
                                    updateAnimalCount(animalCount - 1)
                                  }
                                  disabled={animalCount <= 1}
                                  className="w-8 h-8 p-0"
                                >
                                  -
                                </Button>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 min-w-[60px] justify-center">
                                  {animalCount}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateAnimalCount(animalCount + 1)
                                  }
                                  className="w-8 h-8 p-0"
                                >
                                  +
                                </Button>
                              </div>
                            </div>

                            {/* Animal Navigation */}
                            {animalCount > 1 && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm font-medium text-gray-700">
                                    Editing Animal {currentAnimalIndex + 1} of{" "}
                                    {animalCount}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={goToPrevAnimal}
                                      disabled={currentAnimalIndex === 0}
                                      className="px-2 py-1"
                                    >
                                      <ArrowLeft className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={goToNextAnimal}
                                      disabled={
                                        currentAnimalIndex === animalCount - 1
                                      }
                                      className="px-2 py-1"
                                    >
                                      <ArrowRight className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Animal indicators */}
                                <div className="flex items-center justify-center space-x-1">
                                  {Array.from(
                                    { length: animalCount },
                                    (_, index) => (
                                      <button
                                        key={index}
                                        type="button"
                                        onClick={() => goToAnimal(index)}
                                        className={`w-6 h-6 rounded-full text-xs font-medium transition-colors ${
                                          index === currentAnimalIndex
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                        }`}
                                      >
                                        {index + 1}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="mt-4">
                              <p className="text-xs text-gray-500">
                                Add multiple animals and edit each one
                                individually
                              </p>
                            </div>
                          </div>

                          {/* Individual Animal Form */}
                          <div className="border border-gray-200 rounded-lg p-4 bg-white">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium text-gray-700 flex items-center">
                                Animal {currentAnimalIndex + 1} Details
                              </h4>
                              {animalCount > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={generateAllTags}
                                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                                >
                                  <Shuffle className="h-3 w-3 mr-1" />
                                  Generate All Tags
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`livestock.${currentAnimalIndex}.livestockType`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Type{" "}
                                      <span className="text-red-500">*</span>
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
                                        <SelectItem
                                          value={LivestockType.Cattle}
                                        >
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
                                name={`livestock.${currentAnimalIndex}.breed`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Breed{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    {form.watch(
                                      `livestock.${currentAnimalIndex}.livestockType`,
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
                                            <SelectItem
                                              key={breed}
                                              value={breed}
                                            >
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

                              <FormField
                                control={form.control}
                                name={`livestock.${currentAnimalIndex}.gender`}
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
                                name={`livestock.${currentAnimalIndex}.livestockTag`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Tag Number{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <div className="flex space-x-2">
                                      <FormControl>
                                        <Input
                                          placeholder="e.g. ABC_12345"
                                          {...field}
                                        />
                                      </FormControl>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                          const newTag = generateTagNumber();
                                          field.onChange(newTag);
                                        }}
                                        className="flex-shrink-0"
                                        title="Auto-generate tag number"
                                      >
                                        <Shuffle className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`livestock.${currentAnimalIndex}.birthDate`}
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
                                name={`livestock.${currentAnimalIndex}.weight`}
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
                                          field.value === null
                                            ? ""
                                            : field.value
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

                          <div className="flex justify-center">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentStep(STEPS.SELECT_PEN)}
                            >
                              <ChevronLeft className="w-4 h-4 mr-2" />
                              Back to Pen Selection
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </>
                )}
              </div>

              {/* Footer - only show when on livestock step and has barns with pens */}
              {hasBarnsWithPens && currentStep === STEPS.ADD_LIVESTOCK && (
                <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={loading}
                  >
                    {loading
                      ? "Adding..."
                      : `Add ${animalCount} ${animalCount === 1 ? "Animal" : "Animals"}`}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddLivestockToPenModal;
