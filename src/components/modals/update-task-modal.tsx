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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle2,
  ClockIcon,
  AlertCircle,
  CalendarDays,
  Clock,
  CheckSquare,
  Timer,
  HelpCircle,
} from "lucide-react";
import { TaskStatus, TaskType } from "@/graphql/generated/graphql";
import { formatDate } from "../common";
import { useUpdateTask } from "@/hooks/mutations";
import { differenceInDays, parseISO } from "date-fns";

// Update task schema that matches your requirements
const updateTaskSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  task: z.object({
    startingDate: z.string().min(1, "Start date is required"),
    completionDate: z.string().min(1, "Completion date is required"),
    status: z.enum([
      TaskStatus.Pending,
      TaskStatus.InProgress,
      TaskStatus.Completed,
    ]),
    notes: z.string().optional(),
  }),
});

export const UpdateTaskModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-task";

  const { updateTask } = useUpdateTask();

  // Extract task data from modal data
  const task = data?.task;

  const formatTaskStatus = (status: TaskStatus) => {
    if (!status) return "";
    return status
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Get appropriate status badge color
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Completed:
        return "bg-green-100 text-green-800";
      case TaskStatus.InProgress:
        return "bg-blue-100 text-blue-800";
      case TaskStatus.Pending:
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // Format task type for display
  const formatTaskType = (type: TaskType) => {
    if (!type) return "";
    return type
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Function to calculate days until due date
  const calculateDaysUntilDue = (dueDate: string) => {
    if (!dueDate) return null;

    try {
      const today = new Date();
      const parsedDueDate = parseISO(dueDate);
      const daysDiff = differenceInDays(parsedDueDate, today);

      if (daysDiff < 0) {
        return { days: Math.abs(daysDiff), overdue: true };
      } else {
        return { days: daysDiff, overdue: false };
      }
    } catch (e) {
      console.error("Error calculating due date:", e);
      return null;
    }
  };

  // Calculate due date status
  const dueDateInfo = task?.completion_date
    ? calculateDaysUntilDue(task.completion_date)
    : null;

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      taskId: data?.taskId ?? "",
      task: {
        startingDate: task?.starting_date || "",
        completionDate: task?.completion_date || "",
        status: task?.status || TaskStatus.Pending,
        notes: task?.notes || "",
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data?.task) {
      form.reset({
        taskId: task?.id?.toString() || "",
        task: {
          startingDate: task?.starting_date || "",
          completionDate: task?.completion_date || "",
          status: task?.status || TaskStatus.Pending,
          notes: task?.notes || "",
        },
      });
    }
  }, [isModalOpen, data, form]);

  const onSubmit = async (values: z.infer<typeof updateTaskSchema>) => {
    console.log("Updating task:", values);
    try {
      await updateTask({
        variables: {
          taskId: parseInt(values.taskId),
          task: {
            startingDate: values.task.startingDate,
            completionDate: values.task.completionDate,
            status: values.task.status,
            notes: values.task.notes || null,
          },
        },
      });
      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Task updated successfully",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error updating task: ${error}`,
      });
    }
  };

  // Check task timeline status (on track, at risk, overdue)
  const getTimelineStatus = () => {
    if (!task?.completion_date || !dueDateInfo) return null;

    if (task?.status === TaskStatus.Completed) {
      return {
        label: "Completed",
        color: "bg-green-100 text-green-800",
        icon: <CheckSquare className="h-4 w-4 mr-1" />,
      };
    }

    if (dueDateInfo.overdue) {
      return {
        label: `Overdue by ${dueDateInfo.days} day${
          dueDateInfo.days !== 1 ? "s" : ""
        }`,
        color: "bg-red-100 text-red-800",
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
      };
    }

    if (dueDateInfo.days <= 2) {
      return {
        label: `Due soon (${dueDateInfo.days} day${
          dueDateInfo.days !== 1 ? "s" : ""
        })`,
        color: "bg-amber-100 text-amber-800",
        icon: <Timer className="h-4 w-4 mr-1" />,
      };
    }

    return {
      label: `Due in ${dueDateInfo.days} days`,
      color: "bg-blue-100 text-blue-800",
      icon: <Clock className="h-4 w-4 mr-1" />,
    };
  };

  const timelineStatus = getTimelineStatus();

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
            className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with task info */}
            <div className="bg-blue-50 p-4 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-blue-800">
                    Update Task Progress
                  </h2>
                  <p className="text-sm text-blue-700 mt-1">
                    Update the status and details of this assigned task
                  </p>
                </div>
                <Badge className={getStatusColor(task?.status as TaskStatus)}>
                  {formatTaskStatus(task?.status as TaskStatus)}
                </Badge>
              </div>
            </div>

            {/* Task information summary */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-2">
                Task Description
              </h3>
              <p className="text-sm text-gray-800 mb-3">{task?.description}</p>

              <div className="flex flex-wrap gap-3 mb-3">
                <div className="flex items-center text-xs text-gray-600">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>Created: {formatDate(task?.starting_date)}</span>
                </div>

                {task?.type && (
                  <Badge variant="outline" className="text-xs font-normal">
                    {formatTaskType(task?.type)}
                  </Badge>
                )}

                {task?.worker && (
                  <div className="flex items-center text-xs text-gray-600">
                    <span>Assigned to: {task?.worker.name}</span>
                  </div>
                )}
              </div>

              {/* Due date indicator */}
              {timelineStatus && (
                <div
                  className={`text-xs px-3 py-2 rounded flex items-center mt-2 ${timelineStatus.color}`}
                >
                  {timelineStatus.icon}
                  <span>{timelineStatus.label}</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="taskId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task ID</FormLabel>
                        <FormControl>
                          <Input readOnly {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="task.startingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          {task?.starting_date && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <CalendarDays className="w-3 h-3 mr-1" />
                              <span>
                                Started: {formatDate(task.starting_date)}
                              </span>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="task.completionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Completion Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          {task?.status === TaskStatus.Completed &&
                            task.completion_date && (
                              <div className="flex items-center text-xs text-green-600 mt-1">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                <span>
                                  Completed: {formatDate(task.completion_date)}
                                </span>
                              </div>
                            )}
                          {task?.status !== TaskStatus.Completed &&
                            task?.completion_date && (
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>
                                  Due: {formatDate(task?.completion_date)}
                                </span>
                              </div>
                            )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="task.status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select task status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(TaskStatus).map((status) => (
                              <SelectItem
                                key={status}
                                value={status}
                                className="flex items-center"
                              >
                                <div className="flex items-center">
                                  {status === TaskStatus.Completed ? (
                                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                  ) : status === TaskStatus.InProgress ? (
                                    <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                                  )}
                                  {formatTaskStatus(status)}
                                </div>
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
                    name="task.notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progress Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add notes about task progress or completion..."
                            className="min-h-[120px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription className="flex items-center mt-1 text-xs">
                          <HelpCircle className="w-3 h-3 mr-1" />
                          Document progress, challenges, or completion details
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contextual guidance based on status */}
                  {form.watch("task.status") === TaskStatus.InProgress && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-blue-50 p-4 rounded-lg"
                    >
                      <div className="flex items-start">
                        <ClockIcon className="text-blue-600 mr-2 mt-0.5 h-5 w-5" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium">
                            Task in progress
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            Update the progress notes to reflect current status.
                            Set status to &quot;Completed&quot; when finished.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Completion confirmation for completed tasks */}
                  {form.watch("task.status") === TaskStatus.Completed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-50 p-4 rounded-lg"
                    >
                      <div className="flex items-start">
                        <CheckCircle2 className="text-green-600 mr-2 mt-0.5 h-5 w-5" />
                        <div>
                          <p className="text-sm text-green-800 font-medium">
                            Task completed
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Please ensure all work is finished and add any
                            relevant completion notes.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 text-white"
                      disabled={!form.formState.isDirty}
                    >
                      {form.formState.isDirty ? "Update Task" : "No Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateTaskModal;
