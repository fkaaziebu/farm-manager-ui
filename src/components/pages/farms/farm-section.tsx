import type { Farm } from "@/graphql/generated/graphql";
import { ChevronRight, Home, Map as MapIcon, Mouse } from "lucide-react";
import Link from "next/link";
import type { Ref } from "react";
import EmptyStateFarms from "./empty-farm-state";

const FarmSection = ({
  farms,
  observerTarget,
}: {
  farms: Array<Farm>;
  observerTarget: Ref<HTMLDivElement> | undefined;
}) => {
  const MAX_HOUSES_DISPLAY = 2;

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "bg-green-500";
    if (performance >= 80) return "bg-green-400";
    if (performance >= 70) return "bg-yellow-400";
    return "bg-red-400";
  };

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

  return (
    <>
      {farms?.length ? (
        <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            All Farms
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farms?.map((farm) => (
              <div
                key={farm.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 truncate">
                      {farm.name}
                    </h3>
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${getPerformanceColor(
                        farm.performance
                      )}`}
                    >
                      <span className="text-xs sm:text-sm text-white font-bold">
                        {farm.performance}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-gray-500">
                    <MapIcon size={16} className="mr-1.5 flex-shrink-0" />
                    <p className="truncate">
                      {farm.location} • {farm.area}
                    </p>
                  </div>

                  {/* Statistics Section */}
                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 text-xs uppercase font-semibold text-gray-500">
                          Animals
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl font-medium text-gray-900 mt-0.5 sm:mt-1">
                        {farm.livestock?.length.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 text-xs uppercase font-semibold text-gray-500">
                          Workers
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl font-medium text-gray-900 mt-0.5 sm:mt-1">
                        {farm.workers?.length}
                      </p>
                    </div>
                  </div>

                  {/* Houses Section with clear separation */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center">
                        <Home size={16} className="mr-1.5" />
                        Houses ({farm?.barns?.length})
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {farm?.barns?.slice(0, MAX_HOUSES_DISPLAY).map((barn) => (
                        <div
                          key={barn.id}
                          className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <div className="font-medium text-xs sm:text-sm text-gray-900 truncate max-w-[120px] sm:max-w-none">
                              {barn.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
                              {"Cattle Barn"}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            {(barn?.pens ?? []).reduce(
                              (sum, pen) => sum + (pen?.livestock?.length ?? 0),
                              0
                            ) > 0 && (
                              <div className="flex items-center text-xs text-gray-500">
                                <Mouse size={12} className="mr-1" />
                                {(barn?.pens ?? []).reduce(
                                  (sum, pen) =>
                                    sum + (pen?.livestock?.length ?? 0),
                                  0
                                )}
                              </div>
                            )}
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                                barn.status.toLowerCase()
                              )}`}
                            >
                              {barn.status[0] +
                                barn.status.slice(1).toLowerCase()}
                            </span>
                          </div>
                        </div>
                      ))}

                      {farm.barns?.length &&
                        farm?.barns?.length > MAX_HOUSES_DISPLAY && (
                          <Link
                            href={`/farms/${farm.id}/barns`}
                            className="flex items-center justify-center p-2 bg-gray-50 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View All {farm?.barns?.length} Houses
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        )}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                    <Link
                      href={`/farms/${farm.id}`}
                      className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/farms/${farm.id}/barns`}
                      className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Manage Houses
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyStateFarms />
      )}
      <div id="scroll-sentinel" ref={observerTarget} />
    </>
  );
};

export default FarmSection;
