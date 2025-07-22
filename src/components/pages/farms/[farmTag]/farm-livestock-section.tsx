import { Farm } from "@/graphql/generated/graphql";
import { Mouse, Plus, ArrowRight, Heart, Fish, Egg } from "lucide-react";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FarmLivestockSectionProps {
  farm?: Farm;
  loading?: boolean;
}

interface AnimalGroup {
  type: string;
  breed: string;
  count: number;
  healthStatus: string;
}

export default function FarmLivestockSection({
  farm,
  loading,
}: FarmLivestockSectionProps) {
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
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse"></div>
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

  // Check if farm type should show livestock
  const shouldShowLivestock =
    farm.farm_type === "LIVESTOCK" ||
    farm.farm_type === "POULTRY" ||
    farm.farm_type === "AQUACULTURE" ||
    farm.farm_type === "MIXED";

  if (!shouldShowLivestock) {
    return null;
  }

  // Get farm type specific terminology
  const getAnimalTerminology = () => {
    switch (farm.farm_type) {
      case "POULTRY":
        return {
          singular: "Bird",
          plural: "Birds",
          icon: Egg,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          iconBgColor: "bg-yellow-100",
          modalKey: "add-livestock-to-pen",
        };
      case "AQUACULTURE":
        return {
          singular: "Fish",
          plural: "Fish",
          icon: Fish,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          iconBgColor: "bg-blue-100",
          modalKey: "add-livestock-to-pen",
        };
      default:
        return {
          singular: "Animal",
          plural: "Animals",
          icon: Mouse,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          iconBgColor: "bg-orange-100",
          modalKey: "add-livestock-to-pen",
        };
    }
  };

  const terminology = getAnimalTerminology();
  const AnimalIcon = terminology.icon;

  // Group animals by type and breed
  const groupedAnimals: AnimalGroup[] = [];

  if (farm.livestock?.length) {
    const animalMap = new Map<string, AnimalGroup>();

    farm.livestock.forEach((animal) => {
      const key = `${animal.livestock_type}-${animal.breed}`;

      if (animalMap.has(key)) {
        const existing = animalMap.get(key)!;
        existing.count += 1;
      } else {
        animalMap.set(key, {
          type: animal.livestock_type || "Unknown",
          breed: animal.breed || "Unknown",
          count: 1,
          healthStatus: animal.health_status || "HEALTHY",
        });
      }
    });

    groupedAnimals.push(...Array.from(animalMap.values()));
  }

  const getHealthColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "sick":
        return "bg-red-100 text-red-800";
      case "injured":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!farm.livestock?.length) {
    return (
      <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
              <AnimalIcon
                size={16}
                className={`sm:w-5 sm:h-5 mr-2 ${terminology.color}`}
              />
              {terminology.plural}
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6 text-center">
          {/* Enhanced icon with gradient background */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 ring-4 ring-orange-50">
            <AnimalIcon
              size={24}
              className={`sm:w-8 sm:h-8 ${terminology.color}`}
            />
          </div>

          {/* Enhanced heading */}
          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Start Your {terminology.plural} Journey
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            No {terminology.plural.toLowerCase()} yet
          </p>

          {/* Enhanced description with benefits */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 max-w-sm mx-auto leading-relaxed">
            Begin building your {farm.farm_type?.toLowerCase()} operation by
            adding {terminology.plural.toLowerCase()} to track health, growth,
            and productivity.
          </p>

          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Health tracking
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Growth monitoring
            </span>
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Performance insights
            </span>
          </div>

          {/* Enhanced CTA Button */}
          <Button
            onClick={() =>
              onOpen(terminology.modalKey as ModalType, {
                farmTag: farm.farm_tag,
                barns: farm.barns || [],
              })
            }
            className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800
                       text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
                       transition-all duration-200 ease-in-out text-sm sm:text-base px-6 sm:px-8 py-2.5"
            size="default"
          >
            <Plus
              size={16}
              className="sm:w-4 sm:h-4 mr-2 group-hover:rotate-90 transition-transform duration-200"
            />
            Add Your First {terminology.singular}
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
            Easy registration • Comprehensive tracking
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
            <AnimalIcon
              size={16}
              className={`sm:w-5 sm:h-5 mr-2 ${terminology.color}`}
            />
            {terminology.plural} ({farm.livestock.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onOpen(terminology.modalKey as ModalType, {
                  farmTag: farm.farm_tag,
                  barns: farm.barns || [],
                })
              }
              className="text-xs sm:text-sm"
            >
              <Plus size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
            <Link
              href={`/farms/${farm.farm_tag}/livestock`}
              className={`text-xs sm:text-sm ${terminology.color} hover:opacity-80 flex items-center`}
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
          {groupedAnimals.slice(0, 4).map((group, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 ${terminology.iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <AnimalIcon
                    size={14}
                    className={`sm:w-4 sm:h-4 ${terminology.color}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {group.type} - {group.breed}
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Count: {group.count}
                    </p>
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getHealthColor(group.healthStatus)}`}
                    >
                      <Heart
                        size={8}
                        className="sm:w-2.5 sm:h-2.5 inline mr-1"
                      />
                      {group.healthStatus.charAt(0) +
                        group.healthStatus.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/farms/${farm.farm_tag}/livestock?type=${group.type}`}
                className={`text-xs sm:text-sm ${terminology.color} hover:opacity-80 font-medium flex-shrink-0`}
              >
                View
              </Link>
            </div>
          ))}
        </div>

        {groupedAnimals.length > 4 && (
          <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
            <Link
              href={`/farms/${farm.farm_tag}/livestock`}
              className={`text-xs sm:text-sm ${terminology.color} hover:opacity-80 flex items-center justify-center`}
            >
              View All {terminology.singular} Groups
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
