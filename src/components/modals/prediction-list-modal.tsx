"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import {
  Camera,
  X,
  Download,
  Clock,
  Target,
  Brain,
  Leaf,
  Bug,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  MessageSquare,
  User,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiseaseType, LeafDetection } from "@/graphql/generated/graphql";
import { useState, useRef } from "react";
import { useSubmitCropPredictionFeedback } from "@/hooks/mutations";

export const PredictionDetailModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const prediction = data?.predictions || null;
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    isCorrect: null as boolean | null,
    actualDisease: "",
    comments: "",
  });
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { submitFeedback } = useSubmitCropPredictionFeedback();

  const isModalOpen = isOpen && type === "view-prediction-details";

  const getDiseaseColor = (disease: DiseaseType | undefined) => {
    switch (disease?.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "red_rust":
      case "red rust":
        return "bg-red-100 text-red-800 border-red-200";
      case "leaf_miner":
      case "leaf miner":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "anthracnose":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "early_blight":
      case "early blight":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "late_blight":
      case "late blight":
        return "bg-red-100 text-red-800 border-red-200";
      case "leaf_spot":
      case "leaf spot":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "leaf_beetle":
      case "leaf beetle":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "streak_virus":
      case "streak virus":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "leaf_blight":
      case "leaf blight":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(1)}%`;
  };

  const formatProcessingTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getDiseaseIcon = (disease: DiseaseType | undefined) => {
    switch (disease?.toLowerCase()) {
      case "healthy":
        return <CheckCircle className="h-4 w-4" />;
      case "red_rust":
      case "red rust":
      case "anthracnose":
      case "early_blight":
      case "early blight":
      case "late_blight":
      case "late blight":
      case "leaf_blight":
      case "leaf blight":
        return <Bug className="h-4 w-4" />;
      case "leaf_miner":
      case "leaf miner":
      case "leaf_beetle":
      case "leaf beetle":
        return <AlertTriangle className="h-4 w-4" />;
      case "leaf_spot":
      case "leaf spot":
      case "streak_virus":
      case "streak virus":
        return <Leaf className="h-4 w-4" />;
      default:
        return <Leaf className="h-4 w-4" />;
    }
  };

  const getSeverityLevel = (confidence: number) => {
    if (confidence >= 0.8) return { level: "High", color: "text-red-600" };
    if (confidence >= 0.6) return { level: "Medium", color: "text-yellow-600" };
    if (confidence >= 0.4) return { level: "Low", color: "text-blue-600" };
    return { level: "Very Low", color: "text-gray-600" };
  };

  const getRecommendations = (detections: LeafDetection[]) => {
    const diseases = detections
      .map((d) => d.predicted_disease?.toLowerCase())
      .filter((d) => d !== "healthy");
    const uniqueDiseases = [...new Set(diseases)];

    const recommendations = [];

    if (
      uniqueDiseases.includes("red_rust") ||
      uniqueDiseases.includes("red rust")
    ) {
      recommendations.push({
        title: "Red Rust Treatment",
        description:
          "Apply copper-based fungicide immediately. Remove affected leaves and improve air circulation.",
        urgency: "high",
        icon: <Bug className="h-5 w-5" />,
      });
    }

    if (
      uniqueDiseases.includes("leaf_miner") ||
      uniqueDiseases.includes("leaf miner")
    ) {
      recommendations.push({
        title: "Leaf Miner Control",
        description:
          "Use systemic insecticide and remove affected leaves. Monitor regularly for new infestations.",
        urgency: "medium",
        icon: <AlertTriangle className="h-5 w-5" />,
      });
    }

    if (
      uniqueDiseases.includes("leaf_spot") ||
      uniqueDiseases.includes("leaf spot")
    ) {
      recommendations.push({
        title: "Leaf Spot Treatment",
        description:
          "Apply fungicide and ensure proper spacing between plants for air circulation. Remove infected leaves.",
        urgency: "medium",
        icon: <Leaf className="h-5 w-5" />,
      });
    }

    if (
      uniqueDiseases.includes("leaf_beetle") ||
      uniqueDiseases.includes("leaf beetle")
    ) {
      recommendations.push({
        title: "Leaf Beetle Control",
        description:
          "Use insecticide treatment and inspect plants regularly. Remove beetles manually if possible.",
        urgency: "medium",
        icon: <Bug className="h-5 w-5" />,
      });
    }

    if (uniqueDiseases.length === 0) {
      recommendations.push({
        title: "Maintain Health",
        description:
          "Continue current care routine. Monitor regularly for early signs of disease.",
        urgency: "low",
        icon: <CheckCircle className="h-5 w-5" />,
      });
    }

    recommendations.push({
      title: "Follow-up Scan",
      description:
        "Schedule another AI scan in 7-10 days to monitor treatment effectiveness.",
      urgency: "medium",
      icon: <Camera className="h-5 w-5" />,
    });

    return recommendations;
  };

  const handleClose = () => {
    setShowFeedbackForm(false);
    setFeedbackData({ isCorrect: null, actualDisease: "", comments: "" });
    onClose();
  };

  const handleSubmitFeedback = async () => {
    try {
      // Get the most common predicted disease for default
      const diseaseFrequency: Record<string, number> = {};
      prediction?.leaf_detections?.forEach((detection) => {
        const disease = detection.predicted_disease;
        if (disease) {
          diseaseFrequency[disease] = (diseaseFrequency[disease] || 0) + 1;
        }
      });

      const mostCommonDisease =
        Object.entries(diseaseFrequency).sort(
          ([, a], [, b]) => b - a
        )[0]?.[0] || "";

      await submitFeedback({
        variables: {
          actualDisease:
            feedbackData.isCorrect === true
              ? (mostCommonDisease
                  .toUpperCase()
                  .split(" ")
                  .join("_") as DiseaseType)
              : (feedbackData.actualDisease
                  ?.toUpperCase()
                  .split(" ")
                  .join("_") as DiseaseType) || "",
          userFeedback: feedbackData.comments || "",
          predictionId: prediction?.id || "",
        },
      });

      // Handle success
      setShowFeedbackForm(false);
      setFeedbackData({ isCorrect: null, actualDisease: "", comments: "" });

      // You might want to refetch the prediction data or show a success message
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Handle error - show error message to user
    }
  };

  const getBoundingBoxStyle = (detection: LeafDetection, index: number) => {
    const [x1, y1, x2, y2] = detection.bbox;
    const colors = [
      "#ef4444",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#84cc16",
    ];
    const color = colors[index % colors.length];

    if (!imageRef.current || !imageLoaded) {
      // Return a basic style that doesn't hide the element while image is loading
      return {
        position: "absolute" as const,
        left: "0px",
        top: "0px",
        width: "0px",
        height: "0px",
        border: `2px solid ${color}`,
        backgroundColor: "transparent",
        opacity: 0,
      };
    }

    // Get the actual displayed image dimensions
    const img = imageRef.current;
    const scaleX = img.clientWidth / img.naturalWidth;
    const scaleY = img.clientHeight / img.naturalHeight;

    // Calculate scaled bounding box coordinates
    const scaledX1 = x1 * scaleX;
    const scaledY1 = y1 * scaleY;
    const scaledX2 = x2 * scaleX;
    const scaledY2 = y2 * scaleY;

    return {
      position: "absolute" as const,
      left: `${scaledX1}px`,
      top: `${scaledY1}px`,
      width: `${scaledX2 - scaledX1}px`,
      height: `${scaledY2 - scaledY1}px`,
      border: `2px solid ${color}`,
      backgroundColor: "transparent",
      boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.8)`,
      opacity: 1,
    };
  };

  if (!prediction) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="flex items-center justify-center w-full h-full p-4">
            <div
              className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden max-h-[95vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Camera className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        AI Disease Analysis Report
                      </h3>
                      <div className="flex items-center space-x-4 text-blue-100 text-sm mt-1">
                        <span className="flex items-center space-x-1">
                          <Brain className="h-4 w-4" />
                          <span>{prediction.model_used}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatProcessingTime(
                              prediction.processing_time_ms
                            )}
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{prediction.crop_type}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Left Column - Image Analysis */}
                  <div className="space-y-6">
                    {/* Analyzed Image */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                          <Camera className="h-5 w-5 mr-2" />
                          Analyzed Image
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            ref={imageRef}
                            onLoad={() => setImageLoaded(true)}
                            src={
                              prediction.image_path ||
                              "/api/placeholder/500/400"
                            }
                            alt="Crop analysis"
                            className="w-full h-80 object-contain bg-gray-200"
                          />

                          {/* Bounding Boxes Overlay */}
                          {prediction.leaf_detections?.map(
                            (detection, index) => {
                              const colors = [
                                "#ef4444",
                                "#3b82f6",
                                "#10b981",
                                "#f59e0b",
                                "#8b5cf6",
                                "#ec4899",
                                "#06b6d4",
                                "#84cc16",
                              ];
                              const color = colors[index % colors.length];

                              return (
                                <div
                                  key={detection.id}
                                  style={getBoundingBoxStyle(detection, index)}
                                >
                                  <div
                                    className="absolute -top-7 left-0 px-2 py-1 text-xs font-medium text-white rounded shadow-lg whitespace-nowrap z-10"
                                    style={{ backgroundColor: color }}
                                  >
                                    #{index + 1}:{" "}
                                    {detection.predicted_disease?.replace(
                                      /_/g,
                                      " "
                                    )}{" "}
                                    ({formatConfidence(detection.confidence)})
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>

                        {/* Legend */}
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-medium text-gray-700">
                            Detection Legend:
                          </h5>
                          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                            {prediction.leaf_detections?.map(
                              (detection, index) => {
                                const colors = [
                                  "#ef4444",
                                  "#3b82f6",
                                  "#10b981",
                                  "#f59e0b",
                                  "#8b5cf6",
                                  "#ec4899",
                                  "#06b6d4",
                                  "#84cc16",
                                ];
                                const color = colors[index % colors.length];

                                return (
                                  <div
                                    key={detection.id}
                                    className="flex items-center justify-between text-xs bg-gray-50 rounded p-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div
                                        className="w-3 h-3 rounded border"
                                        style={{ backgroundColor: color }}
                                      />
                                      <span className="font-medium text-gray-700">
                                        #{index + 1}:{" "}
                                        {detection.predicted_disease?.replace(
                                          /_/g,
                                          " "
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex space-x-2 text-xs text-gray-600">
                                      <span>
                                        Det:{" "}
                                        {formatConfidence(
                                          detection.detection_confidence
                                        )}
                                      </span>
                                      <span>
                                        Conf:{" "}
                                        {formatConfidence(detection.confidence)}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Processing Metrics */}
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          Processing Metrics
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-800">
                              {formatProcessingTime(
                                prediction.processing_time_ms
                              )}
                            </p>
                            <p className="text-sm text-blue-600">
                              Processing Time
                            </p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4 text-center">
                            <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-800">
                              {prediction.leaf_detections?.length || 0}
                            </p>
                            <p className="text-sm text-green-600">
                              Leaves Detected
                            </p>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-4 text-center">
                            <TrendingUp className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-yellow-800">
                              {formatConfidence(
                                (prediction.leaf_detections || [])?.reduce(
                                  (sum, det) => sum + det.detection_confidence,
                                  0
                                ) / (prediction.leaf_detections?.length || 1)
                              )}
                            </p>
                            <p className="text-sm text-yellow-600">
                              Avg Detection
                            </p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-purple-800">
                              {formatConfidence(
                                (prediction.leaf_detections || [])?.reduce(
                                  (sum, det) => sum + det.confidence,
                                  0
                                ) / (prediction.leaf_detections?.length || 1)
                              )}
                            </p>
                            <p className="text-sm text-purple-600">
                              Avg Confidence
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Detection Results */}
                  <div className="space-y-6">
                    {/* User Feedback Section */}
                    {prediction.feedback ? (
                      <div className="bg-white rounded-lg border border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <h4 className="text-lg font-medium text-gray-900 flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            User Feedback
                          </h4>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {prediction.feedback.actual_disease && (
                              <div className="flex items-start space-x-3">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 mb-1">
                                    Actual Disease Reported
                                  </h5>
                                  <span
                                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getDiseaseColor(
                                      prediction.feedback.actual_disease
                                    )}`}
                                  >
                                    {prediction.feedback.actual_disease?.replace(
                                      /_/g,
                                      " "
                                    )}
                                  </span>
                                </div>
                              </div>
                            )}

                            {prediction.feedback.user_feedback && (
                              <div className="flex items-start space-x-3">
                                <div className="bg-green-50 p-2 rounded-lg">
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 mb-1">
                                    User Comments
                                  </h5>
                                  <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3 border">
                                    {prediction.feedback.user_feedback}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <h4 className="text-lg font-medium text-gray-900 flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            Provide Feedback
                          </h4>
                        </div>
                        <div className="p-4">
                          {!showFeedbackForm ? (
                            <div className="text-center py-4">
                              <p className="text-gray-600 mb-4">
                                Help improve our AI model by providing feedback
                                on this prediction.
                              </p>
                              <Button
                                onClick={() => setShowFeedbackForm(true)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Add Feedback
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* Correctness Question */}
                              <div>
                                <label className="text-sm font-medium text-gray-900 mb-2 block">
                                  Was the AI prediction correct?
                                </label>
                                <div className="flex gap-3">
                                  <button
                                    onClick={() =>
                                      setFeedbackData({
                                        ...feedbackData,
                                        isCorrect: true,
                                        actualDisease: "",
                                      })
                                    }
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                      feedbackData.isCorrect === true
                                        ? "bg-green-100 text-green-800 border-2 border-green-300"
                                        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                                    }`}
                                  >
                                    <CheckCircle className="h-4 w-4 inline mr-1" />
                                    Yes, correct
                                  </button>
                                  <button
                                    onClick={() =>
                                      setFeedbackData({
                                        ...feedbackData,
                                        isCorrect: false,
                                      })
                                    }
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                      feedbackData.isCorrect === false
                                        ? "bg-red-100 text-red-800 border-2 border-red-300"
                                        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                                    }`}
                                  >
                                    <X className="h-4 w-4 inline mr-1" />
                                    No, incorrect
                                  </button>
                                </div>
                              </div>

                              {/* Actual Disease Selection - only show if incorrect */}
                              {feedbackData.isCorrect === false && (
                                <div>
                                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                                    What is the actual disease?
                                  </label>
                                  <select
                                    value={feedbackData.actualDisease}
                                    onChange={(e) =>
                                      setFeedbackData({
                                        ...feedbackData,
                                        actualDisease: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="">
                                      Select actual disease
                                    </option>
                                    <option value="HEALTHY">Healthy</option>
                                    <option value="RED_RUST">Red Rust</option>
                                    <option value="LEAF_MINER">
                                      Leaf Miner
                                    </option>
                                    <option value="ANTHRACNOSE">
                                      Anthracnose
                                    </option>
                                    <option value="EARLY_BLIGHT">
                                      Early Blight
                                    </option>
                                    <option value="LATE_BLIGHT">
                                      Late Blight
                                    </option>
                                    <option value="LEAF_SPOT">Leaf Spot</option>
                                    <option value="LEAF_BEETLE">
                                      Leaf Beetle
                                    </option>
                                    <option value="STREAK_VIRUS">
                                      Streak Virus
                                    </option>
                                    <option value="LEAF_BLIGHT">
                                      Leaf Blight
                                    </option>
                                  </select>
                                </div>
                              )}

                              {/* Comments */}
                              <div>
                                <label className="text-sm font-medium text-gray-900 mb-2 block">
                                  Additional Comments (Optional)
                                </label>
                                <textarea
                                  value={feedbackData.comments}
                                  onChange={(e) =>
                                    setFeedbackData({
                                      ...feedbackData,
                                      comments: e.target.value,
                                    })
                                  }
                                  placeholder="Any additional feedback or observations..."
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-3 pt-2">
                                <Button
                                  onClick={handleSubmitFeedback}
                                  disabled={
                                    feedbackData.isCorrect === null ||
                                    (feedbackData.isCorrect === false &&
                                      !feedbackData.actualDisease)
                                  }
                                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Submit Feedback
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowFeedbackForm(false);
                                    setFeedbackData({
                                      isCorrect: null,
                                      actualDisease: "",
                                      comments: "",
                                    });
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Detection Results */}
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                          <Leaf className="h-5 w-5 mr-2" />
                          Detection Results
                        </h4>
                      </div>
                      <div className="p-4 max-h-80 overflow-y-auto space-y-4">
                        {prediction.leaf_detections?.map((detection, index) => {
                          const severity = getSeverityLevel(
                            detection.confidence
                          );

                          return (
                            <div
                              key={detection.id}
                              className="border rounded-lg p-4 bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  {getDiseaseIcon(
                                    detection?.predicted_disease || undefined
                                  )}
                                  <h5 className="font-medium text-gray-900">
                                    Detection #{index + 1}
                                  </h5>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getDiseaseColor(
                                      detection?.predicted_disease || undefined
                                    )}`}
                                  >
                                    {detection.predicted_disease?.replace(
                                      /_/g,
                                      " "
                                    )}
                                  </span>
                                  <span
                                    className={`text-xs font-medium ${severity.color}`}
                                  >
                                    {severity.level}
                                  </span>
                                </div>
                              </div>

                              {/* Confidence Bars */}
                              <div className="space-y-3 mb-4">
                                <div>
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Detection Confidence</span>
                                    <span>
                                      {formatConfidence(
                                        detection.detection_confidence
                                      )}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                      style={{
                                        width: `${
                                          detection.detection_confidence * 100
                                        }%`,
                                      }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Disease Confidence</span>
                                    <span>
                                      {formatConfidence(detection.confidence)}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                      style={{
                                        width: `${detection.confidence * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Top Predictions */}
                              <div>
                                <p className="text-xs text-gray-500 mb-2 font-medium">
                                  Alternative Predictions
                                </p>
                                <div className="space-y-1">
                                  {detection.top3_predictions?.slice(1).map(
                                    // @ts-expect-error error
                                    (pred, predIndex) => (
                                      <div
                                        key={predIndex}
                                        className="flex items-center justify-between text-xs"
                                      >
                                        <span className="text-gray-600 capitalize">
                                          {pred.class}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                          {formatConfidence(pred.confidence)}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Recommendations
                        </h4>
                      </div>
                      <div className="p-4 space-y-3">
                        {getRecommendations(
                          prediction.leaf_detections || []
                        ).map((rec, index) => (
                          <div
                            key={index}
                            className={`border-l-4 pl-4 py-3 ${
                              rec.urgency === "high"
                                ? "border-red-500 bg-red-50"
                                : rec.urgency === "medium"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-green-500 bg-green-50"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`mt-0.5 ${
                                  rec.urgency === "high"
                                    ? "text-red-600"
                                    : rec.urgency === "medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                              >
                                {rec.icon}
                              </div>
                              <div className="flex-1">
                                <h5
                                  className={`font-medium ${
                                    rec.urgency === "high"
                                      ? "text-red-800"
                                      : rec.urgency === "medium"
                                      ? "text-yellow-800"
                                      : "text-green-800"
                                  }`}
                                >
                                  {rec.title}
                                </h5>
                                <p
                                  className={`text-sm mt-1 ${
                                    rec.urgency === "high"
                                      ? "text-red-700"
                                      : rec.urgency === "medium"
                                      ? "text-yellow-700"
                                      : "text-green-700"
                                  }`}
                                >
                                  {rec.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Analysis ID: {prediction.id}
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleClose}>
                      Close
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PredictionDetailModal;
