"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Home,
  ArrowLeft,
  ThermometerSnowflake,
  Droplets,
  Wind,
  AlertTriangle,
  Menu,
  X,
  Grid,
  List,
} from "lucide-react";
import Link from "next/link";
import ProfilePic from "@/../public/globe.svg";
import Image from "next/image";

export default function HouseListingPage() {
  // Sample houses data
  const [houses] = useState([
    {
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
      temperature: 18.5,
      humidity: 65,
      image: "/public/globe.svg",
    },
    {
      id: 2,
      name: "Dairy Facility",
      type: "Dairy Barn",
      size: "1,800 sq ft",
      capacity: 30,
      occupancy: 28,
      rooms: 6,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "high",
      ventilationStatus: "normal",
      maintenanceStatus: "good",
      lastInspection: "2024-08-25",
      temperature: 19.2,
      humidity: 78,
      image: "/public/globe.svg",
    },
    {
      id: 3,
      name: "Swine Facility",
      type: "Pig Barn",
      size: "1,400 sq ft",
      capacity: 60,
      occupancy: 52,
      rooms: 5,
      status: "operational",
      temperatureStatus: "high",
      humidityStatus: "normal",
      ventilationStatus: "alert",
      maintenanceStatus: "needs attention",
      lastInspection: "2024-08-20",
      temperature: 24.5,
      humidity: 65,
      image: "/public/globe.svg",
    },
    {
      id: 4,
      name: "Poultry House",
      type: "Poultry House",
      size: "1,200 sq ft",
      capacity: 200,
      occupancy: 182,
      rooms: 2,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      maintenanceStatus: "good",
      lastInspection: "2024-09-05",
      temperature: 22.3,
      humidity: 60,
      image: "/public/globe.svg",
    },
    {
      id: 5,
      name: "Sheep Pen",
      type: "Sheep Housing",
      size: "1,000 sq ft",
      capacity: 40,
      occupancy: 32,
      rooms: 4,
      status: "maintenance",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      maintenanceStatus: "under repair",
      lastInspection: "2024-08-15",
      temperature: 17.8,
      humidity: 62,
      image: "/public/globe.svg",
    },
    {
      id: 6,
      name: "Calving Barn",
      type: "Specialized Barn",
      size: "800 sq ft",
      capacity: 15,
      occupancy: 8,
      rooms: 6,
      status: "operational",
      temperatureStatus: "normal",
      humidityStatus: "normal",
      ventilationStatus: "normal",
      maintenanceStatus: "good",
      lastInspection: "2024-08-30",
      temperature: 20.1,
      humidity: 68,
      image: "/public/globe.svg",
    },
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter and sort houses
  const filteredHouses = houses
    .filter((house) => {
      // Search filter
      const matchesSearch =
        house.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        house.type.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = typeFilter === "all" || house.type === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || house.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      } else if (sortBy === "capacity") {
        return b.capacity - a.capacity;
      } else if (sortBy === "occupancy") {
        return b.occupancy / b.capacity - a.occupancy / a.capacity;
      } else if (sortBy === "inspection") {
        return (
          new Date(b.lastInspection).valueOf() -
          new Date(a.lastInspection).valueOf()
        );
      }
      return 0;
    });

  // Get unique house types for filter
  const houseTypes = ["all", ...new Set(houses.map((house) => house.type))];

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
        return "text-green-500";
      case "high":
      case "low":
      case "alert":
        return "text-yellow-500";
      case "critical":
        return "text-red-500";
      case "needs attention":
      case "under repair":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  // Calculate occupancy percentage
  const calculateOccupancy = (occupancy: number, capacity: number) => {
    return ((occupancy / capacity) * 100).toFixed(0);
  };

  // House stats
  const houseStats = {
    total: houses.length,
    operational: houses.filter((h) => h.status === "operational").length,
    maintenance: houses.filter((h) => h.status === "maintenance").length,
    alertsCount: houses.filter(
      (h) =>
        h.temperatureStatus !== "normal" ||
        h.humidityStatus !== "normal" ||
        h.ventilationStatus !== "normal" ||
        h.maintenanceStatus === "needs attention" ||
        h.maintenanceStatus === "under repair",
    ).length,
    totalCapacity: houses.reduce((sum, house) => sum + house.capacity, 0),
    totalOccupancy: houses.reduce((sum, house) => sum + house.occupancy, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center">
              <Link href="/farms/1" className="mr-3 sm:mr-4">
                <ArrowLeft className="text-gray-500 hover:text-gray-700" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Farm Houses
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Manage your farm&apos;s buildings and facilities
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 sm:mt-0 sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Plus size={16} />
              <span>Add House</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        <button
          type="button"
          className="flex items-center justify-center w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mt-2 space-y-1 px-2">
            <button
              type="button"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                viewMode === "grid"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setViewMode("grid");
                setMobileMenuOpen(false);
              }}
            >
              <Grid size={16} className="inline mr-2" /> Grid View
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("list");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
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
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              <Filter size={16} className="inline mr-2" /> Filters
            </button>
          </div>
        )}
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
              placeholder="Search houses by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${viewMode === "grid" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              <Grid size={16} className="mr-1 sm:mr-2" />
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${viewMode === "list" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
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
                  htmlFor="type-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  House Type
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {houseTypes.map((type) => (
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
                  <option value="capacity">Capacity</option>
                  <option value="occupancy">Occupancy Rate</option>
                  <option value="inspection">Last Inspection Date</option>
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
                  <Home className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Houses
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {houseStats.total}
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
                  <Home className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Operational
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {houseStats.operational}
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
                      Active Alerts
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {houseStats.alertsCount}
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
                  <Home className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Occupancy
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {calculateOccupancy(
                        houseStats.totalOccupancy,
                        houseStats.totalCapacity,
                      )}
                      %
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Houses list */}
      <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900">
            {filteredHouses.length}{" "}
            {filteredHouses.length === 1 ? "house" : "houses"} found
          </h2>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {filteredHouses.map((house) => (
              <div
                key={house.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="relative">
                  <Image
                    className="h-36 sm:h-48 w-full object-cover"
                    src={ProfilePic}
                    alt={house.name}
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
                    >
                      {house.status.charAt(0).toUpperCase() +
                        house.status.slice(1)}
                    </span>
                  </div>
                  {(house.temperatureStatus !== "normal" ||
                    house.humidityStatus !== "normal" ||
                    house.ventilationStatus !== "normal") && (
                    <div className="absolute bottom-0 right-0 m-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Alert
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {house.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {house.type}
                  </p>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Size:</span>
                      <p className="font-medium text-gray-900">{house.size}</p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Rooms:</span>
                      <p className="font-medium text-gray-900">{house.rooms}</p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <p className="font-medium text-gray-900">
                        {house.capacity} animals
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Occupancy:</span>
                      <p className="font-medium text-gray-900">
                        {house.occupancy} (
                        {calculateOccupancy(house.occupancy, house.capacity)}%)
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center">
                      <ThermometerSnowflake
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(house.temperatureStatus)}`}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {house.temperature}°C
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Droplets
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(house.humidityStatus)}`}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {house.humidity}%
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Wind
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(house.ventilationStatus)}`}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        Ventilation
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <Link
                      href={`/farms/1/houses/${house.id}`}
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      View Rooms
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
              {filteredHouses.map((house) => (
                <li key={house.id}>
                  <Link
                    href={`/farms/1/houses/${house.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-3 py-3 sm:px-4 sm:py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-md overflow-hidden">
                            <Image
                              src={ProfilePic}
                              alt={house.name}
                              className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
                            />
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {house.name}
                            </div>
                            <div className="flex flex-wrap items-center">
                              <div className="text-xs sm:text-sm text-gray-500 mr-2">
                                {house.type}
                              </div>
                              <span
                                className={`mt-1 sm:mt-0 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(house.status)}`}
                              >
                                {house.status.charAt(0).toUpperCase() +
                                  house.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <div className="mr-3 sm:mr-4 flex flex-col items-end">
                            <div className="text-xs sm:text-sm text-gray-900">
                              <span className="font-medium">Capacity:</span>{" "}
                              {house.capacity}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              <span className="font-medium">Occupancy:</span>{" "}
                              {calculateOccupancy(
                                house.occupancy,
                                house.capacity,
                              )}
                              %
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-100">
                              <span className="text-xs font-medium text-gray-500">
                                View
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex flex-wrap gap-2 sm:gap-4">
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <Home className="flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <span>{house.rooms} rooms</span>
                          </div>
                          <div className="flex items-center mt-1 sm:mt-0 text-xs sm:text-sm text-gray-500">
                            <ThermometerSnowflake
                              className={`flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(house.temperatureStatus)}`}
                            />
                            <span>{house.temperature}°C</span>
                          </div>
                          <div className="flex items-center mt-1 sm:mt-0 text-xs sm:text-sm text-gray-500">
                            <Droplets
                              className={`flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(house.humidityStatus)}`}
                            />
                            <span>{house.humidity}%</span>
                          </div>
                          <div className="flex items-center mt-1 sm:mt-0 text-xs sm:text-sm text-gray-500">
                            <Wind
                              className={`flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 ${getAlertColor(house.ventilationStatus)}`}
                            />
                            <span>Ventilation</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-500 sm:mt-0">
                          <span>
                            Last inspection:{" "}
                            {new Date(
                              house.lastInspection,
                            ).toLocaleDateString()}
                          </span>
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

        {/* Alerts Summary */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Active House Alerts
            </h3>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
              Environmental and maintenance issues requiring attention
            </p>
          </div>
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="space-y-3 sm:space-y-4">
              {houses
                .filter(
                  (h) =>
                    h.temperatureStatus !== "normal" ||
                    h.humidityStatus !== "normal" ||
                    h.ventilationStatus !== "normal" ||
                    h.maintenanceStatus === "needs attention" ||
                    h.maintenanceStatus === "under repair",
                )
                .map((house) => (
                  <div
                    key={house.id}
                    className="border border-gray-200 rounded-md p-3 sm:p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded"
                            src={ProfilePic}
                            alt={house.name}
                          />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                            {house.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {house.type}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`mt-2 sm:mt-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(house.status)}`}
                      >
                        {house.status.charAt(0).toUpperCase() +
                          house.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                      {house.temperatureStatus !== "normal" && (
                        <div className="flex items-center text-xs sm:text-sm">
                          <ThermometerSnowflake
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(house.temperatureStatus)} mr-1 sm:mr-2`}
                          />
                          <span className="text-gray-700">
                            Temperature {house.temperatureStatus.toUpperCase()}:
                            Current {house.temperature}°C
                          </span>
                        </div>
                      )}
                      {house.humidityStatus !== "normal" && (
                        <div className="flex items-center text-xs sm:text-sm">
                          <Droplets
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(house.humidityStatus)} mr-1 sm:mr-2`}
                          />
                          <span className="text-gray-700">
                            Humidity {house.humidityStatus.toUpperCase()}:
                            Current {house.humidity}%
                          </span>
                        </div>
                      )}
                      {house.ventilationStatus !== "normal" && (
                        <div className="flex items-center text-xs sm:text-sm">
                          <Wind
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(house.ventilationStatus)} mr-1 sm:mr-2`}
                          />
                          <span className="text-gray-700">
                            Ventilation system requires attention
                          </span>
                        </div>
                      )}
                      {(house.maintenanceStatus === "needs attention" ||
                        house.maintenanceStatus === "under repair") && (
                        <div className="flex items-center text-xs sm:text-sm">
                          <AlertTriangle
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${getAlertColor(house.maintenanceStatus)} mr-1 sm:mr-2`}
                          />
                          <span className="text-gray-700">
                            Maintenance status: {house.maintenanceStatus}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Resolve
                      </button>
                      <Link
                        href={`/farms/1/houses/${house.id}`}
                        className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}

              {houses.filter(
                (h) =>
                  h.temperatureStatus !== "normal" ||
                  h.humidityStatus !== "normal" ||
                  h.ventilationStatus !== "normal" ||
                  h.maintenanceStatus === "needs attention" ||
                  h.maintenanceStatus === "under repair",
              ).length === 0 && (
                <div className="text-center py-4 sm:py-6">
                  <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-green-600"
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
                  <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-900">
                    No active alerts
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    All houses are operating within normal parameters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Upcoming Maintenance
            </h3>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
              Scheduled maintenance activities
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
                      House
                    </th>
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
                      Assigned To
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
                  <tr>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <Image
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover"
                            src={ProfilePic}
                            alt={houses[0].name}
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {houses[0].name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {houses[0].type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Sep 25, 2024
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        Regular Inspection
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Quarterly
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      John Smith
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <Link
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Reschedule
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <Image
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover"
                            src={ProfilePic}
                            alt={houses[2].name}
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {houses[2].name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {houses[2].type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Sep 27, 2024
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        Ventilation Repair
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Urgent
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Robert Johnson
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <Link
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Reschedule
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <Image
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover"
                            src={ProfilePic}
                            alt={houses[4].name}
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {houses[4].name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {houses[4].type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Oct 2, 2024
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        Infrastructure Repair
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Scheduled
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      External Contractor
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <Link
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Reschedule
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-3 py-3 sm:px-4 sm:py-4 border-t border-gray-200">
            <Link
              href="#"
              className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
            >
              View full maintenance schedule{" "}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Environmental Dashboard Summary */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Environmental Dashboard
            </h3>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
              Average house conditions across the farm
            </p>
          </div>
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-3">
              {/* Temperature card */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    Temperature
                  </h4>
                  <ThermometerSnowflake className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <div className="flex items-end">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {(
                      houses.reduce(
                        (sum, house) => sum + house.temperature,
                        0,
                      ) / houses.length
                    ).toFixed(1)}
                    °C
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-green-500">
                    Optimal range: 17-23°C
                  </span>
                </div>
                <div className="mt-3 sm:mt-4">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: "75%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Cold</span>
                    <span>Optimal</span>
                    <span>Hot</span>
                  </div>
                </div>
              </div>

              {/* Humidity card */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    Humidity
                  </h4>
                  <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <div className="flex items-end">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {(
                      houses.reduce((sum, house) => sum + house.humidity, 0) /
                      houses.length
                    ).toFixed(1)}
                    %
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-green-500">
                    Optimal range: 55-75%
                  </span>
                </div>
                <div className="mt-3 sm:mt-4">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: "70%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Dry</span>
                    <span>Optimal</span>
                    <span>Humid</span>
                  </div>
                </div>
              </div>

              {/* Ventilation card */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    Ventilation
                  </h4>
                  <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <div className="flex items-end">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {(() => {
                      const operational = houses.filter(
                        (h) => h.ventilationStatus === "normal",
                      ).length;
                      const total = houses.length;
                      return `${operational}/${total}`;
                    })()}
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-green-500">
                    Systems operational
                  </span>
                </div>
                <div className="mt-3 sm:mt-4">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width: `${(houses.filter((h) => h.ventilationStatus === "normal").length / houses.length) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Issues</span>
                    <span>Operational</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 text-center">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                View Full Environmental Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              House Management
            </h3>
            <div className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
              <p>Quick actions for managing your farm houses and facilities.</p>
            </div>
            <div className="mt-3 sm:mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Schedule Inspection
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Assign Maintenance
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Generate Report
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Order Supplies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
