import React from "react";
import {
  Calendar,
  ClipboardList,
  Activity,
  Stethoscope,
  Shield,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const EmptyStateHealthPage = ({ tag_number }: { tag_number: string }) => {
  const { onOpen } = useModal();

  return (
    <div>
      {/* Empty Upcoming health events */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Upcoming Health Events
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No upcoming health events
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Schedule health checks, vaccinations, and treatments to keep your
            animals healthy.
          </p>
          <div className="mt-4">
            <Button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => onOpen("event-scheduler")}
            >
              <Stethoscope className="mr-2 h-4 w-4" />
              Schedule Health Event
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Health records list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Health Records</h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No health records yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Track vaccinations, illnesses, treatments, and routine checkups to
            maintain comprehensive health histories.
          </p>
          <div className="mt-4">
            <Button
              onClick={() =>
                onOpen("add-health-record", { tagNumber: tag_number })
              }
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <Shield className="mr-2 h-4 w-4" />
              Add Health Record
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Mortality Rate Chart */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Mortality Rate Trend
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <Activity className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No mortality data available
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Track health outcomes to visualize mortality rates and identify
            trends over time.
          </p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Why track animal health data?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Reduce Losses
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Early detection leads to faster treatment and lower mortality
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Preventive Care
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Schedule regular vaccinations and health checks
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-red-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Track Patterns
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Identify seasonal health issues and prepare accordingly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateHealthPage;
