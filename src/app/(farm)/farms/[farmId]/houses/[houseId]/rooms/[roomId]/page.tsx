"use client";
import React, { useState } from "react";
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
  Thermometer,
  Check,
  Menu,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
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

export default function RoomDetailPage() {
  // Sample room data
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

  // Sample parent house data
  const house = {
    id: 1,
    name: "Main Barn",
    type: "Cattle Barn",
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
  const tempHistoryData = [
    { time: "00:00", temperature: 18.2, humidity: 64, target: 18.0 },
    { time: "02:00", temperature: 17.9, humidity: 65, target: 18.0 },
    { time: "04:00", temperature: 17.8, humidity: 66, target: 18.0 },
    { time: "06:00", temperature: 17.6, humidity: 67, target: 18.0 },
    { time: "08:00", temperature: 17.9, humidity: 66, target: 18.0 },
    { time: "10:00", temperature: 18.2, humidity: 65, target: 18.0 },
    { time: "12:00", temperature: 18.5, humidity: 64, target: 18.0 },
    { time: "14:00", temperature: 18.7, humidity: 63, target: 18.0 },
    { time: "16:00", temperature: 18.5, humidity: 63, target: 18.0 },
    { time: "18:00", temperature: 18.4, humidity: 64, target: 18.0 },
    { time: "20:00", temperature: 18.3, humidity: 64, target: 18.0 },
    { time: "22:00", temperature: 18.2, humidity: 64, target: 18.0 },
    { time: "Now", temperature: 18.2, humidity: 64, target: 18.0 },
  ];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "under construction":
        return "bg-blue-100 text-blue-800";
      case "closed":
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

  // Function to get animal status color
  const getAnimalStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-800";
      case "Monitoring":
        return "bg-yellow-100 text-yellow-800";
      case "Treatment":
        return "bg-orange-100 text-orange-800";
      case "Critical":
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center">
              <Link
                href={`/farms/1/houses/${house.id}/rooms`}
                className="mr-3 sm:mr-4"
              >
                <ArrowLeft className="text-gray-500 hover:text-gray-700" />
              </Link>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {room.name}
                  </h1>
                  <span
                    className={`mt-1 sm:mt-0 sm:ml-4 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(room.status)}`}
                  >
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  {room.type} • {house.name} • {room.size} • {room.occupancy} /{" "}
                  {room.capacity} animals
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit size={14} className="mr-1.5 sm:mr-2" />
                Edit
              </button>
              <Link
                href={`/farms/1/houses/${house.id}/rooms/${room.id}/animals`}
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
              <span>Room Menu</span>
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
                setActiveTab("animals");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
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
                          {calculateOccupancy(room.occupancy, room.capacity)}%
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">
                      {room.occupancy} of {room.capacity} capacity
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
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor(room.temperatureStatus)}`}
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
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor(room.humidityStatus)}`}
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
                      {room.name}
                    </dd>
                  </div>
                  <div className="bg-white px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Type
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {room.type}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Size
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {room.size}
                    </dd>
                  </div>
                  <div className="bg-white px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Created Date
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(room.createdAt)}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Last Modified
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(room.lastModified)}
                    </dd>
                  </div>
                  <div className="bg-white px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm sm:mt-0 sm:col-span-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(room.status)}`}
                      >
                        {room.status.charAt(0).toUpperCase() +
                          room.status.slice(1)}
                      </span>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Animal Types
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {room.animalTypes.length > 0
                        ? room.animalTypes.join(", ")
                        : "None"}
                    </dd>
                  </div>
                  <div className="bg-white px-3 py-3 sm:px-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {room.description}
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
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(room.temperatureStatus)}`}
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
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(room.humidityStatus)}`}
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
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor("normal")}`}
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

        {/* Environment Tab */}
        {activeTab === "environment" && (
          <div>
            {/* Current environmental readings */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-5">
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
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor(room.temperatureStatus)}`}
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Target: 18.0°C</p>
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
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor(room.humidityStatus)}`}
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Optimal: 55-75%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:px-4 sm:py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-cyan-100 rounded-md p-2 sm:p-3">
                      <Wind className="h-4 w-4 sm:h-6 sm:w-6 text-cyan-600" />
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          Air Quality
                        </dt>
                        <dd className="flex items-center">
                          <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {room.airQuality}
                          </span>
                          <Wind
                            className={`ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5 ${getAlertColor("normal")}`}
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Ventilation: Normal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:px-4 sm:py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-amber-100 rounded-md p-2 sm:p-3">
                      <svg
                        className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600"
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
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          Light Level
                        </dt>
                        <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                          {room.lightLevel}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">UV Index: Low</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature and Humidity Chart */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  24-Hour Temperature & Humidity
                </h3>
                <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                  Environmental readings for the past 24 hours
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="h-48 sm:h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={tempHistoryData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                      <YAxis
                        yAxisId="left"
                        domain={[16, 22]}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[50, 80]}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="temperature"
                        name="Temperature (°C)"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="target"
                        name="Target Temp (°C)"
                        stroke="#ef4444"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="humidity"
                        name="Humidity (%)"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Environmental Controls */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 sm:mb-6">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Environmental Controls
                </h3>
                <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                  Adjust and monitor room environmental settings
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                  {/* Temperature Control */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Temperature Control
                      </h4>
                      <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Current: {room.temperature}°C
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Target: 18.0°C
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="17"
                          max="23"
                          step="0.5"
                          defaultValue="18"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex text-xs text-gray-500 justify-between mt-1">
                          <span>17°C</span>
                          <span>20°C</span>
                          <span>23°C</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                        Apply
                      </button>
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Auto
                      </button>
                    </div>
                  </div>

                  {/* Ventilation Control */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Ventilation Control
                      </h4>
                      <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Current: Normal
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Mode: Auto
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          defaultValue="3"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex text-xs text-gray-500 justify-between mt-1">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                        Apply
                      </button>
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Auto
                      </button>
                    </div>
                  </div>

                  {/* Lighting Control */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Lighting Control
                      </h4>
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
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
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Current: {room.lightLevel}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Schedule: Active
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="10"
                          defaultValue="70"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex text-xs text-gray-500 justify-between mt-1">
                          <span>Off</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                        Apply
                      </button>
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Schedule
                      </button>
                    </div>
                  </div>

                  {/* Humidity Control */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        Humidity Control
                      </h4>
                      <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Current: {room.humidity}%
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Target: 65%
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="50"
                          max="80"
                          step="5"
                          defaultValue="65"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex text-xs text-gray-500 justify-between mt-1">
                          <span>50%</span>
                          <span>65%</span>
                          <span>80%</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                        Apply
                      </button>
                      <button className="inline-flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Auto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Alerts */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                    Recent Alerts
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    Environmental notifications from the past 7 days
                  </p>
                </div>
                <button className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                  Export Log
                </button>
              </div>
              <div className="px-3 py-3 sm:px-4 sm:py-5">
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-100 flex items-center justify-center ring-8 ring-white">
                              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-xs sm:text-sm">
                                <Link
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  High Humidity Alert
                                </Link>
                              </div>
                              <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                                Humidity reached 72% (threshold: 70%)
                              </p>
                            </div>
                            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">
                              <p>
                                Automatic ventilation increase initiated. System
                                monitoring humidity levels.
                              </p>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              <span>Sep 12, 2024 - 14:32</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-xs sm:text-sm">
                                <Link
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  Temperature Normalized
                                </Link>
                              </div>
                              <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                                Temperature returned to target range: 18.2°C
                              </p>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              <span>Sep 11, 2024 - 08:15</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-100 flex items-center justify-center ring-8 ring-white">
                              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-xs sm:text-sm">
                                <Link
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  Low Temperature Alert
                                </Link>
                              </div>
                              <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                                Temperature dropped to 17.1°C (threshold:
                                17.5°C)
                              </p>
                            </div>
                            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">
                              <p>
                                Heating system activated. Temperature recovery
                                in progress.
                              </p>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              <span>Sep 10, 2024 - 23:47</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative">
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                              <svg
                                className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-xs sm:text-sm">
                                <Link
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  Environmental Settings Updated
                                </Link>
                              </div>
                              <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                                Weekly settings update applied
                              </p>
                            </div>
                            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">
                              <p>
                                Temperature target: 18.0°C, Humidity target:
                                65%, Light cycle: 16/8
                              </p>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              <span>Sep 10, 2024 - 08:00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animals Tab */}
        {activeTab === "animals" && (
          <div>
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
                          {animals.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Capacity: {room.capacity}</p>
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
                            animals.filter(
                              (animal) => animal.status === "Healthy",
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
                        (animals.filter((animal) => animal.status === "Healthy")
                          .length /
                          animals.length) *
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
                                animal.status === "Treatment",
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
                          (animal) => animal.status === "Monitoring",
                        ).length
                      }
                      , Treatment:{" "}
                      {
                        animals.filter(
                          (animal) => animal.status === "Treatment",
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
                            animals.reduce(
                              (acc, animal) => acc + parseInt(animal.weight),
                              0,
                            ) / animals.length
                          ).toFixed(0)}{" "}
                          lbs
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm">
                    <p className="text-gray-500">Range: 1,320 - 1,580 lbs</p>
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
                    Animals in {room.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
                    {animals.length} animals • {room.animalTypes.join(", ")}
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
                    {animals.map((animal) => (
                      <tr key={animal.id}>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                          {animal.id}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {animal.type}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {animal.gender}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {animal.age}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {animal.weight}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getAnimalStatusColor(animal.status)}`}
                          >
                            {animal.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                          <div className="flex justify-end space-x-2 sm:space-x-3">
                            <Link
                              href={`/farms/1/animals/${animal.id}`}
                              className="text-green-600 hover:text-green-900"
                            >
                              View
                            </Link>
                            <Link
                              href={`/farms/1/animals/${animal.id}/edit`}
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
                      <span className="font-medium">{animals.length}</span> of{" "}
                      <span className="font-medium">{animals.length}</span>{" "}
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
          </div>
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
