import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { LogOut, Plus, Wheat } from "lucide-react";
import { useRouter } from "next/navigation";

function FarmHeaderSection() {
  const { onOpen } = useModal();
  const router = useRouter();

  return (
    <header className="border-b border-gray-200 w-full z-50 top-0 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Section - Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Wheat size={24} className="text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Farms
            </h1>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => onOpen("add-farm")}
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add New Farm</span>
              <span className="sm:hidden">Add Farm</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              onClick={() => {
                sessionStorage.clear();
                router.push("/");
              }}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default FarmHeaderSection;
