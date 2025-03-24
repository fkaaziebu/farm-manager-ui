"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  Download,
  Plus,
  Menu,
  X,
  Users,
  Check,
  AlertTriangle,
  Pencil,
  Trash,
  Share,
} from "lucide-react";
import Link from "next/link";

export default function RoomAnimalsPage() {
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
    lastCleaned: "2024-09-10",
    houseId: 1,
    houseName: "Main Barn",
  };

  // Sample animals in room
  const [animals] = useState([
    {
      id: "HC-001",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1450 lbs",
      status: "Healthy",
      dateAdded: "2022-03-15",
      lastCheckup: "2024-08-22",
      feedIntake: "High",
      notes: "Regular milking, good production",
    },
    {
      id: "HC-002",
      type: "Holstein Cattle",
      gender: "Female",
      age: "4 years",
      weight: "1520 lbs",
      status: "Healthy",
      dateAdded: "2021-05-12",
      lastCheckup: "2024-08-22",
      feedIntake: "Medium",
      notes: "Consistent producer",
    },
    {
      id: "HC-003",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1480 lbs",
      status: "Healthy",
      dateAdded: "2022-06-01",
      lastCheckup: "2024-08-23",
      feedIntake: "High",
      notes: "",
    },
    {
      id: "HC-004",
      type: "Holstein Cattle",
      gender: "Female",
      age: "5 years",
      weight: "1550 lbs",
      status: "Monitoring",
      dateAdded: "2020-07-08",
      lastCheckup: "2024-08-25",
      feedIntake: "Low",
      notes: "Decreased milk production, monitoring closely",
    },
    {
      id: "HC-005",
      type: "Holstein Cattle",
      gender: "Female",
      age: "2 years",
      weight: "1320 lbs",
      status: "Healthy",
      dateAdded: "2023-02-19",
      lastCheckup: "2024-08-22",
      feedIntake: "Medium",
      notes: "First lactation",
    },
    {
      id: "HC-006",
      type: "Holstein Cattle",
      gender: "Female",
      age: "4 years",
      weight: "1510 lbs",
      status: "Healthy",
      dateAdded: "2021-08-05",
      lastCheckup: "2024-08-22",
      feedIntake: "High",
      notes: "",
    },
    {
      id: "HC-007",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1470 lbs",
      status: "Healthy",
      dateAdded: "2022-04-20",
      lastCheckup: "2024-08-23",
      feedIntake: "Medium",
      notes: "",
    },
    {
      id: "HC-008",
      type: "Holstein Cattle",
      gender: "Female",
      age: "6 years",
      weight: "1580 lbs",
      status: "Treatment",
      dateAdded: "2019-03-10",
      lastCheckup: "2024-08-27",
      feedIntake: "Low",
      notes: "Receiving antibiotics for mastitis",
    },
    {
      id: "HC-009",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1460 lbs",
      status: "Healthy",
      dateAdded: "2022-05-14",
      lastCheckup: "2024-08-23",
      feedIntake: "High",
      notes: "",
    },
    {
      id: "HC-010",
      type: "Holstein Cattle",
      gender: "Female",
      age: "4 years",
      weight: "1500 lbs",
      status: "Healthy",
      dateAdded: "2021-06-22",
      lastCheckup: "2024-08-22",
      feedIntake: "Medium",
      notes: "",
    },
    {
      id: "HC-011",
      type: "Holstein Cattle",
      gender: "Female",
      age: "2 years",
      weight: "1350 lbs",
      status: "Healthy",
      dateAdded: "2023-01-15",
      lastCheckup: "2024-08-22",
      feedIntake: "Medium",
      notes: "First lactation, good adaptation",
    },
    {
      id: "HC-012",
      type: "Holstein Cattle",
      gender: "Female",
      age: "3 years",
      weight: "1440 lbs",
      status: "Healthy",
      dateAdded: "2022-04-05",
      lastCheckup: "2024-08-23",
      feedIntake: "High",
      notes: "",
    },
  ]);

  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [feedIntakeFilter, setFeedIntakeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Function to toggle selection of an animal
  const toggleAnimalSelection = (animalId: string) => {
    if (selectedAnimals.includes(animalId)) {
      setSelectedAnimals(selectedAnimals.filter((id) => id !== animalId));
    } else {
      setSelectedAnimals([...selectedAnimals, animalId]);
    }
  };

  // Function to toggle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedAnimals([]);
    } else {
      setSelectedAnimals(filteredAnimals.map((animal) => animal.id));
    }
    setSelectAll(!selectAll);
  };

  // Filter and sort animals
  const filteredAnimals = animals
    .filter((animal) => {
      // Search filter
      const matchesSearch =
        animal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.notes.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || animal.status === statusFilter;

      // Gender filter
      const matchesGender =
        genderFilter === "all" || animal.gender === genderFilter;

      // Age filter
      const matchesAge = (() => {
        if (ageFilter === "all") return true;
        const ageNum = parseInt(animal.age);

        switch (ageFilter) {
          case "under2":
            return ageNum < 2;
          case "2to4":
            return ageNum >= 2 && ageNum <= 4;
          case "over4":
            return ageNum > 4;
          default:
            return true;
        }
      })();

      // Feed intake filter
      const matchesFeedIntake =
        feedIntakeFilter === "all" || animal.feedIntake === feedIntakeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesGender &&
        matchesAge &&
        matchesFeedIntake
      );
    })
    .sort((a, b) => {
      if (sortBy === "id") {
        return a.id.localeCompare(b.id);
      } else if (sortBy === "age") {
        return parseInt(a.age) - parseInt(b.age);
      } else if (sortBy === "weight") {
        return parseInt(a.weight) - parseInt(b.weight);
      } else if (sortBy === "lastCheckup") {
        return (
          new Date(b.lastCheckup).getTime() - new Date(a.lastCheckup).getTime()
        );
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

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

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Animal stats
  const animalStats = {
    total: animals.length,
    healthy: animals.filter((a) => a.status === "Healthy").length,
    monitoring: animals.filter((a) => a.status === "Monitoring").length,
    treatment: animals.filter((a) => a.status === "Treatment").length,
    critical: animals.filter((a) => a.status === "Critical").length,
    averageWeight: Math.round(
      animals.reduce((sum, animal) => sum + parseInt(animal.weight), 0) /
        animals.length,
    ),
    averageAge: parseFloat(
      (
        animals.reduce((sum, animal) => sum + parseInt(animal.age), 0) /
        animals.length
      ).toFixed(1),
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center">
              <Link
                href={`/farms/1/houses/${room.houseId}/rooms/${room.id}`}
                className="mr-3 sm:mr-4"
              >
                <ArrowLeft className="text-gray-500 hover:text-gray-700" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Animals in {room.name}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  {room.houseName} • {room.type} • {room.occupancy}/
                  {room.capacity} animals
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-wrap gap-2">
              <button className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download size={14} className="mr-1.5 sm:mr-2" />
                Export
              </button>
              <button className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                <Plus size={14} className="mr-1.5 sm:mr-2" />
                Add Animal
              </button>
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
              Grid View
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
              List View
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
            <hr className="my-2" />
            <button
              onClick={() => {
                toggleSelectAll();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              {selectAll ? "Deselect All" : "Select All"}
            </button>
            {selectedAnimals.length > 0 && (
              <>
                <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  <Share size={16} className="inline mr-2" /> Move Selected (
                  {selectedAnimals.length})
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-700 hover:bg-red-50">
                  <Trash size={16} className="inline mr-2" /> Remove Selected (
                  {selectedAnimals.length})
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-4 sm:mb-6 sm:gap-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animals.length}
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
                      Monitoring
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.monitoring}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3 sm:px-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-2 sm:p-3">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Treatment
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
                      {animalStats.averageWeight} lbs
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
                  <svg
                    className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Avg Age
                    </dt>
                    <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {animalStats.averageAge} yrs
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white shadow sm:rounded-lg mb-4 sm:mb-6">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-grow max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
                  placeholder="Search by ID, type, or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap mt-3 sm:mt-0 gap-2">
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${viewMode === "grid" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium ${viewMode === "list" ? "bg-green-50 border-green-500 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    List
                  </button>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden sm:flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter size={16} className="mr-1 sm:mr-2" />
                  Filters
                  <ChevronDown size={16} className="ml-1 sm:ml-2" />
                </button>
                {selectedAnimals.length > 0 && (
                  <div className="sm:hidden md:block flex gap-2 items-center">
                    <span className="text-xs text-gray-500">
                      {selectedAnimals.length} selected
                    </span>
                    <button className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Share size={14} className="mr-1" />
                      Move
                    </button>
                    <button className="inline-flex items-center px-2 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-white hover:bg-red-50">
                      <Trash size={14} className="mr-1" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Advanced filters */}
            {showFilters && (
              <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
                  <div>
                    <label
                      htmlFor="status-filter"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Treatment">Treatment</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="gender-filter"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender
                    </label>
                    <select
                      id="gender-filter"
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option value="all">All Genders</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="age-filter"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                    >
                      Age
                    </label>
                    <select
                      id="age-filter"
                      value={ageFilter}
                      onChange={(e) => setAgeFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option value="all">All Ages</option>
                      <option value="under2">Under 2 years</option>
                      <option value="2to4">2-4 years</option>
                      <option value="over4">Over 4 years</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="feed-intake-filter"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                    >
                      Feed Intake
                    </label>
                    <select
                      id="feed-intake-filter"
                      value={feedIntakeFilter}
                      onChange={(e) => setFeedIntakeFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option value="all">All Intakes</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="sort-by"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                    >
                      Sort By
                    </label>
                    <select
                      id="sort-by"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                    >
                      <option value="id">ID</option>
                      <option value="age">Age</option>
                      <option value="weight">Weight</option>
                      <option value="lastCheckup">Last Checkup</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animals Grid/List View */}
        <div className="bg-white shadow sm:rounded-lg">
          {/* Select all checkbox for larger screens */}
          <div className="hidden sm:flex items-center px-4 py-3 border-b border-gray-200">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-xs text-gray-500">
              {selectAll ? "Deselect All" : "Select All"}
            </span>
            {selectedAnimals.length > 0 && (
              <div className="ml-4 flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {selectedAnimals.length} selected
                </span>
                <button className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Share size={14} className="mr-1" />
                  Move
                </button>
                <button className="inline-flex items-center px-2 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-white hover:bg-red-50">
                  <Trash size={14} className="mr-1" />
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {filteredAnimals.map((animal) => (
                <div
                  key={animal.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAnimals.includes(animal.id)}
                          onChange={() => toggleAnimalSelection(animal.id)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-3"
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          {animal.id}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getAnimalStatusColor(animal.status)}`}
                      >
                        {animal.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Type:</span>
                        <span className="font-medium">{animal.type}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Gender:</span>
                        <span className="font-medium">{animal.gender}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Age:</span>
                        <span className="font-medium">{animal.age}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Weight:</span>
                        <span className="font-medium">{animal.weight}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Last Checkup:</span>
                        <span className="font-medium">
                          {formatDate(animal.lastCheckup)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Feed Intake:</span>
                        <span className="font-medium">{animal.feedIntake}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 inline-flex items-center justify-center px-2 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700">
                        <Pencil size={12} className="mr-1" />
                        Edit
                      </button>
                      <button className="flex-1 inline-flex items-center justify-center px-2 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50">
                        <Trash size={12} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Checkup
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feed Intake
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAnimals.map((animal) => (
                    <tr key={animal.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedAnimals.includes(animal.id)}
                          onChange={() => toggleAnimalSelection(animal.id)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {animal.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {animal.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {animal.gender}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {animal.age}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {animal.weight}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAnimalStatusColor(animal.status)}`}
                        >
                          {animal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(animal.lastCheckup)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {animal.feedIntake}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-green-600 hover:text-green-900 inline-flex items-center">
                            <Pencil size={14} className="mr-1" />
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 inline-flex items-center">
                            <Trash size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* No results state */}
          {filteredAnimals.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <svg
                className="h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 005.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No animals found
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setGenderFilter("all");
                  setAgeFilter("all");
                  setFeedIntakeFilter("all");
                  setSortBy("id");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
