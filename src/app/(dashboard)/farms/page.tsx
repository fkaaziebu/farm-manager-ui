"use client";
import {
  FarmHeaderSection,
  FarmSection,
  OverviewSection,
  SearchBar,
} from "@/components/pages/farms";
import { useFetchFarms } from "@/hooks/queries";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useModal } from "@/hooks/use-modal-store";
import LoadingState from "@/components/pages/loading-state";

export default function FarmsListingPage() {
  const { farms, fetchFarms, fetchMoreFarms, loadingFarms, loadingMoreFarms } =
    useFetchFarms();
  const router = useRouter();
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useModal();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
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
      { threshold: 1 },
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
      <FarmHeaderSection />

      {/* Responsive Search */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loading={loadingFarms}
      />

      <OverviewSection />

      {!loadingFarms && (
        <FarmSection
          farms={farms || []}
          loading={loadingMoreFarms}
          searchTerm={searchTerm}
          observerTarget={observerTarget}
        />
      )}

      {loadingFarms && <LoadingState />}
    </div>
  );
}
