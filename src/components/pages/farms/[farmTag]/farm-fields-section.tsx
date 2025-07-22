import { Farm } from "@/graphql/generated/graphql";
import { Sprout, Plus, ArrowRight, MapPin } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FarmFieldsSectionProps {
  farm?: Farm;
  loading?: boolean;
}

export default function FarmFieldsSection({
  farm,
  loading,
}: FarmFieldsSectionProps) {
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

  // Check if farm type should show fields
  const shouldShowFields =
    farm.farm_type === "CROP" || farm.farm_type === "MIXED";

  if (!shouldShowFields) {
    return null;
  }

  const getCropStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "seedling":
        return "bg-yellow-100 text-yellow-800";
      case "growing":
        return "bg-blue-100 text-blue-800";
      case "flowering":
        return "bg-pink-100 text-pink-800";
      case "fruiting":
        return "bg-orange-100 text-orange-800";
      case "ready_for_harvest":
        return "bg-amber-100 text-amber-800";
      case "harvested":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!farm.fields?.length) {
    return (
      <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
              <Sprout size={16} className="sm:w-5 sm:h-5 mr-2 text-green-600" />
              Fields
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6 text-center">
          {/* Enhanced icon with gradient background */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 ring-4 ring-green-50">
            <Sprout size={24} className="sm:w-8 sm:h-8 text-green-600" />
          </div>

          {/* Enhanced heading */}
          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Start Growing Your Crops
          </h4>
          <p className="text-sm text-gray-500 mb-3">No fields yet</p>

          {/* Enhanced description with benefits */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 max-w-sm mx-auto leading-relaxed">
            Create fields to start growing crops, organize your planting areas,
            and manage your agricultural operations efficiently.
          </p>

          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Organized planting
            </span>
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Crop tracking
            </span>
            <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium">
              ✓ Better yields
            </span>
          </div>

          {/* Enhanced CTA Button */}
          <Button
            onClick={() =>
              onOpen("add-field-or-greenhouse", { farmTag: farm.farm_tag })
            }
            className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800
                       text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
                       transition-all duration-200 ease-in-out text-sm sm:text-base px-6 sm:px-8 py-2.5"
            size="default"
          >
            <Plus
              size={16}
              className="sm:w-4 sm:h-4 mr-2 group-hover:rotate-90 transition-transform duration-200"
            />
            Create Your First Field
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
            Easy setup • Track growth progress
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
            <Sprout size={16} className="sm:w-5 sm:h-5 mr-2 text-green-600" />
            Fields ({farm.fields.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onOpen("add-field-or-greenhouse", { farmTag: farm.farm_tag })
              }
              className="text-xs sm:text-sm"
            >
              <Plus size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
            <Link
              href={`/farms/${farm.farm_tag}/fields`}
              className="text-xs sm:text-sm text-green-600 hover:text-green-700 flex items-center"
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
          {farm.fields.slice(0, 4).map((field) => {
            const activeCrops = field.crop_batches?.length || 0;
            const latestCrop = field.crop_batches?.[0];

            return (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {field.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <MapPin size={10} className="sm:w-3 sm:h-3 mr-1" />
                      {field.area_hectares} hectares
                    </p>
                  </div>
                  {latestCrop && (
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getCropStatusColor(latestCrop.status || "")} ml-2 flex-shrink-0`}
                    >
                      {latestCrop.status?.charAt(0) +
                        latestCrop.status
                          ?.slice(1)
                          .toLowerCase()
                          .replace(/_/g, " ")}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Sprout size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
                      {activeCrops} crop{activeCrops !== 1 ? "s" : ""}
                    </div>
                    {latestCrop && (
                      <div className="text-xs sm:text-sm text-gray-600 truncate">
                        {latestCrop.crop_type}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/farms/${farm.farm_tag}/fields/${field.unit_id}`}
                    className="text-xs sm:text-sm text-green-600 hover:text-green-700 font-medium flex-shrink-0"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {farm.fields.length > 4 && (
          <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
            <Link
              href={`/farms/${farm.farm_tag}/fields`}
              className="text-xs sm:text-sm text-green-600 hover:text-green-700 flex items-center justify-center"
            >
              View All {farm.fields.length} Fields
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
