import React, { useEffect } from "react";
import { Plus, PawPrint, Check, AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAnimalsToFarm } from "@/hooks/mutations";
import { useFetchFarms } from "@/hooks/queries";
import { Farm } from "@/graphql/generated/graphql";
// Gender enum for animal form
const AnimalGender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
};

type HouseProp = NonNullable<NonNullable<NonNullable<Farm>["houses"]>[number]>;

// Validation schema for a single animal
const animalSchema = z.object({
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum([AnimalGender.MALE, AnimalGender.FEMALE], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  tag_number: z.string().min(1, "Tag number is required"),
  birth_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Valid birth date is required",
  }),
});

// Validation schema for the entire form
const formSchema = z.object({
  farmId: z.string().min(1, "Farm ID is required"),
  houseNumber: z.string().min(1, "House number is required"),
  roomNumber: z.string().min(1, "Room number is required"),
  animals: z.array(animalSchema).min(1, "At least one animal is required"),
});

const EmptyStateFarmAnimals = ({ farmId }: { farmId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [pendingAnimals, setPendingAnimals] = useState<
    { breed: string; gender: string; tag_number: string; birth_date: string }[]
  >([]);
  const [houseNumber, setHouseNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const { addAnimalsToFarm, loading } = useAddAnimalsToFarm();
  const { farms, fetchFarms } = useFetchFarms();

  const [houses, setHouses] = useState<HouseProp[]>();

  const fetchHouses = async () => {
    await fetchFarms({
      filter: {
        id: {
          eq: Number(farmId),
        },
      },
    });
  };
  // Fetch houses when the component mounts

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    if (farms && farms.length > 0) {
      const selectedFarm = farms.find((farm) => farm.id === farmId);
      setHouses(selectedFarm?.houses ?? []);
    }
  }, [farms, farmId]);

  // Current animal being added
  const [currentAnimal, setCurrentAnimal] = useState<{
    breed: string;
    gender: string;
    tag_number: string;
    birth_date: string;
  }>({
    breed: "",
    gender: "",
    tag_number: "",
    birth_date: "",
  });

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  // Update current animal being added
  const updateCurrentAnimal = (field, value) => {
    setCurrentAnimal({
      ...currentAnimal,
      [field]: value,
    });
  };

  // Add animal to pending list
  const addAnimalToPending = () => {
    // Validate all fields are filled
    if (
      !currentAnimal.breed ||
      !currentAnimal.gender ||
      !currentAnimal.tag_number ||
      !currentAnimal.birth_date
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    // Validate birth date
    if (isNaN(Date.parse(currentAnimal.birth_date))) {
      toast.error("Please enter a valid birth date");
      return;
    }

    // Add to pending animals
    setPendingAnimals([...pendingAnimals, { ...currentAnimal }]);

    // Reset current animal form
    setCurrentAnimal({
      breed: "",
      gender: "",
      tag_number: "",
      birth_date: "",
    });

    toast.success("Animal added to pending list");
  };

  // Remove animal from pending list
  const removeAnimal = (index) => {
    const newAnimals = [...pendingAnimals];
    newAnimals.splice(index, 1);
    setPendingAnimals(newAnimals);
  };

  // Handle final submission
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmId,
      houseNumber: "",
      roomNumber: "",
      animals: [],
    },
  });

  const handleFormSubmit = async () => {
    // Validate farm details
    if (!houseNumber || !roomNumber) {
      toast.error("Please enter house and room numbers");
      return;
    }

    if (pendingAnimals.length === 0) {
      toast.error("No animals to add");
      return;
    }

    try {
      await addAnimalsToFarm({
        variables: {
          farmId,
          houseNumber,
          roomNumber,
          animals: pendingAnimals,
        },
      });
      toast.success("Animals added successfully");
      setPendingAnimals([]);
      setIsModalOpen(false);
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFarms({
      filter: {
        id: {
          eq: farmId,
        },
      },
    });
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Farm Animals
        </h3>
      </div>
      <div className="p-3 sm:p-5">
        <div className="text-center py-10">
          <PawPrint className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No animals</h3>
          <p className="mt-1 text-sm text-gray-500 mb-6">
            Start tracking your livestock by adding animals to your farm
          </p>

          {/* Main Dialog for Adding Animals */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                <Plus className="mr-2 h-4 w-4" />
                Add animals to Farm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl bg-white shadow-xl border-0">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-semibold text-green-800">
                    Add new animals to the farm
                  </DialogTitle>
                  <DialogDescription className="text-green-700">
                    Add multiple animals one by one, then review and submit them
                    all together.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="px-6 py-4">
                <Form {...form}>
                  <div className="space-y-4">
                    {/* Animal count badge */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-800">
                        Location Details
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {pendingAnimals.length} animal
                        {pendingAnimals.length !== 1 ? "s" : ""} pending
                      </span>
                    </div>

                    {/* House Number field */}
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Select House
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            value={houseNumber || ""}
                            onChange={(e) => setHouseNumber(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none"
                          >
                            <option value="">Select a house</option>
                            {houses?.map((house) => (
                              <option key={house.id} value={house.house_number}>
                                {house.house_number}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>

                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Select Room
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            value={roomNumber || ""}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none"
                            disabled={!houseNumber}
                          >
                            <option value="">Select a room</option>
                            {houses
                              ?.find(
                                (house) => house.house_number === houseNumber
                              )
                              ?.rooms?.map((room) => (
                                <option key={room.id} value={room.room_number}>
                                  {room.room_number}
                                </option>
                              ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Animal Details
                      </h3>

                      {/* Breed field */}
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Breed
                        </FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            value={currentAnimal.breed || ""}
                            onChange={(e) =>
                              updateCurrentAnimal("breed", e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            placeholder="e.g. Holstein"
                          />
                        </FormControl>
                      </FormItem>

                      {/* Gender field */}
                      <FormItem className="space-y-1.5 mt-3">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              value={currentAnimal.gender || ""}
                              onChange={(e) =>
                                updateCurrentAnimal("gender", e.target.value)
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none"
                            >
                              <option value="">Select gender</option>
                              <option value={AnimalGender.MALE}>Male</option>
                              <option value={AnimalGender.FEMALE}>
                                Female
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>

                      {/* Tag Number field */}
                      <FormItem className="space-y-1.5 mt-3">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Tag Number
                        </FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            value={currentAnimal.tag_number || ""}
                            onChange={(e) =>
                              updateCurrentAnimal("tag_number", e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            placeholder="e.g. A12345"
                          />
                        </FormControl>
                      </FormItem>

                      {/* Birth Date field */}
                      <FormItem className="space-y-1.5 mt-3">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Birth Date
                        </FormLabel>
                        <FormControl>
                          <input
                            type="date"
                            value={currentAnimal.birth_date || ""}
                            onChange={(e) =>
                              updateCurrentAnimal("birth_date", e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          />
                        </FormControl>
                      </FormItem>
                    </div>

                    {/* Add animal button */}
                    <Button
                      type="button"
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                      onClick={addAnimalToPending}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add This Animal
                    </Button>
                  </div>
                </Form>

                {/* Show pending animals preview if any */}
                {pendingAnimals.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700">
                        Pending Animals
                      </h3>
                      <Button
                        type="button"
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                        onClick={() => setIsReviewModalOpen(true)}
                      >
                        Review All
                      </Button>
                    </div>

                    <div className="max-h-10 overflow-y-auto pr-2">
                      {pendingAnimals.map((animal, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 py-2 border-b border-gray-100 last:border-0"
                        >
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {animal.breed}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              Tag: {animal.tag_number}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                  onClick={() => setIsReviewModalOpen(true)}
                  disabled={pendingAnimals.length === 0}
                >
                  {`Review & Submit (${pendingAnimals.length})`}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Review Modal */}
          <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl bg-white shadow-xl border-0">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-semibold text-blue-800">
                    Review Animals
                  </DialogTitle>
                  <DialogDescription className="text-blue-700">
                    Review the animals you're about to add to{" "}
                    {houseNumber ? houseNumber : "the farm"}.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="px-6 py-4">
                {pendingAnimals.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      No animals added yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">
                        Location: {houseNumber || "Not specified"} -{" "}
                        {roomNumber || "Not specified"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-700">
                        Total animals: {pendingAnimals.length}
                      </h3>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {pendingAnimals.map((animal, idx) => (
                        <div
                          key={idx}
                          className="p-3 mb-2 border border-gray-200 rounded-lg bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium text-gray-800">
                                  {animal.breed}
                                </p>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {animal.gender === AnimalGender.MALE
                                    ? "Male"
                                    : "Female"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                Tag: {animal.tag_number}
                              </p>
                              <p className="text-xs text-gray-500">
                                Birth Date: {formatDate(animal.birth_date)}
                              </p>
                            </div>
                            <Button
                              type="button"
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-red-700 hover:bg-red-50"
                              onClick={() => removeAnimal(idx)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                  onClick={handleFormSubmit}
                  disabled={
                    pendingAnimals.length === 0 ||
                    !houseNumber ||
                    !roomNumber ||
                    loading
                  }
                >
                  {loading ? "Adding..." : "Add All Animals"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFarmAnimals;
