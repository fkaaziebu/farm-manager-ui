import {
  Loader,
  Search,
  MapPin,
  Mouse,
  Wheat,
  Fish,
  Egg,
  Beef,
  TreePine,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useFetchFarms } from "@/hooks/queries";

interface Farm {
  id: string;
  name: string;
  location: string;
  area: string;
  farm_type: string;
  farm_tag: string;
  performance: number;
  livestock?: Array<{ id: string }>;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { farms, fetchFarms, loadingFarms } = useFetchFarms();

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch farms when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 0) {
      fetchFarms({
        searchTerm: debouncedSearchTerm,
        pagination: { first: 10 },
      });
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedSearchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      LIVESTOCK: "text-red-600",
      POULTRY: "text-yellow-600",
      AQUACULTURE: "text-blue-600",
      CROP: "text-green-600",
      APIARY: "text-orange-600",
      MIXED: "text-purple-600",
    };
    return colors[type as keyof typeof colors] || "text-gray-600";
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "text-green-600";
    if (performance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleFarmClick = (farm: Farm) => {
    setSearchTerm(farm.name);
    setShowDropdown(false);
    // Navigate to farm details page using farm_tag
    router.push(`/farms/${farm.farm_tag}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const isSearching = loadingFarms && debouncedSearchTerm.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div ref={searchRef} className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 sm:text-sm shadow-sm hover:shadow-md transition-all duration-200"
          placeholder="Search farms by name, location, or type..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchTerm.trim().length > 0 && farms && farms.length > 0) {
              setShowDropdown(true);
            }
          }}
        />

        {/* Loading or Clear Button */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {isSearching ? (
            <Loader size={18} className="text-green-500 animate-spin" />
          ) : searchTerm ? (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </button>
          ) : null}
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && debouncedSearchTerm.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center">
                <Loader
                  size={20}
                  className="animate-spin text-green-500 mx-auto mb-2"
                />
                <p className="text-sm text-gray-500">Searching farms...</p>
              </div>
            ) : farms && farms.length > 0 ? (
              <>
                <div className="p-3 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {farms.length} farm{farms.length !== 1 ? "s" : ""} found
                  </p>
                </div>
                <div className="py-2">
                  {farms.map((farm) => {
                    const IconComponent = getFarmTypeIcon(farm.farm_type);
                    return (
                      <button
                        key={farm.id}
                        onClick={() => handleFarmClick(farm)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <IconComponent
                                size={16}
                                className={getFarmTypeColor(farm.farm_type)}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {farm.name}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <MapPin
                                  size={12}
                                  className="mr-1 flex-shrink-0"
                                />
                                <span className="truncate">
                                  {farm.location}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{farm.area}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <div className="text-right">
                              <p
                                className={`text-xs font-medium ${getPerformanceColor(farm.performance)}`}
                              >
                                {farm.performance}%
                              </p>
                              <p className="text-xs text-gray-500">
                                {farm.livestock?.length || 0} animals
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : debouncedSearchTerm.trim().length > 0 ? (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">
                  No farms found matching "{debouncedSearchTerm}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try searching by name, location, or farm type
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
