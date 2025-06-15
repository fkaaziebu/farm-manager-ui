"use client";
import {
  OverviewSection,
  SearchBar,
  WorkerFarmSection,
} from "@/components/pages/farms";
import { useFetchFarms } from "@/hooks/queries";
import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export default function FarmsListingPage() {
  const { farms, fetchFarms, fetchMoreFarms, loadingFarms, loadingMoreFarms } =
    useFetchFarms();
  const router = useRouter();
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { onOpen, data } = useModal();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/worker/login");
    }
  }, []);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      fetchFarms({ searchTerm });
    }, 500);
  }, [data.createFarmEvent, searchTerm]);

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
            {
              <Button
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                onClick={() => onOpen("add-farm")}
                type="button"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Farm
              </Button>
            }
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
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loading={loadingFarms}
      />

      <OverviewSection />

      {!loadingFarms && (
        <WorkerFarmSection
          farms={farms || []}
          loading={loadingMoreFarms}
          searchTerm={searchTerm}
          observerTarget={observerTarget}
        />
      )}

      {loadingFarms && (
        <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
              <div
                key={val}
                className="flex flex-col gap-5 justify-center p-5 rounded-lg border bg-white animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-3/5 rounded-lg bg-gray-100 border" />
                  <div className="h-5 w-5 rounded-full bg-gray-100 border" />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="h-3 w-2/5 rounded-lg bg-gray-100 border" />
                  <div className="flex items-center gap-5">
                    <div className="h-20 w-full rounded-lg bg-gray-100 border" />
                    <div className="h-20 w-full rounded-lg bg-gray-100 border" />
                  </div>
                </div>
                <div className="h-16 w-full rounded-lg bg-gray-100 border" />
                <div className="flex items-center gap-5 mt-3">
                  <div className="h-10 w-full rounded-lg bg-gray-100 border" />
                  <div className="h-10 w-full rounded-lg bg-gray-100 border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
