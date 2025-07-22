import { Farm } from "@/graphql/generated/graphql";
import {
  Home,
  Plus,
  ArrowRight,
  AlertTriangle,
  Mouse,
  Droplets,
} from "lucide-react";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FarmBarnsSectionProps {
  farm?: Farm;
  loading?: boolean;
}

export default function FarmBarnsSection({
  farm,
  loading,
}: FarmBarnsSectionProps) {
  const { onOpen } = useModal();

  if (loading || !farm) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-3 sm:p-4"
              >
                <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-2 sm:h-3 w-12 sm:w-16 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="flex justify-between items-center">
                  <div className="h-2 sm:h-3 w-8 sm:w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  // Get farm type specific terminology
  const getStructureTerminology = () => {
    switch (farm.farm_type) {
      case "AQUACULTURE":
        return {
          singular: "Pond",
          plural: "Ponds",
          icon: Droplets,
          color: "text-blue-600",
          modalKey: "add-barns-to-farm",
        };
      case "POULTRY":
        return {
          singular: "Coop",
          plural: "Coops",
          icon: Home,
          color: "text-yellow-600",
          modalKey: "add-barns-to-farm",
        };
      case "APIARY":
        return {
          singular: "Hive",
          plural: "Hives",
          icon: Home,
          color: "text-orange-600",
          modalKey: "add-barns-to-farm",
        };
      default:
        return {
          singular: "House",
          plural: "Houses",
          icon: Home,
          color: "text-purple-600",
          modalKey: "add-barns-to-farm",
        };
    }
  };

  // Check if farm type should show barns
  const shouldShowBarns =
    farm.farm_type === "LIVESTOCK" ||
    farm.farm_type === "POULTRY" ||
    farm.farm_type === "AQUACULTURE" ||
    farm.farm_type === "APIARY" ||
    farm.farm_type === "MIXED";

  if (!shouldShowBarns) {
    return null;
  }

  const terminology = getStructureTerminology();
  const StructureIcon = terminology.icon;

  if (!farm.barns?.length) {
    return (
      <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
              <StructureIcon
                size={16}
                className={`sm:w-5 sm:h-5 mr-2 ${terminology.color}`}
              />
              {terminology.plural}
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6 text-center">
          {/* Enhanced icon with gradient background */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 ring-4 ring-purple-50">
            <StructureIcon
              size={24}
              className={`sm:w-8 sm:h-8 ${terminology.color}`}
            />
          </div>

          {/* Enhanced heading */}
          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Build Your Farm Infrastructure
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            No {terminology.plural.toLowerCase()} yet
          </p>

          {/* Enhanced description with benefits */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 max-w-sm mx-auto leading-relaxed">
            Add {terminology.plural.toLowerCase()} to provide shelter, organize
            your {farm.farm_type?.toLowerCase()} operations, and create optimal
            conditions.
          </p>

          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Better organization
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Weather protection
            </span>
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Optimal conditions
            </span>
          </div>

          {/* Enhanced CTA Button */}
          <Button
            onClick={() =>
              onOpen(terminology.modalKey as ModalType, {
                farmTag: farm.farm_tag,
              })
            }
            className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800
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
            Easy setup • Flexible configurations
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
            <StructureIcon
              size={16}
              className={`sm:w-5 sm:h-5 mr-2 ${terminology.color}`}
            />
            {terminology.plural} ({farm.barns.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onOpen(terminology.modalKey as ModalType, {
                  farmTag: farm.farm_tag,
                })
              }
              className="text-xs sm:text-sm"
            >
              <Plus size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
            <Link
              href={`/farms/${farm.farm_tag}/barns`}
              className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 flex items-center"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {farm.barns.slice(0, 4).map((barn) => {
            const animalCount =
              barn.pens?.reduce(
                (sum, pen) => sum + (pen?.livestock?.length ?? 0),
                0,
              ) || 0;

            return (
              <div
                key={barn.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {barn.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {barn.area_sqm} sqm
                    </p>
                  </div>
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getStatusColor(barn.status)} ml-2 flex-shrink-0`}
                  >
                    {barn.status.charAt(0) + barn.status.slice(1).toLowerCase()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    {animalCount > 0 && (
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Mouse size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
                        {animalCount}
                      </div>
                    )}
                    <div className="flex items-center text-xs sm:text-sm text-amber-600">
                      <AlertTriangle
                        size={12}
                        className="sm:w-3.5 sm:h-3.5 mr-1"
                      />
                      3
                    </div>
                  </div>
                  <Link
                    href={`/farms/${farm.farm_tag}/barns/${barn.unit_id}`}
                    className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium flex-shrink-0"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {farm.barns.length > 4 && (
          <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
            <Link
              href={`/farms/${farm.farm_tag}/barns`}
              className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 flex items-center justify-center"
            >
              View All {farm.barns.length} {terminology.plural}
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
