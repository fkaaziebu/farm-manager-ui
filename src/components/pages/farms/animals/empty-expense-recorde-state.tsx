import React from "react";
import {
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart,
  Plus,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
const EmptyStateExpenses = () => {
  const pathname = usePathname();
  const initialAnimalTag = pathname.split("/").pop();
  const { onOpen } = useModal();
  return (
    <div>
      {/* Empty Expenses Records */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Expense Records</h3>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No expense records yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Track your farm expenses to monitor costs and analyze spending
            patterns.
          </p>
          <div className="mt-4">
            <Button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              onClick={() =>
                onOpen("add-livestock-expense-record", {
                  livestockTag: initialAnimalTag,
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Expense
            </Button>
          </div>
        </div>
      </div>

      {/* Empty Expense Stats and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Empty Expense by Category Chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Expenses by Category
            </h3>
          </div>
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <PieChart className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900">
              No category data available
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Track expenses across different categories to see where your money
              is going.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                Feed
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                Veterinary
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                Equipment
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                Labor
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                Utilities
              </div>
            </div>
          </div>
        </div>

        {/* Empty Monthly Expense Trend */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Monthly Expense Trend
            </h3>
          </div>
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900">
              No trend data available
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Record expenses over time to visualize monthly spending patterns
              and identify cost-saving opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Empty Expense Summary Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Expenses (YTD)
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
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Monthly Cost
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
                    Cost Per Kg Gained
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

      {/* Educational Component */}
      <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Benefits of expense tracking:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm font-medium text-gray-900">
                  Budget Management
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Track expenses against your budget to control costs and improve
                profitability.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <PieChart className="h-5 w-5 text-indigo-500 mr-2" />
                <p className="text-sm font-medium text-gray-900">
                  Cost Analysis
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Identify your highest cost areas and find opportunities to
                reduce expenses.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                <p className="text-sm font-medium text-gray-900">
                  Performance Metrics
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Calculate important metrics like cost per kg gained to measure
                efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateExpenses;
