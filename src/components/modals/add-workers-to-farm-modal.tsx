"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Trash2, UserPlus, Users } from "lucide-react";
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
        currentWorkers.filter((_, i) => i !== index),
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
              <div className="bg-blue-50 p-4 border-b border-blue-200">
                <div className="text-xl font-semibold text-blue-800">
                  Manage Workers for {farmName}
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  Add new workers or assign existing ones to your farm.
                </div>
              </div>

              <Tabs
                defaultValue="create"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="border-b px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create" className="text-sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create New Workers
                    </TabsTrigger>
                    <TabsTrigger value="assign" className="text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Assign Existing Workers
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <TabsContent value="create" className="mt-0">
                    <Form {...createForm}>
                      <form
                        id="create-workers-form"
                        onSubmit={createForm.handleSubmit(onCreateSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={createForm.control}
                          name="farmTag"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Farm ID</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Farm identifier"
                                  {...field}
                                  readOnly={!!farmTag}
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
                              Workers
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {workerCount}{" "}
                              {workerCount === 1 ? "worker" : "workers"}
                            </span>
                          </div>

                          {createForm.watch("workers").map((_, index) => (
                            <div
                              key={index}
                              className="p-4 border border-gray-200 rounded-md space-y-4 bg-gray-50"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-700">
                                  Worker {index + 1}
                                </h4>
                                {createForm.watch("workers").length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeWorker(index)}
                                    className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">
                                      Remove worker
                                    </span>
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                  control={createForm.control}
                                  name={`workers.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Name{" "}
                                        <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g. John Doe"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={createForm.control}
                                  name={`workers.${index}.email`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Email{" "}
                                        <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="email"
                                          placeholder="e.g. john.doe@example.com"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={createForm.control}
                                name={`workers.${index}.roles`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Role{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {WorkerRoles.map((role) => (
                                          <SelectItem key={role} value={role}>
                                            {role.charAt(0) +
                                              role.slice(1).toLowerCase()}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
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
                        className="space-y-6"
                      >
                        <FormField
                          control={assignForm.control}
                          name="farmTag"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Farm ID</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Farm identifier"
                                  {...field}
                                  readOnly={!!farmTag}
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={assignForm.control}
                          name="workerTag"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Worker ID{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter worker identifier"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </TabsContent>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </Button>
                  {activeTab === "create" ? (
                    <Button
                      type="submit"
                      form="create-workers-form"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={assignLoading}
                    >
                      {assignLoading ? "Assigning..." : "Assign Worker"}
                    </Button>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FarmWorkersModal;
