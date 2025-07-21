import type { Farm } from "@/graphql/generated/graphql";
import {
  ChevronRight,
  Home,
  Loader,
  Map as MapIcon,
  Mouse,
  Wheat,
  Fish,
  Egg,
  Beef,
  TreePine,
  Droplets,
} from "lucide-react";
import Link from "next/link";
import type { Ref } from "react";
import EmptyStateFarms from "./empty-farm-state";
import EmptyFarmSearchState from "./empty-farm-search-state";

const FarmSection = ({
  farms,
  loading,
  searchTerm,
  observerTarget,
}: {
  farms: Array<Farm>;
  loading: boolean;
  searchTerm: string;
  observerTarget: Ref<HTMLDivElement> | undefined;
}) => {
  const MAX_HOUSES_DISPLAY = 2;

  const getPerformanceConfig = (performance: number) => {
    if (performance >= 90) {
      return {
        bgColor: "bg-green-500",
        textColor: "text-green-700",
        ringColor: "ring-green-200",
        label: "Excellent",
        icon: "🚀",
      };
    }
    if (performance >= 80) {
      return {
        bgColor: "bg-green-400",
        textColor: "text-green-600",
        ringColor: "ring-green-200",
        label: "Good",
        icon: "✨",
      };
    }
    if (performance >= 70) {
      return {
        bgColor: "bg-yellow-400",
        textColor: "text-yellow-600",
        ringColor: "ring-yellow-200",
        label: "Fair",
        icon: "⚡",
      };
    }
    if (performance >= 50) {
      return {
        bgColor: "bg-orange-400",
        textColor: "text-orange-600",
        ringColor: "ring-orange-200",
        label: "Poor",
        icon: "⚠️",
      };
    }
    return {
      bgColor: "bg-red-400",
      textColor: "text-red-600",
      ringColor: "ring-red-200",
      label: "Critical",
      icon: "🔴",
    };
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

  const getFarmTypeConfig = (farmType: string) => {
    const configs = {
      LIVESTOCK: {
        icon: Beef,
        color: "text-red-600",
        bgColor: "bg-red-50",
        primaryLabel: "Animals",
        primaryValue: (farm: Farm) =>
          farm.livestock?.length.toLocaleString() || "0",
        secondaryLabel: "Barns",
        secondaryValue: (farm: Farm) => farm.barns?.length || 0,
        structureLabel: "Barns",
        structureIcon: Home,
        structurePath: "barns",
        structureType: "Livestock Barn",
        countIcon: Mouse,
      },
      POULTRY: {
        icon: Egg,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        primaryLabel: "Birds",
        primaryValue: (farm: Farm) =>
          farm.livestock?.length.toLocaleString() || "0",
        secondaryLabel: "Coops",
        secondaryValue: (farm: Farm) => farm.barns?.length || 0,
        structureLabel: "Coops",
        structureIcon: Home,
        structurePath: "barns",
        structureType: "Poultry Coop",
        countIcon: Egg,
      },
      AQUACULTURE: {
        icon: Fish,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        primaryLabel: "Fish",
        primaryValue: (farm: Farm) =>
          farm.livestock?.length.toLocaleString() || "0",
        secondaryLabel: "Ponds",
        secondaryValue: (farm: Farm) => farm.barns?.length || 0,
        structureLabel: "Ponds",
        structureIcon: Droplets,
        structurePath: "barns",
        structureType: "Fish Pond",
        countIcon: Fish,
      },
      CROP: {
        icon: Wheat,
        color: "text-green-600",
        bgColor: "bg-green-50",
        primaryLabel: "Batches",
        primaryValue: (farm: Farm) =>
          farm.crop_batches?.length.toLocaleString() || "0",
        secondaryLabel: "Fields",
        secondaryValue: (farm: Farm) => farm.fields?.length || 0,
        structureLabel: "Fields",
        structureIcon: TreePine,
        structurePath: "fields",
        structureType: "Crop Field",
        countIcon: Wheat,
      },
      APIARY: {
        icon: TreePine,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        primaryLabel: "Hives",
        primaryValue: (farm: Farm) =>
          farm.barns?.length.toLocaleString() || "0",
        secondaryLabel: "Workers",
        secondaryValue: (farm: Farm) => farm.workers?.length || 0,
        structureLabel: "Hives",
        structureIcon: Home,
        structurePath: "barns",
        structureType: "Bee Hive",
        countIcon: TreePine,
      },
      MIXED: {
        icon: Mouse,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        primaryLabel: "Total Units",
        primaryValue: (farm: Farm) =>
          (
            (farm.livestock?.length || 0) + (farm.crop_batches?.length || 0)
          ).toLocaleString(),
        secondaryLabel: "Structures",
        secondaryValue: (farm: Farm) =>
          (farm.barns?.length || 0) + (farm.fields?.length || 0),
        structureLabel: "Structures",
        structureIcon: Home,
        structurePath: "barns",
        structureType: "Mixed Structure",
        countIcon: Mouse,
      },
    };

    return configs[farmType as keyof typeof configs] || configs.LIVESTOCK;
  };

  const getStructureCount = (
    farm: Farm,
    config: ReturnType<typeof getFarmTypeConfig>,
  ) => {
    if (farm.farm_type === "CROP") {
      return (
        farm.fields?.reduce(
          (sum, field) => sum + (field?.crop_batches?.length ?? 0),
          0,
        ) || 0
      );
    }
    return (
      farm.barns?.reduce(
        (sum, barn) =>
          sum +
          (barn?.pens?.reduce(
            (penSum, pen) => penSum + (pen?.livestock?.length ?? 0),
            0,
          ) ?? 0),
        0,
      ) || 0
    );
  };

  const renderStructures = (
    farm: Farm,
    config: ReturnType<typeof getFarmTypeConfig>,
  ) => {
    if (farm.farm_type === "CROP") {
      return renderFields(farm, config);
    }
    return renderBarns(farm, config);
  };

  const renderFields = (
    farm: Farm,
    config: ReturnType<typeof getFarmTypeConfig>,
  ) => {
    if (!farm.fields?.length) {
      return (
        <div className="py-4 px-3 rounded-lg bg-gray-50 text-xs">
          No fields under this farm
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h4 className="text-sm font-medium text-gray-900 flex items-center">
            <config.structureIcon size={16} className="mr-1.5" />
            {config.structureLabel} ({farm.fields.length})
          </h4>
        </div>
        <div className="space-y-2">
          {farm.fields.slice(0, MAX_HOUSES_DISPLAY).map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
            >
              <div>
                <div className="font-medium text-xs sm:text-sm text-gray-900 truncate max-w-[120px] sm:max-w-none">
                  {field.name}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
                  {field.area_hectares} hectares
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {field.crop_batches && field.crop_batches.length > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <config.countIcon size={12} className="mr-1" />
                    {field.crop_batches.length}
                  </div>
                )}
                <span className="px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          ))}

          {farm.fields.length > MAX_HOUSES_DISPLAY && (
            <Link
              href={`/farms/${farm.id}/${config.structurePath}`}
              className="flex items-center justify-center p-2 bg-gray-50 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
            >
              View All {farm.fields.length} {config.structureLabel}
              <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
      </>
    );
  };

  const renderBarns = (
    farm: Farm,
    config: ReturnType<typeof getFarmTypeConfig>,
  ) => {
    if (!farm.barns?.length) {
      return (
        <div className="py-4 px-3 rounded-lg bg-gray-50 text-xs">
          No {config.structureLabel.toLowerCase()} under this farm
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h4 className="text-sm font-medium text-gray-900 flex items-center">
            <config.structureIcon size={16} className="mr-1.5" />
            {config.structureLabel} ({farm.barns.length})
          </h4>
        </div>
        <div className="space-y-2">
          {farm.barns.slice(0, MAX_HOUSES_DISPLAY).map((barn) => (
            <div
              key={barn.id}
              className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
            >
              <div>
                <div className="font-medium text-xs sm:text-sm text-gray-900 truncate max-w-[120px] sm:max-w-none">
                  {barn.name}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
                  {config.structureType}
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {getStructureCount(farm, config) > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <config.countIcon size={12} className="mr-1" />
                    {(barn?.pens ?? []).reduce(
                      (sum, pen) => sum + (pen?.livestock?.length ?? 0),
                      0,
                    )}
                  </div>
                )}
                <span
                  className={`px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                    barn.status.toLowerCase(),
                  )}`}
                >
                  {barn.status[0] + barn.status.slice(1).toLowerCase()}
                </span>
              </div>
            </div>
          ))}

          {farm.barns.length > MAX_HOUSES_DISPLAY && (
            <Link
              href={`/farms/${farm.id}/${config.structurePath}`}
              className="flex items-center justify-center p-2 bg-gray-50 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
            >
              View All {farm.barns.length} {config.structureLabel}
              <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {farms?.length ? (
        <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            All Farms
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farms?.map((farm) => {
              const config = getFarmTypeConfig(farm.farm_type);
              const IconComponent = config.icon;

              return (
                <div
                  key={farm.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-4 flex flex-col h-full sm:p-5 gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${config.bgColor}`}
                        >
                          <IconComponent size={20} className={config.color} />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 truncate">
                            {farm.name}
                          </h3>
                          <p className={`text-xs font-medium ${config.color}`}>
                            {farm.farm_type?.charAt(0) +
                              farm.farm_type?.slice(1).toLowerCase()}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Performance Indicator */}
                      <div className="flex flex-col items-end space-y-1">
                        <div
                          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-4 ${getPerformanceConfig(farm.performance).ringColor} ${getPerformanceConfig(farm.performance).bgColor} flex items-center justify-center shadow-md`}
                        >
                          <div className="text-center">
                            <div className="text-xs sm:text-sm text-white font-bold leading-none">
                              {farm.performance}%
                            </div>
                            <div className="text-xs text-white/80 font-medium mt-0.5">
                              {getPerformanceConfig(farm.performance).icon}
                            </div>
                          </div>

                          {/* Performance Ring Progress */}
                          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                              cx="50%"
                              cy="50%"
                              r="45%"
                              fill="none"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="2"
                            />
                            <circle
                              cx="50%"
                              cy="50%"
                              r="45%"
                              fill="none"
                              stroke="rgba(255,255,255,0.9)"
                              strokeWidth="2"
                              strokeDasharray={`${2 * Math.PI * (farm.performance * 0.45)}, ${2 * Math.PI * 100}`}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                        </div>

                        {/* Performance Label */}
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 ${getPerformanceConfig(farm.performance).textColor}`}
                        >
                          {getPerformanceConfig(farm.performance).label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <MapIcon size={16} className="mr-1.5 flex-shrink-0" />
                      <p className="truncate">
                        {farm.location} • {farm.area}
                      </p>
                    </div>

                    {/* Dynamic Statistics Section */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                        <div className="flex items-center">
                          <span className="flex-shrink-0 text-xs uppercase font-semibold text-gray-500">
                            {config.primaryLabel}
                          </span>
                        </div>
                        <p className="text-lg sm:text-xl font-medium text-gray-900 mt-0.5 sm:mt-1">
                          {config.primaryValue(farm)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                        <div className="flex items-center">
                          <span className="flex-shrink-0 text-xs uppercase font-semibold text-gray-500">
                            {config.secondaryLabel}
                          </span>
                        </div>
                        <p className="text-lg sm:text-xl font-medium text-gray-900 mt-0.5 sm:mt-1">
                          {config.secondaryValue(farm)}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Structures Section */}
                    <div className="pt-3 sm:pt-4 border-t border-gray-200">
                      {renderStructures(farm, config)}
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                      <Link
                        href={`/farms/${farm.id}`}
                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/farms/${farm.id}/${config.structurePath}`}
                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Manage {config.structureLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader size={30} className="text-gray-400 animate-spin" />
            </div>
          ) : null}
        </div>
      ) : searchTerm ? (
        <EmptyFarmSearchState />
      ) : (
        <EmptyStateFarms />
      )}
      <div id="scroll-sentinel" ref={observerTarget} />
    </>
  );
};

export default FarmSection;
