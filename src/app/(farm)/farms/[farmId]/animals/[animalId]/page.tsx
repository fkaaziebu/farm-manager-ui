"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Filter,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Edit,
  Download,
  Share,
  Printer,
  PlusCircle,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useFetchFarms } from "@/hooks/queries";
import { Animal, BreedingStatus } from "@/graphql/generated/graphql";
import { usePathname, useRouter } from "next/navigation";
import formatDateOfBirth from "@/components/common/format-date-of-birth";
import { formatDate } from "@/components/common";
import {
  EmptyStateBreeding,
  EmptyStateExpenses,
  EmptyStateFeedManagement,
  EmptyStateGrowthPage,
  EmptyStateHealthPage,
} from "@/components/pages/farms/animals";
import { set } from "react-hook-form";

type AnimalProp = NonNullable<Animal>;

export default function AnimalDetailsPage() {
  // Record types
  const [activeTab, setActiveTab] = useState("breeding");

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const { farms, fetchFarms } = useFetchFarms();
  const [animalRecords, setAnimalRecords] = useState<Array<AnimalProp>>([]);
  const [tagNumber, setTagNumber] = useState<string>("");
  const pathname = usePathname();
  const farmId = pathname.split("/")[2];
  const animalId = pathname.split("/").pop();
  const router = useRouter();
  // Action menu state
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Sample breeding records
  const breedingRecords = [
    {
      id: 1,
      date: "2024-08-15",
      type: "Artificial Insemination",
      success: true,
      notes: "Successfully inseminated",
      technician: "Dr. Emily Davis",
    },
    {
      id: 2,
      date: "2024-06-10",
      type: "Natural Breeding",
      success: true,
      notes: "Healthy calf born",
      technician: "John Smith",
    },
    {
      id: 3,
      date: "2024-02-22",
      type: "Artificial Insemination",
      success: false,
      notes: "Unsuccessful attempt",
      technician: "Dr. Emily Davis",
    },
    {
      id: 4,
      date: "2023-11-05",
      type: "Natural Breeding",
      success: true,
      notes: "Twin calves born",
      technician: "John Smith",
    },
  ];

  // Sample health records
  const healthRecords = [
    {
      id: 1,
      date: "2024-09-05",
      type: "Vaccination",
      diagnosis: "Routine",
      treatment: "Annual vaccines administered",
      vet: "Dr. Michael Johnson",
    },
    {
      id: 2,
      date: "2024-07-12",
      type: "Checkup",
      diagnosis: "Healthy",
      treatment: "No treatment needed",
      vet: "Dr. Emily Davis",
    },
    {
      id: 3,
      date: "2024-04-03",
      type: "Illness",
      diagnosis: "Mild infection",
      treatment: "Antibiotics for 7 days",
      vet: "Dr. Michael Johnson",
    },
    {
      id: 4,
      date: "2023-12-15",
      type: "Injury",
      diagnosis: "Leg sprain",
      treatment: "Rest and anti-inflammatory medication",
      vet: "Dr. Emily Davis",
    },
  ];

  // Sample growth records for chart
  const growthData = [
    { month: "Jan", weight: 420 },
    { month: "Feb", weight: 435 },
    { month: "Mar", weight: 448 },
    { month: "Apr", weight: 460 },
    { month: "May", weight: 475 },
    { month: "Jun", weight: 490 },
    { month: "Jul", weight: 505 },
    { month: "Aug", weight: 520 },
    { month: "Sep", weight: 535 },
  ];

  // Sample expense records
  const expenseRecords = [
    {
      id: 1,
      date: "2024-09-10",
      category: "Feed",
      amount: 250,
      description: "Monthly feed supply",
    },
    {
      id: 2,
      date: "2024-08-15",
      category: "Healthcare",
      amount: 180,
      description: "Vaccination and checkup",
    },
    {
      id: 3,
      date: "2024-07-22",
      category: "Equipment",
      amount: 75,
      description: "New halter and grooming supplies",
    },
    {
      id: 4,
      date: "2024-06-05",
      category: "Feed",
      amount: 250,
      description: "Monthly feed supply",
    },
  ];

  // Expense breakdown for pie chart
  const expenseBreakdown = [
    { name: "Feed", value: 1200 },
    { name: "Healthcare", value: 750 },
    { name: "Equipment", value: 350 },
    { name: "Housing", value: 500 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Mortality rate data for chart
  const mortalityData = [
    { year: "2020", rate: 4.2 },
    { year: "2021", rate: 3.8 },
    { year: "2022", rate: 3.2 },
    { year: "2023", rate: 2.5 },
    { year: "2024", rate: 1.8 },
  ];

  // Additional health indicators
  const healthIndicators = [
    { name: "Body Condition Score", value: 8.5, max: 10 },
    { name: "Temperature", value: 38.6, unit: "°C" },
    { name: "Respiratory Rate", value: 28, unit: "/min" },
    { name: "Heart Rate", value: 65, unit: "bpm" },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      date: "2024-09-25",
      type: "Health Check",
      description: "Routine health examination",
    },
    {
      id: 2,
      date: "2024-10-15",
      type: "Vaccination",
      description: "Scheduled booster vaccines",
    },
    {
      id: 3,
      date: "2024-11-05",
      type: "Breeding",
      description: "Scheduled for artificial insemination",
    },
  ];

  // Feed consumption data
  const feedConsumption = [
    { month: "Apr", amount: 425 },
    { month: "May", amount: 440 },
    { month: "Jun", amount: 430 },
    { month: "Jul", amount: 445 },
    { month: "Aug", amount: 450 },
    { month: "Sep", amount: 455 },
  ];

  useEffect(() => {
    fetchFarms({
      filter: {
        id: {
          eq: Number(farmId),
        },
      },
      animalFilter: {
        id: {
          eq: Number(animalId) ?? undefined,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (farms && farms.length > 0) {
      const selectedFarm = farms.find((farm) => farm.id === farmId);
      const selectedAnimal = selectedFarm?.animals?.find(
        (animal) => animal.id === animalId
      );
      setAnimalRecords(selectedAnimal ? [selectedAnimal] : []);
      setTagNumber(selectedAnimal?.tag_number);
    }
  }, [farms, farmId]);
  console.log(animalRecords);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        {animalRecords.length &&
          animalRecords.map((animalRecord) => (
            <div
              key={animalRecord.id}
              className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8"
            >
              <div className="flex flex-col sm:flex-row items-center">
                {/* Existing header content, but with more flexible layout */}
                <div className="w-full sm:w-auto flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="mr-4"
                    >
                      <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                    </button>
                    <div>
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        {animalRecords[0].type[0]}
                        {animalRecord.type.slice(1).toLowerCase()}{" "}
                        {animalRecord.tag_number}
                      </h1>
                      <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-500">
                        <Calendar size={14} className="mr-1.5" />
                        <p>
                          Born: {formatDate(animalRecord.birth_date)} • Age:{" "}
                          {formatDateOfBirth(animalRecord.birth_date).slice(
                            15,
                            19
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </header>

      {/* Quick action bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start space-x-2 w-full sm:w-auto">
              <button className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-2 sm:mb-0">
                <Edit size={16} className="mr-1.5" />
                Edit
              </button>
              <button className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mb-2 sm:mb-0">
                <PlusCircle size={16} className="mr-1.5" />
                Add Record
              </button>
            </div>
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowActionMenu(!showActionMenu)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                More Actions
              </button>
              {showActionMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Share size={16} className="inline mr-2" />
                      Share
                    </button>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Download size={16} className="inline mr-2" />
                      Export Data
                    </button>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Printer size={16} className="inline mr-2" />
                      Print Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Health indicators */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Current Health Indicators
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {healthIndicators.map((indicator, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">
                    {indicator.name}
                  </h3>
                  {indicator.max && (
                    <span className="text-xs text-gray-500">
                      / {indicator.max}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-2xl font-semibold text-gray-900">
                    {indicator.value}
                    {indicator.unit && (
                      <span className="text-sm text-gray-500 ml-1">
                        {indicator.unit}
                      </span>
                    )}
                  </p>
                  {indicator.max && (
                    <div className="w-full max-w-24 bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(indicator.value / indicator.max) * 100}%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 whitespace-nowrap">
            {/* Existing tab buttons with more flexible spacing */}
            <button
              onClick={() => setActiveTab("breeding")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0 ${
                activeTab === "breeding"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Breeding Records
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "health"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Health Records
            </button>
            <button
              onClick={() => setActiveTab("growth")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "growth"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Growth Records
            </button>
            <button
              onClick={() => setActiveTab("expenses")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "expenses"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Expense Records
            </button>
            <button
              onClick={() => setActiveTab("feed")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "feed"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Feed & Nutrition
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === "breeding" && "Breeding Records"}
              {activeTab === "health" && "Health Records"}
              {activeTab === "growth" && "Growth Records"}
              {activeTab === "expenses" && "Expense Records"}
              {activeTab === "feed" && "Feed & Nutrition"}
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2" />
              Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date-range"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Range
                  </label>
                  <select
                    id="date-range"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Time</option>
                    <option value="year">Past Year</option>
                    <option value="6month">Past 6 Months</option>
                    <option value="3month">Past 3 Months</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="sort-by"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sort By
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    {activeTab === "expenses" && (
                      <option value="amount">Amount (High to Low)</option>
                    )}
                    {activeTab === "expenses" && (
                      <option value="category">Category</option>
                    )}
                  </select>
                </div>
              </div>
              {activeTab === "breeding" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Filter by Success
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="success-all"
                        name="success-filter"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="success-all"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="success-yes"
                        name="success-filter"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="success-yes"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Successful
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="success-no"
                        name="success-filter"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="success-no"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Unsuccessful
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "health" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Filter by Type
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="type-all"
                        name="type-filter"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="type-all"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="type-vaccination"
                        name="type-filter"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="type-vaccination"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Vaccination
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="type-illness"
                        name="type-filter"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="type-illness"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Illness
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="type-checkup"
                        name="type-filter"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label
                        htmlFor="type-checkup"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Checkup
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Breeding Records Tab */}
        {activeTab === "breeding" && (
          <>
            {animalRecords[0]?.breeding_records?.length ? (
              <div>
                {animalRecords.map((animalRecord) => (
                  <>
                    {/* Upcoming breeding events */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                      <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Upcoming Breeding Events
                        </h3>
                      </div>
                      <div className="p-5">
                        <ul className="divide-y divide-gray-200">
                          {upcomingEvents
                            .filter((event) => event.type === "Breeding")
                            .map((event) => (
                              <li key={event.id}>
                                <div className="px-4 py-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                        <Calendar className="h-6 w-6 text-green-500" />
                                      </div>
                                      <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                          {event.type}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {event.description}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {new Date(
                                          event.date
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Breeding records list */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                      <ul className="divide-y divide-gray-200">
                        {animalRecord?.breeding_records?.map((record) => (
                          <li key={record.id}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium text-green-600 truncate">
                                    Natural delivery
                                  </p>
                                  <p className="ml-2 flex-shrink-0 inline-flex">
                                    <span
                                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        record.status ===
                                        BreedingStatus.Successful
                                          ? "bg-green-100 text-green-800"
                                          : record.status ===
                                            BreedingStatus.Failed
                                          ? "bg-red-100 text-red-800"
                                          : record.status ===
                                            BreedingStatus.Cancelled
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {record.status ===
                                      BreedingStatus.Successful
                                        ? "Successful"
                                        : record.status ===
                                          BreedingStatus.Failed
                                        ? "Failed"
                                        : record.status ===
                                          BreedingStatus.Cancelled
                                        ? "Cancelled"
                                        : "In Progress"}
                                    </span>
                                  </p>
                                </div>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="text-sm text-gray-500">
                                    {formatDate(record.mating_date)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    {record.notes}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>
                                    Technician: {farms[0]?.workers[0]?.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Breeding Success Rate Chart */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Breeding Success Rate
                        </h3>
                      </div>
                      <div className="p-5">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Successful", value: 3 },
                                  { name: "Unsuccessful", value: 1 },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                  `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                <Cell fill="#10B981" />
                                <Cell fill="#EF4444" />
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <EmptyStateBreeding />
            )}
          </>
        )}

        {/* Health Records Tab */}
        {activeTab === "health" && (
          <>
            {animalRecords[0]?.health_records?.length ? (
              <div>
                {animalRecords.map((animalRecord) => (
                  <>
                    {/* Upcoming health events */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                      <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Upcoming Health Events
                        </h3>
                      </div>
                      <div className="p-5">
                        <ul className="divide-y divide-gray-200">
                          {upcomingEvents
                            .filter(
                              (event) =>
                                event.type === "Health Check" ||
                                event.type === "Vaccination"
                            )
                            .map((event) => (
                              <li key={event.id}>
                                <div className="px-4 py-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                        <Calendar className="h-6 w-6 text-blue-500" />
                                      </div>
                                      <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                          {event.type}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {event.description}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {new Date(
                                          event.date
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Health records list */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                      <ul className="divide-y divide-gray-200">
                        {animalRecord?.health_records?.map((healthRecord) => (
                          <li key={healthRecord.id}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium text-blue-600 truncate">
                                    {healthRecord.issue}
                                  </p>
                                  <p className="ml-2 flex-shrink-0 inline-flex">
                                    <span
                                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        record.type === "Vaccination"
                                          ? "bg-green-100 text-green-800"
                                          : record.type === "Checkup"
                                          ? "bg-blue-100 text-blue-800"
                                          : record.type === "Illness"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {healthRecord.diagnosis}
                                    </span>
                                  </p>
                                </div>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="text-sm text-gray-500">
                                    {/* {healthRecord.date} */}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    Treatment: {healthRecord.medication}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>Veterinarian: {healthRecord.vet_name}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mortality Rate Chart */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Mortality Rate Trend
                        </h3>
                      </div>
                      <div className="p-5">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={mortalityData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis
                                label={{
                                  value: "Rate (%)",
                                  angle: -90,
                                  position: "insideLeft",
                                }}
                              />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="rate"
                                stroke="#EF4444"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <EmptyStateHealthPage tag_number={tagNumber} />
            )}
          </>
        )}

        {/* Growth Records Tab */}
        {activeTab === "growth" && (
          <>
            {animalRecords[0]?.growth_records?.length ? (
              <div>
                {animalRecords.map((animalRecord) => (
                  <>
                    {/* Growth Chart */}
                    <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
                      <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Weight Growth Trend
                        </h3>
                      </div>
                      <div className="p-5">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={growthData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis
                                label={{
                                  value: "Weight (kg)",
                                  angle: -90,
                                  position: "insideLeft",
                                }}
                              />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="#10B981"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Growth Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                              <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  Average Monthly Growth
                                </dt>
                                <dd className="text-lg font-semibold text-gray-900">
                                  14.4 kg
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                              <TrendingUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  Current Weight
                                </dt>
                                <dd className="text-lg font-semibold text-gray-900">
                                  535 kg
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                              <TrendingUp className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  Total Growth (YTD)
                                </dt>
                                <dd className="text-lg font-semibold text-gray-900">
                                  115 kg
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Growth Records Table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Monthly Weight Records
                        </h3>
                      </div>
                      <div className="bg-white">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Month
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Weight (kg)
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Change
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Growth %
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {growthData.map((record, index) => {
                                const prevWeight =
                                  index > 0
                                    ? growthData[index - 1].weight
                                    : record.weight;
                                const change = record.weight - prevWeight;
                                const growthPercent =
                                  index > 0
                                    ? ((change / prevWeight) * 100).toFixed(1)
                                    : 0;

                                return (
                                  <tr key={record.month}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {record.month}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {record.weight}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {index > 0 ? (
                                        <span
                                          className={
                                            change >= 0
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }
                                        >
                                          {change > 0 ? "+" : ""}
                                          {change}
                                        </span>
                                      ) : (
                                        "-"
                                      )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {index > 0 ? (
                                        <span
                                          className={
                                            // @ts-expect-error err
                                            parseFloat(growthPercent) >= 0
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }
                                        >
                                          {growthPercent}%
                                        </span>
                                      ) : (
                                        "-"
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <EmptyStateGrowthPage />
            )}
          </>
        )}

        {/* Expense Records Tab */}
        {activeTab === "expenses" && (
          <>
            {animalRecords[0]?.expense_records?.length ? (
              <div>
                <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                  <ul className="divide-y divide-gray-200">
                    {expenseRecords.map((record) => (
                      <li key={record.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {record.category}
                              </p>
                              <p className="ml-2 flex-shrink-0 inline-flex">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  ${record.amount}
                                </span>
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="text-sm text-gray-500">
                                {new Date(record.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {record.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expense Stats and Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Expense by Category Chart */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-5 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Expenses by Category
                      </h3>
                    </div>
                    <div className="p-5">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expenseBreakdown}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {expenseBreakdown.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Expense Trend */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-5 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Monthly Expense Trend
                      </h3>
                    </div>
                    <div className="p-5">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { month: "Jun", amount: 250 },
                              { month: "Jul", amount: 325 },
                              { month: "Aug", amount: 180 },
                              { month: "Sep", amount: 250 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis
                              label={{
                                value: "Amount ($)",
                                angle: -90,
                                position: "insideLeft",
                              }}
                            />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Bar dataKey="amount" fill="#FF8042" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expense Summary Stats */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                          <DollarSign className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Expenses (YTD)
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              $2,800
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Average Monthly Cost
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              $233
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                          <TrendingUp className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Cost Per Kg Gained
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              $24.35
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyStateExpenses />
            )}
          </>
        )}

        {/* Feed & Nutrition Tab */}
        {activeTab === "feed" && (
          <>
            {animalRecords[0]?.feed_records?.length ? (
              <div>
                {/* Feed Consumption Chart */}
                <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Monthly Feed Consumption
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={feedConsumption}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis
                            label={{
                              value: "Amount (kg)",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <Tooltip />
                          <Bar dataKey="amount" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Feed Summary Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Average Consumption
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              441 kg/month
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Feed Efficiency
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              1.6 kg milk/kg feed
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                          <TrendingUp className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Daily Average
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              14.7 kg/day
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Diet Details */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Current Diet Composition
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Component
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Percentage
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Daily Amount (kg)
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Nutritional Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Hay
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              40%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              5.9 kg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Medium
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Grain Mix
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              30%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              4.4 kg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              High
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Silage
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              20%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              2.9 kg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Medium-High
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Protein Supplement
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              10%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              1.5 kg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Very High
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Diet Modification History */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Diet Modification History
                    </h3>
                  </div>
                  <div className="p-5">
                    <ul className="divide-y divide-gray-200">
                      <li className="py-4">
                        <div className="flex space-x-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">
                                Increased Protein Content
                              </h3>
                              <p className="text-sm text-gray-500">
                                Aug 22, 2024
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Increased protein supplement from 8% to 10% to
                              support milk production during peak lactation
                              period.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="py-4">
                        <div className="flex space-x-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">
                                Adjusted Grain Mix
                              </h3>
                              <p className="text-sm text-gray-500">
                                Jul 10, 2024
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Modified grain mix composition to include more
                              corn for increased energy content.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="py-4">
                        <div className="flex space-x-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">
                                Started New Silage Batch
                              </h3>
                              <p className="text-sm text-gray-500">
                                Jun 05, 2024
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Began using new silage batch with higher moisture
                              content. Adjusted other components accordingly.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyStateFeedManagement />
            )}
          </>
        )}
      </div>
    </div>
  );
}
