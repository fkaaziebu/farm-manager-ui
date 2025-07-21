"use client";
import {
  FarmHeaderSection,
  FarmSection,
  OverviewSection,
  SearchBar,
} from "@/components/pages/farms";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FarmsListingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Header */}
      <FarmHeaderSection />

      {/* Responsive Search */}
      <SearchBar />

      {/* Overview Section */}
      <OverviewSection />

      {/* Farm Section */}
      <FarmSection />
    </div>
  );
}
