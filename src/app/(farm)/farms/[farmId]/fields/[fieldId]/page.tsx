"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Thermometer,
  Droplets,
  AlertTriangle,
  Calendar,
  Sprout,
  Plus,
  Download,
  ChevronDown,
  Filter,
  Layers,
  Eye,
  TestTube,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";
import { useGetAField } from "@/hooks/queries";
import { usePathname } from "next/navigation";
import EmptyStateFarmField from "@/components/pages/farms/crops/empty-state-farm-field";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export default function FieldDetailPage() {
  const { onOpen } = useModal();
  const { field, loadingField, fetchField } = useGetAField();
  const pathname = usePathname();
  const fieldUnitId = decodeURIComponent(pathname.split("/").pop() ?? "");
  const farmId = pathname.split("/")[pathname.split("/").length - 3];

  const totalActiveCrops = field?.crop_batches
    ? field.crop_batches.filter(
        (crop) => crop?.status && !["HARVESTED", "FAILED"].includes(crop.status)
      ).length
    : 0;

  const totalPlantedArea = field?.crop_batches
    ? field.crop_batches.reduce(
        (sum, crop) => sum + (crop?.area_planted || 0),
        0
      )
    : 0;

  // Sample field data
  const fieldInfo = {
    id: 1,
    name: "North Field A",
    type: "Crop Field",
    size: "5.2 hectares",
    capacity: 2500,
    occupancy: 2180,
    crops: 4,
    status: "active",
    soilPh: 6.8,
    moisture: 45,
    temperature: 22.3,
    lastSoilTest: "2024-08-15",
    nextSoilTest: "2024-11-15",
    constructionYear: 2020,
    lastTillage: "2024-03-10",
    description:
      "Primary crop production field with advanced irrigation system and soil monitoring. Features automated nutrient delivery and weather monitoring.",
    features: [
      "Drip irrigation system",
      "Soil moisture sensors",
      "Weather monitoring",
      "Nutrient injection system",
      "Automated scheduling",
      "Pest monitoring traps",
    ],
  };

  // Sample environmental data for charts
  const soilMoistureData = [
    { time: "00:00", value: 42 },
    { time: "04:00", value: 44 },
    { time: "08:00", value: 41 },
    { time: "12:00", value: 38 },
    { time: "16:00", value: 36 },
    { time: "20:00", value: 40 },
    { time: "Now", value: 45 },
  ];

  const temperatureData = [
    { time: "00:00", value: 18.2 },
    { time: "04:00", value: 17.1 },
    { time: "08:00", value: 19.5 },
    { time: "12:00", value: 24.8 },
    { time: "16:00", value: 26.3 },
    { time: "20:00", value: 23.1 },
    { time: "Now", value: 22.3 },
  ];

  const cropDistribution =
    field?.crop_batches?.reduce((acc, crop) => {
      if (crop?.status && !["HARVESTED", "FAILED"].includes(crop.status)) {
        const type = crop.crop_type;
        const existing = acc.find((item) => item.name === type);
        if (existing) {
          existing.value += crop.area_planted || 0;
        } else {
          acc.push({ name: type, value: crop.area_planted || 0 });
        }
      }
      return acc;
    }, [] as { name: string; value: number }[]) || [];

  const yieldData = [
    { month: "Jan", projected: 2.5, actual: 2.3 },
    { month: "Feb", projected: 3.2, actual: 3.0 },
    { month: "Mar", projected: 4.1, actual: 4.2 },
    { month: "Apr", projected: 3.8, actual: 3.9 },
    { month: "May", projected: 4.5, actual: 4.3 },
    { month: "Jun", projected: 5.2, actual: 5.1 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  // Sample maintenance history
  const maintenanceHistory = [
    {
      id: 1,
      date: "2024-08-15",
      type: "Soil Testing",
      performer: "John Smith",
      notes: "pH levels optimal, nitrogen slightly low",
    },
    {
      id: 2,
      date: "2024-07-02",
      type: "Irrigation Maintenance",
      performer: "External Contractor",
      notes: "Replaced 3 drip emitters, cleaned filters",
    },
    {
      id: 3,
      date: "2024-06-10",
      type: "Pest Control",
      performer: "Robert Johnson",
      notes: "Applied organic pesticide, set monitoring traps",
    },
    {
      id: 4,
      date: "2024-05-22",
      type: "Fertilizer Application",
      performer: "External Contractor",
      notes: "Applied NPK fertilizer, adjusted nutrient schedule",
    },
  ];

  // Sample upcoming activities
  const upcomingActivities = [
    {
      id: 1,
      date: "2024-09-25",
      type: "Harvest",
      description: "Tomato harvest - Section A",
    },
    {
      id: 2,
      date: "2024-10-10",
      type: "Soil Testing",
      description: "Quarterly soil analysis",
    },
    {
      id: 3,
      date: "2024-10-15",
      type: "Planting",
      description: "Winter crop planting - Section B",
    },
  ];

  // Tab navigation
  const [activeTab, setActiveTab] = useState("overview");

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

  // Function to get field status color
  const getFieldStatusColor = (status: string) => {
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

  // Function to get alert color
  const getAlertColor = (value: number, optimal: [number, number]) => {
    if (value >= optimal[0] && value <= optimal[1]) {
      return "text-green-500";
    } else if (value < optimal[0] * 0.8 || value > optimal[1] * 1.2) {
      return "text-red-500";
    } else {
      return "text-yellow-500";
    }
  };

  // Calculate field utilization percentage
  const calculateUtilization = (planted: number, total: number) => {
    return ((planted / total) * 100).toFixed(0);
  };

  console.log("Field Unit ID:", field);

  useEffect(() => {
    fetchField({ fieldUnitId: fieldUnitId });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          {!loadingField && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Link
                    href={`/farms/${farmId}/fields`}
                    className="mr-3 sm:mr-4"
                  >
                    <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                  </Link>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        {field?.name || "Field Details"}
                      </h1>
                      <span
                        className={`mt-1 sm:mt-0 sm:ml-4 px-2 py-1 text-xs font-medium rounded-full ${getFieldStatusColor(
                          field?.status ?? "unknown"
                        )}`}
                      >
                        {(field?.status ?? "unknown").charAt(0).toUpperCase() +
                          field?.status?.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                      {field?.soil_type} • {field?.area_hectares} ha •{" "}
                      {totalActiveCrops} active crops
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex md:hidden items-center justify-center px-3 sm:px-4 py-3 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => {
                      onOpen("crop-disease-classification", {
                        fieldId: field?.id,
                        farmTag: field?.farm?.farm_tag,
                        // @ts-expect-error err
                        cropInfo: field?.crop_batches?.[0],
                      });
                      console.log("Edit field clicked");
                    }}
                  >
                    <Edit size={14} className="mr-1 sm:mr-2" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  className="md:inline-flex hidden items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    onOpen("crop-disease-classification", {
                      fieldId: field?.id,
                      farmTag: field?.farm?.farm_tag,
                      // @ts-expect-error err
                      cropInfo: field?.crop_batches?.[0],
                    });
                    console.log("Edit field clicked");
                  }}
                >
                  <Edit size={14} className="mr-1 sm:mr-2" />
                  Edit
                </button>
                <Link
                  href={`/farms/${farmId}/fields/${field?.id}/crops`}
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Manage Crops
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        <div className="mt-2 px-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("environment")}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "environment"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Environment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("crops")}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "crops"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Crops
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("maintenance")}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "maintenance"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Tab navigation - hidden on small screens */}
      <div className="border-b border-gray-200 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("environment")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "environment"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Environment
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("crops")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "crops"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Crops
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("maintenance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "maintenance"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Maintenance
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      {!loadingField && (
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* General Info */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Field Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Details and specifications
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Field Name
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {field?.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Soil Type
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {field?.soil_type || "Not specified"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Area
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {field?.area_hectares} hectares
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Irrigation Type
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {field?.irrigation_type || "Not specified"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Drainage
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {field?.drainage || "Not specified"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm sm:mt-0 sm:col-span-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getFieldStatusColor(
                            field?.status || "unknown"
                          )}`}
                        >
                          {(field?.status || "unknown")
                            .charAt(0)
                            .toUpperCase() + field?.status?.slice(1) || "N/A"}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-5">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-3 py-3 sm:px-4 sm:py-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                        <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Active Crops
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {totalActiveCrops}
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
                        <Layers className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Utilization
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {calculateUtilization(
                              totalPlantedArea,
                              field?.area_hectares || 1
                            )}
                            %
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
                        <TestTube className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Soil pH
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {fieldInfo.soilPh}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-3 py-3 sm:px-4 sm:py-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2 sm:p-3">
                        <Droplets className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Moisture
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {fieldInfo.moisture}%
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Field Features & Systems
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                    {fieldInfo.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 sm:p-4 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-4 w-4 sm:h-6 sm:w-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">
                              {feature}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Crop Distribution and Yield Projection */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-4 sm:mb-6">
                {/* Crop Distribution */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                      Crop Distribution
                    </h3>
                  </div>
                  <div className="px-4 py-4 sm:px-6 sm:py-5">
                    {cropDistribution.length > 0 ? (
                      <div className="h-64 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={cropDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={window?.innerWidth < 640 ? 70 : 100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {cropDistribution.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => `${value} hectares`}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Sprout className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No active crops
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Plant some crops to see distribution data.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Yield Projection */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                      Yield Performance
                    </h3>
                  </div>
                  <div className="px-4 py-4 sm:px-6 sm:py-5">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yieldData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="projected"
                            fill="#3B82F6"
                            name="Projected"
                          />
                          <Bar dataKey="actual" fill="#10B981" name="Actual" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Activities */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Upcoming Activities
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {upcomingActivities.map((activity, index) => (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {index !== upcomingActivities.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              ></span>
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                  <Calendar
                                    className="h-3 w-3 sm:h-5 sm:w-5 text-white"
                                    aria-hidden="true"
                                  />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex flex-col sm:flex-row justify-between sm:space-x-4">
                                <div>
                                  <p className="text-xs sm:text-sm text-gray-900 font-medium">
                                    {activity.type}
                                  </p>
                                  <p className="text-xs sm:text-sm text-gray-500">
                                    {activity.description}
                                  </p>
                                </div>
                                <div className="text-xs sm:text-sm text-left sm:text-right whitespace-nowrap text-gray-500 mt-1 sm:mt-0">
                                  {new Date(activity.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Environment Tab */}
          {activeTab === "environment" && (
            <div>
              {/* Current environmental conditions */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Current Field Conditions
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">
                          Soil Temperature
                        </h4>
                        <Thermometer
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                            fieldInfo.temperature,
                            [18, 25]
                          )}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                          {fieldInfo.temperature}°C
                        </span>
                        <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm text-green-500">
                          Optimal range: 18-25°C
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: "75%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Cold</span>
                          <span>Optimal</span>
                          <span>Hot</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">
                          Soil Moisture
                        </h4>
                        <Droplets
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                            fieldInfo.moisture,
                            [35, 55]
                          )}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                          {fieldInfo.moisture}%
                        </span>
                        <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm text-green-500">
                          Optimal range: 35-55%
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: "70%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Dry</span>
                          <span>Optimal</span>
                          <span>Wet</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">
                          Soil pH
                        </h4>
                        <TestTube
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                            fieldInfo.soilPh,
                            [6.0, 7.5]
                          )}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                          {fieldInfo.soilPh}
                        </span>
                        <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm text-green-500">
                          Optimal range: 6.0-7.5
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: "80%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Acidic</span>
                          <span>Neutral</span>
                          <span>Alkaline</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental History */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Environmental History
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    24-hour monitoring data
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Soil Moisture Chart */}
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">
                        Soil Moisture (%)
                      </h4>
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={soilMoistureData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                            <YAxis domain={[30, 60]} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#10B981"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Temperature Chart */}
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">
                        Soil Temperature (°C)
                      </h4>
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={temperatureData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                            <YAxis domain={[15, 30]} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#F59E0B"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Test Results */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Latest Soil Test Results
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(fieldInfo.lastSoilTest).toLocaleDateString()}
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        6.8
                      </div>
                      <div className="text-sm text-gray-500">pH Level</div>
                      <div className="text-xs text-green-600 mt-1">Optimal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        2.1%
                      </div>
                      <div className="text-sm text-gray-500">Nitrogen</div>
                      <div className="text-xs text-yellow-600 mt-1">Low</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        45ppm
                      </div>
                      <div className="text-sm text-gray-500">Phosphorus</div>
                      <div className="text-xs text-green-600 mt-1">Good</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        180ppm
                      </div>
                      <div className="text-sm text-gray-500">Potassium</div>
                      <div className="text-xs text-green-600 mt-1">High</div>
                    </div>
                  </div>
                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Nitrogen levels are below optimal
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Consider applying nitrogen-rich fertilizer or
                            organic compost.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Crops Tab */}
          {activeTab === "crops" && (
            <>
              {field?.crop_batches?.length ? (
                <div>
                  {/* Crop filters and actions */}
                  <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="relative">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Filter
                          <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      <div className="w-full sm:w-auto">
                        <div className="relative rounded-md shadow-sm">
                          <input
                            type="text"
                            className="block w-full pr-8 sm:pr-10 text-xs sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Search crops..."
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg
                              className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      //   onClick={() => onOpen("add-crop-batch", { fieldUnitId })}
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Add Crop Batch
                    </Button>
                  </div>

                  {/* Crops grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {field?.crop_batches?.map((crop) => (
                      <div
                        key={crop.id}
                        className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                      >
                        <div className="px-3 py-3 sm:px-4 sm:py-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm sm:text-lg font-medium text-gray-900">
                                {crop.name}
                              </h3>
                              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                {crop.crop_type} - {crop.variety}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getCropStatusColor(
                                crop.status
                              )}`}
                            >
                              {crop.status?.charAt(0) +
                                crop.status
                                  ?.slice(1)
                                  .toLowerCase()
                                  .replace(/_/g, " ")}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-3 sm:px-4 sm:py-4">
                          <dl className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4">
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Area Planted
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {crop.area_planted} ha
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Plants Count
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {crop.plants_count}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Planted Date
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {crop.planting_date
                                  ? new Date(
                                      crop.planting_date
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Expected Yield
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {crop.expected_yield} bags
                              </dd>
                            </div>
                            {crop.planting_date && (
                              <div className="col-span-2">
                                <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                  Planting Date
                                </dt>
                                <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                  {new Date(
                                    crop.planting_date
                                  ).toLocaleDateString()}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                        <div className="px-3 py-3 sm:px-4 sm:py-4 flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                          <div className="text-xs sm:text-sm text-gray-500">
                            Method: {crop.planting_method || "Not specified"}
                          </div>
                          <Link
                            href={`/farms/${farmId}/fields/${field.id}/crops/${crop.id}`}
                            className="inline-flex items-center justify-center px-2 sm:px-3 py-1 border border-transparent text-xs sm:text-sm leading-5 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                          >
                            <Eye className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyStateFarmField
                  farmTag="1"
                  //   fieldUnitId={fieldUnitId || ""}
                  //   fieldName={field?.name || ""}
                  //   farmId={farmId}
                />
              )}
            </>
          )}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <div>
              {/* Maintenance Status */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Field Maintenance Status
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <dl className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-6">
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Field Status
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900 flex items-center">
                            <span className="text-green-500 mr-1">Active</span>
                            <Sprout className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                          </dd>
                        </div>
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Last Soil Test
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                            {new Date(
                              fieldInfo.lastSoilTest
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </dd>
                        </div>
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Next Soil Test
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                            {new Date(
                              fieldInfo.nextSoilTest
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </dd>
                        </div>
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Days Until Test
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                            {Math.ceil(
                              (new Date(fieldInfo.nextSoilTest).valueOf() -
                                new Date().valueOf()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex items-center justify-center border-t pt-4 md:pt-0 md:border-t-0 md:border-l border-gray-200 md:pl-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-green-100">
                          <TestTube className="h-8 w-8 sm:h-12 sm:w-12 text-green-600" />
                        </div>
                        <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-900">
                          Schedule soil testing?
                        </h3>
                        <div className="mt-2 sm:mt-3">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Calendar
                              className="mr-1 sm:mr-2 -ml-0.5 sm:-ml-1 h-3 w-3 sm:h-4 sm:w-4"
                              aria-hidden="true"
                            />
                            Schedule Test
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance History */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                      Field Activity History
                    </h3>
                    <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                      Recent field management activities
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-3 py-1.5 sm:py-1.5 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Download className="mr-1.5 -ml-0.5 h-3 w-3 sm:h-4 sm:w-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Activity Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Performed By
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {maintenanceHistory.map((record) => (
                        <tr key={record.id}>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {record.type}
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {record.performer}
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                            {record.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Field Management Documents */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Field Documentation
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Crop guides, soil reports, and management documentation
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <li className="col-span-1 bg-gray-50 rounded-lg shadow divide-y divide-gray-200">
                      <div className="w-full flex items-center justify-between p-4 sm:p-6 space-x-4 sm:space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Soil Test Report
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            Latest soil analysis and recommendations
                          </p>
                        </div>
                        <svg
                          className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <div className="w-0 flex-1 flex">
                            <Link
                              href="#"
                              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <span className="ml-2 sm:ml-3">View</span>
                            </Link>
                          </div>
                          <div className="-ml-px w-0 flex-1 flex">
                            <Link
                              href="#"
                              className="relative w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <span className="ml-2 sm:ml-3">Download</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="col-span-1 bg-gray-50 rounded-lg shadow divide-y divide-gray-200">
                      <div className="w-full flex items-center justify-between p-4 sm:p-6 space-x-4 sm:space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Crop Rotation Plan
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            Seasonal crop rotation strategy
                          </p>
                        </div>
                        <svg
                          className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <div className="w-0 flex-1 flex">
                            <Link
                              href="#"
                              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <span className="ml-2 sm:ml-3">View</span>
                            </Link>
                          </div>
                          <div className="-ml-px w-0 flex-1 flex">
                            <Link
                              href="#"
                              className="relative w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <span className="ml-2 sm:ml-3">Download</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="col-span-1 bg-gray-50 rounded-lg shadow divide-y divide-gray-200">
                      <div className="w-full flex items-center justify-between p-4 sm:p-6 space-x-4 sm:space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Irrigation Schedule
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            Watering schedule and system maintenance
                          </p>
                        </div>
                        <svg
                          className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <div className="w-0 flex-1 flex">
                            <Link
                              href="#"
                              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <span className="ml-2 sm:ml-3">View</span>
                            </Link>
                          </div>
                          <div className="-ml-px w-0 flex-1 flex">
                            <Link
                              href="#"
                              className="relative w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <span className="ml-2 sm:ml-3">Download</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
