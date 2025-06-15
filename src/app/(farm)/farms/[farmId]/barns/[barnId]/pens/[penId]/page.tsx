"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  ThermometerSnowflake,
  Droplets,
  Wind,
  AlertTriangle,
  Calendar,
  Users,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

import { useFetchPen } from "@/hooks/queries";
import { usePathname, useRouter } from "next/navigation";
import { HealthStatus, HousingStatus } from "@/graphql/generated/graphql";
import EmptyStateLivestockUI from "@/components/pages/farms/barns/empty-livestockin-pen-state";
import formatDateOfBirth from "@/components/common/format-date-of-birth";
import { useModal } from "@/hooks/use-modal-store";
export default function RoomDetailPage() {
  const { pen, fetchPen } = useFetchPen();
  const pathname = usePathname();
  const router = useRouter();
  const penUnitId = decodeURIComponent(pathname.split("/").pop() || "");
  const barnId = pathname.split("/")[pathname.split("/").length - 3];
  const farmId = pathname.split("/")[pathname.split("/").length - 5];
  const { onOpen } = useModal();
  // Sample parent house data

  const room = {
    id: 101,
    name: "Section A",
    type: "Holding Pen",
    size: "600 sq ft",
    capacity: 15,
    occupancy: 12,
    status: "operational",
    temperatureStatus: "normal",
    humidityStatus: "normal",
    ventilationStatus: "normal",
    temperature: 18.2,
    humidity: 64,
    airQuality: "Good",
    lightLevel: "Adequate",
    noiseLevel: "Low",
    lastCleaned: "2024-09-10",
    nextCleaning: "2024-09-17",
    createdAt: "2018-05-15",
    lastModified: "2024-06-22",
    description:
      "Primary holding pen for Holstein cattle. Features automated water dispensers and temperature monitoring.",
    animalTypes: ["Holstein Cattle"],
    features: [
      "Automated water dispensers",
      "Temperature sensors",
      "Ventilation control",
      "Automatic feeders",
      "Waste management",
    ],
  };

  // Sample animals in room
  const animals = [
    {
      id: "HC-001",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1450 lbs",
      status: "Healthy",
    },
    {
      id: "HC-002",
      type: "Holstein Cattle",
      gender: "Female",
      age: "4 years",
      weight: "1520 lbs",
      status: "Healthy",
    },
    {
      id: "HC-003",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1480 lbs",
      status: "Healthy",
    },
    {
      id: "HC-004",
      type: "Holstein Cattle",
      gender: "Female",
      age: "5 years",
      weight: "1550 lbs",
      status: "Monitoring",
    },
    {
      id: "HC-005",
      type: "Holstein Cattle",
      gender: "Female",
      age: "2 years",
      weight: "1320 lbs",
      status: "Healthy",
    },
    {
      id: "HC-006",
      type: "Holstein Cattle",
      gender: "Female",
      age: "4 years",
      weight: "1510 lbs",
      status: "Healthy",
    },
    {
      id: "HC-007",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1470 lbs",
      status: "Healthy",
    },
    {
      id: "HC-008",
      type: "Holstein Cattle",
      gender: "Female",
      age: "6 years",
      weight: "1580 lbs",
      status: "Treatment",
    },
    {
      id: "HC-009",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1460 lbs",
      status: "Healthy",
    },
    {
      id: "HC-010",
      type: "Holstein Cattle",
      gender: "Female",
      age: "4 years",
      weight: "1500 lbs",
      status: "Healthy",
    },
    {
      id: "HC-011",
      type: "Holstein Cattle",
      gender: "Female",
      age: "2 years",
      weight: "1350 lbs",
      status: "Healthy",
    },
    {
      id: "HC-012",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1440 lbs",
      status: "Healthy",
    },
  ];

  // Sample environmental data for charts

  // Sample weekly temperature data
  const weeklyTempData = [
    { day: "Mon", min: 17.5, max: 18.7, avg: 18.1 },
    { day: "Tue", min: 17.6, max: 18.9, avg: 18.2 },
    { day: "Wed", min: 17.4, max: 18.8, avg: 18.0 },
    { day: "Thu", min: 17.3, max: 18.6, avg: 17.9 },
    { day: "Fri", min: 17.5, max: 18.5, avg: 18.0 },
    { day: "Sat", min: 17.6, max: 18.4, avg: 18.1 },
    { day: "Sun", min: 17.7, max: 18.3, avg: 18.2 },
  ];

  // Sample maintenance history
  const maintenanceHistory = [
    {
      id: 1,
      date: "2024-09-10",
      type: "Cleaning",
      performer: "John Smith",
      notes: "Regular weekly cleaning",
    },
    {
      id: 2,
      date: "2024-09-03",
      type: "Cleaning",
      performer: "Maria Garcia",
      notes: "Regular weekly cleaning",
    },
    {
      id: 3,
      date: "2024-08-27",
      type: "Cleaning",
      performer: "John Smith",
      notes: "Regular weekly cleaning",
    },
    {
      id: 4,
      date: "2024-08-20",
      type: "Maintenance",
      performer: "Technical Team",
      notes: "Sensor calibration and ventilation check",
    },
    {
      id: 5,
      date: "2024-08-20",
      type: "Cleaning",
      performer: "Maria Garcia",
      notes: "Regular weekly cleaning",
    },
  ];

  // Tab navigation
  const [activeTab, setActiveTab] = useState("overview");

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case HousingStatus.Operational:
        return "bg-green-100 text-green-800";
      case HousingStatus.Maintenance:
        return "bg-yellow-100 text-yellow-800";
      case HousingStatus.Empty:
        return "bg-blue-100 text-blue-800";
      case HousingStatus.Full:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get alert color
  const getAlertColor = (status: string) => {
    switch (status) {
      case "normal":
      case "good":
        return "text-green-500";
      case "high":
      case "low":
      case "alert":
      case "needs attention":
        return "text-yellow-500";
      case "critical":
      case "under repair":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const penOccupancy = pen?.livestock?.length;

  // Function to get animal status color
  const getAnimalStatusColor = (status: string) => {
    switch (status) {
      case HealthStatus.Healthy:
        return "bg-green-100 text-green-800";
      case HealthStatus.Recovering:
        return "bg-yellow-100 text-yellow-800";
      case HealthStatus.Treated:
        return "bg-orange-100 text-orange-800";
      case HealthStatus.Sick:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate occupancy percentage
  const calculateOccupancy = (occupancy: number, capacity: number) => {
    return ((occupancy / capacity) * 100).toFixed(0);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }

    if (penUnitId) {
      fetchPen({ penUnitId: penUnitId || "" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link
                  href={`/farms/${farmId}/barns/${barnId}/pens`}
                  className="mr-3 sm:mr-4"
                >
                  <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                </Link>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {pen?.name}
                    </h1>
                    <span
                      className={`mt-1 sm:mt-0 sm:ml-4 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        pen?.status || "unknown"
                      )}`}
                    >
                      {(pen?.status || "unknown")?.charAt(0).toUpperCase() +
                        (pen?.status || "unknown").slice(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {pen?.area_sqm}sqm • {penOccupancy} / {pen?.capacity}{" "}
                    animals
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex md:hidden items-center justify-center px-3 py-3 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => {
                  onOpen("update-pen", {
                    penUnitId: penUnitId,
                    pen: pen,
                  });
                }}
              >
                <Edit size={14} className="mr-1.5 sm:mr-2" />
                Edit
              </button>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                className="md:inline-flex hidden items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => {
                  onOpen("update-pen", {
                    penUnitId: penUnitId,
                    pen: pen,
                  });
                }}
              >
                <Edit size={14} className="mr-1.5 sm:mr-2" />
                Edit
              </button>
              <Link
                href={`/farms/${farmId}/barns/${barnId}/pens/${pen?.unit_id}/animals`}
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <Users size={14} className="mr-1.5 sm:mr-2" />
                View Animals
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t  border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        {/* Mobile dropdown menu */}

        <div className="mt-2 space-y-1 px-2 flex flex-row flex-wrap gap-2 justify-around">
          <button
            type="button"
            onClick={() => {
              setActiveTab("overview");
            }}
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
            onClick={() => {
              setActiveTab("animals");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "animals"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Animals
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("maintenance");
            }}
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
              onClick={() => setActiveTab("animals")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "animals"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Animals
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
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-5">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:px-4 sm:py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                      <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          Occupancy
                        </dt>
                        <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                          {calculateOccupancy(
                            penOccupancy || 0,
                            pen?.capacity || 0
                          )}
                          %
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">
                      {penOccupancy} of {pen?.capacity} capacity
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:px-4 sm:py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2 sm:p-3">
                      <ThermometerSnowflake className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          Temperature
                        </dt>
                        <dd className="flex items-center">
                          <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {room.temperature}°C
                          </span>
                          <ThermometerSnowflake
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor(
                              room.temperatureStatus
                            )}`}
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Optimal range: 17-23°C</p>
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
                          Humidity
                        </dt>
                        <dd className="flex items-center">
                          <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {room.humidity}%
                          </span>
                          <Droplets
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor(
                              room.humidityStatus
                            )}`}
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Optimal range: 55-75%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:px-4 sm:py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                      <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          Last Cleaned
                        </dt>
                        <dd className="text-sm sm:text-lg md:text-2xl font-semibold text-gray-900">
                          {formatDate(room.lastCleaned)}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">
                      Next: {formatDate(room.nextCleaning)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Info */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Room Information
                </h3>
                <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                  Details and specifications
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Room Name
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {pen?.name}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Size
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {pen?.capacity}
                    </dd>
                  </div>

                  <div className="bg-white px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm sm:mt-0 sm:col-span-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          pen?.status || "unknown"
                        )}`}
                      >
                        {(pen?.status || "unknown").charAt(0).toUpperCase() +
                          pen?.status.slice(1)}
                      </span>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Animal Types
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {pen?.livestock?.length
                        ? Array.from(
                            new Set(
                              pen?.livestock?.map(
                                (livestock) =>
                                  livestock.livestock_type.charAt(0) +
                                  livestock.livestock_type
                                    .slice(1)
                                    .toLowerCase()
                              )
                            )
                          ).join(", ")
                        : "None"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Features & Facilities
                </h3>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                  {room.features.map((feature, index) => (
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

            {/* Environmental Summary */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Environmental Summary
                </h3>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Temperature
                      </h4>
                      <ThermometerSnowflake
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                          room.temperatureStatus
                        )}`}
                      />
                    </div>
                    <p className="text-lg sm:text-2xl font-semibold">
                      {room.temperature}°C
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Humidity
                      </h4>
                      <Droplets
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                          room.humidityStatus
                        )}`}
                      />
                    </div>
                    <p className="text-lg sm:text-2xl font-semibold">
                      {room.humidity}%
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Air Quality
                      </h4>
                      <Wind
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                          "normal"
                        )}`}
                      />
                    </div>
                    <p className="text-lg sm:text-2xl font-semibold">
                      {room.airQuality}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Light Level
                      </h4>
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-2xl font-semibold">
                      {room.lightLevel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Temperature Chart */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Weekly Temperature Range
                </h3>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="h-48 sm:h-64 md:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyTempData}
                      margin={{
                        top: 20,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis domain={[16, 20]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="min" name="Min Temp (°C)" fill="#94a3b8" />
                      <Bar dataKey="avg" name="Avg Temp (°C)" fill="#3b82f6" />
                      <Bar dataKey="max" name="Max Temp (°C)" fill="#1e40af" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animals Tab */}
        {activeTab === "animals" && (
          <>
            {" "}
            {pen?.livestock?.length ? (
              <div>
                <>
                  {/* Animal stats */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-5">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-3 py-3 sm:px-4 sm:py-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                            <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                          </div>
                          <div className="ml-3 sm:ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                                Animal Count
                              </dt>
                              <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                                {pen?.livestock?.length}
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                        <div className="text-xs sm:text-sm">
                          <p className="text-gray-500">
                            Capacity: {pen.capacity}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-3 py-3 sm:px-4 sm:py-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                            <svg
                              className="h-4 w-4 sm:h-6 sm:w-6 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 sm:ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                                Healthy
                              </dt>
                              <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                                {
                                  pen.livestock.filter(
                                    (animal) =>
                                      animal.health_status ===
                                      HealthStatus.Healthy
                                  ).length
                                }
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                        <div className="text-xs sm:text-sm">
                          <p className="text-gray-500">
                            {(
                              (pen.livestock.filter(
                                (animal) =>
                                  animal.health_status === HealthStatus.Healthy
                              ).length /
                                pen.livestock.length) *
                              100
                            ).toFixed(0)}
                            % of animals
                          </p>
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
                                Needs Attention
                              </dt>
                              <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                                {
                                  animals.filter(
                                    (animal) =>
                                      animal.status === "Monitoring" ||
                                      animal.status === "Treatment"
                                  ).length
                                }
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                        <div className="text-xs sm:text-sm">
                          <p className="text-gray-500">
                            Monitoring:{" "}
                            {
                              animals.filter(
                                (animal) => animal.status === "Monitoring"
                              ).length
                            }
                            , Treatment:{" "}
                            {
                              animals.filter(
                                (animal) => animal.status === "Treatment"
                              ).length
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-3 py-3 sm:px-4 sm:py-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2 sm:p-3">
                            <svg
                              className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 sm:ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                                Avg Weight
                              </dt>
                              <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                                {(
                                  pen?.livestock?.reduce(
                                    (acc, animal) =>
                                      acc +
                                      parseInt((animal?.weight).toString()),
                                    0
                                  ) / (pen?.livestock?.length || 1)
                                ).toFixed(0)}{" "}
                                lbs
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                        <div className="text-xs sm:text-sm">
                          <p className="text-gray-500">
                            Range: 1,320 - 1,580 lbs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search and filter */}
                  <div className="bg-white shadow sm:rounded-lg mb-4 sm:mb-6">
                    <div className="px-3 py-3 sm:px-4 sm:py-5">
                      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
                        <div className="relative flex-grow">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                          <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
                            placeholder="Search animals by ID or type..."
                          />
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                          <div>
                            <select
                              className="block w-full pl-3 pr-10 py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                              defaultValue="all"
                            >
                              <option value="all">All Types</option>
                              <option value="holstein">Holstein Cattle</option>
                              <option value="jersey">Jersey Cattle</option>
                            </select>
                          </div>
                          <div>
                            <select
                              className="block w-full pl-3 pr-10 py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                              defaultValue="all"
                            >
                              <option value="all">All Statuses</option>
                              <option value="healthy">Healthy</option>
                              <option value="monitoring">Monitoring</option>
                              <option value="treatment">Treatment</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                            onClick={() => {
                              onOpen("add-livestock-to-pen", {
                                penUnitId,
                              });
                            }}
                          >
                            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Add Animal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animals table */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                          Animals in {pen.name}
                        </h3>
                        <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                          {pen?.livestock?.length} animals •{" "}
                          {pen?.livestock.length > 0
                            ? Array.from(
                                new Set(
                                  pen?.livestock?.map(
                                    (livestock) =>
                                      livestock.livestock_type.charAt(0) +
                                      livestock.livestock_type
                                        .slice(1)
                                        .toLowerCase()
                                  )
                                )
                              ).join(", ")
                            : "None"}
                        </p>
                      </div>
                      <button className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                        Export
                      </button>
                    </div>
                    <div className="overflow-hidden overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Gender
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Age
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Weight
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {pen?.livestock?.map((livestock) => (
                            <tr key={livestock?.id}>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                {livestock?.livestock_tag.toUpperCase()}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                {livestock.livestock_type.charAt(0) +
                                  livestock.livestock_type
                                    .slice(1)
                                    .toLowerCase()}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                {livestock?.gender.charAt(0) +
                                  livestock.gender.slice(1).toLowerCase()}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                {formatDateOfBirth(livestock?.birth_date)}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                {livestock?.weight}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getAnimalStatusColor(
                                    livestock?.health_status
                                  )}`}
                                >
                                  {livestock.health_status.charAt(0) +
                                    livestock.health_status
                                      .slice(1)
                                      .toLowerCase()}
                                </span>
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                                <div className="flex justify-end space-x-2 sm:space-x-3">
                                  <Link
                                    href={`/farms/${farmId}/livestock/${livestock.livestock_tag}`}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    View
                                  </Link>
                                  <Link
                                    href={`/farms/${farmId}/livestock/${livestock.livestock_tag}/edit`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    type="button"
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Move
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-white px-3 py-3 sm:px-4 sm:py-3 flex items-center justify-between border-t border-gray-200">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <Link
                          href="#"
                          className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Previous
                        </Link>
                        <Link
                          href="#"
                          className="ml-3 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Next
                        </Link>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{" "}
                            <span className="font-medium">
                              {animals.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">
                              {animals.length}
                            </span>{" "}
                            animals
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                          >
                            <Link
                              href="#"
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                              <span className="sr-only">Previous</span>
                              <svg
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                            <Link
                              href="#"
                              aria-current="page"
                              className="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-xs sm:text-sm font-medium"
                            >
                              1
                            </Link>
                            <Link
                              href="#"
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                              <span className="sr-only">Next</span>
                              <svg
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            ) : (
              <EmptyStateLivestockUI penUnitId={pen?.unit_id || ""} />
            )}
          </>
        )}

        {/* Maintenance Tab */}
        {activeTab === "maintenance" && (
          <div>
            {/* Add content for maintenance tab here */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Maintenance History
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Recent maintenance activities
                  </p>
                </div>
                <button className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                  Export Log
                </button>
              </div>
              <div className="overflow-hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Performed By
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {maintenanceHistory.map((record) => (
                      <tr key={record.id}>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {record.type}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {record.performer}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm text-gray-500">
                          {record.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule Maintenance */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Schedule Maintenance
                </h3>
                <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                  Plan upcoming maintenance activities
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label
                      htmlFor="maintenance-type"
                      className="block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Maintenance Type
                    </label>
                    <select
                      id="maintenance-type"
                      name="maintenance-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option>Cleaning</option>
                      <option>Equipment Check</option>
                      <option>Sensor Calibration</option>
                      <option>Ventilation Service</option>
                      <option>General Inspection</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="scheduled-date"
                      className="block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Scheduled Date
                    </label>
                    <input
                      type="date"
                      name="scheduled-date"
                      id="scheduled-date"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="assigned-to"
                      className="block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Assigned To
                    </label>
                    <select
                      id="assigned-to"
                      name="assigned-to"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option>John Smith</option>
                      <option>Maria Garcia</option>
                      <option>Robert Johnson</option>
                      <option>Technical Team</option>
                      <option>External Contractor</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <label
                      htmlFor="notes"
                      className="block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
                      placeholder="Add any special instructions or notes"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            </div>

            {/* Maintenance Guidelines */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Maintenance Guidelines
                </h3>
                <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                  Standard procedures and recommendations
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="prose prose-sm max-w-none">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    Recommended Maintenance Schedule
                  </h4>
                  <ul className="mt-2 text-xs sm:text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>
                      Weekly cleaning: Floors, water dispensers, feeding areas
                    </li>
                    <li>
                      Monthly inspection: Ventilation system, temperature
                      sensors, lighting
                    </li>
                    <li>
                      Quarterly maintenance: Deep cleaning, equipment
                      calibration
                    </li>
                    <li>
                      Bi-annual inspection: Structural integrity, electrical
                      systems
                    </li>
                  </ul>

                  <h4 className="mt-4 text-sm sm:text-base font-medium text-gray-900">
                    Cleaning Procedures
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-gray-700">
                    All cleaning should use approved non-toxic chemicals
                    suitable for agricultural environments. Ensure proper
                    ventilation during cleaning procedures. Document all
                    activities in the maintenance log, including any
                    observations or issues encountered.
                  </p>

                  <h4 className="mt-4 text-sm sm:text-base font-medium text-gray-900">
                    Emergency Maintenance
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-gray-700">
                    For urgent issues affecting animal welfare or environmental
                    conditions, contact the emergency maintenance team at
                    extension 5500 or via the farm management app. Always
                    prioritize animal safety and welfare when responding to
                    maintenance issues.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-3 sm:mb-0"
                  >
                    <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                    Maintenance Manual
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                    Cleaning Protocols
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
