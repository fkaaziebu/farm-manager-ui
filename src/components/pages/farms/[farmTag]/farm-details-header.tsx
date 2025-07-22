import { Farm } from "@/graphql/generated/graphql";
import {
  LogOut,
  Edit,
  Wheat,
  Mouse,
  Fish,
  Egg,
  Beef,
  TreePine,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function FarmDetailsHeader({
  farm,
  loading,
}: {
  farm?: Farm;
  loading?: boolean;
}) {
  const { onOpen } = useModal();
  const router = useRouter();

  const getFarmTypeIcon = (type: string) => {
    const icons = {
      LIVESTOCK: Beef,
      POULTRY: Egg,
      AQUACULTURE: Fish,
      CROP: Wheat,
      APIARY: TreePine,
      MIXED: Mouse,
    };
    return icons[type as keyof typeof icons] || Mouse;
  };

  const getFarmTypeColor = (type: string) => {
    const colors = {
      LIVESTOCK: "text-red-600 bg-red-50",
      POULTRY: "text-yellow-600 bg-yellow-50",
      AQUACULTURE: "text-blue-600 bg-blue-50",
      CROP: "text-green-600 bg-green-50",
      APIARY: "text-orange-600 bg-orange-50",
      MIXED: "text-purple-600 bg-purple-50",
    };
    return colors[type as keyof typeof colors] || "text-gray-600 bg-gray-50";
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "text-green-600 bg-green-100";
    if (performance >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  // Loading State
  if (loading || !farm) {
    return (
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Main Header Loading */}
          <div className="py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left - Farm Info Loading */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse"></div>
                <div>
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Center - Location Loading */}
              <div className="hidden md:flex items-center">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Right - Actions Loading */}
              <div className="flex items-center space-x-3">
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-9 h-9 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Breadcrumb Loading */}
          <div className="py-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  const IconComponent = getFarmTypeIcon(farm.farm_type);
  const colorClass = getFarmTypeColor(farm.farm_type);
  const performanceClass = getPerformanceColor(farm.performance || 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {/* Left - Farm Info */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass.split(" ")[1]}`}
              >
                <IconComponent size={18} className={colorClass.split(" ")[0]} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold text-gray-900 truncate">
                  {farm.name}
                </h1>
                <p
                  className={`text-sm font-medium ${colorClass.split(" ")[0]}`}
                >
                  {farm.farm_type?.charAt(0) +
                    farm.farm_type?.slice(1).toLowerCase()}
                </p>
              </div>
            </div>

            {/* Center - Location (hidden on mobile) */}
            <div className="hidden md:flex items-center text-sm text-gray-600 px-6">
              <MapPin size={14} className="mr-1.5" />
              <span className="truncate max-w-xs">{farm.location}</span>
              <span className="mx-2">•</span>
              <span>{farm.area}</span>
            </div>

            {/* Right - Performance and Actions */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {/* Edit Button */}
              <Button
                size="sm"
                onClick={() => {
                  onOpen("update-farm", {
                    farm,
                  });
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Edit size={14} className="mr-1.5" />
                <span className="hidden sm:inline">Edit</span>
              </Button>

              {/* Logout Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
                className="border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <LogOut size={14} />
              </Button>
            </div>
          </div>

          {/* Mobile Location */}
          <div className="md:hidden mt-2 flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1.5" />
            <span className="truncate">{farm.location}</span>
            <span className="mx-2">•</span>
            <span>{farm.area}</span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/farms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Farms
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-gray-900">
                  {farm.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </header>
  );
}
