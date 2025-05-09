"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Heart,
  AlertTriangle,
  ArrowLeft,
  Menu,
  X,
  Grid,
  List,
} from "lucide-react";
import Link from "next/link";

export default function AnimalsListingPage() {
  // Sample animals data
  const [animals] = useState([
    {
      id: "A12345",
      type: "Cattle",
      breed: "Holstein",
      birthDate: "2022-05-12",
      age: "2y 4m",
      gender: "Female",
      weight: 535,
      status: "Healthy",
      location: "Pasture A",
      lastCheck: "2024-09-05",
      tagColor: "green",
    },
    {
      id: "A12346",
      type: "Cattle",
      breed: "Jersey",
      birthDate: "2021-08-22",
      age: "3y 1m",
      gender: "Female",
      weight: 485,
      status: "Healthy",
      location: "Dairy Barn",
      lastCheck: "2024-09-10",
      tagColor: "green",
    },
    {
      id: "A12347",
      type: "Cattle",
      breed: "Angus",
      birthDate: "2022-03-10",
      age: "2y 6m",
      gender: "Male",
      weight: 620,
      status: "Healthy",
      location: "Pasture B",
      lastCheck: "2024-09-08",
      tagColor: "blue",
    },
    {
      id: "A12348",
      type: "Sheep",
      breed: "Merino",
      birthDate: "2023-01-15",
      age: "1y 8m",
      gender: "Female",
      weight: 65,
      status: "Treatment",
      location: "Barn C",
      lastCheck: "2024-09-12",
      tagColor: "yellow",
    },
    {
      id: "A12349",
      type: "Sheep",
      breed: "Suffolk",
      birthDate: "2022-11-30",
      age: "1y 10m",
      gender: "Male",
      weight: 78,
      status: "Healthy",
      location: "Barn C",
      lastCheck: "2024-09-07",
      tagColor: "blue",
    },
    {
      id: "A12350",
      type: "Pig",
      breed: "Yorkshire",
      birthDate: "2023-06-18",
      age: "1y 3m",
      gender: "Female",
      weight: 110,
      status: "Pregnant",
      location: "Pig House A",
      lastCheck: "2024-09-11",
      tagColor: "pink",
    },
    {
      id: "A12351",
      type: "Pig",
      breed: "Duroc",
      birthDate: "2023-05-05",
      age: "1y 4m",
      gender: "Male",
      weight: 125,
      status: "Healthy",
      location: "Pig House B",
      lastCheck: "2024-09-09",
      tagColor: "blue",
    },
    {
      id: "A12352",
      type: "Chicken",
      breed: "Leghorn",
      birthDate: "2023-08-12",
      age: "1y 1m",
      gender: "Female",
      weight: 1.8,
      status: "Healthy",
      location: "Coop A",
      lastCheck: "2024-09-06",
      tagColor: "white",
    },
    {
      id: "A12353",
      type: "Chicken",
      breed: "Rhode Island Red",
      birthDate: "2023-09-20",
      age: "1y 0m",
      gender: "Female",
      weight: 2.1,
      status: "Treatment",
      location: "Coop B",
      lastCheck: "2024-09-11",
      tagColor: "yellow",
    },
    {
      id: "A12354",
      type: "Cattle",
      breed: "Hereford",
      birthDate: "2021-10-05",
      age: "2y 11m",
      gender: "Male",
      weight: 750,
      status: "Healthy",
      location: "Pasture C",
      lastCheck: "2024-09-10",
      tagColor: "blue",
    },
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter and sort animals
  const filteredAnimals = animals
    .filter((animal) => {
      // Search filter
      const matchesSearch =
        animal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = typeFilter === "all" || animal.type === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || animal.status === statusFilter;

      // Gender filter
      const matchesGender =
        genderFilter === "all" || animal.gender === genderFilter;

      return matchesSearch && matchesType && matchesStatus && matchesGender;
    })
    .sort((a, b) => {
      if (sortBy === "id") {
        return a.id.localeCompare(b.id);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      } else if (sortBy === "age") {
        return (
          new Date(a.birthDate).valueOf() - new Date(b.birthDate).valueOf()
        );
      } else if (sortBy === "weight") {
        return b.weight - a.weight;
      } else if (sortBy === "lastCheck") {
        return (
          new Date(b.lastCheck).valueOf() - new Date(a.lastCheck).valueOf()
        );
      }
      return 0;
    });

  // Get unique animal types for filter
  const animalTypes = ["all", ...new Set(animals.map((animal) => animal.type))];
  const statusTypes = [
    "all",
    ...new Set(animals.map((animal) => animal.status)),
  ];

  // Function to get tag color class
  const getTagColorClass = (tagColor: string) => {
    switch (tagColor) {
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "pink":
        return "bg-pink-100 text-pink-800";
      case "white":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-800";
      case "Treatment":
        return "bg-yellow-100 text-yellow-800";
      case "Pregnant":
        return "bg-purple-100 text-purple-800";
      case "Quarantine":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Animal stats
  const animalStats = {
    total: animals.length,
    healthy: animals.filter((a) => a.status === "Healthy").length,
    treatment: animals.filter((a) => a.status === "Treatment").length,
    pregnant: animals.filter((a) => a.status === "Pregnant").length,
    needsCheck: animals.filter((a) => {
      const lastCheck = new Date(a.lastCheck).valueOf();
      const currentDate = new Date().valueOf();
      const diffTime = Math.abs(currentDate - lastCheck);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 7;
    }).length,
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
                  Farm Animals
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Manage your farm&apos;s animal inventory
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 sm:mt-0 sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Plus size={16} />
              <span>Add Animal</span>
            </button>
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
              <span>Animal Menu</span>
            </>
          )}
        </button>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="mt-2 space-y-1 px-2">
            <button
              onClick={() => {
                setViewMode("grid");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                viewMode === "grid"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Grid size={16} className="inline mr-2" /> Grid View
            </button>
            <button
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
              placeholder="Search animals by ID, breed, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setViewMode("grid")}
              className={`hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${viewMode === "grid" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              <Grid size={16} className="mr-1 sm:mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`hidden md:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${viewMode === "list" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              <List size={16} className="mr-1 sm:mr-2" />
              List
            </button>
            <button
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
                  Animal Type
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {animalTypes.map((type) => (
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
                  Health Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {statusTypes.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="gender-filter"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender-filter"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                  <option value="id">ID</option>
                  <option value="type">Type</option>
                  <option value="age">Age</option>
                  <option value="weight">Weight</option>
                  <option value="lastCheck">Last Check Date</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Animals
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.total}
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
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Healthy
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.healthy}
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
                      In Treatment
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.treatment}
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
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Pregnant
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.pregnant}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-2 sm:p-3">
                  <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Needs Check
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.needsCheck}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animals grid/list view */}
      <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900">
            {filteredAnimals.length}{" "}
            {filteredAnimals.length === 1 ? "animal" : "animals"} found
          </h2>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {filteredAnimals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-3 sm:p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTagColorClass(animal.tagColor)}`}
                        >
                          {animal.id}
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(animal.status)}`}
                        >
                          {animal.status}
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm sm:text-lg font-medium text-gray-900">
                        {animal.breed} {animal.type}
                      </h3>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <span className="text-xs font-medium text-gray-500">
                        {animal.gender.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Age:</span>
                      <p className="font-medium text-gray-900">{animal.age}</p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Weight:</span>
                      <p className="font-medium text-gray-900">
                        {animal.weight} kg
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium text-gray-900">
                        {animal.location}
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Last Check:</span>
                      <p className="font-medium text-gray-900">
                        {new Date(animal.lastCheck).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <a
                      href={`/farms/1/animals/${animal.id}`}
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      View Details
                    </a>
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
              {filteredAnimals.map((animal) => (
                <li key={animal.id}>
                  <a
                    href={`/farms/1/animals/${animal.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-3 py-3 sm:px-4 sm:py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getTagColorClass(animal.tagColor)}`}
                          >
                            {animal.id}
                          </span>
                          <p className="ml-2 text-xs sm:text-sm font-medium text-gray-900">
                            {animal.breed} {animal.type}
                          </p>
                          <span
                            className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColorClass(animal.status)}`}
                          >
                            {animal.status}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <div className="mr-2 sm:mr-4 flex flex-col items-end">
                            <div className="text-xs sm:text-sm text-gray-900">
                              {animal.weight} kg
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              {animal.age}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-100">
                              <span className="text-xs font-medium text-gray-800">
                                {animal.gender.charAt(0)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                        <div className="sm:flex items-center">
                          <div className="flex items-center">
                            <div className="text-xs sm:text-sm text-gray-500">
                              <span className="font-medium">Location:</span>{" "}
                              {animal.location}
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1 h-3 w-3 sm:h-5 sm:w-5 text-gray-400" />
                          <p>
                            <span className="font-medium">Last check:</span>{" "}
                            {new Date(animal.lastCheck).toLocaleDateString()}
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

        {/* Pagination */}
        <div className="mt-4 sm:mt-6">
          <nav className="flex items-center justify-between border-t border-gray-200 px-2 sm:px-4">
            <div className="-mt-px flex w-0 flex-1">
              <a
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
              <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                ...
              </span>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                8
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                9
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                10
              </a>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <a
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
              </a>
            </div>
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6">
          <div className="rounded-md bg-green-50 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-shrink-0 flex items-center sm:items-start">
                <AlertTriangle
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Animal Health Alert
                </h3>
                <div className="mt-2 text-xs sm:text-sm text-green-700">
                  <p>
                    {animalStats.needsCheck} animals need a health check. Would
                    you like to schedule a routine health check for all these
                    animals?
                  </p>
                </div>
                <div className="mt-3 sm:mt-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-green-50 px-2 py-1.5 text-xs sm:text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      Schedule Check
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-green-50 px-2 py-1.5 text-xs sm:text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      View Animals
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-green-50 px-2 py-1.5 text-xs sm:text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Animal Events */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Upcoming Animal Events
            </h3>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
              Next 7 days schedule
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
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Animals
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
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Sep 15, 2024
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        Vaccination
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Annual boosters
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Cattle
                      </span>
                      <span className="ml-1 text-xs sm:text-sm text-gray-500">
                        5 animals
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Dr. Emily Davis
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Sep 17, 2024
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        Weight Check
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Monthly measurement
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Pig
                      </span>
                      <span className="ml-1 text-xs sm:text-sm text-gray-500">
                        8 animals
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      John Smith
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Sep 19, 2024
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        Health Check
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Follow-up treatment
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Sheep
                      </span>
                      <span className="ml-1 text-xs sm:text-sm text-gray-500">
                        2 animals
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      Dr. Emily Davis
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
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
          <div className="px-3 py-3 sm:px-4 sm:py-4 border-t border-gray-200">
            <a
              href="#"
              className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
            >
              View all events <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
              Bulk Actions
            </h3>
            <div className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
              <p>Perform operations on multiple animals at once.</p>
            </div>
            <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Schedule Health Check
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Update Feed Program
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
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
