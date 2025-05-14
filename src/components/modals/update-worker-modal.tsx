"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { WorkerRole } from "@/graphql/generated/graphql";

// Replace with actual enum or central role list if needed

const updateWorkerSchema = z.object({
  workerTag: z.string().min(1, "Worker ID is required"),
  workerData: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    bio: z.string().optional(),
    address: z.string().optional(),
    join_date: z.string().min(1),
    roles: z
      .array(
        z.enum([
          WorkerRole.AnimalCaretaker,
          WorkerRole.CropSpecialist,
          WorkerRole.FarmManager,
          WorkerRole.FeedSpecialist,
          WorkerRole.GeneralWorker,
          WorkerRole.Maintenance,
          WorkerRole.Veterinarian,
        ])
      )
      .optional(),
    skills: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
  }),
});

export const UpdateWorkerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-worker";
  const worker: {
    name: string;
    phone: string;
    bio: string;
    address: string;
    join_date: string;
    roles: string[];
    skills: string[];
    achievements: string[];
  } = {
    name: data?.farmWorker?.name ?? "",
    phone: data?.farmWorker?.phone ?? "",
    bio: data?.farmWorker?.bio ?? "",
    address: data?.farmWorker?.address ?? "",
    join_date: data?.farmWorker?.join_date ?? "",
    roles: data?.farmWorker?.roles ?? [],
    skills: data?.farmWorker?.skills ?? [],
    achievements: data?.farmWorker?.achievements ?? [],
  };

  const form = useForm<z.infer<typeof updateWorkerSchema>>({
    resolver: zodResolver(updateWorkerSchema),
    defaultValues: {
      workerTag: data?.workerTag ?? "",
      workerData: {
        name: worker.name ?? "",
        phone: worker.phone ?? "",
        bio: worker.bio ?? "",
        address: worker.address ?? "",
        join_date: worker.join_date ?? "",
        // @ts-expect-error error
        roles: (worker.roles as WorkerRole[]) ?? [],
        skills: worker.skills ?? [],
        achievements: worker.achievements ?? [],
      },
    },
  });

  useEffect(() => {
    if (isModalOpen && data) {
      form.reset({
        workerTag: data.workerTag ?? "",
        workerData: {
          name: worker.name ?? "",
          phone: worker.phone ?? "",
          bio: worker.bio ?? "",
          address: worker.address ?? "",
          join_date: worker.join_date ?? "",
          // @ts-expect-error error
          roles: (worker.roles as WorkerRole[]) ?? [],
          skills: worker.skills ?? [],
          achievements: worker.achievements ?? [],
        },
      });
    }
  }, [isModalOpen, data]);

  const onSubmit = async (values: z.infer<typeof updateWorkerSchema>) => {
    console.log("Updating worker:", values);
    // TODO: Call mutation
    onClose();
  };

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
            className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Update Worker</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="workerTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Worker ID</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Worker name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.join_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Join Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief bio" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.achievements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achievements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="One per line"
                          value={field.value?.join("\n") ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value.split("\n"))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="One per line"
                          value={field.value?.join("\n") ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value.split("\n"))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workerData.roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roles</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(val) => field.onChange([val])}
                          value={field.value?.[0] ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(WorkerRole).map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateWorkerModal;
