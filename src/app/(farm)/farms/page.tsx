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

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export default function FarmsListingPage() {
  const { farms, fetchFarms, fetchMoreFarms } = useFetchFarms();
  const router = useRouter();
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { onOpen, type } = useModal();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }
  }, []);

  useEffect(() => {
    fetchFarms({ searchTerm });
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

            <Button
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onOpen("add-farm")}
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Farm
            </Button>
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
