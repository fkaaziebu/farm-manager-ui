import React, { useState } from "react";
import { Plus, LandPlot, HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateFarm } from "@/hooks/mutations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Farm name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  area: z.string().min(2, {
    message: "Area must be at least 2 characters.",
  }),
});

const EmptyStateFarms = () => {
  const { createFarm } = useCreateFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      area: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, location, area } = values;
      await createFarm({
        variables: {
          name,
          location,
          area,
        },
      });

      toast("Farm creation successful");
    } catch (error) {
      toast("Farm Creation Error", {
        description: `${error?.response?.data?.message}`,
      });
    }
  }
  return (
    <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        All Farms
      </h2>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-8 sm:p-10 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <LandPlot className="h-10 w-10 text-green-600" />
          </div>

          <h3 className="mt-5 text-lg font-medium text-gray-900">
            No farms yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Get started by creating your first farm. You&apos;ll be able to add
            animals, workers, and manage houses once your farm is set up.
          </p>

          <div className="mt-8">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add New Farm
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Farm</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new farm.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form id="farm-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-name">Farm Name</FormLabel>
                            <FormControl>
                              <Input
                                id="farm-name"
                                placeholder="Enter farm name"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-name">Location</FormLabel>
                            <FormControl>
                              <Input
                                id="farm-location"
                                placeholder="Enter location"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="farm-name">
                              Area (acres)
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="farm-area"
                                placeholder="Enter area in acres"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="farm-form"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Create Farm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              With your farm, you&apos;ll be able to:
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-5">
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <HouseIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Manage Houses
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Track and organize animal housing and facilities
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Add Workers
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Assign staff and manage their roles
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
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
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Track Performance
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Monitor farm metrics and productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFarms;
