import React from "react";
import {
  TrendingUp,
  Scale,
  LineChart,
  Plus,
  Calendar,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyStateGrowthPage = () => {
  return (
    <div>
      {/* Empty Growth Chart */}
      <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Weight Growth Trend
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <LineChart className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No growth data available
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Start tracking animal weight to visualize growth trends over time.
          </p>
          <div className="mt-4">
            <Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <Scale className="mr-2 h-4 w-4" />
              Record First Weight
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Growth Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Monthly Growth
                  </dt>
                  <dd className="text-lg font-semibold text-gray-500 italic">
                    No data yet
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Current Weight
                  </dt>
                  <dd className="text-lg font-semibold text-gray-500 italic">
                    No data yet
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <ArrowUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Growth (YTD)
                  </dt>
                  <dd className="text-lg font-semibold text-gray-500 italic">
                    No data yet
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty Growth Records Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Monthly Weight Records
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No weight records yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Record monthly weights to track growth patterns and performance.
          </p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Benefits of tracking weight growth:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Monitor Performance
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Track growth patterns against expected targets
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Scale className="h-5 w-5 text-blue-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Optimize Nutrition
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Adjust feed based on growth rate data
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <ArrowUp className="h-5 w-5 text-yellow-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Identify Issues Early
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Detect growth abnormalities before they become serious
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Weight Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateGrowthPage;
