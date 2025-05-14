import React from "react";
import {
  TrendingUp,
  BarChart,
  Utensils,
  Leaf,
  FileText,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyStateFeedManagement = () => {
  return (
    <div>
      {/* Empty Feed Consumption Chart */}
      <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Monthly Feed Consumption
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <BarChart className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No feed consumption data available
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Track feed usage to monitor consumption patterns and optimize
            nutrition.
          </p>
          <div className="mt-4">
            <Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <FileText className="mr-2 h-4 w-4" />
              Record Feed Usage
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Feed Summary Stats */}
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
                    Average Consumption
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
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Feed Efficiency
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
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Daily Average
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

      {/* Empty Current Diet Details */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Current Diet Composition
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Utensils className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No diet plan defined yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Create a balanced diet plan to ensure optimal nutrition for your
            animals.
          </p>

          <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg max-w-md mx-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Common diet components:
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Hay
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Grain Mix
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Silage
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Protein Supplement
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Minerals
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                Vitamins
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Leaf className="mr-2 h-4 w-4" />
              Create Diet Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Diet Modification History */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Diet Modification History
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No diet modifications yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Track changes to your animals&pos;s diets to monitor nutritional
            adjustments over time.
          </p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Benefits of feed management:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Improved Growth
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Optimize nutrition for faster growth and development
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Utensils className="h-5 w-5 text-blue-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Cost Efficiency
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Reduce waste and optimize feed expenditure
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left">
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-purple-500" />
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    Animal Health
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Ensure balanced nutrition for better overall health
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Record Diet Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFeedManagement;
