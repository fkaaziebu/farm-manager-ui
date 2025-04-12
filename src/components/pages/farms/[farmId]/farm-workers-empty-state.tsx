import React from "react";
import { Plus, UserPlus, Check, AlertCircle } from "lucide-react";
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
import { useCreateAndAddWorkerToFarm } from "@/hooks/mutations";
import * as z from "zod";
import { toast } from "sonner";
import { WorkerRole } from "@/graphql/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAndAddWorkerToFarmMutation } from "@/graphql/generated/graphql";

const workerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum([
      WorkerRole.FarmManager,
      WorkerRole.AnimalCaretaker,
      WorkerRole.FeedSpecialist,
      WorkerRole.Veterinarian,
    ])
    .refine((value) => !!value, {
      message: "Role is required",
    }),
});

type WorkerFormInput = NonNullable<
  CreateAndAddWorkerToFarmMutation["createAndAddWorkerToFarm"]
>;

const formSchema = z.object({
  workers: z.array(workerSchema).min(1, "At least one worker is required"),
});

const EmptyStateFarmWorkers = ({ farmId }: { farmId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [pendingWorkers, setPendingWorkers] = useState<WorkerFormInput[]>([]);

  const { createAndAddWorkerToFarm, loading } = useCreateAndAddWorkerToFarm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workers: [
        { email: "", name: "", password: "", role: WorkerRole.AnimalCaretaker },
      ],
    },
  });

  const [currentWorker, setCurrentWorker] = useState({
    email: "",
    name: "",
    password: "",
    role: WorkerRole.AnimalCaretaker,
  });

  // Helper function to get role display name
  const getRoleDisplayName = (role: WorkerRole) => {
    switch (role) {
      case WorkerRole.FarmManager:
        return "Farm Manager";
      case WorkerRole.AnimalCaretaker:
        return "Animal Caretaker";
      case WorkerRole.FeedSpecialist:
        return "Feed Specialist";
      case WorkerRole.Veterinarian:
        return "Veterinarian";
      default:
        return role;
    }
  };

  const updateCurrentWorker = (field, value) => {
    setCurrentWorker({
      ...currentWorker,
      [field]: value,
    });
  };

  const addWorkerToPending = () => {
    // Validate all fields are filled
    if (
      !currentWorker.email ||
      !currentWorker.name ||
      !currentWorker.password ||
      !currentWorker.role
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentWorker.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (currentWorker.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Add to pending workers
    setPendingWorkers([...pendingWorkers, { ...currentWorker }]);

    // Reset form
    setCurrentWorker({
      email: "",
      name: "",
      password: "",
      role: WorkerRole.AnimalCaretaker,
    });

    toast.success("Worker added to pending list");
  };

  const removeWorker = (index) => {
    const newWorkers = [...pendingWorkers];
    newWorkers.splice(index, 1);
    setPendingWorkers(newWorkers);
  };

  const handleFormSubmit = async () => {
    if (pendingWorkers.length === 0) {
      toast.error("No workers to add");
      return;
    }

    try {
      await createAndAddWorkerToFarm({
        variables: {
          farmId: farmId,
          workers: pendingWorkers,
        },
      });

      // Close both modals
      setIsReviewModalOpen(false);
      setIsModalOpen(false);

      // Clear pending workers
      setPendingWorkers([]);

      toast.success("Workers added successfully");
    } catch (error) {
      toast.error("Error adding workers");
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Farm Workers
        </h3>
      </div>
      <div className="p-3 sm:p-5">
        <div className="text-center py-10">
          <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No workers</h3>
          <p className="mt-1 text-sm text-gray-500 mb-6">
            Get started by adding your first farm worker
          </p>

          {/* Main Dialog for Adding Workers */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                <Plus className="mr-2 h-4 w-4" />
                Add workers to Farm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl bg-white shadow-xl border-0">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-semibold text-green-800">
                    Add new workers to the farm
                  </DialogTitle>
                  <DialogDescription className="text-green-700">
                    Add multiple workers one by one, then review and submit them
                    all together.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="px-6 py-4">
                <Form {...form}>
                  <div className="space-y-4">
                    {/* Worker count badge */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-800">
                        Add a Worker
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {pendingWorkers.length} worker
                        {pendingWorkers.length !== 1 ? "s" : ""} pending
                      </span>
                    </div>

                    {/* Email field */}
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            value={currentWorker.email || ""}
                            onChange={(e) =>
                              updateCurrentWorker("email", e.target.value)
                            }
                            className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            placeholder="worker@example.com"
                          />
                        </div>
                      </FormControl>
                    </FormItem>

                    {/* Name field */}
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={currentWorker.name || ""}
                            onChange={(e) =>
                              updateCurrentWorker("name", e.target.value)
                            }
                            className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </FormControl>
                    </FormItem>

                    {/* Password field */}
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="password"
                            value={currentWorker.password || ""}
                            onChange={(e) =>
                              updateCurrentWorker("password", e.target.value)
                            }
                            className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            placeholder="••••••••"
                          />
                        </div>
                      </FormControl>
                    </FormItem>

                    {/* Role field */}
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Role
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9zm8 0h-6v6h6V9z"
                                clipRule="evenodd"
                              />
                              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                            </svg>
                          </div>
                          <select
                            value={currentWorker.role || ""}
                            onChange={(e) =>
                              updateCurrentWorker("role", e.target.value)
                            }
                            className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none"
                          >
                            <option value="">Select a role</option>
                            <option value={WorkerRole.FarmManager}>
                              Farm Manager
                            </option>
                            <option value={WorkerRole.AnimalCaretaker}>
                              Animal Caretaker
                            </option>
                            <option value={WorkerRole.FeedSpecialist}>
                              Feed Specialist
                            </option>
                            <option value={WorkerRole.Veterinarian}>
                              Veterinarian
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

                    {/* Add worker button */}
                    <Button
                      type="button"
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                      onClick={addWorkerToPending}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add This Worker
                    </Button>
                  </div>
                </Form>

                {/* Show pending workers preview if any */}
                {pendingWorkers.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700">
                        Pending Workers
                      </h3>
                      <Button
                        type="button"
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                        onClick={() => setIsReviewModalOpen(true)}
                      >
                        Review All
                      </Button>
                    </div>

                    <div className="max-h-40 overflow-y-auto pr-2">
                      {pendingWorkers.map((worker, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 py-2 border-b border-gray-100 last:border-0"
                        >
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {worker.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {worker.email}
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
                  disabled={pendingWorkers.length === 0}
                >
                  {`Review & Submit (${pendingWorkers.length})`}
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
                    Review Workers
                  </DialogTitle>
                  <DialogDescription className="text-blue-700">
                    Review the workers you're about to add to the farm.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="px-6 py-4">
                {pendingWorkers.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      No workers added yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-700">
                        Total workers: {pendingWorkers.length}
                      </h3>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {pendingWorkers.map((worker, idx) => (
                        <div
                          key={idx}
                          className="p-3 mb-2 border border-gray-200 rounded-lg bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {worker.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {worker.email}
                              </p>
                              <div className="mt-1 flex items-center">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {getRoleDisplayName(worker.role)}
                                </span>
                              </div>
                            </div>
                            <Button
                              type="button"
                              className="group relative inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border border-red-200 text-red-600 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200 ease-in-out overflow-hidden"
                              onClick={() => removeWorker(index)}
                            >
                              <span className="relative z-10 mr-1.5">
                                Remove
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="relative z-10 h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="absolute inset-0 bg-red-100 opacity-20 group-hover:opacity-0 transition-opacity duration-200 ease-in-out"></span>
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
                  disabled={pendingWorkers.length === 0 || loading}
                >
                  {loading ? "Adding..." : "Add All Workers"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFarmWorkers;
