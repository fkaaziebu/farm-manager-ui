import { Farm } from "@/graphql/generated/graphql";
import {
  Users,
  Home,
  Mouse,
  Sprout,
  BarChart3,
  TrendingUp,
} from "lucide-react";

interface FarmOverviewSectionProps {
  farm?: Farm;
  loading?: boolean;
}

export default function FarmOverviewSection({
  farm,
  loading,
}: FarmOverviewSectionProps) {
  if (loading || !farm) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg animate-pulse mb-2 sm:mb-3"></div>
              <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse mb-1 sm:mb-2"></div>
              <div className="h-5 sm:h-6 w-8 sm:w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "text-green-600";
    if (performance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Build stats array based on farm type
  const buildStats = () => {
    const stats = [
      // Performance - always shown
      {
        name: "Performance",
        value: `${farm.performance || 0}%`,
        icon: BarChart3,
        color: getPerformanceColor(farm.performance || 0),
        bgColor:
          farm.performance >= 80
            ? "bg-green-50"
            : farm.performance >= 60
              ? "bg-yellow-50"
              : "bg-red-50",
      },
      // Workers - always shown
      {
        name: "Workers",
        value: farm.workers?.length || 0,
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
    ];

    // Add farm-type specific stats
    const farmType = farm.farm_type;

    // Houses - for farms with livestock/animals
    if (
      farmType === "LIVESTOCK" ||
      farmType === "POULTRY" ||
      farmType === "AQUACULTURE" ||
      farmType === "APIARY" ||
      farmType === "MIXED"
    ) {
      stats.push({
        name:
          farmType === "AQUACULTURE"
            ? "Ponds"
            : farmType === "APIARY"
              ? "Hives"
              : farmType === "POULTRY"
                ? "Coops"
                : "Houses",
        value: farm.barns?.length || 0,
        icon: Home,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      });
    }

    // Animals - for farms with livestock
    if (
      farmType === "LIVESTOCK" ||
      farmType === "POULTRY" ||
      farmType === "AQUACULTURE" ||
      farmType === "MIXED"
    ) {
      stats.push({
        name:
          farmType === "POULTRY"
            ? "Birds"
            : farmType === "AQUACULTURE"
              ? "Fish"
              : "Animals",
        value: farm.livestock?.length || 0,
        icon: Mouse,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      });
    }

    // Fields - for crop farms
    if (farmType === "CROP" || farmType === "MIXED") {
      stats.push({
        name: "Fields",
        value: farm.fields?.length || 0,
        icon: Sprout,
        color: "text-green-600",
        bgColor: "bg-green-50",
      });
    }

    // Tasks - always shown
    stats.push({
      name: "Tasks",
      value: farm.tasks?.length || 0,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    });

    return stats;
  };

  const stats = buildStats();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
      <div
        className={`grid gap-3 sm:gap-4 ${
          stats.length <= 3
            ? "grid-cols-2 sm:grid-cols-3"
            : stats.length <= 4
              ? "grid-cols-2 sm:grid-cols-4"
              : stats.length <= 5
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        }`}
      >
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white p-3 sm:p-4 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-2 sm:mb-3 ${stat.bgColor}`}
              >
                <IconComponent
                  size={14}
                  className={`sm:w-[18px] sm:h-[18px] ${stat.color}`}
                />
              </div>
              <p className="text-xs text-gray-600 mb-1">{stat.name}</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
