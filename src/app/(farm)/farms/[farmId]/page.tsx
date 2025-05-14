"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  Users,
  Clipboard,
  TrendingUp,
  DollarSign,
  Map as MapIcon,
  Edit,
  ArrowLeft,
  Mouse,
  AlertTriangle,
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
} from "recharts";
import Link from "next/link";
import ProfilePic from "@/../public/globe.svg";
import { useFetchFarms } from "@/hooks/queries";
import { usePathname } from "next/navigation";
import transformAnimalData from "@/lib/transform-animal-data";
import {
  EmptyStateFarmWorkers,
  FarmHouseEmptyState,
  EmptyStateFarmAnimals,
} from "@/components/pages/farms/[farmId]";
import { useModal } from "@/hooks/use-modal-store";
import TaskCard from "@/components/pages/farms/tasks/task-card";

export default function FarmDetailsPage() {
  const { farms, fetchFarms } = useFetchFarms();
  const pathname = usePathname();
  const farmId = Number(pathname.split("/").pop());
  const { onOpen, data } = useModal();

  // Sample farm performance data for chart
  const performanceData = [
    { month: "Jan", productivity: 75, expenses: 65, revenue: 70 },
    { month: "Feb", productivity: 78, expenses: 62, revenue: 74 },
    { month: "Mar", productivity: 82, expenses: 70, revenue: 78 },
    { month: "Apr", productivity: 80, expenses: 68, revenue: 76 },
    { month: "May", productivity: 85, expenses: 65, revenue: 82 },
    { month: "Jun", productivity: 87, expenses: 72, revenue: 85 },
    { month: "Jul", productivity: 90, expenses: 75, revenue: 88 },
    { month: "Aug", productivity: 92, expenses: 78, revenue: 91 },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    fetchFarms({
      searchTerm: searchQuery,
      filter: {
        id: farmId,
      },
    });
  }, [searchQuery, data.addWorkersToFarmEvent, data.addBansToFarmEvent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center">
              <Link href="/farms" className="mr-4">
                <ArrowLeft className="text-gray-500 hover:text-gray-700" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {farms?.length && farms[0].name}
                </h1>
                <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-500">
                  <MapIcon size={16} className="mr-1.5" />
                  <p>
                    {farms?.length && farms[0].location} •{" "}
                    {farms?.length && farms[0].area}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 sm:mt-0 sm:ml-auto inline-flex items-center justify-center px-3 py-1.5 sm:px-3 sm:py-1 w-full sm:w-auto border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                onOpen("update-farm", {
                  farm: farms,
                  farmTag: farms?.[0]?.farm_tag,
                });
              }}
            >
              <Edit className="mr-2 h-4 w-4 sm:h-4 sm:w-4" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu button - visible on small screens */}
      <div className="md:hidden bg-white border-t border-gray-200 p-2 sticky top-0 z-10 shadow-sm">
        <button
          type="button"
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
              <span>Farm Menu</span>
            </>
          )}
        </button>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="mt-2 space-y-2 p-2 bg-white border border-gray-200 rounded-md shadow-lg">
            <Link
              href="/farms"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              All Farms
            </Link>
            <Link
              href="/farms/1/workers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Workers
            </Link>
            <Link
              href="/farms/1/animals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Animals
            </Link>
            <Link
              href="/farms/1/houses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Houses
            </Link>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Search bar */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Search animals, workers, records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Farm performance chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-4 sm:mb-6">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              Farm Performance
            </h3>
          </div>
          <div className="p-3 sm:p-5">
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="#10B981"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-3 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Workers
                    </dt>
                    <dd className="text-base sm:text-lg font-semibold text-gray-900">
                      {farms?.length && farms[0].workers?.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-3 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                  <Clipboard className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Total Animals
                    </dt>
                    <dd className="text-base sm:text-lg font-semibold text-gray-900">
                      {farms?.[0]?.livestock?.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-3 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2 sm:p-3">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Productivity
                    </dt>
                    <dd className="text-base sm:text-lg font-semibold text-gray-900">
                      92%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-3 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-2 sm:p-3">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Monthly Expenses
                    </dt>
                    <dd className="text-base sm:text-lg font-semibold text-gray-900">
                      $12,450
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Houses Section */}
        {farms?.length && farms[0].barns?.length ? (
          <div className="bg-white overflow-hidden shadow rounded-lg mb-4 sm:mb-6">
            <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Farm Houses
              </h3>
              <Link
                href={`/farms/${farmId}/barns`}
                className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
              >
                View All
              </Link>
            </div>
            <div className="p-3 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {farms[0]?.barns?.map((barn) => (
                  <div
                    key={barn.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-sm sm:text-base font-medium text-gray-900">
                            {barn.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {barn.area_sqm} area_sqm
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                            barn.status.toLowerCase()
                          )}`}
                        >
                          {barn.status.charAt(0) +
                            barn.status.slice(1).toLowerCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <div className="flex items-center">
                          {barn.pens?.length &&
                            barn?.pens.reduce(
                              (sum, pen) =>
                                sum +
                                (pen?.livestock?.length
                                  ? pen?.livestock?.length
                                  : 0),
                              0
                            ) > 0 && (
                              <div className="flex items-center text-xs sm:text-sm text-gray-500 mr-3">
                                <Mouse size={14} className="mr-1" />
                                <span>
                                  {barn?.pens.reduce(
                                    (sum, pen) =>
                                      sum +
                                      (pen?.livestock?.length
                                        ? pen?.livestock?.length
                                        : 0),
                                    0
                                  )}
                                </span>
                              </div>
                            )}

                          <div className="flex items-center text-xs sm:text-sm text-amber-500">
                            <AlertTriangle size={14} className="mr-1" />
                            <span>3</span>
                          </div>
                        </div>
                        <Link
                          href={`/farms/${farmId}/barns/${barn.unit_id}/`}
                          className="inline-flex items-center px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <FarmHouseEmptyState
            farmId={farmId.toString()}
            farmTag={farms?.[0]?.farm_tag ?? ""}
          />
        )}

        {/* Workers and Animals sections */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Workers section */}
          {farms?.length && farms[0].workers?.length ? (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Farm Workers
                </h3>
                <Link
                  href={`/farms/${farmId}/workers`}
                  className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
                >
                  View All
                </Link>
              </div>
              <div className="p-3 sm:p-5">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {farms[0].workers.map((worker) => (
                      <li key={worker.id} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                              src={ProfilePic}
                              alt={worker.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {worker.name}
                            </p>
                            {worker.roles.map((role) => (
                              <p
                                key={role}
                                className="text-xs sm:text-sm text-gray-500 truncate bg-amber-100 px-2 w-fit rounded-full mt-1"
                              >
                                {role.toLowerCase()}
                              </p>
                            ))}
                          </div>
                          <div>
                            <Link
                              href={`/farms/${farmId}/workers/${worker.worker_tag}`}
                              className="inline-flex items-center px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <EmptyStateFarmWorkers
              farmId={farmId.toString()}
              farmTag={farms?.[0]?.farm_tag ?? ""}
              farmName={farms?.[0]?.name ?? ""}
            />
          )}

          {/* Animals section */}
          {farms?.length && farms[0].livestock?.length ? (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Farm Animals
                </h3>
                <Link
                  href={`/farms/${farmId}/livestock`}
                  className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
                >
                  View All
                </Link>
              </div>
              <div className="p-3 sm:p-5">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {transformAnimalData({
                      livestocks: farms[0]?.livestock,
                    }).map((livestock) => (
                      <li key={livestock.type} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {livestock.type} - {livestock.breed}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <p className="text-xs sm:text-sm text-gray-500 truncate sm:mr-2">
                                Count: {livestock.count}
                              </p>
                              <span
                                className={`mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  livestock.health === "Excellent"
                                    ? "bg-green-100 text-green-800"
                                    : livestock.health === "Good"
                                    ? "bg-blue-100 text-blue-800"
                                    : livestock.health === "Fair"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {livestock.health}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Link
                              href={`/farms/${farmId}/livestock?type=${livestock.type}`}
                              className="inline-flex items-center px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <EmptyStateFarmAnimals farmId={farmId.toString()} />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 mt-4">
          {farms?.length &&
            farms[0]?.tasks?.length &&
            farms[0]?.tasks.map((task, indx) => (
              <TaskCard
                key={indx}
                completion_date={null}
                id={"1"}
                type={"tasktype"}
                status={"status"}
                starting_date={"null"}
                worker={null}
                farmTag={farms[0]?.farm_tag}
                farmId={farms[0]?.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
