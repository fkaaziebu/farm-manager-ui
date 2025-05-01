import React from "react";
import {
  Users,
  AlertTriangle,
  Download,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
const EmptyStateLivestockUI = ({ penUnitId }: { penUnitId: string }) => {
  // Mock empty data
  const { onOpen } = useModal();


  return (
    <div>
      {/* Animal stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 sm:gap-5">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 sm:p-3">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                    Animal Count
                  </dt>
                  <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm"></div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-2 sm:p-3">
                <svg
                  className="h-4 w-4 sm:h-6 sm:w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                    Healthy
                  </dt>
                  <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm">
              <p className="text-gray-500">0% of animals</p>
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
                    Needs Attention
                  </dt>
                  <dd className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm">
              <p className="text-gray-500">Monitoring: 0, Treatment: 0</p>
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
                    0 lbs
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-2 sm:px-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm">
              <p className="text-gray-500">Range: 0 - 0 lbs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="bg-white shadow sm:rounded-lg mb-4 sm:mb-6">
        <div className="px-3 py-3 sm:px-4 sm:py-5">
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm"
                placeholder="Search animals by ID or type..."
                disabled
              />
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md bg-gray-50 cursor-not-allowed"
                  defaultValue="all"
                  disabled
                >
                  <option value="all">All Types</option>
                  <option value="holstein">Holstein Cattle</option>
                  <option value="jersey">Jersey Cattle</option>
                </select>
              </div>
              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md bg-gray-50 cursor-not-allowed"
                  defaultValue="all"
                  disabled
                >
                  <option value="all">All Statuses</option>
                  <option value="healthy">Healthy</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="treatment">Treatment</option>
                </select>
              </div>
              <button
                type="button"
                className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add Animal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty animals table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div></div>
          <button
            className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
            disabled
          >
            <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
            Export
          </button>
        </div>

        {/* Empty state content */}
        <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 border-b border-gray-200">
          <div className="bg-green-50 rounded-full p-4 mb-4">
            <PlusCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mt-2">
            No animals in this location
          </h3>
          <p className="mt-1 text-sm text-gray-500 max-w-md text-center">
            This is currently empty. Add animals to track their health, weight,
            and status.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => {
                onOpen("add-livestock-to-pen", {
                  penUnitId,
                });
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Add First Animal
            </button>
          </div>
        </div>

        {/* Pagination section - disabled */}
        <div className="bg-white px-3 py-3 sm:px-4 sm:py-3 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              disabled
              className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="ml-3 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                Showing <span className="font-medium">0</span> to{" "}
                <span className="font-medium">0</span> of{" "}
                <span className="font-medium">0</span> animals
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-xs sm:text-sm font-medium text-gray-400 cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  disabled
                  aria-current="page"
                  className="z-10 bg-gray-100 border-gray-300 text-gray-400 relative inline-flex items-center px-4 py-2 border text-xs sm:text-sm font-medium cursor-not-allowed"
                >
                  1
                </button>
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-xs sm:text-sm font-medium text-gray-400 cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateLivestockUI;
