import { useFetchFarms } from "@/hooks/queries";
import { useEffect } from "react";
import {
  Home,
  Mouse,
  BarChart3,
  Wheat,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { HousingStatus } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";

const OverviewSection = () => {
  const { fetchFarms, farms, loadingFarms } = useFetchFarms();
  const { data } = useModal();

  useEffect(() => {
    fetchFarms({ searchTerm: "", pagination: { first: 1000 } });
  }, [data.createFarmEvent]);

  const totalAnimals =
    farms?.reduce((sum, farm) => sum + (farm?.livestock?.length ?? 0), 0) || 0;
  const totalHouses =
    farms?.reduce((sum, farm) => sum + (farm?.barns?.length ?? 0), 0) || 0;
  const totalCropBatches =
    farms?.reduce((sum, farm) => sum + (farm?.crop_batches?.length ?? 0), 0) ||
    0;
  const totalFields =
    farms?.reduce((sum, farm) => sum + (farm?.fields?.length ?? 0), 0) || 0;

  const operationalHouses =
    farms?.reduce(
      (sum, farm) =>
        sum +
        (farm.barns?.filter((barn) => barn.status === HousingStatus.Operational)
          ?.length ?? 0),
      0,
    ) || 0;

  const avgPerformance =
    farms && farms.length > 0
      ? Math.round(
          farms.reduce((sum, farm) => sum + (farm.performance || 0), 0) /
            farms.length,
        )
      : 0;

  // Farm type distribution
  const farmTypeDistribution =
    farms?.reduce(
      (acc, farm) => {
        const type = farm.farm_type || "MIXED";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "text-green-600";
    if (performance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Issues count (farms with performance < 70%)
  const farmsWithIssues =
    farms?.filter((farm) => (farm.performance || 0) < 70).length || 0;

  if (loadingFarms) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
              <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Farms */}
        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Farms</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {farms?.length || 0}
          </div>
          <p className="text-sm text-gray-500">Active operations</p>
        </div>

        {/* Performance Overview */}
        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Avg Performance
            </h3>
            <TrendingUp
              size={20}
              className={getPerformanceColor(avgPerformance)}
            />
          </div>
          <div
            className={`text-3xl font-bold mb-1 ${getPerformanceColor(avgPerformance)}`}
          >
            {avgPerformance}%
          </div>
          <p className="text-sm text-gray-500">
            {farmsWithIssues > 0 && (
              <span className="flex items-center text-orange-600">
                <AlertTriangle size={12} className="mr-1" />
                {farmsWithIssues} need attention
              </span>
            )}
            {farmsWithIssues === 0 && "All farms performing well"}
          </p>
        </div>

        {/* Dynamic third card based on farm types */}
        {Object.keys(farmTypeDistribution).some((type) =>
          ["LIVESTOCK", "POULTRY", "AQUACULTURE", "MIXED"].includes(type),
        ) ? (
          <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                Total Animals
              </h3>
              <Mouse size={20} className="text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalAnimals.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">Across all farms</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                Crop Batches
              </h3>
              <Wheat size={20} className="text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalCropBatches}
            </div>
            <p className="text-sm text-gray-500">{totalFields} total fields</p>
          </div>
        )}

        {/* Structures */}
        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              {Object.keys(farmTypeDistribution).some((type) => type === "CROP")
                ? "Fields & Houses"
                : "Houses"}
            </h3>
            <Home size={20} className="text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalHouses + totalFields}
          </div>
          <p className="text-sm text-gray-500">
            {operationalHouses} operational
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
