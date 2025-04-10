"use client";
import {
  FarmSection,
  OverviewSection,
  SearchBar,
} from "@/components/pages/farms";
import { useFetchFarms } from "@/hooks/queries";
import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function FarmsListingPage() {
  const { createFarm } = useCreateFarm();
  const { farms, fetchFarms, fetchMoreFarms } = useFetchFarms();
  const router = useRouter();
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      area: "",
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/auth/admin/login");
    }
  }, []);

  useEffect(() => {
    fetchFarms({ searchTerm, pagination: { first: 5 } });
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Check if the entry is intersecting the viewport
          if (entry.isIntersecting) {
            // Load more content
            fetchMoreFarms({ searchTerm, pagination: { first: 5 } });
          }
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchFarms]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Farms
              </h1>
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

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

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/farms"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-100"
                >
                  Farms
                </Link>
                <Link
                  href="/animals"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Animals
                </Link>
                <Link
                  href="/workers"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Workers
                </Link>
                <Link
                  href="/reports"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Reports
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Responsive Search */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Responsive Dashboard Sections */}
      <OverviewSection />

      {/* Responsive Farm cards */}
      <FarmSection farms={farms || []} observerTarget={observerTarget} />
    </div>
  );
}
