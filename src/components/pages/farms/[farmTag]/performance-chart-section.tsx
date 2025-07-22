import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FarmPerformanceChart() {
  const performanceData = [
    { month: "Jan", productivity: 75, expenses: 65, revenue: 70 },
    { month: "Feb", productivity: 78, expenses: 62, revenue: 74 },
    { month: "Mar", productivity: 82, expenses: 70, revenue: 78 },
    { month: "Apr", productivity: 80, expenses: 68, revenue: 76 },
    { month: "May", productivity: 85, expenses: 65, revenue: 82 },
    { month: "Jun", productivity: 87, expenses: 72, revenue: 85 },
    { month: "Jul", productivity: 90, expenses: 75, revenue: 88 },
    { month: "Aug", productivity: 92, expenses: 78, revenue: 91 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white overflow-hidden shadow rounded-lg mb-4 sm:mb-6">
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            Farm Performance
          </h3>
        </div>
        <div className="p-3 sm:p-5">
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#10B981"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
