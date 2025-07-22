import { Farm } from "@/graphql/generated/graphql";
import { Users, Plus, ArrowRight, User } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FarmWorkersSectionProps {
  farm?: Farm;
  loading?: boolean;
}

export default function FarmWorkersSection({
  farm,
  loading,
}: FarmWorkersSectionProps) {
  const { onOpen } = useModal();

  if (loading || !farm) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-3 sm:h-4 w-24 sm:w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-2 sm:h-3 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!farm.workers?.length) {
    return (
      <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
              <Users size={16} className="sm:w-5 sm:h-5 mr-2 text-blue-600" />
              Workers
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6 text-center">
          {/* Enhanced icon with gradient background */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 ring-4 ring-blue-50">
            <Users size={24} className="sm:w-8 sm:h-8 text-blue-600" />
          </div>

          {/* Enhanced heading */}
          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Build Your Farm Team
          </h4>
          <p className="text-sm text-gray-500 mb-3">No workers yet</p>

          {/* Enhanced description with benefits */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 max-w-sm mx-auto leading-relaxed">
            Add workers to help manage daily operations, monitor your farm, and
            boost overall productivity.
          </p>

          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Shared tasks
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Better monitoring
            </span>
            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Higher efficiency
            </span>
          </div>

          {/* Enhanced CTA Button with icon animation */}
          <Button
            onClick={() =>
              onOpen("add-workers-to-farm", { farmTag: farm.farm_tag })
            }
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                       text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
                       transition-all duration-200 ease-in-out text-sm sm:text-base px-6 sm:px-8 py-2.5"
            size="default"
          >
            <Plus
              size={16}
              className="sm:w-4 sm:h-4 mr-2 group-hover:rotate-90 transition-transform duration-200"
            />
            Add Your First Worker
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
            Free to add • Easy to manage
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
            <Users size={16} className="sm:w-5 sm:h-5 mr-2 text-blue-600" />
            Workers ({farm.workers.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onOpen("add-workers-to-farm", { farmTag: farm.farm_tag })
              }
              className="text-xs sm:text-sm"
            >
              <Plus size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
            <Link
              href={`/farms/${farm.farm_tag}/workers`}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 flex items-center"
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
          {farm.workers.slice(0, 4).map((worker) => (
            <div
              key={worker.id}
              className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {worker.name}
                  </p>
                  {worker.roles?.length > 0 && (
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {worker.roles[0].toLowerCase()}
                      {worker.roles.length > 1 && (
                        <span className="text-blue-600">
                          {" "}
                          +{worker.roles.length - 1}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={`/farms/${farm.farm_tag}/workers/${worker.worker_tag}`}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex-shrink-0"
              >
                View
              </Link>
            </div>
          ))}
        </div>

        {farm.workers.length > 4 && (
          <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
            <Link
              href={`/farms/${farm.farm_tag}/workers`}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center"
            >
              View All {farm.workers.length} Workers
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
