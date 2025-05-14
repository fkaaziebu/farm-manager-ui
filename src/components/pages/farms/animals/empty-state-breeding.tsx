import React from "react";
import {
  Calendar,
  ClipboardList,
  PieChart,
  Zap,
  Heart,
  TrendingUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Livestock } from "@/graphql/generated/graphql";
const EmptyStateBreeding = ({
  penLivestock,
  penName,
  livestockType, // Pass the first Livestock object if applicable
}: {
  penLivestock: Livestock[];
  penName?: string;
  livestockType?: string;
}) => {
  const pathname = usePathname();
  const initialAnimalTag = pathname.split("/").pop();
  const { onOpen } = useModal();
  return (
    <div>
      {/* Empty Upcoming breeding events */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Upcoming Breeding Events
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No upcoming breeding events
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Plan your breeding schedule by adding events for your animals.
          </p>
          <div className="mt-4">
            <Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <Zap className="mr-2 h-4 w-4" />
              Schedule Breeding Event
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Breeding records list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Breeding Records
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No breeding records yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Track breeding attempts and outcomes to improve your breeding
            program.
          </p>
          <div className="mt-4">
            <Button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                onOpen("add-livestock-breeding-record", {
                  penLivestock,
                  penName,
                  livestockTag: initialAnimalTag,
                  livestockType,
                });
              }}
            >
              <Heart className="mr-2 h-4 w-4" />
              Add Breeding Record
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Breeding Success Rate Chart */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Breeding Success Rate
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <PieChart className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No breeding statistics available
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Add breeding records to see success rates and performance metrics.
          </p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Benefits of tracking breeding data:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Improved Success Rates
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Identify patterns that lead to successful breeding
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Better Planning
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Schedule breeding events at optimal times
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-purple-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Genetic Management
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Track lineage and avoid inbreeding
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateBreeding;
