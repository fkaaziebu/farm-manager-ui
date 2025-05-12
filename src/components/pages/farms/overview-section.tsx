import { useFetchFarms } from "@/hooks/queries";
import { useEffect } from "react";
import { Home, Mouse, BarChart } from "lucide-react";
import { HousingStatus } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";

const OverviewSection = () => {
  const { fetchFarms, farms, loadingFarms } = useFetchFarms();
  const { data } = useModal();

  useEffect(() => {
    fetchFarms({ searchTerm: "", pagination: { first: 1000 } });
  }, [data.createFarmEvent]);
  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      {!loadingFarms ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Farms Overview Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Farms Overview
              </h2>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {farms?.length}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total farms in the system
            </p>

            <div className="mt-3 sm:mt-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">Average Performance</span>
                <span className="text-gray-900 font-medium">
                  {farms && farms.length > 0
                    ? (farms.reduce(
                        (sum, farm) => sum + (farm.performance || 0),
                        0,
                      ) /
                        (farms.length * 100)) *
                      100
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-1 sm:mt-2">
                <div
                  className="bg-green-500 h-1.5 sm:h-2 rounded-full"
                  style={{
                    width: `${
                      (farms?.reduce(
                        (sum, farm) => sum + (farm.performance || 0),
                        0,
                      ) /
                        (farms?.length * 100)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Animals Overview Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Animals Overview
              </h2>
              <Mouse className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {farms
                ?.reduce((sum, farm) => sum + (farm?.livestock?.length ?? 0), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total animals across all farms
            </p>

            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span>Poultry: </span>
                  <span className="font-medium text-gray-900">5,000</span>
                </div>
                <div>
                  <span>Cattle: </span>
                  <span className="font-medium text-gray-900">715</span>
                </div>
              </div>
            </div>
          </div>

          {/* Houses Overview Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Houses Overview
              </h2>
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {farms?.reduce(
                (sum, farm) => sum + (farm?.barns?.length ?? 0),
                0,
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total houses across all farms
            </p>

            <div className="mt-3 sm:mt-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 mr-1 sm:mr-2" />
                  <span className="text-gray-500">Operational: </span>
                  <span className="font-medium text-gray-900 ml-1">
                    {farms?.reduce(
                      (sum, farm) =>
                        sum +
                        (farm.barns?.filter(
                          (hs) => hs.status === HousingStatus.Operational,
                        )?.length ?? 0),
                      0,
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 mr-1 sm:mr-2" />
                  <span className="text-gray-500">Maintenance: </span>
                  <span className="font-medium text-gray-900 ml-1">
                    {farms?.reduce(
                      (sum, farm) =>
                        sum +
                        (farm?.barns?.filter(
                          (hs) => hs.status === HousingStatus.Maintenance,
                        )?.length ?? 0),
                      0,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="flex flex-col gap-5 justify-center p-5 rounded-lg border bg-white animate-pulse">
            <div className="h-5 w-3/5 rounded-lg bg-gray-100 border" />
            <div className="h-6 w-4/5 rounded-lg bg-gray-100 border" />
            <div className="flex items-center gap-5 mt-3">
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-center p-5 rounded-lg border bg-white animate-pulse">
            <div className="h-5 w-3/5 rounded-lg bg-gray-100 border" />
            <div className="h-6 w-4/5 rounded-lg bg-gray-100 border" />
            <div className="flex items-center gap-5 mt-3">
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-center p-5 rounded-lg border bg-white animate-pulse">
            <div className="h-5 w-3/5 rounded-lg bg-gray-100 border" />
            <div className="h-6 w-4/5 rounded-lg bg-gray-100 border" />
            <div className="flex items-center gap-5 mt-3">
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
              <div className="h-3 w-full rounded-lg bg-gray-100 border" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewSection;
