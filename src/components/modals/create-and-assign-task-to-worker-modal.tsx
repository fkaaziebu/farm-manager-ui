"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import {
  ClipboardList,
  ClipboardCheck,
  Search,
  Calendar,
  Clock,
  Info,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

//hooks
import { useCreateTask, useAssignTaskToWorker } from "@/hooks/mutations";
import { Task, TaskStatus, TaskType } from "@/graphql/generated/graphql";
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

// TaskSelectionField Component
const TaskSelectionField = ({
  form,
  tasks,
}: {
  form: ReturnType<typeof useForm>;
  tasks: Task[];
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Get the currently selected task
  const selectedTaskId = form.watch("taskId");
  const selectedTask = tasks.find(
    (task) => task.id.toString() === selectedTaskId,
  );

  // Filter tasks based on search and type filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || task.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get unique task types for the filter
  const taskTypes = [...new Set(tasks.map((task) => task.type))];

  // Handle task selection
  const selectTask = (taskId: string) => {
    form.setValue("taskId", taskId.toString());
    setOpen(false);
  };

  // Format task type for display
  const formatTaskType = (type: TaskType) => {
    return type
      .replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <FormField
      control={form.control}
      name="taskId"
      render={() => (
        <FormItem>
          <FormLabel>
            Task
            <span className="text-red-500">*</span>
          </FormLabel>

          {/* Task Selection Button */}
          <div
            className="border border-input rounded-md p-3 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setOpen(true)}
          >
            {selectedTask ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">
                    {selectedTask.description}
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {formatTaskType(selectedTask.type)}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{formatDate(selectedTask.starting_date)}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Select a task</div>
            )}
          </div>
          <FormMessage />

          {/* Task Selection Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Select Task</DialogTitle>
              </DialogHeader>

              {/* Search and Filter */}
              <div className="flex items-center space-x-2 my-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-md p-2 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {taskTypes.map((type) => (
                    <option key={type} value={type}>
                      {formatTaskType(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Task List */}
              <div className="overflow-y-auto flex-grow">
                {filteredTasks.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Info className="mx-auto h-10 w-10 mb-2 text-gray-400" />
                    <p className="font-medium">No tasks found</p>
                    <p className="text-sm mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 ">
                    {filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => selectTask(task.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTaskId === task.id.toString()
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="font-medium text-wrap truncate">
                              {task.description}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{formatDate(task.starting_date)}</span>
                              </div>
                              {task.completion_date && (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>
                                    Due: {formatDate(task.completion_date)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {formatTaskType(task.type)}
                          </Badge>
                        </div>
                        {task.notes && (
                          <div className="mt-2 text-sm text-gray-600 border-t pt-2">
                            {task.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </FormItem>
      )}
    />
  );
};

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
      createTaskEvent: `${Math.random()}`,
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
                          {/* Improved Task Selection Component */}
                          {tasks.length === 0 ? (
                            <FormField
                              control={assignForm.control}
                              name="taskId"
                              render={() => (
                                <FormItem>
                                  <FormLabel>
                                    Task
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <div className="p-4 text-center text-gray-500 text-sm border rounded-md">
                                    <span className="block mb-2">
                                      No tasks available to assign.
                                    </span>
                                    <span className="text-xs">
                                      Create a new task first.
                                    </span>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <TaskSelectionField
                              // @ts-expect-error error
                              form={assignForm}
                              tasks={tasks}
                            />
                          )}

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
