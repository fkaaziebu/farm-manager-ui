import { Farm } from "@/graphql/generated/graphql";
import {
  CheckSquare,
  Plus,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FarmTasksSectionProps {
  farm?: Farm;
  loading?: boolean;
}

export default function FarmTasksSection({
  farm,
  loading,
}: FarmTasksSectionProps) {
  const { onOpen } = useModal();

  if (loading || !farm) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="space-y-2 sm:space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-3 sm:h-4 w-24 sm:w-32 bg-gray-200 rounded animate-pulse mb-1 sm:mb-2"></div>
                    <div className="h-2 sm:h-3 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getTaskStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "pending":
        return AlertCircle;
      case "overdue":
        return AlertCircle;
      default:
        return CheckSquare;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "No date";
    }
  };

  if (!farm.tasks?.length) {
    return (
      <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
              <CheckSquare
                size={16}
                className="sm:w-5 sm:h-5 mr-2 text-indigo-600"
              />
              Tasks
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6 text-center">
          {/* Enhanced icon with gradient background */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 ring-4 ring-indigo-50">
            <CheckSquare size={24} className="sm:w-8 sm:h-8 text-indigo-600" />
          </div>

          {/* Enhanced heading */}
          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Organize Your Farm Operations
          </h4>
          <p className="text-sm text-gray-500 mb-3">No tasks yet</p>

          {/* Enhanced description with benefits */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 max-w-sm mx-auto leading-relaxed">
            Create and assign tasks to workers, track progress, and ensure all
            farm operations run smoothly and efficiently.
          </p>

          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Clear assignments
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Progress tracking
            </span>
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Better coordination
            </span>
          </div>

          {/* Enhanced CTA Button with icon animations */}
          <Button
            onClick={() =>
              onOpen("task-modal", {
                farmTag: farm.farm_tag,
                farmWorkers: farm.workers || [],
              })
            }
            className="group bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800
                       text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
                       transition-all duration-200 ease-in-out text-sm sm:text-base px-6 sm:px-8 py-2.5"
            size="default"
          >
            <Plus
              size={16}
              className="sm:w-4 sm:h-4 mr-2 group-hover:rotate-90 transition-transform duration-200"
            />
            Create Your First Task
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>

          {/* Trust signal */}
          <p className="text-xs text-gray-500 mt-3 font-medium">
            Easy to create • Flexible scheduling
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
            <CheckSquare
              size={16}
              className="sm:w-5 sm:h-5 mr-2 text-indigo-600"
            />
            Tasks ({farm.tasks.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onOpen("add-barns-to-farm", {
                  farmId: farm.id,
                  farmTag: farm.farm_tag,
                })
              }
              className="text-xs sm:text-sm"
            >
              <Plus size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
            <Link
              href={`/farms/${farm.farm_tag}/tasks`}
              className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          {farm.tasks.slice(0, 4).map((task) => {
            const StatusIcon = getTaskStatusIcon(task.status || "");

            return (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <StatusIcon
                      size={12}
                      className="sm:w-4 sm:h-4 text-indigo-600"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {task.type}
                    </p>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Start: {formatDate(task.starting_date || "")}
                      </p>
                      {task.completion_date && (
                        <p className="text-xs sm:text-sm text-gray-600">
                          Due: {formatDate(task.completion_date)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getTaskStatusColor(task.status || "")}`}
                  >
                    {task.status?.charAt(0) +
                      task.status?.slice(1).toLowerCase().replace(/_/g, " ")}
                  </span>
                  <Link
                    href={`/farms/${farm.farm_tag}/tasks/${task.id}`}
                    className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {farm.tasks.length > 4 && (
          <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
            <Link
              href={`/farms/${farm.farm_tag}/tasks`}
              className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center"
            >
              View All {farm.tasks.length} Tasks
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
