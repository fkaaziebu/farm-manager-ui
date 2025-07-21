import { useFetchFarms } from "@/hooks/queries";
import { useEffect } from "react";
import { Home, Mouse, BarChart3 } from "lucide-react";
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
  const operationalHouses =
    farms?.reduce(
      (sum, farm) =>
        sum +
        (farm.barns?.filter((barn) => barn.status === HousingStatus.Operational)
          ?.length ?? 0),
      0,
    ) || 0;

  if (loadingFarms) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Farms */}
        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Farms</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {farms?.length || 0}
          </div>
          <p className="text-sm text-gray-500">Active farming operations</p>
        </div>

        {/* Total Animals */}
        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Animals</h3>
            <Mouse size={20} className="text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalAnimals.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500">Across all farms</p>
        </div>

        {/* Total Houses */}
        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Houses</h3>
            <Home size={20} className="text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalHouses}
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
