"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Award,
  Calendar,
  ArrowLeft,
  Users,
  Menu,
  X,
  Grid,
  List,
} from "lucide-react";

export default function WorkersListingPage() {
  // Sample workers data
  const [workers] = useState([
    {
      id: 1,
      name: "John Smith",
      role: "Farm Manager",
      joinDate: "2020-03-15",
      image: "/api/placeholder/40/40",
      rating: 92,
      specialization: "Dairy Management",
      status: "active",
      lastActivity: "2024-09-14T14:30:00Z",
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Veterinarian",
      joinDate: "2021-06-10",
      image: "/api/placeholder/40/40",
      rating: 95,
      specialization: "Animal Health",
      status: "active",
      lastActivity: "2024-09-14T11:15:00Z",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Feed Specialist",
      joinDate: "2019-11-22",
      image: "/api/placeholder/40/40",
      rating: 89,
      specialization: "Nutrition",
      status: "active",
      lastActivity: "2024-09-13T16:45:00Z",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Animal Caretaker",
      joinDate: "2022-01-15",
      image: "/api/placeholder/40/40",
      rating: 91,
      specialization: "Cattle Handling",
      status: "active",
      lastActivity: "2024-09-14T09:30:00Z",
    },
    {
      id: 5,
      name: "Robert Johnson",
      role: "Farm Technician",
      joinDate: "2021-08-03",
      image: "/api/placeholder/40/40",
      rating: 87,
      specialization: "Equipment Maintenance",
      status: "active",
      lastActivity: "2024-09-13T14:20:00Z",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      role: "Record Keeper",
      joinDate: "2022-04-18",
      image: "/api/placeholder/40/40",
      rating: 94,
      specialization: "Data Management",
      status: "on leave",
      lastActivity: "2024-09-10T11:30:00Z",
    },
    {
      id: 7,
      name: "David Martinez",
      role: "Field Worker",
      joinDate: "2020-05-12",
      image: "/api/placeholder/40/40",
      rating: 85,
      specialization: "Crop Management",
      status: "active",
      lastActivity: "2024-09-14T08:15:00Z",
    },
    {
      id: 8,
      name: "Lisa Thompson",
      role: "Assistant Manager",
      joinDate: "2019-09-20",
      image: "/api/placeholder/40/40",
      rating: 93,
      specialization: "Operations",
      status: "active",
      lastActivity: "2024-09-14T10:45:00Z",
    },
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter and sort workers
  const filteredWorkers = workers
    .filter((worker) => {
      // Search filter
      const matchesSearch =
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = roleFilter === "all" || worker.role === roleFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || worker.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "role") {
        return a.role.localeCompare(b.role);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "date") {
        return new Date(b.joinDate) - new Date(a.joinDate);
      } else if (sortBy === "activity") {
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      }
      return 0;
    });

  // Get unique roles for filter
  const roles = ["all", ...new Set(workers.map((worker) => worker.role))];

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  // Function to get rating color class
  const getRatingColorClass = (rating) => {
    if (rating >= 90) return "bg-green-500";
    if (rating >= 80) return "bg-green-400";
    if (rating >= 70) return "bg-yellow-400";
    return "bg-red-400";
  };

  // Worker stats
  const workerStats = {
    total: workers.length,
    active: workers.filter((w) => w.status === "active").length,
    onLeave: workers.filter((w) => w.status === "on leave").length,
    averageRating: (
      workers.reduce((sum, worker) => sum + worker.rating, 0) / workers.length
    ).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center">
              <a href="/farms/1" className="mr-4">
                <ArrowLeft className="text-gray-500 hover:text-gray-700" />
              </a>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Farm Workers
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your farm's team members
                </p>
              </div>
            </div>
            <button className="sm:ml-auto w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
              <Plus size={18} />
              <span>Add Worker</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search and filters - Responsive */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${viewMode === "grid" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700"}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${viewMode === "list" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700"}`}
              >
                <List size={18} />
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white"
            >
              {mobileMenuOpen ? <X size={18} /> : <Filter size={18} />}
            </button>
          </div>

          {/* Desktop view/filter buttons */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${viewMode === "grid" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${viewMode === "list" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              List
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={18} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Mobile filters drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="mobile-role-filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by Role
                </label>
                <select
                  id="mobile-role-filter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role === "all" ? "All Roles" : role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="mobile-status-filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by Status
                </label>
                <select
                  id="mobile-status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="on leave">On Leave</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="mobile-sort-by"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sort By
                </label>
                <select
                  id="mobile-sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="rating">Performance Rating</option>
                  <option value="date">Join Date</option>
                  <option value="activity">Last Activity</option>
                </select>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Desktop Advanced filters */}
        {showFilters && (
          <div className="hidden sm:block mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  htmlFor="role-filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by Role
                </label>
                <select
                  id="role-filter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role === "all" ? "All Roles" : role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="on leave">On Leave</option>
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
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="rating">Performance Rating</option>
                  <option value="date">Join Date</option>
                  <option value="activity">Last Activity</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats - Responsive */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Workers
                    </dt>
                    <dd className="text-xl sm:text-3xl font-semibold text-gray-900">
                      {workerStats.total}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Avg. Performance
                    </dt>
                    <dd className="text-xl sm:text-3xl font-semibold text-gray-900">
                      {workerStats.averageRating}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Active Workers
                    </dt>
                    <dd className="text-xl sm:text-3xl font-semibold text-gray-900">
                      {workerStats.active}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2 sm:p-3">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      On Leave
                    </dt>
                    <dd className="text-xl sm:text-3xl font-semibold text-gray-900">
                      {workerStats.onLeave}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workers list */}
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {filteredWorkers.length}{" "}
            {filteredWorkers.length === 1 ? "worker" : "workers"} found
          </h2>
        </div>

        {/* Grid View - Responsive */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                      src={worker.image}
                      alt={worker.name}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {worker.name}
                      </p>
                      <div className="flex items-center flex-wrap gap-1">
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {worker.role}
                        </p>
                        {worker.status === "on leave" && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            On Leave
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getRatingColorClass(worker.rating)}`}
                    >
                      <span className="text-xs font-medium text-white">
                        {worker.rating}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-4">
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Specialization:</span>
                      <p className="font-medium text-gray-900 truncate">
                        {worker.specialization}
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Joined:</span>
                      <p className="font-medium text-gray-900">
                        {new Date(worker.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-xs sm:text-sm text-gray-500">
                    <span className="font-medium">Last activity:</span>{" "}
                    {formatRelativeTime(worker.lastActivity)}
                  </div>

                  <div className="mt-4">
                    <a
                      href={`/farms/1/workers/${worker.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View - Responsive */}
        {viewMode === "list" && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredWorkers.map((worker) => (
                <li key={worker.id}>
                  <a
                    href={`/farms/1/workers/${worker.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={worker.image}
                              alt={worker.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {worker.name}
                            </div>
                            <div className="flex items-center flex-wrap gap-1">
                              <div className="text-xs sm:text-sm text-gray-500">
                                {worker.role}
                              </div>
                              {worker.status === "on leave" && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  On Leave
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                          <div className="flex flex-col sm:items-end">
                            <div className="text-xs sm:text-sm text-gray-900">
                              <span className="font-medium">Rating:</span>{" "}
                              {worker.rating}%
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              <span className="font-medium">Active:</span>{" "}
                              {formatRelativeTime(worker.lastActivity)}
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4 sm:ml-5">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-100">
                              <span className="text-xs font-medium text-gray-500">
                                View
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-500 sm:mt-0">
                            <div className="flex items-center">
                              <Award className="flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                              <span className="truncate">
                                Specialization: {worker.specialization}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <p>
                            <span className="font-medium">Joined:</span>{" "}
                            {new Date(worker.joinDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pagination - Responsive */}
        <div className="mt-6">
          <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <svg
                  className="mr-3 h-5 w-5 text-gray-400"
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
              </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-green-500 px-4 pt-4 text-sm font-medium text-green-600"
                aria-current="page"
              >
                1
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                2
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                3
              </a>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Next
                <svg
                  className="ml-3 h-5 w-5 text-gray-400"
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
              </a>
            </div>
          </nav>
        </div>

        {/* Team Management - Responsive */}
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Team Management
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Manage your team and their responsibilities.</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Schedule Shifts
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Assign Tasks
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Training Programs
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Performance Review
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule - Responsive */}
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Today's Schedule
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Worker shifts and assignments for today
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {/* Mobile schedule cards */}
            <div className="sm:hidden space-y-4">
              {[
                {
                  name: "John Smith",
                  role: "Farm Manager",
                  shift: "8:00 AM - 5:00 PM",
                  area: "Dairy Barn",
                  task: "Morning Inspection",
                  subtask: "Team coordination",
                },
                {
                  name: "Emily Davis",
                  role: "Veterinarian",
                  shift: "9:00 AM - 4:00 PM",
                  area: "All Areas",
                  task: "Health Checks",
                  subtask: "Scheduled vaccinations",
                },
                {
                  name: "Sarah Wilson",
                  role: "Animal Caretaker",
                  shift: "7:00 AM - 3:00 PM",
                  area: "Cattle Pasture",
                  task: "Feeding & Monitoring",
                  subtask: "Daily care routine",
                },
                {
                  name: "Robert Johnson",
                  role: "Farm Technician",
                  shift: "10:00 AM - 6:00 PM",
                  area: "Equipment Shed",
                  task: "Maintenance",
                  subtask: "Milking equipment repair",
                },
              ].map((worker, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-3"
                      src="/api/placeholder/40/40"
                      alt={worker.name}
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {worker.name}
                      </h4>
                      <p className="text-xs text-gray-500">{worker.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Shift</p>
                      <p className="text-xs font-medium">{worker.shift}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Area</p>
                      <p className="text-xs font-medium">{worker.area}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Task</p>
                    <p className="text-xs font-medium">{worker.task}</p>
                    <p className="text-xs text-gray-500">{worker.subtask}</p>
                  </div>
                  <div className="mt-3 text-right">
                    <a href="#" className="text-xs font-medium text-green-600">
                      Details
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Worker
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Shift Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Area
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Task
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/api/placeholder/40/40"
                            alt="John Smith"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            John Smith
                          </div>
                          <div className="text-sm text-gray-500">
                            Farm Manager
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      8:00 AM - 5:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Dairy Barn
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Morning Inspection
                      </div>
                      <div className="text-sm text-gray-500">
                        Team coordination
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/api/placeholder/40/40"
                            alt="Emily Davis"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Emily Davis
                          </div>
                          <div className="text-sm text-gray-500">
                            Veterinarian
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      9:00 AM - 4:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      All Areas
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Health Checks
                      </div>
                      <div className="text-sm text-gray-500">
                        Scheduled vaccinations
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/api/placeholder/40/40"
                            alt="Sarah Wilson"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Sarah Wilson
                          </div>
                          <div className="text-sm text-gray-500">
                            Animal Caretaker
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      7:00 AM - 3:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Cattle Pasture
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Feeding & Monitoring
                      </div>
                      <div className="text-sm text-gray-500">
                        Daily care routine
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/api/placeholder/40/40"
                            alt="Robert Johnson"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Robert Johnson
                          </div>
                          <div className="text-sm text-gray-500">
                            Farm Technician
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10:00 AM - 6:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Equipment Shed
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Maintenance
                      </div>
                      <div className="text-sm text-gray-500">
                        Milking equipment repair
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
            <a
              href="#"
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              View full schedule <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Time Off Requests - Responsive */}
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Pending Time Off Requests
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Approval required
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {/* Request cards */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                      src="/api/placeholder/40/40"
                      alt="David Martinez"
                    />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        David Martinez
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Field Worker
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Request date
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      Sep 12, 2024
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Time off period
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      Oct 10 - Oct 15, 2024
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Type</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      Vacation
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Duration
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      5 days
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Reason: Family reunion
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs sm:text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Deny
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs sm:text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                      src="/api/placeholder/40/40"
                      alt="Lisa Thompson"
                    />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Lisa Thompson
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Assistant Manager
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Request date
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      Sep 10, 2024
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Time off period
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      Sep 30, 2024
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Type</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      Personal Day
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Duration
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      1 day
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Reason: Medical appointment
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs sm:text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Deny
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs sm:text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
            <a
              href="#"
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              View all time off requests <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Mobile-friendly sections for the remainder */}
        <div className="mt-6 space-y-6">
          {/* Certifications Due for Renewal - Responsive */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Certifications Due for Renewal
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Workers with expiring credentials
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ul className="divide-y divide-gray-200">
                <li className="py-4 flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-start sm:items-center">
                    <img
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                      src="/api/placeholder/40/40"
                      alt="John Smith"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          John Smith
                        </p>
                        <p className="text-xs sm:text-sm text-red-600 font-medium mt-1 sm:mt-0">
                          Expires in 15 days
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Agricultural Management
                      </p>
                      <p className="text-xs text-gray-400">
                        Required for position: Farm Manager
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-3 sm:mt-0 sm:ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 w-full sm:w-auto justify-center"
                  >
                    Schedule Renewal
                  </button>
                </li>
                <li className="py-4 flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-start sm:items-center">
                    <img
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                      src="/api/placeholder/40/40"
                      alt="Emily Davis"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Emily Davis
                        </p>
                        <p className="text-xs sm:text-sm text-yellow-600 font-medium mt-1 sm:mt-0">
                          Expires in 45 days
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Veterinary License
                      </p>
                      <p className="text-xs text-gray-400">
                        Required for position: Veterinarian
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-3 sm:mt-0 sm:ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 w-full sm:w-auto justify-center"
                  >
                    Schedule Renewal
                  </button>
                </li>
              </ul>
            </div>
            <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                View all certifications <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Training Opportunities - Responsive */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Training Opportunities
              </h3>
              <div className="mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
                <p>Upskill your team with these upcoming training programs.</p>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    Advanced Animal Care Training
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Learn the latest techniques in livestock health management.
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>Oct 5-6, 2024</span>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>5 spots available</span>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Enroll Team Members
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    Farm Technology Workshop
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Digital tools and technologies for modern farm management.
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>Oct 15, 2024</span>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>8 spots available</span>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Enroll Team Members
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
