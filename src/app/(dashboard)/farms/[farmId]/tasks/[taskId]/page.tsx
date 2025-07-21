"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/graphql/generated/graphql";
import { useFetchTasks } from "@/hooks/queries";
import { usePathname } from "next/navigation";

import {
  Clock,
  Clipboard,
  Edit2,
  CheckCircle,
  AlertCircle,
  X,
  Settings,
  ChevronDown,
} from "lucide-react";

// Type definitions

export default function FarmTaskManagement() {
  const pathname = usePathname();
  const router = useRouter();
  const farmTag = pathname.split("/").pop();
  const { fetchTasks, tasks } = useFetchTasks();
  const [task, setTask] = useState<Task[]>([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }
    fetchTasks({ farmTag });
  }, [farmTag]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setTask(tasks);
    }
  }, [tasks, pathname]);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditForm({
      type: task.type,
      status: task.status,
      notes: task.notes,
    });
  };

  const handleSave = async () => {
    if (editingTaskId) {
      // Update the task in our state
      setTask(
        tasks?.map((task) =>
          task.id === editingTaskId ? { ...task, ...editForm } : task
        ) || []
      );
      setEditingTaskId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditForm({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const toggleExpandTask = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
        };
      case "IN_PROGRESS":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          icon: <Clock className="w-4 h-4 mr-1" />,
        };
      case "PENDING":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: <AlertCircle className="w-4 h-4 mr-1" />,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: <AlertCircle className="w-4 h-4 mr-1" />,
        };
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!task) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo and Profile */}
      {/* <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Name Section */}
      {/* <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4M20 12C21.1046 12 22 11.1046 22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10C2 11.1046 2.89543 12 4 12M20 12C21.1046 12 22 12.8954 22 14V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V14C2 12.8954 2.89543 12 4 12"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">FarmTrack</h1>
                <p className="text-xs text-gray-500">
                  Livestock Management System
                </p>
              </div>
            </div> */}
      {/* Navigation Links - Desktop */}
      {/* <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Livestock
              </a>
              <a
                href="#"
                className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium border-b-2 border-green-600"
              >
                Tasks
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Reports
              </a>
            </nav> */}
      {/* Profile Section */}
      {/* <div className="flex items-center space-x-4"> */}
      {/* Notifications */}
      {/* <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 relative">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-medium">
                  2
                </span>
              </button> */}
      {/* Profile dropdown */}
      {/* <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">
                      Sarah Connor
                    </span>
                    <span className="text-xs text-gray-500">Farm Manager</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-green-100">
                    <img
                      src="/api/placeholder/40/40"
                      alt="User profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>  */}{" "}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Farm Tasks</h2>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Add New Task
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Settings className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all farm tasks across your operation
          </p>
        </div>

        {/* Tasks Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
                  <Clipboard className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Tasks
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {task.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Completed
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {task.filter((t) => t.status === "COMPLETED").length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      In Progress
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {task.filter((t) => t.status === "IN_PROGRESS").length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          {task?.map((task) => (
            <div
              key={task.id}
              className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              {editingTaskId === task.id ? (
                /* Editing Mode */
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Edit Task
                    </h3>
                    <button
                      onClick={handleCancel}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Task Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        id="type"
                        value={editForm.type || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={editForm.status || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        id="notes"
                        rows={3}
                        value={editForm.notes || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-3">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Viewing Mode */
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getStatusColor(task.status).bg
                        } ${getStatusColor(task.status).text}`}
                      >
                        <div className="flex items-center">
                          {getStatusColor(task.status).icon}
                          {task.status.replace("_", " ")}
                        </div>
                      </div>
                      <h3 className="ml-4 text-lg font-medium text-gray-900">
                        {task.type}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => toggleExpandTask(task.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expandedTaskId === task.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {expandedTaskId === task.id && (
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Start:</strong> {formatDate(task.starting_date)}
                      </p>
                      <p>
                        <strong>Completion:</strong>{" "}
                        {formatDate(task.completion_date)}
                      </p>
                      {task.worker && (
                        <p>
                          <strong>Worker:</strong> {task.worker.name}
                        </p>
                      )}
                      {task?.barns?.length && (
                        <p>
                          <strong>Barns:</strong>{" "}
                          {task?.barns.map((b) => b.name).join(", ")}
                        </p>
                      )}
                      {task?.pens?.length && (
                        <p>
                          <strong>Pens:</strong>{" "}
                          {task?.pens.map((p) => p.name).join(", ")}
                        </p>
                      )}
                      {task.notes && (
                        <p>
                          <strong>Notes:</strong> {task.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
