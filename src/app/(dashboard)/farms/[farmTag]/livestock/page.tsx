"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Heart,
  AlertTriangle,
  ArrowLeft,
  Grid,
  List,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Livestock, HealthStatus } from "@/graphql/generated/graphql";
import formatDateOfBirth from "@/components/common/format-date-of-birth";
import { formatDate } from "@/components/common";
import { timeAgo } from "@/components/common/time-ago";
import { EmptyStateAnimalEvents } from "@/components/pages/farms/animals";
import { useModal } from "@/hooks/use-modal-store";
import { useFetchLivestocks } from "@/hooks/queries";
import { useSearchParams } from "next/navigation";

type AnimalProp = NonNullable<Livestock>;

export default function AnimalsListingPage() {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const {
    fetchLivestocks,
    livestocks,
    // fetchMoreLivestocks,
    // loadingLivestocks,
    // pageInfo,
  } = useFetchLivestocks();
  const pathname = usePathname();
  const [farmAnimals, setFarmAnimals] = useState<AnimalProp[]>([]);
  const farmId = pathname.split("/")[2]; //
  const searchParams = useSearchParams();
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const { onOpen } = useModal();
  const livestockType = searchParams.get("type");
  // Filter and sort animals

  // Get unique animal types for filter
  const animalTypes = [
    "all",
    ...new Set(farmAnimals.map((animal) => animal.breed)),
  ];
  const statusTypes = [
    "all",
    ...new Set(farmAnimals.map((animal) => animal.health_status)),
  ];

  // Function to get tag color class
  const getTagColorClass = (tagColor: string) => {
    switch (tagColor) {
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "pink":
        return "bg-pink-100 text-pink-800";
      case "white":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get status color class
  const getStatusColorClass = (status: HealthStatus) => {
    switch (status) {
      case HealthStatus.Healthy:
        return "bg-green-100 text-green-800";
      case HealthStatus.Recovering:
        return "bg-yellow-100 text-yellow-800";
      case HealthStatus.Sick:
        return "bg-purple-100 text-purple-800";
      case HealthStatus.Critical:
        return "bg-red-100 text-red-800";
      case HealthStatus.Treated:
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Animal stats
  const animalStats = {
    total: farmAnimals.length,
    healthy: farmAnimals.filter((a) => a.health_status === HealthStatus.Healthy)
      .length,
    treated: farmAnimals.filter((a) => a.health_status === HealthStatus.Treated)
      .length,
    recovering: farmAnimals.filter(
      (a) => a.health_status === HealthStatus.Recovering,
    ).length,
    critical: farmAnimals.filter(
      (a) => a.health_status === HealthStatus.Critical,
    ).length,
    needsCheck: farmAnimals.filter((a) => {
      const lastCheck = new Date(a.updated_at).valueOf();
      const currentDate = new Date().valueOf();
      const diffTime = Math.abs(currentDate - lastCheck);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 7;
    }).length,
  };

  useEffect(() => {
    fetchLivestocks({ searchTerm: searchQuery });
  }, [searchQuery]);

  useEffect(() => {
    if (livestocks && livestocks.length > 0) {
      setFarmAnimals(
        livestocks.filter(
          (livestock) =>
            livestockType === null ||
            livestock.livestock_type.toLowerCase() ===
              livestockType?.toLowerCase(),
        ),
      );
    }
  }, [livestocks]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="mr-3 sm:mr-4"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Farm Animals
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Manage your farm&apos;s animal inventory
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 sm:mt-0 sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex md:hidden items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() =>
                  onOpen("add-livestock-to-pen", {
                    penUnitId: livestocks?.[0].pen?.unit_id,
                  })
                }
              >
                <Plus size={16} />
                <span>Animal</span>
              </button>
            </div>
            <button
              type="button"
              className="mt-3 sm:mt-0 sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md md:flex hidden items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
              onClick={() =>
                onOpen("add-livestock-to-pen", {
                  penUnitId: livestocks?.[0].pen?.unit_id,
                })
              }
            >
              <Plus size={16} />
              <span>Add Animal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        <div className="mt-2 space-y-1 flex justify-around px-2">
          <button
            onClick={() => {
              setViewMode("grid");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap  ${
              viewMode === "grid"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Grid size={16} className="inline mr-2" /> Grid View
          </button>
          <button
            onClick={() => {
              setViewMode("list");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap  ${
              viewMode === "list"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <List size={16} className="inline mr-2" /> List View
          </button>
          <button
            onClick={() => {
              setShowFilters(!showFilters);
            }}
            className="px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap  text-gray-700 hover:bg-gray-100"
          >
            <Filter size={16} className="inline mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
              placeholder="Search animals by ID, breed, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setViewMode("grid")}
              className={`hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${
                viewMode === "grid"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Grid size={16} className="mr-1 sm:mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${
                viewMode === "list"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <List size={16} className="mr-1 sm:mr-2" />
              List
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter size={16} className="mr-1 sm:mr-2" />
              Filters
              <ChevronDown size={16} className="ml-1 sm:ml-2" />
            </button>
          </div>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
              <div>
                <label
                  htmlFor="type-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Animal Type
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {animalTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Health Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {statusTypes.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="gender-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender-filter"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sort-by"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Sort By
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  <option value="id">ID</option>
                  <option value="type">Type</option>
                  <option value="age">Age</option>
                  <option value="weight">Weight</option>
                  <option value="lastCheck">Last Check Date</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Animals
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.total}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Healthy
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.healthy}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2 sm:p-3">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Critical
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.critical}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2 sm:p-3">
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Recovering
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.recovering}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-2 sm:p-3">
                  <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Needs Check
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.needsCheck}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animals grid/list view */}
      <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900">
            {
              livestocks?.filter(
                (livestock) =>
                  livestockType === null ||
                  livestock.livestock_type.toLowerCase() ===
                    livestockType?.toLowerCase(),
              ).length
            }{" "}
            {livestocks?.filter(
              (livestock) =>
                livestockType === null ||
                livestock.livestock_type.toLowerCase() ===
                  livestockType?.toLowerCase(),
            ).length === 1
              ? "animal"
              : "animals"}{" "}
            found
          </h2>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {livestocks
              ?.filter(
                (livestock) =>
                  livestockType === null ||
                  livestock.livestock_type.toLowerCase() ===
                    livestockType?.toLowerCase(),
              )
              ?.map((livestock) => (
                <div
                  key={livestock.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-3 sm:p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTagColorClass(
                              "green",
                            )}`}
                          >
                            {livestock?.livestock_tag}
                          </span>
                          <span
                            className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(
                              livestock?.health_status,
                            )}`}
                          >
                            {livestock?.health_status[0].toUpperCase()}
                            {livestock?.health_status.slice(1).toLowerCase()}
                          </span>
                        </div>
                        <h3 className="mt-2 text-sm sm:text-lg font-medium text-gray-900">
                          {livestock?.breed} {livestock?.livestock_type}
                        </h3>
                      </div>
                      <div className="bg-gray-100 p-2 rounded-full">
                        <span className="text-xs font-medium text-gray-500">
                          {livestock.gender.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Age:</span>
                        <p className="font-medium text-gray-900">
                          {formatDateOfBirth(livestock.birth_date)}
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Weight:</span>
                        <p className="font-medium text-gray-900">
                          {livestock.weight === 0
                            ? "N/A"
                            : livestock.weight + " kg"}
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium text-gray-900">
                          {livestock?.pen?.barn?.unit_id}{" "}
                          {livestock?.pen?.unit_id}
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Last Check:</span>
                        <p className="font-medium text-gray-900">
                          {formatDate(livestock.updated_at)}
                        </p>
                        <p className="text-gray-500">
                          {timeAgo(livestock.updated_at)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <a
                        href={`/farms/${farmId}/livestock/${livestock.livestock_tag}`}
                        className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {livestocks
                ?.filter(
                  (livestock) =>
                    livestockType === null ||
                    livestock.livestock_type.toLowerCase() ===
                      livestockType?.toLowerCase(),
                )
                .map((livestock) => (
                  <li key={livestock.id}>
                    <a
                      href={`/farms/${farmId}/livestock/${livestock.id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-3 py-3 sm:px-4 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center">
                            <span
                              className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getTagColorClass(
                                "green",
                              )}`}
                            >
                              {livestock.livestock_tag}
                            </span>
                            <p className="ml-2 text-xs sm:text-sm font-medium text-gray-900">
                              {livestock.breed} {livestock.livestock_type}
                            </p>
                            <span
                              className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColorClass(
                                livestock.health_status,
                              )}`}
                            >
                              {livestock.health_status[0].toUpperCase()}
                              {livestock.health_status.slice(1).toLowerCase()}
                            </span>
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <div className="mr-2 sm:mr-4 flex flex-col items-end">
                              <div className="text-xs sm:text-sm text-gray-900">
                                {livestock.weight === 0
                                  ? "N/A"
                                  : livestock.weight + " kg"}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                {formatDateOfBirth(livestock.birth_date)}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-100">
                                <span className="text-xs font-medium text-gray-800">
                                  {livestock.gender.charAt(0).toUpperCase()}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                          <div className="sm:flex items-center">
                            <div className="flex items-center">
                              <div className="text-xs sm:text-sm text-gray-500">
                                <span className="font-medium">Location:</span>{" "}
                                {livestock?.pen?.barn?.unit_id}{" "}
                                {livestock?.pen?.unit_id}
                              </div>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-500 sm:mt-0">
                            <Calendar className="flex-shrink-0 mr-1 h-3 w-3 sm:h-5 sm:w-5 text-gray-400" />
                            <p>
                              <span className="font-medium">Last check:</span>{" "}
                              {formatDate(livestock.updated_at)}
                            </p>
                            <p className="text-gray-500">
                              {timeAgo(livestock.updated_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4 sm:mt-6">
          <nav className="flex items-center justify-between border-t border-gray-200 px-2 sm:px-4">
            <div className="-mt-px flex w-0 flex-1">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <svg
                  className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </a>
            </div>
            <div className="hidden sm:flex md:-mt-px md:flex">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-green-500 px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-green-600"
                aria-current="page"
              >
                1
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                2
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                3
              </a>
              <span className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-gray-500">
                ...
              </span>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                8
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                9
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                10
              </a>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-xs sm:text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Next
                <svg
                  className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </nav>
          <div className="mt-2 flex justify-center sm:hidden">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-green-500 px-2 pt-4 text-xs font-medium text-green-600"
              aria-current="page"
            >
              1
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              3
            </a>
            <span className="inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-xs font-medium text-gray-500">
              ...
            </span>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              10
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6">
          <div className="rounded-md bg-green-50 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-shrink-0 flex items-center sm:items-start">
                <AlertTriangle
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Animal Health Alert
                </h3>
                <div className="mt-2 text-xs sm:text-sm text-green-700">
                  <p>
                    {animalStats.needsCheck} animals need a health check. Would
                    you like to schedule a routine health check for all these
                    animals?
                  </p>
                </div>
                <div className="mt-3 sm:mt-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-green-50 px-2 py-1.5 text-xs sm:text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      Schedule Check
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-green-50 px-2 py-1.5 text-xs sm:text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      View Animals
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-green-50 px-2 py-1.5 text-xs sm:text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Animal Events */}
        {
          // <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          //   <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
          //     <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
          //       Upcoming Animal Events
          //     </h3>
          //     <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
          //       Next 7 days schedule
          //     </p>
          //   </div>
          //   <div className="px-3 py-3 sm:px-4 sm:py-5">
          //     <div className="overflow-x-auto">
          //       <table className="min-w-full divide-y divide-gray-200">
          //         <thead className="bg-gray-50">
          //           <tr>
          //             <th
          //               scope="col"
          //               className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //             >
          //               Date
          //             </th>
          //             <th
          //               scope="col"
          //               className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //             >
          //               Event
          //             </th>
          //             <th
          //               scope="col"
          //               className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //             >
          //               Animals
          //             </th>
          //             <th
          //               scope="col"
          //               className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //             >
          //               Assigned To
          //             </th>
          //             <th
          //               scope="col"
          //               className="relative px-3 py-2 sm:px-6 sm:py-3"
          //             >
          //               <span className="sr-only">Actions</span>
          //             </th>
          //           </tr>
          //         </thead>
          //         <tbody className="bg-white divide-y divide-gray-200">
          //           <tr>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
          //               Sep 15, 2024
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
          //               <div className="text-xs sm:text-sm font-medium text-gray-900">
          //                 Vaccination
          //               </div>
          //               <div className="text-xs sm:text-sm text-gray-500">
          //                 Annual boosters
          //               </div>
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
          //               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          //                 Cattle
          //               </span>
          //               <span className="ml-1 text-xs sm:text-sm text-gray-500">
          //                 5 animals
          //               </span>
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
          //               Dr. Emily Davis
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
          //               <a
          //                 href="#"
          //                 className="text-green-600 hover:text-green-900"
          //               >
          //                 Details
          //               </a>
          //             </td>
          //           </tr>
          //           <tr>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
          //               Sep 17, 2024
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
          //               <div className="text-xs sm:text-sm font-medium text-gray-900">
          //                 Weight Check
          //               </div>
          //               <div className="text-xs sm:text-sm text-gray-500">
          //                 Monthly measurement
          //               </div>
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
          //               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          //                 Pig
          //               </span>
          //               <span className="ml-1 text-xs sm:text-sm text-gray-500">
          //                 8 animals
          //               </span>
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
          //               John Smith
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
          //               <a
          //                 href="#"
          //                 className="text-green-600 hover:text-green-900"
          //               >
          //                 Details
          //               </a>
          //             </td>
          //           </tr>
          //           <tr>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
          //               Sep 19, 2024
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
          //               <div className="text-xs sm:text-sm font-medium text-gray-900">
          //                 Health Check
          //               </div>
          //               <div className="text-xs sm:text-sm text-gray-500">
          //                 Follow-up treatment
          //               </div>
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
          //               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          //                 Sheep
          //               </span>
          //               <span className="ml-1 text-xs sm:text-sm text-gray-500">
          //                 2 animals
          //               </span>
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
          //               Dr. Emily Davis
          //             </td>
          //             <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
          //               <a
          //                 href="#"
          //                 className="text-green-600 hover:text-green-900"
          //               >
          //                 Details
          //               </a>
          //             </td>
          //           </tr>
          //         </tbody>
          //       </table>
          //     </div>
          //   </div>
          //   <div className="px-3 py-3 sm:px-4 sm:py-4 border-t border-gray-200">
          //     <a
          //       href="#"
          //       className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
          //     >
          //       View all events <span aria-hidden="true">&rarr;</span>
          //     </a>
          //   </div>
          // </div>

          <EmptyStateAnimalEvents />
        }

        {/* Bulk Actions */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Bulk Actions
            </h3>
            <div className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
              <p>Perform operations on multiple animals at once.</p>
            </div>
            <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Schedule Health Check
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Update Feed Program
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Move Animals
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
