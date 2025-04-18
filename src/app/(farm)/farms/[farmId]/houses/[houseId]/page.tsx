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
  Home,
  PenTool,
  Plus,
  Download,
  ChevronDown,
  Filter,
  Maximize2,
  Eye,
  Menu,
  X,
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
} from "recharts";
import Link from "next/link";
import { useFetchBarn } from "@/hooks/queries";
import { usePathname } from "next/navigation";
import { HousingStatus } from "@/graphql/generated/graphql";
import EmptyStateBarnPens from "@/components/pages/farms/barns/empty-barn-state";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HouseDetailPage() {
  const { onOpen } = useModal();
  const { barn, loadingBarn, fetchBarn } = useFetchBarn();
  const pathname = usePathname();
  const barnUnitId = pathname.split("/").pop() ?? "";
  const farmId = pathname.split("/")[pathname.split("/").length - 3];
  const router = useRouter();
  const totalOcupancy = barn?.pens
    ? barn.pens.reduce((acc, curr) => acc + curr?.livestock?.length, 0)
    : 0;

  // Sample house data
  const house = {
    id: 1,
    name: "Main Barn",
    type: "Cattle Barn",
    size: "2,500 sq ft",
    capacity: 50,
    occupancy: 42,
    rooms: 8,
    status: "operational",
    temperatureStatus: "normal",
    humidityStatus: "normal",
    ventilationStatus: "normal",
    maintenanceStatus: "good",
    lastInspection: "2024-09-01",
    nextInspection: "2024-12-01",
    constructionYear: 2018,
    renovationYear: 2022,
    temperature: 18.5,
    humidity: 65,
    description:
      "Primary cattle housing facility with milking area and individual holding pens. Features automated feeding system and temperature control.",
    features: [
      "Automated feeding system",
      "Climate control",
      "Ventilation system",
      "Water purification",
      "Emergency power backup",
      "Waste management system",
    ],
  };

  // Sample environmental data for charts
  const tempHistoryData = [
    { time: "00:00", value: 18.2 },
    { time: "04:00", value: 17.8 },
    { time: "08:00", value: 18.0 },
    { time: "12:00", value: 19.2 },
    { time: "16:00", value: 19.5 },
    { time: "20:00", value: 18.7 },
    { time: "Now", value: 18.5 },
  ];

  const humidityHistoryData = [
    { time: "00:00", value: 67 },
    { time: "04:00", value: 68 },
    { time: "08:00", value: 65 },
    { time: "12:00", value: 63 },
    { time: "16:00", value: 62 },
    { time: "20:00", value: 64 },
    { time: "Now", value: 65 },
  ];

  const animalDistribution = [
    { name: "Holstein Cattle", value: 32 },
    { name: "Jersey Cattle", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Sample maintenance history
  const maintenanceHistory = [
    {
      id: 1,
      date: "2024-08-15",
      type: "Regular Inspection",
      performer: "John Smith",
      notes: "All systems operational, replaced air filters",
    },
    {
      id: 2,
      date: "2024-07-02",
      type: "Ventilation Repair",
      performer: "External Contractor",
      notes: "Fixed air circulation system in Section D",
    },
    {
      id: 3,
      date: "2024-06-10",
      type: "Electrical Check",
      performer: "Robert Johnson",
      notes: "Annual electrical safety inspection",
    },
    {
      id: 4,
      date: "2024-05-22",
      type: "Plumbing Maintenance",
      performer: "External Contractor",
      notes: "Fixed water leak in Section B",
    },
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      date: "2024-09-25",
      type: "Regular Inspection",
      description: "Quarterly facility inspection",
    },
    {
      id: 2,
      date: "2024-10-10",
      type: "Equipment Maintenance",
      description: "Feeding system service",
    },
    {
      id: 3,
      date: "2024-10-15",
      type: "Pest Control",
      description: "Scheduled pest treatment",
    },
  ];

  // Tab navigation
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Calculate occupancy percentage
  const calculateOccupancy = (occupancy: number, capacity: number) => {
    return ((occupancy / capacity) * 100).toFixed(0);
  };

  useEffect(() => {
    fetchBarn({ barnUnitId: barnUnitId });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          {!loadingBarn && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center">
                <button onClick={() => router.back()} className="mr-3 sm:mr-4">
                  <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                </button>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {barn?.name}
                    </h1>
                    <span
                      className={`mt-1 sm:mt-0 sm:ml-4 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        barn?.status ?? "unknown"
                      )}`}
                    >
                      {(barn?.status ?? "unknown").charAt(0).toUpperCase() +
                        barn?.status?.slice(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {barn?.pens?.[0]?.livestock?.[0]?.livestock_type} •{" "}
                    {barn?.area_sqm} • {totalOcupancy} / {barn?.capacity}{" "}
                    animals
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit size={14} className="mr-1 sm:mr-2" />
                  Edit
                </button>
                <Link
                  href={`/farms/1/houses/${house.id}/rooms`}
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  View Rooms
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
        >
          {mobileMenuOpen ? (
            <>
              <X size={20} className="mr-2" />
              <span>Close Menu</span>
            </>
          ) : (
            <>
              <Menu size={20} className="mr-2" />
              <span>House Menu</span>
            </>
          )}
        </button>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="mt-2 space-y-1 px-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("overview");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
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
                setActiveTab("environment");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "environment"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Environment
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("rooms");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "rooms"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Rooms
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("maintenance");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "maintenance"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Maintenance
            </button>
          </div>
        )}
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
              onClick={() => setActiveTab("rooms")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "rooms"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rooms
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
      {!loadingBarn && (
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* General Info */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    House Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Details and specifications
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        House Name
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {barn?.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Type
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {barn?.pens?.[0]?.livestock?.[0]?.livestock_type}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Size
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {barn?.area_sqm} sq ft
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Construction Year
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {barn?.construction_date || "N/A"}
                      </dd>
                    </div>
                    {/* <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Last Renovation
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {house.renovationYear}
                      </dd>
                    </div> */}
                    <div className="bg-white px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm sm:mt-0 sm:col-span-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            barn?.status || "unknown"
                          )}`}
                        >
                          {(barn?.status || "unknown").charAt(0).toUpperCase() +
                            barn?.status?.slice(1) || "N/A"}
                        </span>
                      </dd>
                    </div>
                    {/* <div className="bg-gray-50 px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-xs sm:text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {barn?.}
                      </dd>
                    </div> */}
                  </dl>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-5">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-3 py-3 sm:px-4 sm:py-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                        <Home className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Room Count
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {barn?.pens?.length}
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
                        <Maximize2 className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Occupancy
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {calculateOccupancy(
                              house.occupancy,
                              barn?.capacity || 0
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
                        <ThermometerSnowflake className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                      </div>
                      <div className="ml-3 sm:ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            Temperature
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {house.temperature}°C
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
                            Humidity
                          </dt>
                          <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {house.humidity}%
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
                    Features & Facilities
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                    {house.features.map((feature, index) => (
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

              {/* Animal Distribution */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Animal Distribution
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={animalDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={window.innerWidth < 640 ? 70 : 100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {animalDistribution.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value} animals`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="space-y-4 sm:space-y-6 w-full max-w-md">
                        <div>
                          <h4 className="text-base sm:text-lg font-medium text-gray-900">
                            Total Capacity
                          </h4>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-xs sm:text-sm font-medium text-gray-500">
                              Current Occupancy: {house.occupancy}/
                              {house.capacity}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-gray-900">
                              {calculateOccupancy(
                                house.occupancy,
                                house.capacity
                              )}
                              %
                            </div>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{
                                width: `${calculateOccupancy(
                                  house.occupancy,
                                  house.capacity
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <dl className="divide-y divide-gray-200">
                          {animalDistribution.map((animal, index) => (
                            <div
                              key={index}
                              className="py-3 flex justify-between"
                            >
                              <dt className="text-xs sm:text-sm text-gray-500">
                                {animal.name}
                              </dt>
                              <dd className="text-xs sm:text-sm font-medium text-gray-900">
                                {animal.value} animals
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Upcoming Events
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {upcomingEvents.map((event, index) => (
                        <li key={event.id}>
                          <div className="relative pb-8">
                            {index !== upcomingEvents.length - 1 ? (
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
                                    {event.type}
                                  </p>
                                  <p className="text-xs sm:text-sm text-gray-500">
                                    {event.description}
                                  </p>
                                </div>
                                <div className="text-xs sm:text-sm text-left sm:text-right whitespace-nowrap text-gray-500 mt-1 sm:mt-0">
                                  {new Date(event.date).toLocaleDateString(
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
              {/* Current environment */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Current Environmental Conditions
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">
                          Temperature
                        </h4>
                        <ThermometerSnowflake
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                            house.temperatureStatus
                          )}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                          {house.temperature}°C
                        </span>
                        <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm text-green-500">
                          Optimal range: 17-23°C
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
                          Humidity
                        </h4>
                        <Droplets
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                            house.humidityStatus
                          )}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                          {house.humidity}%
                        </span>
                        <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm text-green-500">
                          Optimal range: 55-75%
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
                          <span>Humid</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">
                          Ventilation
                        </h4>
                        <Wind
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(
                            house.ventilationStatus
                          )}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                          Normal
                        </span>
                        <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm text-green-500">
                          System operating correctly
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: "90%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Low</span>
                          <span>Normal</span>
                          <span>High</span>
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
                    {/* Temperature Chart */}
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">
                        Temperature (°C)
                      </h4>
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={tempHistoryData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                            <YAxis domain={[16, 24]} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#3B82F6"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Humidity Chart */}
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">
                        Humidity (%)
                      </h4>
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={humidityHistoryData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                            <YAxis domain={[50, 80]} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
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

              {/* Environmental Alerts */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Environmental Alerts
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Recent alerts and notifications
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mb-3 sm:mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm text-yellow-700">
                          <span className="font-medium">Section D</span> has
                          high temperature (21.4°C) and ventilation issues
                        </p>
                        <p className="text-xs text-yellow-500 mt-1">
                          Detected 2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm text-yellow-700">
                          <span className="font-medium">Section B</span> has
                          high humidity levels (72%)
                        </p>
                        <p className="text-xs text-yellow-500 mt-1">
                          Detected 4 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === "rooms" && (
            <>
              {barn?.pens?.length ? (
                <div>
                  {/* Room filters and actions */}
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
                            placeholder="Search rooms..."
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
                      onClick={() => onOpen("add-pens-to-barn", { barnUnitId })}
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Add Room
                    </Button>
                  </div>

                  {/* Rooms grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {barn?.pens?.map((pen) => (
                      <div
                        key={pen.id}
                        className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                      >
                        <div className="px-3 py-3 sm:px-4 sm:py-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm sm:text-lg font-medium text-gray-900">
                                {pen.name}
                              </h3>
                              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                {pen.livestock?.[0]?.livestock_type}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                pen.status
                              )}`}
                            >
                              {pen.status.charAt(0).toUpperCase() +
                                pen.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-3 sm:px-4 sm:py-4">
                          <dl className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4">
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Size
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {pen.capacity} m²
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Occupancy
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {20}/{pen.capacity}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Temperature
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900 flex items-center">
                                {house?.temperature}°C
                                <ThermometerSnowflake
                                  className={`ml-1 h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(
                                    house?.temperatureStatus
                                  )}`}
                                />
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Humidity
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900 flex items-center">
                                {house.humidity}%
                                <Droplets
                                  className={`ml-1 h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(
                                    house.humidityStatus
                                  )}`}
                                />
                              </dd>
                            </div>
                            <div className="col-span-2">
                              <dt className="text-xs sm:text-sm font-medium text-gray-500">
                                Animal Types
                              </dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {pen?.livestock
                                  ?.map(
                                    (livestock) => livestock?.livestock_type
                                  )
                                  .join(", ")}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className="px-3 py-3 sm:px-4 sm:py-4 flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                          <div className="text-xs sm:text-sm text-gray-500">
                            Last cleaned:{" "}
                            {new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <Link
                            href={`/farms/${farmId}/houses/${barn.id}/rooms/${pen.id}`}
                            className="inline-flex items-center justify-center px-2 sm:px-3 py-1 border border-transparent text-xs sm:text-sm leading-5 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                          >
                            <Eye className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyStateBarnPens
                  barnUnitId={barnUnitId || ""}
                  barnName={barn?.name || ""}
                  farmId={farmId}
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
                    Maintenance Status
                  </h3>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <dl className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-6">
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Overall Status
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900 flex items-center">
                            <span
                              className={`mr-1 ${getAlertColor(
                                house.maintenanceStatus
                              )}`}
                            >
                              {house.maintenanceStatus.charAt(0).toUpperCase() +
                                house.maintenanceStatus.slice(1)}
                            </span>
                            <PenTool
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(
                                house.maintenanceStatus
                              )}`}
                            />
                          </dd>
                        </div>
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Last Inspection
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                            {new Date(house.lastInspection).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </dd>
                        </div>
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Next Inspection
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                            {new Date(house.nextInspection).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </dd>
                        </div>
                        <div className="col-span-1">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500">
                            Days Remaining
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                            {Math.ceil(
                              (new Date(house.nextInspection).valueOf() -
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
                          <PenTool className="h-8 w-8 sm:h-12 sm:w-12 text-green-600" />
                        </div>
                        <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-900">
                          Need to schedule maintenance?
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
                            Schedule Maintenance
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
                      Maintenance History
                    </h3>
                    <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                      Recent maintenance activities
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
                          Type
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

              {/* Maintenance Documents */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Documentation
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Maintenance manuals and documentation
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <li className="col-span-1 bg-gray-50 rounded-lg shadow divide-y divide-gray-200">
                      <div className="w-full flex items-center justify-between p-4 sm:p-6 space-x-4 sm:space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Equipment Manual
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            Feeding system operation and maintenance
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
                              Maintenance Checklist
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            Daily and weekly maintenance procedures
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
                              Troubleshooting Guide
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            Common issues and solutions
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
