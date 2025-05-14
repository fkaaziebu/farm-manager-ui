"use client";
import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock data for event types
const EVENT_TYPES = [
  {
    id: "vaccination",
    name: "Vaccination",
    description: "Schedule routine vaccinations",
  },
  {
    id: "health_check",
    name: "Health Check",
    description: "Regular health examination",
  },
  {
    id: "weight_check",
    name: "Weight Check",
    description: "Monitor growth and weight",
  },
  {
    id: "medication",
    name: "Medication",
    description: "Administer medication",
  },
  {
    id: "deworming",
    name: "Deworming",
    description: "Routine deworming treatment",
  },
  {
    id: "pregnancy_check",
    name: "Pregnancy Check",
    description: "Confirm pregnancy status",
  },
];

// Mock data for animals
const ANIMALS = [
  { id: "a1", tag: "C001", type: "Cattle", breed: "Holstein", age: "2 years" },
  { id: "a2", tag: "C002", type: "Cattle", breed: "Angus", age: "3 years" },
  { id: "a3", tag: "P001", type: "Pig", breed: "Yorkshire", age: "1 year" },
  { id: "a4", tag: "P002", type: "Pig", breed: "Duroc", age: "8 months" },
  { id: "a5", tag: "S001", type: "Sheep", breed: "Merino", age: "1.5 years" },
];

// Define workers who can be assigned
const WORKERS = [
  { id: "w1", name: "Dr. Emily Davis", role: "Veterinarian" },
  { id: "w2", name: "John Smith", role: "Animal Caretaker" },
  { id: "w3", name: "Sarah Johnson", role: "Farm Manager" },
  { id: "w4", name: "Michael Brown", role: "Feed Specialist" },
];

const EventSchedulerDialog = ({ open }: { open: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    null
  );
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    date: "",
    notes: "",
    title: "",
  });
  const [animalFilter, setAnimalFilter] = useState("");
  const [animalTypeFilter, setAnimalTypeFilter] = useState("");
  console.log(open);
  // Reset form when dialog closes
  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setStep(1);
    setSelectedEventType(null);
    setSelectedAnimals([]);
    setSelectedWorker(null);
    setEventDetails({
      date: "",
      notes: "",
      title: "",
    });
    setAnimalFilter("");
    setAnimalTypeFilter("");
  };

  // Handle event type selection
  interface EventType {
    id: string;
    name: string;
    description: string;
  }

  interface Animal {
    id: string;
    tag: string;
    type: string;
    breed: string;
    age: string;
  }

  interface Worker {
    id: string;
    name: string;
    role: string;
  }

  interface EventDetails {
    date: string;
    notes: string;
    title: string;
  }

  const handleEventTypeSelect = (eventType: EventType) => {
    setSelectedEventType(eventType ?? null);
    setStep(2);
  };

  // Toggle animal selection
  const toggleAnimalSelection = (animal: Animal) => {
    if (selectedAnimals.some((a) => a.id === animal.id)) {
      setSelectedAnimals(selectedAnimals.filter((a) => a.id !== animal.id));
    } else {
      setSelectedAnimals([...selectedAnimals, animal]);
    }
  };

  // Filter animals based on search and type filter
  const filteredAnimals = ANIMALS.filter((animal) => {
    const matchesSearch =
      animal.tag.toLowerCase().includes(animalFilter.toLowerCase()) ||
      animal.breed.toLowerCase().includes(animalFilter.toLowerCase());
    const matchesType =
      animalTypeFilter === "" || animal.type === animalTypeFilter;
    return matchesSearch && matchesType;
  });

  // Handle form submission
  const handleSubmit = () => {
    // In a real application, this would submit to an API
    console.log({
      eventType: selectedEventType,
      animals: selectedAnimals,
      worker: selectedWorker,
      details: eventDetails,
    });

    // Close dialog and reset form
    setIsOpen(false);
    resetForm();

    // Show success message (mock)
    alert("Event scheduled successfully!");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Event
      </Button>

      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden rounded-lg">
          {/* Header changes based on current step */}
          <div
            className={`px-6 py-4 border-b ${
              selectedEventType
                ? `bg-${getEventColor(
                    selectedEventType.id
                  )}-50 border-${getEventColor(selectedEventType.id)}-100`
                : "bg-gray-50 border-gray-100"
            }`}
          >
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl font-semibold text-gray-800">
                {step === 1 && "Schedule Animal Event"}
                {step === 2 && "Select Animals"}
                {step === 3 && "Event Details"}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {step === 1 && "Choose the type of event you want to schedule"}
                {step === 2 && `Select animals for ${selectedEventType?.name}`}
                {step === 3 && "Fill in the details and assign a worker"}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Step indicator */}
          <div className="px-6 pt-4 flex">
            <div className="w-full flex items-center">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 1
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                1
              </div>
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step >= 2 ? "bg-green-200" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 2
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                2
              </div>
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step >= 3 ? "bg-green-200" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 3
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                3
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            {/* Step 1: Select Event Type */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {EVENT_TYPES.map((eventType) => (
                  <div
                    key={eventType.id}
                    onClick={() => handleEventTypeSelect(eventType)}
                    className={`p-4 border rounded-lg cursor-pointer hover:border-${getEventColor(
                      eventType.id
                    )}-300 hover:bg-${getEventColor(
                      eventType.id
                    )}-50 transition-colors`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full bg-${getEventColor(
                          eventType.id
                        )}-100 flex items-center justify-center`}
                      >
                        {getEventIcon(eventType.id)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800">
                          {eventType.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {eventType.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Select Animals */}
            {step === 2 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <div className="relative flex-1 max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by tag or breed"
                      value={animalFilter}
                      onChange={(e) => setAnimalFilter(e.target.value)}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={animalTypeFilter}
                      onChange={(e) => setAnimalTypeFilter(e.target.value)}
                      className="rounded-md border border-gray-300 py-2 text-sm pl-3 pr-10"
                    >
                      <option value="">All animals</option>
                      <option value="Cattle">Cattle</option>
                      <option value="Pig">Pigs</option>
                      <option value="Sheep">Sheep</option>
                    </select>
                  </div>
                </div>

                {selectedAnimals.length > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Selected: {selectedAnimals.length}
                      </span>
                      <button
                        onClick={() => setSelectedAnimals([])}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}

                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Select
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tag
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Breed
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Age
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAnimals.map((animal) => (
                        <tr
                          key={animal.id}
                          onClick={() => toggleAnimalSelection(animal)}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedAnimals.some((a) => a.id === animal.id)
                              ? "bg-green-50"
                              : ""
                          }`}
                        >
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedAnimals.some(
                                  (a) => a.id === animal.id
                                )}
                                onChange={() => {}}
                                className="h-4 w-4 text-green-600 border-gray-300 rounded"
                              />
                            </div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {animal.tag}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAnimalTypeBadgeColor(
                                animal.type
                              )}`}
                            >
                              {animal.type}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {animal.breed}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {animal.age}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredAnimals.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">
                      No animals match your search criteria
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Event Details and Worker Assignment */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="event-title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="event-title"
                    value={eventDetails.title}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        title: e.target.value,
                      })
                    }
                    placeholder={selectedEventType?.name || "Event title"}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    id="event-date"
                    value={eventDetails.date}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, date: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-worker"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assign To
                  </label>
                  <select
                    id="event-worker"
                    value={selectedWorker?.id || ""}
                    onChange={(e) => {
                      const worker = WORKERS.find(
                        (w) => w.id === e.target.value
                      );
                      setSelectedWorker(worker ?? null);
                    }}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                  >
                    <option value="">Select a worker</option>
                    {WORKERS.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name} ({worker.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="event-notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Notes
                  </label>
                  <textarea
                    id="event-notes"
                    value={eventDetails.notes}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Additional details about this event"
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Event Summary
                  </h4>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 text-sm">
                    <div className="sm:col-span-1">
                      <dt className="text-gray-500">Event Type</dt>
                      <dd className="font-medium text-gray-900">
                        {selectedEventType?.name}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-gray-500">Scheduled Date</dt>
                      <dd className="font-medium text-gray-900">
                        {eventDetails.date
                          ? new Date(eventDetails.date).toLocaleDateString()
                          : "Not set"}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-gray-500">Animals</dt>
                      <dd className="font-medium text-gray-900">
                        {selectedAnimals.length} selected
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-gray-500">Assigned To</dt>
                      <dd className="font-medium text-gray-900">
                        {selectedWorker?.name || "Not assigned"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-between sm:justify-end border-t border-gray-100">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="mr-2"
              >
                Back
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={
                  step === 1 ? !selectedEventType : selectedAnimals.length === 0
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!eventDetails.date || !selectedWorker}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Schedule Event
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Helper functions for UI colors and icons
const colorMap = {
  vaccination: "green",
  health_check: "blue",
  weight_check: "purple",
  medication: "yellow",
  deworming: "orange",
  pregnancy_check: "pink",
};

function getEventColor(eventTypeId: keyof typeof colorMap | string): string {
  return (colorMap as Record<string, string>)[eventTypeId] || "gray";
}

function getEventIcon(
  eventTypeId: keyof typeof colorMap | string
): React.ReactNode {
  const iconMap = {
    vaccination: (
      <svg
        className="h-5 w-5 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    health_check: (
      <svg
        className="h-5 w-5 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    weight_check: (
      <svg
        className="h-5 w-5 text-purple-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    medication: (
      <svg
        className="h-5 w-5 text-yellow-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    deworming: (
      <svg
        className="h-5 w-5 text-orange-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    pregnancy_check: (
      <svg
        className="h-5 w-5 text-pink-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
        />
      </svg>
    ),
  };
  return (
    (iconMap as Record<string, React.ReactNode>)[eventTypeId] || (
      <Calendar className="h-5 w-5 text-gray-600" />
    )
  );
}

function getAnimalTypeBadgeColor(animalType: string): string {
  const colorMap: Record<string, string> = {
    Cattle: "bg-green-100 text-green-800",
    Pig: "bg-blue-100 text-blue-800",
    Sheep: "bg-yellow-100 text-yellow-800",
  };
  return colorMap[animalType] || "bg-gray-100 text-gray-800";
}

export default EventSchedulerDialog;
