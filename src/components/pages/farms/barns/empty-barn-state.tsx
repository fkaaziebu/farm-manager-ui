import React from "react";
import { Plus, Pen, Home, Grid2X2, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
const EmptyStateBarnPens = ({
  farmId,
  barnUnitId,
  barnName,
}: {
  farmId: string;
  barnUnitId: string;
  barnName: string;
}) => {
  const { onOpen } = useModal();

  return (
    <div>
      {/* Room filters and actions - keep for consistency but show them as inactive */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative opacity-50 pointer-events-none">
            <button
              type="button"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white"
            >
              <svg
                className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
              <svg
                className="ml-1 h-3 w-3 sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="w-full sm:w-auto opacity-50 pointer-events-none">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full pr-8 sm:pr-10 text-xs sm:text-sm border-gray-300 rounded-md"
                placeholder="Search pens..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          onClick={() => onOpen("add-pens-to-barn", { barnUnitId, barnName })}
        >
          <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Add Pen
        </Button>
      </div>

      {/* Empty state content */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-12 sm:p-16 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <PenTool className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="mt-5 text-base font-medium text-gray-900">
            No pens yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            This barn doesn&apos;t have any pens yet. Add your first pen to
            start organizing your livestock and monitoring conditions.
          </p>

          <div className="mt-10 pt-10 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              With pens, you can:
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-5 max-w-3xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Grid2X2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Organize Livestock
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Group animals by type, age, or health needs
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-yellow-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Track Conditions
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Monitor temperature, humidity and other vital metrics
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Manage Capacity
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Optimize space utilization and animal comfort
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateBarnPens;
