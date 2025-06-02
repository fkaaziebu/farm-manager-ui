"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowLeft,
  Grid,
  List,
  Home,
  AlertTriangle,
  Users,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useFetchBarn } from "@/hooks/queries";
import { useRouter, usePathname } from "next/navigation";
import { HousingStatus, Pen } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";

export default function RoomListingPage() {
  const { barn, fetchBarn } = useFetchBarn();
  const router = useRouter();
  const [farmPens, setFarmPens] = useState<Pen[]>();
  const pathname = usePathname();
  const farmId = pathname.split("/")[pathname.split("/").length - 4];
  const barnId = pathname.split("/")[pathname.split("/").length - 2];

  const { onOpen } = useModal();
  const [rooms] = useState([
    {
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
      animalTypes: ["Holstein Cattle"],
      lastCleaned: "2024-09-10",
      houseId: 1,
      houseName: "Main Barn",
    },
    {
      id: 102,
      name: "Section B",
      type: "Milking Area",
      size: "450 sq ft",
      capacity: 8,
      occupancy: 8,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "high",
      ventilationStatus: "normal",
      temperature: 19.5,
      humidity: 72,
      airQuality: "Good",
      animalTypes: ["Holstein Cattle", "Jersey Cattle"],
      lastCleaned: "2024-09-12",
      houseId: 1,
      houseName: "Main Barn",
    },
    {
      id: 103,
      name: "Section C",
      type: "Holding Pen",
      size: "580 sq ft",
      capacity: 12,
      occupancy: 10,
      status: "maintenance",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      temperature: 18.0,
      humidity: 65,
      airQuality: "Good",
      animalTypes: ["Holstein Cattle"],
      lastCleaned: "2024-09-09",
      houseId: 1,
      houseName: "Main Barn",
    },
    {
      id: 104,
      name: "Section D",
      type: "Calving Area",
      size: "300 sq ft",
      capacity: 5,
      occupancy: 3,
      status: "operational",
      temperatureStatus: "high",
      humidityStatus: "normal",
      ventilationStatus: "alert",
      temperature: 21.4,
      humidity: 67,
      airQuality: "Fair",
      animalTypes: ["Holstein Cattle"],
      lastCleaned: "2024-09-11",
      houseId: 1,
      houseName: "Main Barn",
    },
    {
      id: 201,
      name: "Milking Station 1",
      type: "Milking Area",
      size: "400 sq ft",
      capacity: 6,
      occupancy: 6,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      temperature: 18.5,
      humidity: 65,
      airQuality: "Good",
      animalTypes: ["Jersey Cattle"],
      lastCleaned: "2024-09-10",
      houseId: 2,
      houseName: "Dairy Facility",
    },
    {
      id: 202,
      name: "Milking Station 2",
      type: "Milking Area",
      size: "400 sq ft",
      capacity: 6,
      occupancy: 5,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      temperature: 18.7,
      humidity: 66,
      airQuality: "Good",
      animalTypes: ["Jersey Cattle"],
      lastCleaned: "2024-09-11",
      houseId: 2,
      houseName: "Dairy Facility",
    },
    {
      id: 301,
      name: "Pen 1",
      type: "Holding Area",
      size: "350 sq ft",
      capacity: 12,
      occupancy: 10,
      status: "operational",
      temperatureStatus: "high",
      humidityStatus: "high",
      ventilationStatus: "alert",
      temperature: 23.1,
      humidity: 74,
      airQuality: "Poor",
      animalTypes: ["Pig"],
      lastCleaned: "2024-09-08",
      houseId: 3,
      houseName: "Swine Facility",
    },
    {
      id: 302,
      name: "Pen 2",
      type: "Holding Area",
      size: "350 sq ft",
      capacity: 12,
      occupancy: 11,
      status: "operational",
      temperatureStatus: "high",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      temperature: 22.5,
      humidity: 68,
      airQuality: "Fair",
      animalTypes: ["Pig"],
      lastCleaned: "2024-09-07",
      houseId: 3,
      houseName: "Swine Facility",
    },
    {
      id: 401,
      name: "Layer Section",
      type: "Poultry Housing",
      size: "650 sq ft",
      capacity: 200,
      occupancy: 182,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      temperature: 22.3,
      humidity: 60,
      airQuality: "Good",
      animalTypes: ["Chicken"],
      lastCleaned: "2024-09-09",
      houseId: 4,
      houseName: "Poultry House",
    },
    {
      id: 501,
      name: "Pen A",
      type: "Holding Area",
      size: "250 sq ft",
      capacity: 10,
      occupancy: 8,
      status: "maintenance",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      temperature: 17.8,
      humidity: 62,
      airQuality: "Good",
      animalTypes: ["Sheep"],
      lastCleaned: "2024-09-05",
      houseId: 5,
      houseName: "Sheep Pen",
    },
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [houseFilter, setHouseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Filter and sort rooms

  // Get unique room types for filter
  const roomTypes = ["all", ...new Set(rooms.map((room) => room.type))];
  const houses = ["all", ...new Set(rooms.map((room) => room.houseName))];

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
  // const getAlertColor = (status: string) => {
  //   switch (status) {
  //     case "normal":
  //     case "good":
  //       return "text-green-500";
  //     case "high":
  //     case "low":
  //     case "alert":
  //     case "needs attention":
  //       return "text-yellow-500";
  //     case "critical":
  //     case "under repair":
  //       return "text-red-500";
  //     default:
  //       return "text-gray-500";
  //   }
  // };

  // Calculate occupancy percentage
  const calculateOccupancy = (occupancy: number, capacity: number) => {
    return Number(((occupancy / capacity) * 100).toFixed(0));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Room stats
  const roomStats = {
    total: rooms.length,
    operational: rooms.filter((r) => r.status === "operational").length,
    maintenance: rooms.filter((r) => r.status === "maintenance").length,
    alertsCount: rooms.filter(
      (r) =>
        r.temperatureStatus !== "normal" ||
        r.humidityStatus !== "normal" ||
        r.ventilationStatus !== "normal"
    ).length,
    totalCapacity: rooms.reduce((sum, room) => sum + room.capacity, 0),
    totalOccupancy: rooms.reduce((sum, room) => sum + room.occupancy, 0),
    needsCleaning: rooms.filter((r) => {
      const lastCleaned = new Date(r.lastCleaned).valueOf();
      const currentDate = new Date().valueOf();
      const diffTime = Math.abs(currentDate - lastCleaned);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 7;
    }).length,
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }

    fetchBarn({ barnUnitId: barnId });
  }, []);

  useEffect(() => {
    if (barn) {
      setFarmPens(
        barn.pens ? barn.pens.filter((pen): pen is Pen => pen !== null) : []
      );
    }
  }, [barn]);

  console.log("Farm Pens", farmPens);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link
                  href={`/farms/${farmId}/barns/${barnId}`}
                  className="mr-3 sm:mr-4"
                >
                  <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                </Link>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {farmPens?.[0]?.barn?.name} Inventory
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Manage your farm&apos;s rooms and sections
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 rounded-md flex md:hidden items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() => {
                  onOpen("add-pens-to-barn", {
                    barnUnitId: barnId,
                    barnName: barn?.name,
                  });
                }}
              >
                <Plus size={16} />
                <span>Add Room</span>
              </button>
            </div>
            <button
              type="button"
              className="mt-3  bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 rounded-md md:flex hidden items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
              onClick={() => {
                onOpen("add-pens-to-barn", {
                  barnUnitId: barnId,
                  barnName: barn?.name,
                });
              }}
            >
              <Plus size={16} />
              <span>Add Room</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        <div className="mt-2 px-2 flex flex-row flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setViewMode("grid");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              viewMode === "grid"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Grid size={16} className="inline mr-2" /> Grid View
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("list");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              viewMode === "list"
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <List size={16} className="inline mr-2" /> List View
          </button>
          <button
            type="button"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
            className="px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap text-gray-700 hover:bg-gray-100"
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
              placeholder="Search rooms by name, type, or building..."
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
              <div>
                <label
                  htmlFor="type-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Room Type
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="house-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Building
                </label>
                <select
                  id="house-filter"
                  value={houseFilter}
                  onChange={(e) => setHouseFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {houses.map((house) => (
                    <option key={house} value={house}>
                      {house === "all" ? "All Buildings" : house}
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
                  <option value="all">All Statuses</option>
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="under construction">Under Construction</option>
                  <option value="closed">Closed</option>
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
                  <option value="type">Type</option>
                  <option value="house">Building</option>
                  <option value="capacity">Capacity</option>
                  <option value="occupancy">Occupancy Rate</option>
                  <option value="lastCleaned">Last Cleaned</option>
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
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                  <Home className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Rooms
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {farmPens?.length}
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
                  <Check className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Operational
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {
                        farmPens?.filter(
                          (room) => room?.status === HousingStatus.Operational
                        ).length
                      }
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
                      Maintennce
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {
                        farmPens?.filter(
                          (room) => room?.status === HousingStatus.Maintenance
                        ).length
                      }
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
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Occupancy
                    </dt>
                    {farmPens?.length && (
                      <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                        {calculateOccupancy(
                          farmPens?.reduce(
                            (total, pen) =>
                              total + (pen?.livestock?.length || 0),
                            0
                          ),
                          farmPens?.reduce(
                            (total, pen) => total + pen?.capacity,
                            0
                          )
                        )}
                        %
                      </dd>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg col-span-2 md:col-span-1 lg:col-span-2">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-2 sm:p-3">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Needs Cleaning
                    </dt>
                    <dd className="flex items-center">
                      <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 mr-2">
                        {roomStats.needsCleaning}
                      </span>
                      <span className="hidden lg:inline text-xs sm:text-sm text-gray-500">
                        rooms haven&apos;t been cleaned in over 7 days
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms grid/list view */}
      <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900">
            {farmPens?.length} {farmPens?.length === 1 ? "pen" : "pens"} found
          </h2>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {farmPens?.map((pen) => (
              <div
                key={pen.id}
                className="bg-white overflow-hidden shadow-sm border border-gray-100 rounded-lg hover:shadow transition-shadow duration-200"
              >
                <div className="p-4 sm:p-5">
                  {/* Header section with name and status */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 truncate">
                        {pen.name}
                      </h3>
                      <p className="text-xs text-gray-500">{pen.unit_id}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        pen.status
                      )}`}
                    >
                      {pen.status.charAt(0).toUpperCase() +
                        pen.status.slice(1).toLowerCase()}
                    </span>
                  </div>

                  {/* Occupancy indicator */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-gray-500">
                        Occupancy
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {pen.livestock?.length || 0}/{pen.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            calculateOccupancy(
                              pen?.livestock?.length || 0,
                              pen?.capacity
                            ),
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Size</p>
                      <p className="text-sm font-medium text-gray-900">
                        {pen.area_sqm} m²
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bedding</p>
                      <p className="text-sm font-medium text-gray-900">
                        {pen.bedding_type
                          ? pen.bedding_type.charAt(0).toUpperCase() +
                            pen.bedding_type.slice(1).toLowerCase()
                          : "None"}
                      </p>
                    </div>
                  </div>

                  {/* Animals tags/chips */}
                  {pen?.livestock && pen?.livestock?.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Animals</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pen.livestock &&
                          Array.from(
                            new Set(pen.livestock.map((l) => l.livestock_type))
                          ).map((type, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {type?.charAt(0).toUpperCase() +
                                type?.slice(1).toLowerCase()}
                            </span>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Animals</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-amber-700">
                          No animals yet
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Footer with link */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <Link
                      href={`/farms/${farmId}/barns/${barnId}/pens/${pen.unit_id}`}
                      className="text-sm font-medium text-green-600 hover:text-green-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state - add a pen card */}
            <div className="bg-white overflow-hidden border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200 flex items-center justify-center">
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-50 mb-4">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  Add new pen
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Create a new pen for your livestock
                </p>
                <button
                  className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    onOpen("add-pens-to-barn", {
                      barnUnitId: barnId,
                      barnName: barn?.name,
                    });
                  }}
                >
                  Add Pen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {farmPens?.map((pen) => (
                <li key={pen.id}>
                  <Link
                    href={`/farms/${farmId}/barns/${barnId}/pens/${pen.unit_id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-3 py-3 sm:px-4 sm:py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center flex-wrap">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 mr-2">
                              {pen.name}
                            </p>
                            <span
                              className={`mt-1 sm:mt-0 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(
                                pen.status
                              )}`}
                            >
                              {pen.status.charAt(0).toUpperCase() +
                                pen.status.slice(1).toLowerCase()}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <span className="mr-2">
                              {pen?.livestock?.[0]?.livestock_type ||
                                "no livestock"}
                            </span>
                            <span>•</span>
                            <span className="ml-2">{pen.unit_id}</span>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <div className="mr-2 sm:mr-4 flex items-center">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-xs sm:text-sm text-gray-500">
                                {pen.livestock?.length || 0}/{pen.capacity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between text-xs sm:text-sm">
                        <div className="sm:flex flex-wrap">
                          <div className="text-gray-500 mr-4">
                            <span className="font-medium">Size:</span>{" "}
                            {pen.area_sqm}
                          </div>
                          <div className="text-gray-500 mr-4">
                            <span className="font-medium">Animals:</span>{" "}
                            {pen.livestock
                              ?.map((livestock) => livestock.livestock_type)
                              .join(", ")}
                          </div>
                        </div>
                        <div className="mt-1 sm:mt-0 flex items-center text-gray-500">
                          <span className="font-medium">Bedding Type:</span>{" "}
                          {(pen?.bedding_type ?? "").charAt(0).toUpperCase() +
                            pen?.bedding_type?.slice(1).toLowerCase()}
                        </div>
                      </div>
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
              <Link
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
              </Link>
            </div>
            <div className="hidden md:-mt-px md:flex">
              <Link
                href="#"
                className="inline-flex items-center border-t-2 border-green-500 px-4 pt-4 text-sm font-medium text-green-600"
                aria-current="page"
              >
                1
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                2
              </Link>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <Link
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
              </Link>
            </div>
          </nav>
        </div>

        {/* Environmental Alerts */}

        {/* Cleaning Schedule */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Cleaning Schedule
            </h3>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
              Upcoming room cleaning schedule
            </p>
          </div>
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Room
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Building
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Cleaned
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Next Schedule
                    </th>
                    <th
                      scope="col"
                      className="relative px-3 py-2 sm:px-6 sm:py-3"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms
                    .filter((r) => {
                      const lastCleaned = new Date(r.lastCleaned).valueOf();
                      const currentDate = new Date().valueOf();
                      const diffTime = Math.abs(currentDate - lastCleaned);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays > 5;
                    })
                    .sort(
                      (a, b) =>
                        new Date(a.lastCleaned).valueOf() -
                        new Date(b.lastCleaned).valueOf()
                    )
                    .slice(0, 5)
                    .map((room) => {
                      // Calculate next cleaning date (7 days after last cleaning)
                      const lastCleaned = new Date(room.lastCleaned);
                      const nextCleaning = new Date(lastCleaned);
                      nextCleaning.setDate(lastCleaned.getDate() + 7);

                      return (
                        <tr key={room.id}>
                          <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">
                              {room.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              {room.type}
                            </div>
                          </td>
                          <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            {room.houseName}
                          </td>
                          <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            {formatDate(room.lastCleaned)}
                          </td>
                          <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {formatDate(`${nextCleaning}`)}
                            </span>
                          </td>
                          <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                            <button
                              type="button"
                              className="text-green-600 hover:text-green-900"
                            >
                              Schedule
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Room Management
            </h3>
            <div className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
              <p>Quick actions for managing your rooms</p>
            </div>
            <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Schedule Cleaning
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Adjust Environment
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
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
