"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Award,
  Clock,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  ChevronRight,
  UserCheck,
  TrendingUp,
  FileText,
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
import Image from "next/image";
import { useFetchASingleWorker, useFetchTasks } from "@/hooks/queries";
import { useRouter, usePathname } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { HousingStatus, TaskStatus } from "@/graphql/generated/graphql";

export default function WorkerDetailsPage() {
  const { fetchWorker, worker } = useFetchASingleWorker();
  const { fetchTasks, tasks } = useFetchTasks();

  const pathname = usePathname();
  const { onOpen } = useModal();
  const router = useRouter();
  const workerTag = pathname.split("/").pop();
  const farmId = pathname.split("/")[2];

  // Sample performance data
  const performanceData = [
    { month: "Sep 2023", rating: 88 },
    { month: "Oct 2023", rating: 85 },
    { month: "Nov 2023", rating: 90 },
    { month: "Dec 2023", rating: 87 },
    { month: "Jan 2024", rating: 91 },
    { month: "Feb 2024", rating: 89 },
    { month: "Mar 2024", rating: 94 },
    { month: "Apr 2024", rating: 92 },
  ];

  // Sample assigned tasks

  // Sample activity log
  const activityLog = [
    {
      date: "2024-03-23",
      time: "16:30",
      description: "Completed evening feeding routine",
    },
    {
      date: "2024-03-23",
      time: "14:15",
      description: "Updated vaccination records for Barn A",
    },
    {
      date: "2024-03-23",
      time: "10:45",
      description: "Conducted equipment inspection",
    },
    { date: "2024-03-22", time: "15:20", description: "Attended team meeting" },
    {
      date: "2024-03-22",
      time: "09:00",
      description: "Started morning routine check",
    },
  ];

  // Sample assigned areas
  const assignedAreas = worker?.farms?.[0].barns?.map((barn) => barn) || [];

  // States
  const [activeTab, setActiveTab] = useState("overview");

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get task status color
  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case TaskStatus.Completed:
        return "bg-green-100 text-green-800";
      case TaskStatus.InProgress:
        return "bg-blue-100 text-blue-800";
      case TaskStatus.Pending:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/worker/login");
    } else {
      if (workerTag) {
        fetchWorker({ workerTag });
      }
    }
  }, []);

  useEffect(() => {
    if (worker) {
      fetchTasks({
        farmTag: worker?.farms?.[0].farm_tag,
      });
    }
  }, [worker]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center">
              <Link href={`/farms/${farmId}/workers`} className="mr-4">
                <ArrowLeft className="text-gray-500 hover:text-gray-700" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {worker?.name}
                </h1>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Briefcase size={16} className="mr-1.5 flex-shrink-0" />
                  <p className="truncate">
                    {worker?.roles && worker.roles.length > 0
                      ? worker.roles
                          .map((role, index) =>
                            index < 2
                              ? role.charAt(0).toUpperCase() +
                                role.slice(1).toLowerCase()
                              : null
                          )
                          .filter(Boolean)
                          .join(", ")
                      : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-3">
              <button
                type="button"
                className="bg-white hover:bg-gray-50 text-gray-700 px-3 sm:px-4 py-2 border border-gray-300 rounded-md flex items-center gap-1 sm:gap-2 text-sm"
                onClick={() => {
                  onOpen("update-worker", {
                    workerTag: worker?.worker_tag,
                    farmWorker: {
                      id: worker?.id ?? "",
                      email: worker?.email ?? "",
                      name: worker?.name ?? "",
                      phone: worker?.phone ?? "",
                      bio: worker?.bio ?? "",
                      address: worker?.address ?? "",
                      join_date: worker?.join_date ?? "",
                      // @ts-expect-error error
                      roles: (worker?.roles as WorkerRole[]) ?? [],
                      skills: worker?.skills ?? [],
                      achievements: worker?.achievements ?? [],
                      worker_tag: worker?.worker_tag ?? "",
                    },
                  });
                }}
              >
                <Edit size={16} />
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </button>
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md flex items-center gap-1 sm:gap-2 text-sm"
                onClick={() => {
                  onOpen("task-modal", {
                    farmTag: worker?.farms?.[0]?.farm_tag,
                    // @ts-expect-error error
                    farmWorkers: worker ? [worker] : [],
                    taskList: tasks,
                  });
                }}
              >
                <FileText size={16} />
                <span className="hidden sm:inline">Assign Task</span>
                <span className="sm:hidden">Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Menu Button */}
      <div className="bg-white border-b md:mt-3 border-gray-200 sticky top-0 z-20">
        <div className="px-4 md:hidden flex py-3 space-x-2 border-t border-gray-200  overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("overview");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("performance");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "performance"
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Performance
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("tasks");
            }}
            className={`px-2 py-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "tasks"
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Tasks & Activities
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("areas");
            }}
            className={`px-2 rounded-md text-sm font-normal whitespace-nowrap ${
              activeTab === "areas"
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Assigned Areas
          </button>
        </div>
      </div>

      {/* Desktop Tab navigation */}
      <div className="hidden sm:block border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("performance")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "performance"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Performance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tasks")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "tasks"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Tasks & Activities
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("areas")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "areas"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Assigned Areas
            </button>
          </nav>
        </div>
      </div>

      {/* Main content - Responsive */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Worker Profile */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex flex-col items-center">
                    <Image
                      className="h-28 w-28 sm:h-32 sm:w-32 rounded-full"
                      src={ProfilePic}
                      alt={worker?.name || "Worker Profile"}
                    />
                    <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">
                      {worker?.name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">
                      {worker?.roles && worker.roles.length > 0
                        ? worker.roles
                            .map((role, index) =>
                              index < 5
                                ? role.charAt(0).toUpperCase() +
                                  role.slice(1).toLowerCase()
                                : null
                            )
                            .filter(Boolean)
                            .join(", ")
                        : ""}
                    </p>
                    {/* <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-5 w-5 ${
                              Math.round(worker. / 20) >= rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-600">
                        {worker.rating}%
                      </p>
                    </div> */}
                    {/* <span
                      className={`mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                        worker. === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {worker.status.charAt(0).toUpperCase() +
                        worker.status.slice(1)}
                    </span> */}
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                          Join Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {formatDate(worker?.join_date)}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <Mail className="mr-1 h-4 w-4 text-gray-400" />
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
                          {worker?.email}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <Phone className="mr-1 h-4 w-4 text-gray-400" />
                          Phone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {worker?.phone}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {worker?.address}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center sm:shrink-0">
                          <Award className="mr-1 h-4 w-4 text-gray-400" />
                          Specialization
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
                          {(worker?.skills && worker?.skills.join(", ")) ||
                            "None"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Bio and Skills */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Bio */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Bio
                    </h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <p className="text-sm text-gray-900">{worker?.bio}</p>

                    {/* <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">
                        Education
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {worker?.education}
                      </p>
                    </div> */}

                    {/* <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">
                        Certifications
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {worker.certifications.map((cert, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-start"
                          >
                            <svg
                              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Skills & Achievements
                    </h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-sm font-medium text-gray-900">
                      Key Skills
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {worker?.skills &&
                        worker?.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">
                        Achievements
                      </h4>
                      <div className="mt-2 text-sm text-gray-900">
                        {worker?.achievements &&
                        Array.isArray(worker.achievements)
                          ? worker.achievements.join(", ")
                          : typeof worker?.achievements === "object" &&
                            worker.achievements !== null
                          ? Object.values(worker.achievements)
                              .map(
                                (ach: { title?: string } | string) =>
                                  (typeof ach === "object" && ach !== null
                                    ? ach.title
                                    : ach) || ach
                              )
                              .join(", ")
                          : "None"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Experience
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              4 Years
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Current Tasks
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              {worker?.assigned_tasks?.length}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                          <Award className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Performance
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              {/* {worker.}% */}
                              70%
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Performance Chart */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Performance Trend
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Monthly performance ratings
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        name="Performance Rating (%)"
                        stroke="#10B981"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Current Rating
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      {/* {worker.rating}% */}
                      70%{" "}
                    </div>
                    <div className="mt-1 text-sm text-green-600">
                      +3% from last month
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Attendance
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      98%
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Last 3 months
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Task Completion
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      95%
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      On-time completion rate
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Quality Score
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      94%
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Task quality rating
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Reviews */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Performance Reviews
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Latest performance feedback
                  </p>
                </div>
                <button className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Add Review
                </button>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-8">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">
                          Quarterly Review - Q1 2024
                        </h4>
                        <p className="text-sm text-gray-500">
                          Reviewed by: David Wilson, Farm Director
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start">
                        94/100
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      John continues to excel in his role as Farm Manager. His
                      leadership has been instrumental in improving milk
                      production efficiency this quarter. He has successfully
                      implemented the new feeding protocol and trained staff
                      effectively. Areas for improvement include delegation and
                      documentation procedures.
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">
                          Quarterly Review - Q4 2023
                        </h4>
                        <p className="text-sm text-gray-500">
                          Reviewed by: David Wilson, Farm Director
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start">
                        91/100
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      John has shown excellent performance in maintaining herd
                      health during the winter season. His preventative measures
                      have reduced health incidents by 15%. He effectively
                      managed staff scheduling during the holiday season.
                      Recommended to focus on technology adoption for better
                      monitoring systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks & Activities Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Current Tasks */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Current Tasks
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Assigned tasks and their status
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    onOpen("task-modal", {
                      farmTag: worker?.farms?.[0]?.farm_tag,
                      //  @ts-expect-error error
                      farmWorkers: worker ? [worker] : [],
                      taskList: tasks,
                    });
                  }}
                >
                  Assign New Task
                </button>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="overflow-hidden overflow-x-auto">
                  {/* Table for larger screens */}
                  <table className="hidden sm:table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Task
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {worker?.assigned_tasks?.length !== 0 ? (
                        worker?.assigned_tasks?.map((task) => (
                          <tr key={task.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {task.type.charAt(0) +
                                task.type.slice(1).toLowerCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getTaskStatusColor(
                                  task.status
                                )}`}
                              >
                                {task.status.charAt(0).toUpperCase() +
                                  task.status.slice(1).toLowerCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(task.completion_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-3">
                                <button
                                  className="text-green-600 hover:text-green-900"
                                  type="button"
                                  onClick={() => {
                                    onOpen("update-task", {
                                      taskId: task.id,
                                      // @ts-expect-error error
                                      task: task,
                                    });
                                  }}
                                >
                                  Edit
                                </button>
                                <Link
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View
                                </Link>
                                <Link
                                  href="#"
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className="flex justify-center items-center p-4 relative ">
                          No task assigned to {worker?.name}
                        </div>
                      )}
                    </tbody>
                  </table>

                  {/* Card view for mobile screens */}
                  <div className="sm:hidden space-y-4">
                    {worker?.assigned_tasks?.length === 0 ? (
                      <div>No task assigned to {worker?.name}</div>
                    ) : (
                      worker?.assigned_tasks?.length &&
                      worker?.assigned_tasks?.map((task) => (
                        <div
                          key={task.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {task.type}
                            </h4>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getTaskStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status.charAt(0).toUpperCase() +
                                task.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">
                            Due: {formatDate(task.completion_date)}
                          </p>
                          <div className="flex justify-end space-x-2">
                            <Link
                              href="#"
                              className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Edit
                            </Link>
                            <Link
                              href="#"
                              className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View
                            </Link>
                            <Link
                              href="#"
                              className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-red-600 bg-white hover:bg-gray-50"
                            >
                              Delete
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Latest recorded activities
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {activityLog.map((activity, idx) => (
                      <li key={idx}>
                        <div className="relative pb-8">
                          {idx !== activityLog.length - 1 ? (
                            <span
                              className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            ></span>
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div>
                              <div className="relative px-1">
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center ring-8 ring-white">
                                  <Clock className="h-5 w-5 text-gray-500" />
                                </div>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm text-gray-900">
                                  {activity.description}
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {activity.date} at {activity.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View All Activity
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Task Analytics */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Task Analytics
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                  <div className="bg-gray-50 overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:p-6 text-center">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Task Completion Rate
                      </dt>
                      <dd className="mt-1">
                        <div className="text-3xl font-semibold text-gray-900">
                          {`${(
                            ((worker?.assigned_tasks?.filter(
                              (task) => task.status === "COMPLETED"
                            ).length || 0) /
                              (worker?.assigned_tasks?.length || 1)) *
                            100
                          ).toFixed(0)}%`}
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{
                                width: `${(
                                  ((worker?.assigned_tasks?.filter(
                                    (task) => task.status === "COMPLETED"
                                  ).length || 0) /
                                    (worker?.assigned_tasks?.length || 1)) *
                                  100
                                ).toFixed(0)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </dd>
                    </div>
                  </div>

                  <div className="bg-gray-50 overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:p-6 text-center">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tasks Completed This Month
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {
                          worker?.assigned_tasks?.filter(
                            (task) => task.status === "COMPLETED"
                          ).length
                        }{" "}
                        /{worker?.assigned_tasks?.length}
                      </dd>
                    </div>
                  </div>

                  <div className="bg-gray-50 overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:p-6 text-center">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Average Completion Time
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assigned Areas Tab */}
        {activeTab === "areas" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Assigned Areas */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Assigned Areas
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Farm areas under this worker&apos;s responsibility
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Assign New Area
                </button>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {assignedAreas.map((area) => (
                    <div
                      key={area.id}
                      className="bg-gray-50 overflow-hidden rounded-lg border border-gray-200"
                    >
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              {area.name}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {area.status}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              area.status === HousingStatus.Operational
                                ? "bg-green-100 text-green-800"
                                : area.status === HousingStatus.Maintenance
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {area.status.charAt(0).toUpperCase() +
                              area.status.slice(1)}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm">
                            {area?.pens && area?.pens.length > 0 ? (
                              <span className="text-gray-600">
                                Pens: {area?.pens.length}, Animals:{" "}
                                {area?.pens.reduce(
                                  (total, pen) =>
                                    total + (pen.livestock?.length || 0),
                                  0
                                )}
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                No pens assigned
                              </span>
                            )}
                            {area?.pens?.reduce(
                              (total, pen) =>
                                total + (pen.livestock?.length || 0),
                              0
                            ) ? (
                              <span className="text-gray-600">
                                Animals:{" "}
                                {area.pens.reduce(
                                  (total, pen) =>
                                    total + (pen.livestock?.length || 0),
                                  0
                                )}
                              </span>
                            ) : (
                              <span className="text-gray-500">No animals</span>
                            )}
                          </div>

                          <Link
                            href={`/farms/1/houses/${area.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Responsibility Details */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Area Responsibilities
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium text-gray-900">
                      Main Barn
                    </h4>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>Daily health inspection of all cattle</span>
                      </li>
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>
                          Oversee feeding schedule and monitor consumption
                        </span>
                      </li>
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>Ensure proper environmental conditions</span>
                      </li>
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>
                          Coordinate with veterinary staff for health checks
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-900">
                      West Wing
                    </h4>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>Maintenance of milking equipment</span>
                      </li>
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>
                          Supervise milking process and quality control
                        </span>
                      </li>
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>Staff training and oversight</span>
                      </li>
                      <li className="text-sm text-gray-600 flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
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
                        <span>Production record maintenance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Area Performance */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Area Performance Metrics
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {/* Table for desktop */}
                <div className="hidden sm:block overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                          Productivity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Health Index
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Maintenance Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Main Barn
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">94%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: "94%" }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">96%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: "96%" }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Good
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          West Wing
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">92%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: "92%" }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">90%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Needs Attention
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards for area performance */}
                <div className="sm:hidden space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-gray-900 mb-3">
                      Main Barn
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Productivity
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">
                            94%
                          </span>
                          <div className="flex-grow bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "94%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Health Index
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">
                            96%
                          </span>
                          <div className="flex-grow bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "96%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Maintenance Status
                        </p>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Good
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-gray-900 mb-3">
                      West Wing
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Productivity
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">
                            92%
                          </span>
                          <div className="flex-grow bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Health Index
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">
                            90%
                          </span>
                          <div className="flex-grow bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Maintenance Status
                        </p>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Needs Attention
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
