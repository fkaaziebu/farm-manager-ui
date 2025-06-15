"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Trash2, UserPlus, Users, X } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateAndAddWorkerToFarm,
  useAssignWorkersToFarm,
} from "@/hooks/mutations";
import { WorkerRole } from "@/graphql/generated/graphql";

// Roles options for workers
const WorkerRoles: WorkerRole[] = [
  WorkerRole.AnimalCaretaker,
  WorkerRole.CropSpecialist,
  WorkerRole.FarmManager,
  WorkerRole.FeedSpecialist,
  WorkerRole.GeneralWorker,
  WorkerRole.Maintenance,
  WorkerRole.Veterinarian,
];

// Validation schema for a single worker
const workerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  roles: z.string().min(1, { message: "Role is required" }),
});

// Form schema for creating workers
const createWorkersFormSchema = z.object({
  farmTag: z.string().min(1, { message: "Farm ID is required" }),
  workers: z
    .array(workerSchema)
    .min(1, { message: "At least one worker is required" }),
});

// Form schema for assigning existing workers
const assignWorkerFormSchema = z.object({
  farmTag: z.string().min(1, { message: "Farm ID is required" }),
  workerTag: z.string().min(1, { message: "Worker ID is required" }),
});

export const FarmWorkersModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { addWorkersToFarm, loading: createLoading } =
    useCreateAndAddWorkerToFarm();
  const { assignWorkersToFarm, loading: assignLoading } =
    useAssignWorkersToFarm();

  const farmTag = data?.farmTag || "";
  const farmName = data?.farmName || "farm";
  const [workerCount, setWorkerCount] = useState(1);
  const [activeTab, setActiveTab] = useState("create");

  // Form for creating workers
  const createForm = useForm<z.infer<typeof createWorkersFormSchema>>({
    resolver: zodResolver(createWorkersFormSchema),
    defaultValues: {
      farmTag: farmTag,
      workers: [
        {
          name: "",
          email: "",
          roles: "",
        },
      ],
    },
  });

  // Form for assigning existing workers
  const assignForm = useForm<z.infer<typeof assignWorkerFormSchema>>({
    resolver: zodResolver(assignWorkerFormSchema),
    defaultValues: {
      farmTag: farmTag,
      workerTag: "",
    },
  });

  // Update forms when farmTag changes
  useEffect(() => {
    if (isOpen && farmTag) {
      createForm.setValue("farmTag", farmTag);
      assignForm.setValue("farmTag", farmTag);
    }
  }, [isOpen, farmTag, createForm, assignForm]);

  const isModalOpen = isOpen && type === "add-workers-to-farm";

  // Helper to add a new worker to the form
  const addWorker = () => {
    const currentWorkers = createForm.getValues("workers");
    createForm.setValue("workers", [
      ...currentWorkers,
      {
        name: "",
        email: "",
        roles: "",
      },
    ]);
    setWorkerCount(workerCount + 1);
  };

  // Helper to remove a worker from the form
  const removeWorker = (index: number) => {
    const currentWorkers = createForm.getValues("workers");
    if (currentWorkers.length > 1) {
      createForm.setValue(
        "workers",
        currentWorkers.filter((_, i) => i !== index)
      );
      setWorkerCount(workerCount - 1);
    }
  };

  // Submit handler for creating workers
  async function onCreateSubmit(data: z.infer<typeof createWorkersFormSchema>) {
    try {
      console.log("Submitting create worker data:", data);

      // Format the data for the API
      const formattedWorkers = data.workers.map((worker) => ({
        name: worker.name,
        email: worker.email,
        roles: [worker.roles as WorkerRole], // Convert roles to an array and cast to WorkerRole
      }));

      await addWorkersToFarm({
        variables: {
          farmTag: data.farmTag,
          workers: formattedWorkers,
        },
      });

      // Reset form
      createForm.reset({
        farmTag: farmTag,
        workers: [
          {
            name: "",
            email: "",
            roles: "",
          },
        ],
      });
      setWorkerCount(1);

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Worker(s) added successfully!",
        addWorkersToFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error adding workers: ${error}`,
      });
      console.error("Error adding workers:", error);
    }
  }

  // Submit handler for assigning workers
  async function onAssignSubmit(data: z.infer<typeof assignWorkerFormSchema>) {
    try {
      console.log("Submitting assign worker data:", data);

      await assignWorkersToFarm({
        variables: {
          farmTag: data.farmTag,
          workerTags: data.workerTag,
        },
      });

      // Reset form
      assignForm.reset({
        farmTag: farmTag,
        workerTag: "",
      });

      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Worker(s) assigned successfully!",
        addWorkersToFarmEvent: `${Math.random()}`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error assigning worker: ${error}`,
      });
      console.error("Error assigning worker:", error);
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile-Optimized Header */}
            <div className="bg-blue-50 p-4 sm:p-6 border-b border-blue-200 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-800 pr-4">
                    Manage Workers for {farmName}
                  </h2>
                  <p className="text-sm text-blue-700 mt-1">
                    Add new workers or assign existing ones to your farm.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>

            {/* Mobile-Optimized Tabs */}
            <Tabs
              defaultValue="create"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="border-b px-4 sm:px-6 pt-2 sm:pt-4 flex-shrink-0">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger
                    value="create"
                    className="text-xs sm:text-sm py-2 px-2 sm:px-4 data-[state=active]:bg-blue-100"
                  >
                    <UserPlus className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Create New Workers</span>
                    <span className="sm:hidden">Create</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="assign"
                    className="text-xs sm:text-sm py-2 px-2 sm:px-4 data-[state=active]:bg-blue-100"
                  >
                    <Users className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      Assign Existing Workers
                    </span>
                    <span className="sm:hidden">Assign</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-4 sm:p-6">
                  <TabsContent value="create" className="mt-0">
                    <Form {...createForm}>
                      <form
                        id="create-workers-form"
                        onSubmit={createForm.handleSubmit(onCreateSubmit)}
                        className="space-y-4 sm:space-y-6"
                      >
                        <FormField
                          control={createForm.control}
                          name="farmTag"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Farm ID
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Farm identifier"
                                  {...field}
                                  readOnly={!!farmTag}
                                  value={field.value}
                                  className="text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-700">
                              Workers
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {workerCount}{" "}
                              {workerCount === 1 ? "worker" : "workers"}
                            </span>
                          </div>

                          <div className="space-y-4">
                            {createForm.watch("workers").map((_, index) => (
                              <div
                                key={index}
                                className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50"
                              >
                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                  <h4 className="text-sm font-medium text-gray-700">
                                    Worker {index + 1}
                                  </h4>
                                  {createForm.watch("workers").length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeWorker(index)}
                                      className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">
                                        Remove worker
                                      </span>
                                    </Button>
                                  )}
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                  {/* Mobile: Stack all fields vertically */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <FormField
                                      control={createForm.control}
                                      name={`workers.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm">
                                            Name{" "}
                                            <span className="text-red-500">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="e.g. John Doe"
                                              {...field}
                                              className="text-sm"
                                            />
                                          </FormControl>
                                          <FormMessage className="text-xs" />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={createForm.control}
                                      name={`workers.${index}.email`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm">
                                            Email{" "}
                                            <span className="text-red-500">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              type="email"
                                              placeholder="e.g. john.doe@example.com"
                                              {...field}
                                              className="text-sm"
                                            />
                                          </FormControl>
                                          <FormMessage className="text-xs" />
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  <FormField
                                    control={createForm.control}
                                    name={`workers.${index}.roles`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm">
                                          Role{" "}
                                          <span className="text-red-500">
                                            *
                                          </span>
                                        </FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="text-sm">
                                              <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {WorkerRoles.map((role) => (
                                              <SelectItem
                                                key={role}
                                                value={role}
                                                className="text-sm"
                                              >
                                                {role.charAt(0) +
                                                  role.slice(1).toLowerCase()}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            className="w-full text-sm"
                            onClick={addWorker}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Worker
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="assign" className="mt-0">
                    <Form {...assignForm}>
                      <form
                        id="assign-worker-form"
                        onSubmit={assignForm.handleSubmit(onAssignSubmit)}
                        className="space-y-4 sm:space-y-6"
                      >
                        <FormField
                          control={assignForm.control}
                          name="farmTag"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Farm ID
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Farm identifier"
                                  {...field}
                                  readOnly={!!farmTag}
                                  value={field.value}
                                  className="text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={assignForm.control}
                          name="workerTag"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Worker ID{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter worker identifier"
                                  {...field}
                                  className="text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Additional info for mobile users */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:hidden">
                          <p className="text-xs text-blue-700">
                            💡 Enter the unique identifier of an existing worker
                            to assign them to this farm.
                          </p>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onClose()}
                    className="w-full sm:w-auto text-sm order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  {activeTab === "create" ? (
                    <Button
                      type="submit"
                      form="create-workers-form"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm order-1 sm:order-2"
                      disabled={createLoading}
                    >
                      {createLoading
                        ? "Adding..."
                        : `Add ${workerCount} ${
                            workerCount === 1 ? "Worker" : "Workers"
                          }`}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      form="assign-worker-form"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm order-1 sm:order-2"
                      disabled={assignLoading}
                    >
                      {assignLoading ? "Assigning..." : "Assign Worker"}
                    </Button>
                  )}
                </div>
              </div>
            </Tabs>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FarmWorkersModal;
