"use client";
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
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddHouseToFarm } from "@/hooks/mutations";
import { toast } from "sonner";

const formSchema = z.object({
  houseNumber: z.string().min(1, {
    message: "House number is required.",
  }),

  roomDetails: z
    .array(
      z.object({
        room_number: z.string().min(1, {
          message: "Room number is required.",
        }),
      })
    )
    .min(1, {
      message: "At least one room detail is required.",
    }),
});

export default function FarmHouseEmptyState({ farmId }: { farmId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addHouseToFarm, loading } = useAddHouseToFarm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      houseNumber: "",
      roomDetails: [{ room_number: "" }],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const { houseNumber, roomDetails } = data;
      await addHouseToFarm({
        variables: {
          farmId: farmId,
          houseNumber: houseNumber,
          rooms: roomDetails.map((room) => ({
            room_number: room.room_number,
          })),
        },
      });
      toast("You successfully added a house to the farm");
    } catch (error) {
      console.error("Error adding house to farm:", error);
      toast.error("Error adding house to farm");
    }
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mb-4 sm:mb-6">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Farm Houses
        </h3>
      </div>
      <div className="p-3 sm:p-5">
        <div className="text-center py-8 sm:py-12">
          <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">
            No farm houses yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto mb-6">
            You haven&apos;t added any houses to this farm. Add your first house
            to start managing your farm&apos;s buildings and animals.
          </p>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Plus className="mr-2 h-4 w-4" /> Add house to Farm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New House</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new house.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  id="farm-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="houseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Poultry-house-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rooms</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {field.value.map(
                              (
                                room: { room_number: string },
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <Input
                                    placeholder={`Room ${index + 1}`}
                                    value={room.room_number}
                                    onChange={(e) => {
                                      const updatedRooms = [...field.value];
                                      updatedRooms[index].room_number =
                                        e.target.value;
                                      field.onChange(updatedRooms);
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      const updatedRooms = field.value.filter(
                                        (_: any, i: number) => i !== index
                                      );
                                      field.onChange(updatedRooms);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                field.onChange([
                                  ...field.value,
                                  { room_number: "" },
                                ])
                              }
                            >
                              Add Room
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
      </div>
    </div>
  );
}
