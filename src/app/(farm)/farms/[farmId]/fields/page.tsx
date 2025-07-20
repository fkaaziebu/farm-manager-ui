"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Sprout,
  ArrowLeft,
  Droplets,
  TreePine,
  Grid,
  List,
  Calendar,
  TrendingUp,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFetchFields } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import fieldPic from "@/../public/images/field_image.avif";
import { useFetchFarms } from "@/hooks/queries";
import { useModal } from "@/hooks/use-modal-store";
import LoadingState from "@/components/pages/loading-state";
import { CropHousingStatus, Field } from "@/graphql/generated/graphql";

type FieldProps = NonNullable<Field>;

export default function FieldListingPage() {
  const { fetchFields, fields, pageInfo, fetchMoreFields, loadingFields } =
    useFetchFields();
  const { fetchFarms, farms } = useFetchFarms();
  const [farmFields, setFarmFields] = useState<FieldProps[]>([]);
  const router = useRouter();
  const { onOpen } = useModal();
  const pathname = usePathname();
  const farmId = pathname.split("/")[pathname.split("/").length - 2];

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [soilTypeFilter, setSoilTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Get unique soil types for filter
  const soilTypes = [
    "all",
    ...new Set(farmFields.map((field) => field.soil_type).filter(Boolean)),
  ];
  const fieldStatuses = [
    "all",
    "ACTIVE",
    "FALLOW",
    "PREPARATION",
    "MAINTENANCE",
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "FALLOW":
        return "bg-yellow-100 text-yellow-800";
      case "PREPARATION":
        return "bg-blue-100 text-blue-800";
      case "MAINTENANCE":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get crop status color
  const getCropStatusColor = (status: string) => {
    switch (status) {
      case "SEEDLING":
        return "bg-yellow-100 text-yellow-800";
      case "GROWING":
        return "bg-blue-100 text-blue-800";
      case "FLOWERING":
        return "bg-pink-100 text-pink-800";
      case "FRUITING":
        return "bg-orange-100 text-orange-800";
      case "READY_FOR_HARVEST":
        return "bg-amber-100 text-amber-800";
      case "HARVESTED":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate active crop batches in a field
  const getActiveCropBatches = (field: FieldProps) => {
    return (
      field.crop_batches?.filter(
        (crop) => crop?.status && !["HARVESTED", "FAILED"].includes(crop.status)
      ).length || 0
    );
  };

  // Get field utilization percentage
  const getFieldUtilization = (field: FieldProps) => {
    if (!field.crop_batches || field.crop_batches.length === 0) return 0;
    const totalPlantedArea = field.crop_batches.reduce(
      (sum, crop) => sum + (crop?.area_planted || 0),
      0
    );
    return ((totalPlantedArea / field.area_hectares) * 100).toFixed(0);
  };

  // Get upcoming harvests (within 30 days)
  const getUpcomingHarvests = (field: FieldProps) => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    return (
      field.crop_batches?.filter((crop) => {
        if (!crop?.harvest_date) return false;
        const harvestDate = new Date(crop.harvest_date);
        return harvestDate >= now && harvestDate <= thirtyDaysFromNow;
      }).length || 0
    );
  };

  // Get most recent soil test date
  const getLastSoilTest = (field: FieldProps) => {
    // This would typically come from soil_test_results
    // For now, return a placeholder date
    console.log("field", field.name);
    return "2024-06-15"; // Placeholder
  };

  useEffect(() => {
    fetchFarms({ searchTerm: searchQuery, filter: { id: Number(farmId) } });
    fetchFields({ searchTerm: searchQuery });
  }, [searchQuery, farmId]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }
    if (farms && farms.length > 0) {
      setFarmFields(fields || []);
    }
  }, [farms, fields]);

  // Filter and sort fields
  const filteredFields = farmFields
    .filter((field) => {
      if (soilTypeFilter !== "all" && field.soil_type !== soilTypeFilter)
        return false;
      if (statusFilter !== "all" && field.status !== statusFilter) return false;
      if (searchQuery) {
        return (
          field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          field.soil_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          field.crop_batches?.some((crop) =>
            crop?.crop_type?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "area":
          return b.area_hectares - a.area_hectares;
        case "utilization":
          return (
            parseInt(getFieldUtilization(b).toString()) -
            parseInt(getFieldUtilization(a).toString())
          );
        case "crops":
          return getActiveCropBatches(b) - getActiveCropBatches(a);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <Link href={`/farms/${farmId}`} className="mr-3 sm:mr-4">
                  <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                </Link>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Farm Fields
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Manage your farm&apos;s fields and crop production
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 sm:mt-0 flex md:hidden sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() => {
                  onOpen("add-field-or-greenhouse", {
                    farmTag: farms?.[0]?.farm_tag,
                  });
                }}
              >
                <Plus size={20} />
                <span>Field</span>
              </button>
            </div>
            <button
              type="button"
              className="mt-3 hidden w-fit md:flex bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-md items-center justify-center gap-1 sm:gap-2 text-xs"
              onClick={() => {
                onOpen("add-field-or-greenhouse", {
                  farmTag: farms?.[0]?.farm_tag,
                });
              }}
            >
              <Plus size={16} />
              <span className="truncate">Add Field</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search and filters */}
      {!loadingFields && (
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
                placeholder="Search fields by name, soil type, or crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
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
                type="button"
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
                type="button"
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
                <div>
                  <label
                    htmlFor="soil-filter"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Soil Type
                  </label>
                  <select
                    id="soil-filter"
                    value={soilTypeFilter}
                    onChange={(e) => setSoilTypeFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                  >
                    {soilTypes.map((type) => (
                      <option key={type ?? ""} value={type ?? ""}>
                        {type === "all" ? "All Soil Types" : type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status-filter"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                  >
                    {fieldStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </option>
                    ))}
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
                    <option value="name">Name</option>
                    <option value="area">Area (Largest First)</option>
                    <option value="utilization">Utilization %</option>
                    <option value="crops">Active Crops</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                    <Layers className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="ml-3 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                        Total Fields
                      </dt>
                      <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                        {farmFields?.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                    <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="ml-3 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                        Active Crops
                      </dt>
                      <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                        {farmFields?.reduce(
                          (total, field) => total + getActiveCropBatches(field),
                          0
                        )}
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
                    <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                  </div>
                  <div className="ml-3 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                        Upcoming Harvests
                      </dt>
                      <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                        {farmFields?.reduce(
                          (total, field) => total + getUpcomingHarvests(field),
                          0
                        )}
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
                    <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="ml-3 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                        Total Area
                      </dt>
                      <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                        {farmFields
                          ?.reduce(
                            (total, field) => total + field.area_hectares,
                            0
                          )
                          .toFixed(1)}
                        ha
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fields list */}
      {!loadingFields && (
        <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-base sm:text-xl font-semibold text-gray-900">
              {filteredFields.length}{" "}
              {filteredFields.length === 1 ? "field" : "fields"} found
            </h2>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {filteredFields.map((field) => (
                <div
                  key={field.id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative">
                    <Image
                      className="h-36 sm:h-48 w-full object-cover"
                      src={fieldPic}
                      alt={field.name}
                    />
                    <div className="absolute top-0 right-0 m-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          field.status
                        )}`}
                      >
                        {field.status}
                      </span>
                    </div>
                    {getUpcomingHarvests(field) > 0 && (
                      <div className="absolute bottom-0 right-0 m-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                          Harvest Due
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      {field.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {field.soil_type} • {field.irrigation_type}
                    </p>

                    <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Area:</span>
                        <p className="font-medium text-gray-900">
                          {field.area_hectares} ha
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Active Crops:</span>
                        <p className="font-medium text-gray-900">
                          {getActiveCropBatches(field)}
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Utilization:</span>
                        <p className="font-medium text-gray-900">
                          {getFieldUtilization(field)}%
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Last Test:</span>
                        <p className="font-medium text-gray-900">
                          {new Date(
                            getLastSoilTest(field)
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Current Crops */}
                    {field.crop_batches && field.crop_batches.length > 0 && (
                      <div className="mt-3 sm:mt-4">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">
                          Current Crops:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {field.crop_batches.slice(0, 3).map(
                            (crop, index) =>
                              crop && (
                                <span
                                  key={index}
                                  className={`px-2 py-1 text-xs rounded-full ${getCropStatusColor(
                                    crop.status
                                  )}`}
                                >
                                  {crop.crop_type}
                                </span>
                              )
                          )}
                          {field.crop_batches.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                              +{field.crop_batches.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 sm:mt-5">
                      <Link
                        href={`/farms/${farmId}/fields/${field.unit_id}`}
                        className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                      >
                        Manage Field
                      </Link>
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
                {filteredFields.map((field) => (
                  <li key={field.id}>
                    <Link
                      href={`/farms/${farmId}/fields/${field.unit_id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-3 py-3 sm:px-4 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-md overflow-hidden">
                              <Image
                                src={fieldPic}
                                alt={field.name}
                                className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
                              />
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {field.name}
                              </div>
                              <div className="flex flex-wrap items-center">
                                <div className="text-xs sm:text-sm text-gray-500 mr-2">
                                  {field.soil_type} • {field.area_hectares} ha
                                </div>
                                <span
                                  className={`mt-1 sm:mt-0 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                    field.status
                                  )}`}
                                >
                                  {field.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <div className="mr-3 sm:mr-4 flex flex-col items-end">
                              <div className="text-xs sm:text-sm text-gray-900">
                                <span className="font-medium">Crops:</span>{" "}
                                {getActiveCropBatches(field)}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                <span className="font-medium">
                                  Utilization:
                                </span>{" "}
                                {getFieldUtilization(field)}%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Crop batches preview */}
                        {field.crop_batches &&
                          field.crop_batches.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {field.crop_batches.slice(0, 4).map(
                                (crop, index) =>
                                  crop && (
                                    <span
                                      key={index}
                                      className={`px-2 py-1 text-xs rounded-full ${getCropStatusColor(
                                        crop.status
                                      )}`}
                                    >
                                      {crop.crop_type} -{" "}
                                      {crop.status?.charAt(0) +
                                        crop.status
                                          ?.slice(1)
                                          .toLowerCase()
                                          .replace(/_/g, " ")}
                                    </span>
                                  )
                              )}
                              {field.crop_batches.length > 4 && (
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                  +{field.crop_batches.length - 4} more crops
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 sm:mt-6">
            <nav className="flex items-center justify-between border-t border-gray-200 px-2 sm:px-4">
              <div className="-mt-px flex w-0 flex-1">
                {pageInfo?.hasPreviousPage && (
                  <button
                    onClick={() => fetchMoreFields({ searchTerm: searchQuery })}
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
                  </button>
                )}
              </div>
              <div className="hidden md:-mt-px md:flex">
                <span className="inline-flex items-center border-t-2 border-green-500 px-4 pt-4 text-sm font-medium text-green-600">
                  Page {pageInfo?.startCursor || 1}
                </span>
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                {pageInfo?.hasNextPage && (
                  <button
                    onClick={() => fetchMoreFields({ searchTerm: searchQuery })}
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
                  </button>
                )}
              </div>
            </nav>
          </div>

          {/* Field Management Actions */}
          <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                Field Management
              </h3>
              <div className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
                <p>
                  Quick actions for managing your fields and crop production.
                </p>
              </div>
              <div className="mt-3 sm:mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  <Sprout className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Plant Crops
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Droplets className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Schedule Irrigation
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  <TreePine className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Soil Testing
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                >
                  <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Harvest Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Activities */}
          <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                Upcoming Field Activities
              </h3>
              <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                Critical tasks and schedules for the next 30 days
              </p>
            </div>
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="space-y-3 sm:space-y-4">
                {farmFields
                  .filter((field) => getUpcomingHarvests(field) > 0)
                  .slice(0, 3)
                  .map((field) => (
                    <div
                      key={field.id}
                      className="border border-gray-200 rounded-md p-3 sm:p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Sprout className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                              {field.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {getUpcomingHarvests(field)} crops ready for
                              harvest
                            </p>
                          </div>
                        </div>
                        <span className="mt-2 sm:mt-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Harvest Due
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                        {field.crop_batches
                          ?.filter((crop) => {
                            if (!crop?.harvest_date) return false;
                            const harvestDate = new Date(crop.harvest_date);
                            const now = new Date();
                            const thirtyDaysFromNow = new Date(
                              now.getTime() + 30 * 24 * 60 * 60 * 1000
                            );
                            return (
                              harvestDate >= now &&
                              harvestDate <= thirtyDaysFromNow
                            );
                          })
                          .map(
                            (crop, index) =>
                              crop && (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                                >
                                  {crop.crop_type} - Due{" "}
                                  {new Date(
                                    crop.harvest_date!
                                  ).toLocaleDateString()}
                                </span>
                              )
                          )}
                      </div>
                      <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          Schedule Harvest
                        </button>
                        <Link
                          href={`/farms/${farmId}/fields/${field.unit_id}`}
                          className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View Field
                        </Link>
                      </div>
                    </div>
                  ))}

                {farmFields.filter((field) => getUpcomingHarvests(field) > 0)
                  .length === 0 && (
                  <div className="text-center py-4 sm:py-6">
                    <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100">
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-900">
                      No upcoming harvests
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                      All crops are on schedule with no immediate harvest
                      requirements.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Field Health Overview */}
          <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                Field Health Overview
              </h3>
              <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                Current status and health indicators across all fields
              </p>
            </div>
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-3">
                {/* Active Fields */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">
                      Active Fields
                    </h4>
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {
                        farmFields.filter(
                          (field) => field.status === CropHousingStatus.Active
                        ).length
                      }
                    </span>
                    <span className="ml-2 text-xs sm:text-sm text-green-500">
                      of {farmFields.length} total
                    </span>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{
                          width: `${
                            (farmFields.filter(
                              (field) =>
                                field.status === CropHousingStatus.Active
                            ).length /
                              farmFields.length) *
                            100
                          }%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Field Utilization */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">
                      Avg Utilization
                    </h4>
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {farmFields.length > 0
                        ? (
                            farmFields.reduce(
                              (total, field) =>
                                total +
                                parseInt(getFieldUtilization(field).toString()),
                              0
                            ) / farmFields.length
                          ).toFixed(0)
                        : 0}
                      %
                    </span>
                    <span className="ml-2 text-xs sm:text-sm text-blue-500">
                      field capacity
                    </span>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{
                          width: `${
                            farmFields.length > 0
                              ? farmFields.reduce(
                                  (total, field) =>
                                    total +
                                    parseInt(
                                      getFieldUtilization(field).toString()
                                    ),
                                  0
                                ) / farmFields.length
                              : 0
                          }%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Crop Diversity */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">
                      Crop Types
                    </h4>
                    <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {(() => {
                        const allCropTypes = farmFields.flatMap(
                          (field) =>
                            field.crop_batches
                              ?.map((crop) => crop?.crop_type)
                              .filter(Boolean) || []
                        );
                        return new Set(allCropTypes).size;
                      })()}
                    </span>
                    <span className="ml-2 text-xs sm:text-sm text-green-500">
                      varieties
                    </span>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="text-xs text-gray-500">
                      Crop diversification across fields
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loadingFields && <LoadingState />}
    </div>
  );
}
