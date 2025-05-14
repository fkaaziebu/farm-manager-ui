"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { ClipboardList, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//hooks
import { useCreateTask, useAssignTaskToWorker } from "@/hooks/mutations";
import { TaskStatus, TaskType } from "@/graphql/generated/graphql";
import { formatDate } from "../common";

// Form schemas
const createTaskFormSchema = z.object({
  farmTag: z.string().min(1, "Farm ID is required"),
  task: z.object({
    startingDate: z.string().min(1, "Start date required"),
    completionDate: z.string().min(1, "Completion date required"),
    type: z.enum([
      TaskType.Cleaning,
      TaskType.ElectricCheck,
      TaskType.Maintenance,
      TaskType.RegularInspection,
      TaskType.TrainingSession,
    ]),
    status: z.enum([
      TaskStatus.Pending,
      TaskStatus.InProgress,
      TaskStatus.Completed,
    ]),
    description: z.string().min(1, "Description required"),
    notes: z.string().optional(),
  }),
});

const assignTaskFormSchema = z.object({
  taskId: z.string().min(1, "Task ID required"),
  workerTag: z.string().min(1, "Worker ID required"),
});

export const TaskModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const farmTag = data?.farmTag || "";
  const [activeTab, setActiveTab] = useState("assign");
  const workers = data?.farmWorkers || [];
  const tasks = data?.taskList || [];

  //hooks
  const { createTask, loading: createLoading } = useCreateTask();
  const { assignTaskToWorker, loading: assignLoading } =
    useAssignTaskToWorker();

  const isModalOpen = isOpen && type === "task-modal";

  const createForm = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      farmTag: farmTag,
      task: {
        startingDate: "",
        completionDate: "",
        type: undefined,
        status: undefined,
        description: "",
        notes: "",
      },
    },
  });

  const assignForm = useForm<z.infer<typeof assignTaskFormSchema>>({
    resolver: zodResolver(assignTaskFormSchema),
    defaultValues: {
      taskId: "",
      workerTag: "",
    },
  });

  useEffect(() => {
    if (isModalOpen && farmTag) {
      createForm.setValue("farmTag", farmTag);
    }
  }, [isModalOpen, farmTag]);

  const onCreateSubmit = async (data: z.infer<typeof createTaskFormSchema>) => {
    console.log("Creating task:", data);
    await createTask({
      variables: {
        farmTag: data.farmTag,
        task: {
          startingDate: data.task.startingDate,
          completionDate: data.task.completionDate,
          type: data.task.type,
          status: data.task.status,
          description: data.task.description,
          notes: data.task.notes,
        },
      },
    });

    onClose();
    onOpen("notification", {
      notificationType: "success",
      notificationMessage: `Task created successfully!`,
    });
  };

  const onAssignSubmit = async (data: z.infer<typeof assignTaskFormSchema>) => {
    console.log("Assigning task:", data);
    await assignTaskToWorker({
      variables: {
        taskId: Number(data.taskId),
        workerTag: data.workerTag,
      },
    });
    onClose();
    onOpen("notification", {
      notificationType: "success",
      notificationMessage: `Task assigned successfully!`,
    });
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
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-blue-50 p-4 border-b border-blue-200">
                <div className="text-xl font-semibold text-blue-800">
                  Manage Tasks
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  Create new tasks or assign them to workers.
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="border-b px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create" className="text-sm">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Create Task
                    </TabsTrigger>
                    <TabsTrigger value="assign" className="text-sm">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      Assign Task
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <TabsContent value="create">
                    <Form {...createForm}>
                      <form
                        id="create-task-form"
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
                                <Input readOnly {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={createForm.control}
                          name="task.startingDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={createForm.control}
                          name="task.completionDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Completion Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={createForm.control}
                            name="task.type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Type
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
                                    {Object.values(TaskType).map((type) => (
                                      <SelectItem key={type} value={type}>
                                        {type.charAt(0) +
                                          type.slice(1).toLowerCase()}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={createForm.control}
                            name="task.status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Status
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Object.values(TaskStatus).map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {status.charAt(0) +
                                          status.slice(1).toLowerCase()}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={createForm.control}
                          name="task.description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Description
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter task description..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={createForm.control}
                          name="task.notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Additional notes..."
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

                  <TabsContent value="assign">
                    <Form {...assignForm}>
                      <form
                        id="assign-task-form"
                        onSubmit={assignForm.handleSubmit(onAssignSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-4">
                          <FormField
                            control={assignForm.control}
                            name="taskId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Task
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Task" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {tasks.map((task) => (
                                      <SelectItem
                                        key={task.id}
                                        value={task.id.toString()}
                                        className="flex flex-col items-start"
                                      >
                                        <span>{`Description: ${task.description}`}</span>
                                        <span>
                                          {`Date: ${formatDate(
                                            task.starting_date
                                          )}`}
                                        </span>
                                        <span>
                                          {`Task type: ${
                                            task.type
                                              .replace("_", " ")
                                              .charAt(0) +
                                            task.type
                                              .replace("_", " ")
                                              .slice(1)
                                              .toLowerCase()
                                          }`}
                                        </span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
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
                                  Worker
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Worker" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {workers.map((worker) => (
                                      <SelectItem
                                        key={worker.worker_tag}
                                        value={worker.worker_tag}
                                      >
                                        {worker.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
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
                      form="create-task-form"
                      className="bg-blue-600 text-white"
                      disabled={createLoading}
                    >
                      {createLoading ? "Creating Task" : "Create Task"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      form="assign-task-form"
                      className="bg-blue-600 text-white"
                      disabled={assignLoading}
                    >
                      {assignLoading ? "Assigning Task" : "Assign Task"}
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

export default TaskModal;
