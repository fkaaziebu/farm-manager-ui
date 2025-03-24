"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Map as MapIcon,
  Home,
  Mouse,
  ChevronRight,
  Users,
  BarChart,
  Menu,
  X,
} from "lucide-react";

export default function FarmsListingPage() {
  // Sample farm data
  const [farms] = useState([
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Somerset",
      animals: 237,
      workers: 12,
      area: "120 acres",
      performance: 85,
      houses: [
        {
          id: 101,
          name: "Main Barn",
          type: "Cattle Barn",
          animals: 42,
          status: "operational",
        },
        {
          id: 102,
          name: "West Wing",
          type: "Cattle Barn",
          animals: 38,
          status: "operational",
        },
        {
          id: 103,
          name: "East Storage",
          type: "Storage",
          animals: 0,
          status: "maintenance",
        },
      ],
    },
    {
      id: 2,
      name: "Mountain Ridge Ranch",
      location: "Colorado",
      animals: 156,
      workers: 8,
      area: "90 acres",
      performance: 78,
      houses: [
        {
          id: 201,
          name: "Ridge Barn",
          type: "Cattle Barn",
          animals: 35,
          status: "operational",
        },
        {
          id: 202,
          name: "Mountain Shelter",
          type: "Mixed Livestock",
          animals: 121,
          status: "operational",
        },
      ],
    },
    {
      id: 3,
      name: "Sunset Dairy",
      location: "Wisconsin",
      animals: 322,
      workers: 15,
      area: "200 acres",
      performance: 92,
      houses: [
        {
          id: 301,
          name: "Milking Center",
          type: "Dairy",
          animals: 150,
          status: "operational",
        },
        {
          id: 302,
          name: "North Barn",
          type: "Dairy",
          animals: 172,
          status: "operational",
        },
        {
          id: 303,
          name: "Equipment Shed",
          type: "Storage",
          animals: 0,
          status: "operational",
        },
        {
          id: 304,
          name: "Calf Housing",
          type: "Calf Barn",
          animals: 0,
          status: "under construction",
        },
      ],
    },
    {
      id: 4,
      name: "Riverside Poultry",
      location: "Georgia",
      animals: 5000,
      workers: 20,
      area: "45 acres",
      performance: 81,
      houses: [
        {
          id: 401,
          name: "Poultry House A",
          type: "Poultry",
          animals: 1250,
          status: "operational",
        },
        {
          id: 402,
          name: "Poultry House B",
          type: "Poultry",
          animals: 1250,
          status: "operational",
        },
        {
          id: 403,
          name: "Poultry House C",
          type: "Poultry",
          animals: 1250,
          status: "operational",
        },
        {
          id: 404,
          name: "Poultry House D",
          type: "Poultry",
          animals: 1250,
          status: "operational",
        },
        {
          id: 405,
          name: "Processing Unit",
          type: "Processing",
          animals: 0,
          status: "operational",
        },
      ],
    },
    {
      id: 5,
      name: "Golden Grain Acres",
      location: "Kansas",
      animals: 0,
      workers: 7,
      area: "300 acres",
      performance: 76,
      houses: [
        {
          id: 501,
          name: "Grain Storage",
          type: "Storage",
          animals: 0,
          status: "operational",
        },
        {
          id: 502,
          name: "Equipment Barn",
          type: "Storage",
          animals: 0,
          status: "maintenance",
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredFarms = farms.filter(
    (farm) =>
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return "bg-green-500";
    if (performance >= 80) return "bg-green-400";
    if (performance >= 70) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getStatusColor = (status) => {
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

  const MAX_HOUSES_DISPLAY = 2;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Farms
              </h1>
              <div className="sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
              <Plus size={18} />
              <span>Add New Farm</span>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                <a
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Dashboard
                </a>
                <a
                  href="/farms"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-100"
                >
                  Farms
                </a>
                <a
                  href="/animals"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Animals
                </a>
                <a
                  href="/workers"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Workers
                </a>
                <a
                  href="/reports"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Reports
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Responsive Search */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Search farms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Dashboard Sections */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Farms Overview Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Farms Overview
              </h2>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {farms.length}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total farms in the system
            </p>

            <div className="mt-3 sm:mt-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">Average Performance</span>
                <span className="text-gray-900 font-medium">
                  {(
                    farms.reduce((sum, farm) => sum + farm.performance, 0) /
                    farms.length
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-1 sm:mt-2">
                <div
                  className="bg-green-500 h-1.5 sm:h-2 rounded-full"
                  style={{
                    width: `${(farms.reduce((sum, farm) => sum + farm.performance, 0) / farms.length).toFixed(1)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Animals Overview Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Animals Overview
              </h2>
              <Mouse className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {farms
                .reduce((sum, farm) => sum + farm.animals, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total animals across all farms
            </p>

            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span>Poultry: </span>
                  <span className="font-medium text-gray-900">5,000</span>
                </div>
                <div>
                  <span>Cattle: </span>
                  <span className="font-medium text-gray-900">715</span>
                </div>
              </div>
            </div>
          </div>

          {/* Houses Overview Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Houses Overview
              </h2>
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {farms.reduce((sum, farm) => sum + farm.houses.length, 0)}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total houses across all farms
            </p>

            <div className="mt-3 sm:mt-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 mr-1 sm:mr-2"></span>
                  <span className="text-gray-500">Operational: </span>
                  <span className="font-medium text-gray-900 ml-1">13</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 mr-1 sm:mr-2"></span>
                  <span className="text-gray-500">Maintenance: </span>
                  <span className="font-medium text-gray-900 ml-1">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Farm cards */}
      <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
          All Farms
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFarms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 truncate">
                    {farm.name}
                  </h3>
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${getPerformanceColor(farm.performance)}`}
                  >
                    <span className="text-xs sm:text-sm text-white font-bold">
                      {farm.performance}%
                    </span>
                  </div>
                </div>
                <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-gray-500">
                  <MapIcon size={16} className="mr-1.5 flex-shrink-0" />
                  <p className="truncate">
                    {farm.location} • {farm.area}
                  </p>
                </div>

                {/* Statistics Section */}
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                    <div className="flex items-center">
                      <span className="flex-shrink-0 text-xs uppercase font-semibold text-gray-500">
                        Animals
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-gray-900 mt-0.5 sm:mt-1">
                      {farm.animals.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                    <div className="flex items-center">
                      <span className="flex-shrink-0 text-xs uppercase font-semibold text-gray-500">
                        Workers
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-gray-900 mt-0.5 sm:mt-1">
                      {farm.workers}
                    </p>
                  </div>
                </div>

                {/* Houses Section with clear separation */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="text-sm font-medium text-gray-900 flex items-center">
                      <Home size={16} className="mr-1.5" />
                      Houses ({farm.houses.length})
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {farm.houses.slice(0, MAX_HOUSES_DISPLAY).map((house) => (
                      <div
                        key={house.id}
                        className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                      >
                        <div>
                          <div className="font-medium text-xs sm:text-sm text-gray-900 truncate max-w-[120px] sm:max-w-none">
                            {house.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
                            {house.type}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          {house.animals > 0 && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Mouse size={12} className="mr-1" />
                              {house.animals}
                            </div>
                          )}
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
                          >
                            {house.status.charAt(0).toUpperCase() +
                              house.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {farm.houses.length > MAX_HOUSES_DISPLAY && (
                      <a
                        href={`/farms/${farm.id}/houses`}
                        className="flex items-center justify-center p-2 bg-gray-50 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View All {farm.houses.length} Houses
                        <ChevronRight size={16} className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                  <a
                    href={`/farms/${farm.id}`}
                    className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                  >
                    View Details
                  </a>
                  <a
                    href={`/farms/${farm.id}/houses`}
                    className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Manage Houses
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
