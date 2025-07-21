"use client";
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
  MoreVertical,
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
import {
  BreedingStatus,
  HealthRecordStatus,
} from "@/graphql/generated/graphql";
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
import { useFetchALivestock } from "@/hooks/queries";
import { useFetchPen } from "@/hooks/queries";
import { useModal } from "@/hooks/use-modal-store";

export default function AnimalDetailsPage() {
  // Record types
  const [activeTab, setActiveTab] = useState("breeding");
  const { fetchLivestock, livestock } = useFetchALivestock();
  const pathname = usePathname();
  const { fetchPen, pen } = useFetchPen();
  const livestock_tag = pathname.split("/").pop() || "";
  const [penUnitId, setPenUnitId] = useState("");
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const { onOpen } = useModal();
  // const farmId = pathname.split("/")[2];
  const router = useRouter();
  // Action menu state
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Sample growth records for chart
  const growthData =
    livestock?.growth_records?.map((record) => ({
      month: record.period || "Unknown",
      weight: record.weight || 0,
    })) || [];

  // Sample expense records

  // Expense breakdown for pie chart
  const expenseBreakdown =
    livestock?.expense_records?.reduce<{ name: string; value: number }[]>(
      (acc, record) => {
        const existingCategory = acc.find(
          (item) => item.name === record.category
        );
        if (existingCategory) {
          existingCategory.value += record.amount;
        } else {
          acc.push({ name: record.category, value: record.amount });
        }
        return acc;
      },
      []
    ) || [];

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
  const healthIndicators =
    livestock?.health_records?.reduce<
      { name: string; value: number; unit: string; max: number }[]
    >((acc, record) => {
      const existingIndicator = acc.find(
        (indicator) =>
          indicator.name === (record.diagnosis || "Unknown Diagnosis")
      );
      if (existingIndicator) {
        existingIndicator.value += 1;
        existingIndicator.max = Math.max(
          existingIndicator.max,
          existingIndicator.value
        );
      } else {
        acc.push({
          name: record.diagnosis || "Unknown Diagnosis",
          value: 1,
          unit: "times",
          max: 1,
        });
      }
      return acc;
    }, []) || [];

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

  const fetchLivestockRef = React.useRef(fetchLivestock);
  const fetchPenRef = React.useRef(fetchPen);
  const routerRef = React.useRef(router);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      routerRef.current.push("/authladmin/login");
    }
    fetchLivestockRef.current({ livestockTag: livestock_tag });
  }, [livestock_tag]);

  useEffect(() => {
    const penId = livestock?.pen?.unit_id || "";
    if (penId !== penUnitId) {
      setPenUnitId(penId);
    }
  }, [livestock?.pen?.unit_id, penUnitId]);

  useEffect(() => {
    if (penUnitId) {
      fetchPenRef.current({ penUnitId: penUnitId });
    }
  }, [penUnitId]);

  const getTabDisplayName = (tab: string) => {
    switch (tab) {
      case "breeding":
        return "Breeding Records";
      case "health":
        return "Health Records";
      case "growth":
        return "Growth Records";
      case "expenses":
        return "Expense Records";
      case "feed":
        return "Feed & Nutrition";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Header */}
      <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Back button and title */}
              <div className="flex items-center flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="mr-3 p-1 -ml-1 rounded-md hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                      {livestock?.livestock_type?.charAt(0)}
                      {livestock?.livestock_type?.slice(1).toLowerCase()}{" "}
                      {livestock?.livestock_tag}
                    </h1>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 whitespace-nowrap">
                      {livestock?.gender
                        ? livestock.gender.charAt(0) +
                          livestock.gender.slice(1).toLowerCase()
                        : "Unknown"}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span className="truncate">
                      Born: {formatDate(livestock?.birth_date)} • Age:{" "}
                      {formatDateOfBirth(livestock?.birth_date).slice(14, 20)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Action menu */}
              <div className="relative ml-2">
                <button
                  type="button"
                  className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                  onClick={() => setShowActionMenu(!showActionMenu)}
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>

                {showActionMenu && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
                    <div className="py-1">
                      <button
                        type="button"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowActionMenu(false)}
                      >
                        <Share size={16} className="mr-3" />
                        Share
                      </button>
                      <button
                        type="button"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowActionMenu(false)}
                      >
                        <Download size={16} className="mr-3" />
                        Export Data
                      </button>
                      <button
                        type="button"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowActionMenu(false)}
                      >
                        <Printer size={16} className="mr-3" />
                        Print Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Health Indicators - Mobile Optimized */}
        {healthIndicators.length > 0 && (
          <div className="px-4 py-4 bg-white border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Current Health Indicators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {healthIndicators.slice(0, 4).map((indicator, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {indicator.name}
                    </h3>
                    {indicator.max > 1 && (
                      <span className="text-xs text-gray-500">
                        / {indicator.max}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-900">
                      {indicator.value}
                      {indicator.unit && (
                        <span className="text-sm text-gray-500 ml-1">
                          {indicator.unit}
                        </span>
                      )}
                    </p>
                    {indicator.max > 1 && (
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (indicator.value / indicator.max) * 100
                            }%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile-Optimized Tabs */}
        <div className="bg-white border-b md:mt-3 border-gray-200 sticky top-[73px] z-20">
          <div className="overflow-x-auto">
            <nav className="flex px-4 space-x-6 min-w-max">
              {[
                { key: "breeding", label: "Breeding" },
                { key: "health", label: "Health" },
                { key: "growth", label: "Growth" },
                { key: "expenses", label: "Expenses" },
                { key: "feed", label: "Feed" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-4">
          {/* Mobile-Optimized Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {getTabDisplayName(activeTab)}
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter size={16} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-1" />
              </button>

              <button
                className="flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 whitespace-nowrap"
                onClick={() => {
                  if (activeTab === "breeding") {
                    onOpen("add-livestock-breeding-record", {
                      penLivestock: pen?.livestock || [],
                      penName: penUnitId,
                      livestockTag: livestock?.livestock_tag,
                      livestockType: livestock?.livestock_type,
                    });
                  } else if (activeTab === "health") {
                    onOpen("add-health-record", {
                      livestockTag: livestock?.livestock_tag,
                    });
                  } else if (activeTab === "growth") {
                    onOpen("add-livestock-growth-record", {
                      livestockTag: livestock?.livestock_tag,
                    });
                  } else if (activeTab === "expenses") {
                    onOpen("add-livestock-expense-record", {
                      livestockTag: livestock?.livestock_tag,
                    });
                  }
                }}
              >
                <PlusCircle size={16} className="mr-1" />
                Add Record
              </button>
            </div>
          </div>

          {/* Mobile-Optimized Filters */}
          {showFilters && (
            <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">All Time</option>
                    <option value="year">Past Year</option>
                    <option value="6month">Past 6 Months</option>
                    <option value="3month">Past 3 Months</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    {activeTab === "expenses" && (
                      <>
                        <option value="amount">Amount (High to Low)</option>
                        <option value="category">Category</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Tab-specific filters */}
                {activeTab === "breeding" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Success
                    </label>
                    <div className="space-y-2">
                      {["All", "Successful", "Unsuccessful"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="success-filter"
                            defaultChecked={option === "All"}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "health" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Type
                    </label>
                    <div className="space-y-2">
                      {["All", "Vaccination", "Illness", "Checkup"].map(
                        (option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="type-filter"
                              defaultChecked={option === "All"}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {option}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab Content */}
          {/* Breeding Records Tab */}
          {activeTab === "breeding" && (
            <>
              {livestock?.breeding_records?.length ? (
                <div className="space-y-4">
                  {/* Upcoming breeding events */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Upcoming Breeding Events
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {upcomingEvents
                          .filter((event) => event.type === "Breeding")
                          .map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center justify-between py-2"
                            >
                              <div className="flex items-center flex-1 min-w-0">
                                <Calendar className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {event.type}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {event.description}
                                  </p>
                                </div>
                              </div>
                              <span className="ml-3 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 whitespace-nowrap">
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Breeding records list */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="divide-y divide-gray-200">
                      {livestock.breeding_records?.map((record) => (
                        <div key={record.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium text-green-600 truncate">
                                  {record.breeding_method ?? "Unknown Method"}
                                </p>
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    record.status === BreedingStatus.Successful
                                      ? "bg-green-100 text-green-800"
                                      : record.status === BreedingStatus.Failed
                                      ? "bg-red-100 text-red-800"
                                      : record.status ===
                                        BreedingStatus.Cancelled
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {record.status ?? "In Progress"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {record.mating_date
                                  ? formatDate(record.mating_date)
                                  : "N/A"}
                              </p>
                            </div>

                            {![
                              BreedingStatus.Successful,
                              BreedingStatus.Failed,
                              BreedingStatus.Cancelled,
                            ].includes(record.status) && (
                              <button
                                className="ml-2 flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                type="button"
                                onClick={() =>
                                  onOpen("update-livestock-breeding-record", {
                                    breedingRecordId: record.id,
                                    // @ts-expect-error error
                                    breedingRecord: record,
                                  })
                                }
                              >
                                <Edit size={12} className="mr-1" />
                                Edit
                              </button>
                            )}
                          </div>

                          <div className="space-y-2 text-xs text-gray-500">
                            <p className="line-clamp-2">
                              {record.notes ?? "No notes provided"}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <p>
                                <span className="font-medium">Expected:</span>{" "}
                                {record.expected_delivery
                                  ? formatDate(record.expected_delivery)
                                  : "Unknown"}
                              </p>
                              <p>
                                <span className="font-medium">Actual:</span>{" "}
                                {record.actual_delivery
                                  ? formatDate(record.actual_delivery)
                                  : "Not recorded"}
                              </p>

                              {record.status === BreedingStatus.Successful && (
                                <>
                                  <p>
                                    <span className="font-medium">
                                      Female offspring:
                                    </span>{" "}
                                    {record.offspring_count_female ?? 0}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Male offspring:
                                    </span>{" "}
                                    {record.offspring_count_male ?? 0}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Breeding Success Rate Chart - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Breeding Success Rate
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Successful",
                                  value:
                                    livestock?.breeding_records?.filter(
                                      (record) =>
                                        record.status ===
                                        BreedingStatus.Successful
                                    ).length || 0,
                                },
                                {
                                  name: "Unsuccessful",
                                  value:
                                    livestock?.breeding_records?.filter(
                                      (record) =>
                                        record.status === BreedingStatus.Failed
                                    ).length || 0,
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={60}
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
                </div>
              ) : (
                <EmptyStateBreeding
                  penLivestock={pen?.livestock || []}
                  penName={livestock?.pen?.unit_id || ""}
                  livestockType={livestock?.livestock_type || ""}
                />
              )}
            </>
          )}

          {/* Health Records Tab */}
          {activeTab === "health" && (
            <>
              {livestock?.health_records?.length ? (
                <div className="space-y-4">
                  {/* Upcoming health events */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Upcoming Health Events
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {upcomingEvents
                          .filter(
                            (event) =>
                              event.type === "Health Check" ||
                              event.type === "Vaccination"
                          )
                          .map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center justify-between py-2"
                            >
                              <div className="flex items-center flex-1 min-w-0">
                                <Calendar className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {event.type}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {event.description}
                                  </p>
                                </div>
                              </div>
                              <span className="ml-3 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Health records list */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="divide-y divide-gray-200">
                      {[...livestock?.health_records]
                        ?.sort(
                          (a, b) =>
                            new Date(b.record_date || "").getTime() -
                            new Date(a.record_date || "").getTime()
                        )
                        .map((healthRecord) => (
                          <div key={healthRecord.id} className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-medium text-blue-600 truncate">
                                    {healthRecord.diagnosis ??
                                      "Unknown Diagnosis"}
                                  </p>
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                      healthRecord.record_status ===
                                      HealthRecordStatus.Healthy
                                        ? "bg-green-100 text-green-800"
                                        : healthRecord.record_status ===
                                          HealthRecordStatus.Recovering
                                        ? "bg-blue-100 text-blue-800"
                                        : healthRecord.record_status ===
                                          HealthRecordStatus.Sick
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {healthRecord.record_status ??
                                      "Unknown Status"}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {healthRecord.record_date
                                    ? formatDate(healthRecord.record_date)
                                    : "No Date"}
                                </p>
                              </div>

                              <button className="ml-2 flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                <Edit size={12} className="mr-1" />
                                Edit
                              </button>
                            </div>

                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <p>
                                  <span className="font-medium">Issue:</span>{" "}
                                  {healthRecord.issue ?? "N/A"}
                                </p>
                                <p>
                                  <span className="font-medium">Symptoms:</span>{" "}
                                  {healthRecord.symptoms ?? "N/A"}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Treatment:
                                  </span>{" "}
                                  {healthRecord.treatment ?? "N/A"}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Medication:
                                  </span>{" "}
                                  {healthRecord.medication ?? "N/A"}
                                </p>
                                <p>
                                  <span className="font-medium">Dosage:</span>{" "}
                                  {healthRecord.dosage ?? "N/A"}
                                </p>
                                <p>
                                  <span className="font-medium">Type:</span>{" "}
                                  {healthRecord.record_type ?? "N/A"}
                                </p>
                              </div>

                              <div className="pt-2">
                                <p>
                                  <span className="font-medium">Notes:</span>{" "}
                                  {healthRecord.notes ?? "No notes provided"}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Veterinarian:
                                  </span>{" "}
                                  {healthRecord.vet_name ?? "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Mortality Rate Chart - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Mortality Rate Trend
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={mortalityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
                </div>
              ) : (
                <EmptyStateHealthPage
                  tag_number={livestock?.livestock_tag || ""}
                />
              )}
            </>
          )}

          {/* Growth Records Tab */}
          {activeTab === "growth" && (
            <>
              {livestock?.growth_records?.length ? (
                <div className="space-y-4">
                  {/* Growth Chart - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Weight Growth Trend
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={growthData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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

                  {/* Growth Records Cards - Mobile Optimized */}
                  <div className="space-y-3">
                    {livestock?.growth_records?.map((record) => (
                      <div
                        key={record.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                {record.record_type ?? "N/A"}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {record.period ?? "N/A"}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-gray-500">
                            {record.record_date
                              ? formatDate(record.record_date)
                              : "No Date"}
                          </p>
                        </div>

                        {/* Main metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Weight</p>
                            <p className="text-lg font-bold text-gray-900">
                              {record.weight ?? "N/A"}{" "}
                              <span className="text-xs font-normal">kg</span>
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">
                              Growth Rate
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {record.growth_rate ?? "N/A"}{" "}
                              <span className="text-xs font-normal">kg/mo</span>
                            </p>
                          </div>
                        </div>

                        {/* Secondary metrics */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Height</span>
                            <span className="font-medium text-gray-900">
                              {record.height ?? "N/A"} cm
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Length</span>
                            <span className="font-medium text-gray-900">
                              {record.length ?? "N/A"} cm
                            </span>
                          </div>
                        </div>

                        {/* Notes */}
                        {record.notes && (
                          <div className="mt-3 bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
                            <p className="font-medium text-blue-800 mb-1">
                              Notes
                            </p>
                            <p className="line-clamp-2">{record.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Growth Records Table - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Monthly Weight Records
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Month
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Weight (kg)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Change
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                  {record.month}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                  {record.weight}
                                </td>
                                <td className="px-4 py-3 text-sm">
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
                                <td className="px-4 py-3 text-sm">
                                  {index > 0 ? (
                                    <span
                                      className={
                                        parseFloat(growthPercent as string) >= 0
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
              ) : (
                <EmptyStateGrowthPage />
              )}
            </>
          )}

          {/* Expense Records Tab */}
          {activeTab === "expenses" && (
            <>
              {livestock?.expense_records?.length ? (
                <div className="space-y-4">
                  {/* Expense records list - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="divide-y divide-gray-200">
                      {livestock.expense_records.map((record) => (
                        <div key={record.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {record.category}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  record.expense_date
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <span className="ml-3 px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                              ${record.amount}
                            </span>
                          </div>
                          {record.notes && (
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {record.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expense Charts - Mobile Optimized */}
                  <div className="space-y-4">
                    {/* Expense by Category Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Expenses by Category
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="h-48 sm:h-64">
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
                                outerRadius={60}
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
                              <Tooltip formatter={(value) => `${value}`} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Expense Trend */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                          Monthly Expense Trend
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="h-48 sm:h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={
                                livestock?.expense_records?.map((record) => ({
                                  month: new Date(
                                    record.expense_date
                                  ).toLocaleString("default", {
                                    month: "short",
                                  }),
                                  amount: record.amount,
                                })) || []
                              }
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
                                  value: "Amount ($)",
                                  angle: -90,
                                  position: "insideLeft",
                                }}
                              />
                              <Tooltip formatter={(value) => `${value}`} />
                              <Bar dataKey="amount" fill="#FF8042" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expense Summary Stats - Mobile Optimized */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                          <DollarSign className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-medium text-gray-500">
                            Total Expenses (YTD)
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            $2,800
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-medium text-gray-500">
                            Average Monthly Cost
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            $233
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2">
                          <TrendingUp className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-medium text-gray-500">
                            Cost Per Kg Gained
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            $24.35
                          </p>
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
              {livestock?.growth_records?.length ? (
                <div className="space-y-4">
                  {/* Feed Consumption Chart - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Monthly Feed Consumption
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="h-48 sm:h-64">
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

                  {/* Feed Summary Stats - Mobile Optimized */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-medium text-gray-500">
                            Average Consumption
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            441 kg/month
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-medium text-gray-500">
                            Feed Efficiency
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            1.6 kg milk/kg feed
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2">
                          <TrendingUp className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-medium text-gray-500">
                            Daily Average
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            14.7 kg/day
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Diet Details - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Current Diet Composition
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Component
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Percentage
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Daily Amount (kg)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nutritional Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              Hay
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              40%
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              5.9 kg
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Medium
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              Grain Mix
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              30%
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              4.4 kg
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              High
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              Silage
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              20%
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              2.9 kg
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Medium-High
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              Protein Supplement
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              10%
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              1.5 kg
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Very High
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Diet Modification History - Mobile Optimized */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        Diet Modification History
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {[
                          {
                            title: "Increased Protein Content",
                            date: "Aug 22, 2024",
                            description:
                              "Increased protein supplement from 8% to 10% to support milk production during peak lactation period.",
                          },
                          {
                            title: "Adjusted Grain Mix",
                            date: "Jul 10, 2024",
                            description:
                              "Modified grain mix composition to include more corn for increased energy content.",
                          },
                          {
                            title: "Started New Silage Batch",
                            date: "Jun 05, 2024",
                            description:
                              "Began using new silage batch with higher moisture content. Adjusted other components accordingly.",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-green-500 pl-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                              <h3 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {item.date}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
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
    </div>
  );
}
