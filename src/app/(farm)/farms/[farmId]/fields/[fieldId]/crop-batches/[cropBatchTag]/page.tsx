"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Filter,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Download,
  Share,
  Printer,
  PlusCircle,
  MoreVertical,
  Leaf,
  Droplets,
  Sun,
  MapPin,
  Camera,
  Activity,
  Thermometer,
  CloudRain,
  Bug,
  Sprout,
  MessageSquare,
  User,
} from "lucide-react";
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  CropStatus,
  DiseaseType,
  HousingUnit,
  // PredictionCropType,
} from "@/graphql/generated/graphql";
import { useGetCropBatchWithPredictions } from "@/hooks/queries";
import { usePathname /*useSearchParams */ } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export default function CropDetailsPage() {
  // Record types
  const [activeTab, setActiveTab] = useState("overview");
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const { cropBatch, predictions, getCropBatchWithPredictions } =
    useGetCropBatchWithPredictions();
  const cropBatchTag = pathname.split("/").pop() || "";
  const housingUnit = pathname.includes("fields")
    ? HousingUnit.Field
    : HousingUnit.Greenhouse;
  // const cropType = searchParams.get("cropType") as PredictionCropType;
  const { onOpen } = useModal();

  // Filter state
  const [showFilters, setShowFilters] = useState(false);

  const [showActionMenu, setShowActionMenu] = useState(false);

  // Sample growth data for charts
  const growthData = [
    { week: "Week 1", height: 5, leaves: 4 },
    { week: "Week 4", height: 15, leaves: 12 },
    { week: "Week 8", height: 35, leaves: 28 },
    { week: "Week 12", height: 65, leaves: 45 },
    { week: "Week 16", height: 85, leaves: 60 },
    { week: "Week 18", height: 90, leaves: 65 },
  ];

  // Weather data
  const weatherData = [
    { date: "Jul 15", temp: 28, humidity: 65, rainfall: 12 },
    { date: "Jul 16", temp: 30, humidity: 70, rainfall: 0 },
    { date: "Jul 17", temp: 29, humidity: 68, rainfall: 8 },
    { date: "Jul 18", temp: 27, humidity: 72, rainfall: 15 },
    { date: "Jul 19", temp: 31, humidity: 60, rainfall: 0 },
    { date: "Jul 20", temp: 28, humidity: 65, rainfall: 5 },
  ];

  // Expense breakdown for pie chart
  const expenseBreakdown = [
    { name: "Seeds", value: 500 },
    { name: "Fertilizers", value: 800 },
    { name: "Pesticides", value: 300 },
    { name: "Labor", value: 1200 },
    { name: "Irrigation", value: 400 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const getStatusColor = (status: CropStatus | undefined) => {
    switch (status) {
      case CropStatus.Seedling:
        return "bg-green-100 text-green-800";
      case CropStatus.Growing:
        return "bg-blue-100 text-blue-800";
      case CropStatus.Flowering:
        return "bg-purple-100 text-purple-800";
      case CropStatus.Fruiting:
        return "bg-orange-100 text-orange-800";
      case CropStatus.ReadyForHarvest:
        return "bg-yellow-100 text-yellow-800";
      case CropStatus.Harvested:
        return "bg-gray-100 text-gray-800";
      case CropStatus.Failed:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTabDisplayName = (tab: string) => {
    switch (tab) {
      case "predictions":
        return "AI Predictions";
      case "overview":
        return "Overview";
      case "growth":
        return "Growth Tracking";
      case "applications":
        return "Applications";
      case "weather":
        return "Weather & Environment";
      case "expenses":
        return "Expense Records";
      case "harvest":
        return "Harvest Records";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDiseaseColor = (disease: DiseaseType | unknown) => {
    switch (disease) {
      case DiseaseType.Healthy:
        return "bg-green-100 text-green-800";

      case DiseaseType.RedRust:
        return "bg-red-100 text-red-800";

      case DiseaseType.LeafMiner:
        return "bg-yellow-100 text-yellow-800";
      case DiseaseType.Anthracnose:
        return "bg-purple-100 text-purple-800";

      case DiseaseType.LeafBlight:
        return "bg-orange-100 text-orange-800";

      case DiseaseType.LeafCurl:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(1)}%`;
  };

  const calculateDaysToHarvest = () => {
    const today = new Date();
    const harvestDate = new Date(cropBatch?.harvest_date);
    const diffTime = harvestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    getCropBatchWithPredictions({
      cropBatchTag,
      // cropType,
      housingUnit,
      // farmTag,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Header */}
      <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Back button and title */}
              <div className="flex items-center flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="mr-3 p-1 -ml-1 rounded-md hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                      {cropBatch?.name}
                    </h1>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                        cropBatch?.status
                      )}`}
                    >
                      {cropBatch?.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span className="truncate">
                      Planted: {formatDate(cropBatch?.planting_date)} • Tag:{" "}
                      {cropBatch?.crop_batch_tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Action menu */}
              <div className="relative ml-2">
                <button
                  type="button"
                  className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                  onClick={() => setShowActionMenu(!showActionMenu)}
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>

                {showActionMenu && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
                    <div className="py-1">
                      <button
                        type="button"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowActionMenu(false)}
                      >
                        <Share size={16} className="mr-3" />
                        Share
                      </button>
                      <button
                        type="button"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowActionMenu(false)}
                      >
                        <Download size={16} className="mr-3" />
                        Export Data
                      </button>
                      <button
                        type="button"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowActionMenu(false)}
                      >
                        <Printer size={16} className="mr-3" />
                        Print Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Key Metrics - Mobile Optimized */}
        <div className="px-4 py-4 bg-white border-b border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Leaf className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Area</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {cropBatch?.area_planted}
                <span className="text-sm text-gray-500 ml-1">ha</span>
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Sprout className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">
                  Plants
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {cropBatch?.plants_count?.toLocaleString()}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="text-xs text-yellow-600 font-medium">
                  Yield
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {(
                  (cropBatch?.actual_yield || cropBatch?.expected_yield || 0) /
                  1000
                ).toFixed(1)}
                <span className="text-sm text-gray-500 ml-1">t</span>
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                <span className="text-xs text-orange-600 font-medium">
                  Days Left
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {calculateDaysToHarvest() > 0
                  ? calculateDaysToHarvest()
                  : "Ready"}
              </p>
            </div>
          </div>
        </div>

        {/* Disease Classification CTA */}
        <div className="px-4 py-4 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Camera className="h-6 w-6 text-white mr-3" />
              <div>
                <h3 className="text-white font-medium">
                  Disease Classification
                </h3>
                <p className="text-green-100 text-sm">
                  Identify crop diseases using AI
                </p>
              </div>
            </div>
            <button
              type="button"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              onClick={() => onOpen("crop-disease-classification")}
            >
              Scan Crop
            </button>
          </div>
        </div>

        {/* Mobile-Optimized Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-[73px] z-20">
          <div className="overflow-x-auto">
            <nav className="flex px-4 space-x-6 min-w-max">
              {[
                { key: "overview", label: "Overview" },
                { key: "predictions", label: "Predictions" },
                { key: "growth", label: "Growth" },
                { key: "applications", label: "Applications" },
                { key: "weather", label: "Weather" },
                { key: "expenses", label: "Expenses" },
                { key: "harvest", label: "Harvest" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-4">
          {/* Mobile-Optimized Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {getTabDisplayName(activeTab)}
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter size={16} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-1" />
              </button>

              <button className="flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 whitespace-nowrap">
                <PlusCircle size={16} className="mr-1" />
                Add Record
              </button>
            </div>
          </div>

          {/* Tab Content */}

          {/* Predictions Tab */}
          {activeTab === "predictions" && (
            <div className="space-y-4">
              {/* Prediction Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <Camera className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Total Scans
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {predictions?.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Healthy Detections
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {predictions?.reduce(
                          (count, pred) =>
                            count +
                            (Array.isArray(pred.leaf_detections)
                              ? pred.leaf_detections.filter(
                                  (det) =>
                                    det.predicted_disease?.toLowerCase() ===
                                    "healthy"
                                ).length
                              : 0),
                          0
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                      <Bug className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Disease Detections
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {predictions?.reduce(
                          (count, pred) =>
                            count +
                            (Array.isArray(pred.leaf_detections)
                              ? pred.leaf_detections.filter(
                                  (det) =>
                                    det.predicted_disease?.toLowerCase() !==
                                    "healthy"
                                ).length
                              : 0),
                          0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disease Distribution Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Disease Distribution
                  </h3>
                </div>
                <div className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={(() => {
                            const diseaseCount: Record<string, number> = {};
                            predictions?.forEach((pred) => {
                              pred?.leaf_detections?.forEach((det) => {
                                const disease =
                                  det.predicted_disease || "Unknown";
                                diseaseCount[disease] =
                                  (diseaseCount[disease] || 0) + 1;
                              });
                            });
                            return Object.entries(diseaseCount).map(
                              ([name, value]) => ({ name, value })
                            );
                          })()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {(() => {
                            const diseaseCount: Record<string, number> = {};
                            predictions?.forEach((pred) => {
                              pred.leaf_detections?.forEach((det) => {
                                const disease =
                                  det.predicted_disease || "Unknown";
                                diseaseCount[disease] =
                                  (diseaseCount[disease] || 0) + 1;
                              });
                            });
                            return Object.entries(diseaseCount).map(
                              ([name, value], index) => (
                                <Cell
                                  key={`cell-${index}-${name} -${value} `}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              )
                            );
                          })()}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Predictions List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Predictions
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {predictions?.map((prediction) => (
                    <div
                      key={prediction.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        onOpen("view-prediction-details", {
                          predictions: prediction,
                        });
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="h-4 w-4 text-blue-600" />
                            <p className="text-sm font-medium text-gray-900">
                              {prediction.crop_type} Analysis
                            </p>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {prediction.model_used}
                            </span>
                            {/* Feedback indicator */}
                            {prediction.feedback && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                Feedback
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(
                              prediction?.inserted_at
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Processing Time
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {prediction.processing_time_ms.toFixed(0)}ms
                          </p>
                        </div>
                      </div>

                      {/* Feedback Section */}
                      {prediction.feedback && (
                        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs font-medium text-blue-800">
                                  User Feedback
                                </p>
                                {prediction.feedback.actual_disease && (
                                  <span
                                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${getDiseaseColor(
                                      prediction.feedback.actual_disease
                                    )}`}
                                  >
                                    Actual:{" "}
                                    {prediction.feedback.actual_disease?.replace(
                                      /_/g,
                                      " "
                                    )}
                                  </span>
                                )}
                              </div>
                              {prediction.feedback.user_feedback && (
                                <p className="text-xs text-blue-700 line-clamp-2">
                                  {prediction.feedback.user_feedback}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Detection Summary */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Detections Found:</span>
                          <span className="font-medium">
                            {prediction?.leaf_detections?.length} leaves
                          </span>
                        </div>

                        {/* Top Diseases */}
                        <div className="flex flex-wrap gap-1">
                          {Array.from(
                            new Set(
                              prediction?.leaf_detections?.map(
                                (det) => det.predicted_disease
                              )
                            )
                          )
                            .slice(0, 3)
                            .map((disease, index) => {
                              const count = prediction?.leaf_detections?.filter(
                                (det) => det.predicted_disease === disease
                              ).length;
                              const avgConfidence =
                                (prediction?.leaf_detections || [])
                                  ?.filter(
                                    (det) => det.predicted_disease === disease
                                  )
                                  ?.reduce(
                                    (sum, det) => sum + det.confidence,
                                    0
                                  ) / (count || 1);

                              return (
                                <span
                                  key={index}
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDiseaseColor(
                                    disease
                                  )}`}
                                >
                                  {disease?.replace(/_/g, " ")} ({count}) -{" "}
                                  {formatConfidence(avgConfidence)}
                                </span>
                              );
                            })}
                        </div>

                        {/* Confidence Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-xs text-gray-500">
                              Avg Detection Confidence
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatConfidence(
                                (prediction?.leaf_detections || []).reduce(
                                  (sum, det) =>
                                    sum + (det?.detection_confidence || 0),
                                  0
                                ) / (prediction?.leaf_detections?.length || 1)
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-xs text-gray-500">
                              Avg Disease Confidence
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatConfidence(
                                (prediction.leaf_detections || []).reduce(
                                  (sum, det) => sum + det.confidence,
                                  0
                                ) / (prediction?.leaf_detections?.length || 1)
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-xs text-gray-500">
                              Leaves Analyzed
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {prediction?.leaf_detections?.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Trends */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Disease Detection Trends
                  </h3>
                </div>
                <div className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { date: "Jul 15", healthy: 8, diseased: 2 },
                          { date: "Jul 16", healthy: 6, diseased: 4 },
                          { date: "Jul 17", healthy: 7, diseased: 3 },
                          { date: "Jul 18", healthy: 5, diseased: 5 },
                          { date: "Jul 19", healthy: 9, diseased: 1 },
                          { date: "Jul 20", healthy: 8, diseased: 2 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                          label={{
                            value: "Count",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="healthy"
                          stackId="1"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="diseased"
                          stackId="1"
                          stroke="#EF4444"
                          fill="#EF4444"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* Crop Information Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Crop Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Crop Type:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cropBatch?.crop_type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Variety:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cropBatch?.variety}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Planting Method:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {cropBatch?.planting_method?.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Irrigation:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cropBatch?.irrigation_method?.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Seed Amount:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {/* {cropBatch?.seed_amount} {cropBatch.seed_unit} */}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Expected Yield:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {/* {cropBatch?.expected_yield} {cropBatch.yield_unit} */}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        GPS Location:
                      </span>
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {cropBatch?.gps_coordinates}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Harvest Date:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(cropBatch?.harvest_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Activities
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Droplets className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Fertilizer Applied
                      </p>
                      <p className="text-xs text-gray-500">
                        Urea - 75 KG applied yesterday
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Bug className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Pesticide Treatment
                      </p>
                      <p className="text-xs text-gray-500">
                        Fungicide applied 3 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Activity className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Growth Measurement
                      </p>
                      <p className="text-xs text-gray-500">
                        Height recorded - 90cm average
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Growth Tracking Tab */}
          {activeTab === "growth" && (
            <div className="space-y-4">
              {/* Growth Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Growth Progress
                  </h3>
                </div>
                <div className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis
                          yAxisId="left"
                          label={{
                            value: "Height (cm)",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          label={{
                            value: "Leaves",
                            angle: 90,
                            position: "insideRight",
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="height"
                          stroke="#10B981"
                          strokeWidth={2}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="leaves"
                          stroke="#3B82F6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Growth Stages */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Growth Stages
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      stage: "Germination",
                      date: "Mar 15 - Mar 20",
                      status: "completed",
                      color: "green",
                    },
                    {
                      stage: "Seedling",
                      date: "Mar 20 - Apr 15",
                      status: "completed",
                      color: "green",
                    },
                    {
                      stage: "Vegetative",
                      date: "Apr 15 - Jun 01",
                      status: "completed",
                      color: "green",
                    },
                    {
                      stage: "Flowering",
                      date: "Jun 01 - Jun 20",
                      status: "completed",
                      color: "green",
                    },
                    {
                      stage: "Fruiting",
                      date: "Jun 20 - Jul 15",
                      status: "completed",
                      color: "green",
                    },
                    {
                      stage: "Ripening",
                      date: "Jul 15 - Aug 15",
                      status: "current",
                      color: "blue",
                    },
                    {
                      stage: "Harvest",
                      date: "Aug 15 - Aug 30",
                      status: "upcoming",
                      color: "gray",
                    },
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          stage.status === "completed"
                            ? "bg-green-500"
                            : stage.status === "current"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {stage.stage}
                          </span>
                          <span className="text-xs text-gray-500">
                            {stage.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="space-y-4">
              {/* Fertilizer Applications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Fertilizer Applications
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {cropBatch?.fertilizer_applications?.map(
                    // @ts-expect-error error
                    (application) => (
                      <div key={application.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {application.fertilizer_type}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(application.application_date)}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {application.amount} {application.unit}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            <span className="font-medium">Method:</span>{" "}
                            {application.application_method?.replace(/_/g, " ")}
                          </p>
                          <p>
                            <span className="font-medium">Notes:</span>{" "}
                            {application.notes}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Pesticide Applications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pesticide Applications
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {cropBatch?.pesticide_applications?.map(
                    // @ts-expect-error error
                    (application) => (
                      <div key={application.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {application.pesticide_name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(application.application_date)}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            {application.amount} {application.unit}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            <span className="font-medium">Target:</span>{" "}
                            {application.target_pest}
                          </p>
                          <p>
                            <span className="font-medium">Notes:</span>{" "}
                            {application.notes}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Weather Tab */}
          {activeTab === "weather" && (
            <div className="space-y-4">
              {/* Current Weather */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Current Weather</h3>
                    <p className="text-blue-100">Field conditions</p>
                  </div>
                  <Sun className="h-8 w-8" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-2xl font-bold">28°C</p>
                    <p className="text-xs text-blue-100">Temperature</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-2xl font-bold">65%</p>
                    <p className="text-xs text-blue-100">Humidity</p>
                  </div>
                  <div className="text-center">
                    <CloudRain className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-2xl font-bold">12mm</p>
                    <p className="text-xs text-blue-100">Rainfall</p>
                  </div>
                  <div className="text-center">
                    <Activity className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-2xl font-bold">8km/h</p>
                    <p className="text-xs text-blue-100">Wind Speed</p>
                  </div>
                </div>
              </div>

              {/* Weather Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    7-Day Weather Trend
                  </h3>
                </div>
                <div className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weatherData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                          yAxisId="left"
                          label={{
                            value: "Temperature (°C)",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          label={{
                            value: "Rainfall (mm)",
                            angle: 90,
                            position: "insideRight",
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="temp"
                          stackId="1"
                          stroke="#FF6B6B"
                          fill="#FF6B6B"
                          fillOpacity={0.6}
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="rainfall"
                          fill="#4ECDC4"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weather Alerts & Recommendations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Sun className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        High Temperature Alert
                      </p>
                      <p className="text-xs text-yellow-700">
                        Temperatures expected to reach 35°C tomorrow. Consider
                        increasing irrigation frequency.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <CloudRain className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Rain Forecast
                      </p>
                      <p className="text-xs text-blue-700">
                        Moderate rainfall expected in 3 days. Good for crop
                        hydration, monitor for fungal diseases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === "expenses" && (
            <div className="space-y-4">
              {/* Expense Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-2">
                      <DollarSign className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Total Expenses
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        $3,200
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Cost per Hectare
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        $1,280
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Cost per Kg
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        $0.23
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Breakdown Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Expense Breakdown
                  </h3>
                </div>
                <div className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Expense Records List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Expenses
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    {
                      category: "Seeds",
                      amount: 500,
                      date: "2024-03-15",
                      description: "Roma tomato seeds - 25kg",
                    },
                    {
                      category: "Fertilizers",
                      amount: 300,
                      date: "2024-03-20",
                      description: "NPK 15-15-15 - 100kg",
                    },
                    {
                      category: "Labor",
                      amount: 400,
                      date: "2024-03-25",
                      description: "Planting and initial setup",
                    },
                    {
                      category: "Fertilizers",
                      amount: 200,
                      date: "2024-05-15",
                      description: "Urea - 75kg",
                    },
                    {
                      category: "Pesticides",
                      amount: 150,
                      date: "2024-04-10",
                      description: "Fungicide application",
                    },
                  ].map((expense, index) => (
                    <div key={index} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {expense.category}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(expense.date)}
                          </p>
                        </div>
                        <span className="ml-3 px-2 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                          ${expense.amount}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {expense.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Harvest Tab */}
          {activeTab === "harvest" && (
            <div className="space-y-4">
              {/* Harvest Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Expected Yield
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {((cropBatch?.expected_yield || 0) / 1000).toFixed(1)}t
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <Leaf className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Actual Yield
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {cropBatch?.actual_yield
                          ? `${(cropBatch?.actual_yield / 1000).toFixed(1)}t`
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2">
                      <TrendingUp className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-500">
                        Yield per Hectare
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {
                          // (cropBatch?.actual_yield || cropBatch.expected_yield) /
                          ((cropBatch?.area_planted || 0) / 1000).toFixed(1)
                        }
                        t/ha
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Harvest Schedule */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Harvest Schedule
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      phase: "First Harvest",
                      date: "Aug 15 - Aug 20",
                      percentage: "40%",
                      status: "ready",
                    },
                    {
                      phase: "Second Harvest",
                      date: "Aug 22 - Aug 25",
                      percentage: "35%",
                      status: "upcoming",
                    },
                    {
                      phase: "Final Harvest",
                      date: "Aug 28 - Aug 30",
                      percentage: "25%",
                      status: "scheduled",
                    },
                  ].map((harvest, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            harvest.status === "ready"
                              ? "bg-green-500"
                              : harvest.status === "upcoming"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {harvest.phase}
                          </p>
                          <p className="text-xs text-gray-500">
                            {harvest.date}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {harvest.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Assessment */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Quality Assessment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Grade A Quality:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        75%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Grade B Quality:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        20%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full"
                        style={{ width: "20%" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Rejected:</span>
                      <span className="text-sm font-medium text-gray-900">
                        5%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: "5%" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Average Size:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        8.2 cm
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "82%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Market Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">$2.50</p>
                    <p className="text-sm text-gray-500">
                      Current Market Price
                    </p>
                    <p className="text-xs text-gray-400">per kg</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">$35,500</p>
                    <p className="text-sm text-gray-500">Projected Revenue</p>
                    <p className="text-xs text-gray-400">total batch</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      $32,300
                    </p>
                    <p className="text-sm text-gray-500">Estimated Profit</p>
                    <p className="text-xs text-gray-400">after expenses</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
