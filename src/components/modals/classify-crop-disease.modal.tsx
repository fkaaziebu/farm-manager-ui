"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import {
  Upload,
  Camera,
  X,
  AlertTriangle,
  CheckCircle,
  Loader2,
  MessageSquare,
  Send,
  ThumbsUp,
  ThumbsDown,
  Info,
  Lightbulb,
  Bug,
  Leaf,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMcpRequest } from "@/hooks/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useSubmitCropPredictionFeedback } from "@/hooks/mutations";
import { DiseaseType } from "@/graphql/generated/graphql";

// Types
interface DiseaseClassification {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "Critical";
}

interface ClassificationResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  treatment: string[];
  prevention: string[];
  affectedAreas?: string[];
  id: string;
  alternativeDiseases?: DiseaseClassification[];
}

// Form schemas
const classificationFormSchema = z.object({
  imageFile: z.any().optional(),
  imageUrl: z.string().optional(),
  userPrompt: z.string().optional(),
  cropType: z.string().optional(),
});

const feedbackFormSchema = z.object({
  isCorrect: z.boolean().default(true),
  actualDisease: z.string().optional(),
  comments: z.string().optional(),
  userRating: z.number().min(1).max(5).default(5),
});

// Mock diseases list for feedback
const COMMON_DISEASES = [
  "Anthracnose",
  "Gummosis",
  "Healthy",
  "Leaf Miner",
  "Red Rust",
  "Bacterial Blight",
  "Brown Spot",
  "Green Mite",
  "Mosaic",
  "Fall Armyworm",
  "Grasshopper",
  "Leaf Beetle",
  "Leaf Blight",
  "Leaf Spot",
  "Streak Virus",
  "Leaf Curl",
  "Septoria Leaf Spot",
  "Verticillium Wilt",
];

export const CropDiseaseClassificationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();

  const { getMcpRequest } = useMcpRequest();
  const { submitFeedback, loading: feedbackSubmissionLoading } =
    useSubmitCropPredictionFeedback();

  // States
  const [activeTab, setActiveTab] = useState("classify");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResult, setClassificationResult] =
    useState<ClassificationResult | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const isModalOpen = isOpen && type === "crop-disease-classification";

  const classificationForm = useForm<z.infer<typeof classificationFormSchema>>({
    resolver: zodResolver(classificationFormSchema),
    defaultValues: {
      imageFile: undefined,
      imageUrl: "",
      userPrompt: "",
      cropType: "",
    },
  });

  function parseAgentResponse(agentResponse: string): ClassificationResult {
    const extractJSON = (str: string) => {
      // Find the first opening brace
      const startIndex = str.indexOf("{");
      if (startIndex === -1) return null;

      // Count braces to find the matching closing brace
      let braceCount = 0;
      let endIndex = -1;

      for (let i = startIndex; i < str.length; i++) {
        if (str[i] === "{") {
          braceCount++;
        } else if (str[i] === "}") {
          braceCount--;
          if (braceCount === 0) {
            endIndex = i;
            break;
          }
        }
      }

      if (endIndex === -1) return null;

      const jsonStr = str.substring(startIndex, endIndex + 1);

      try {
        // Remove comments (optional) and parse JSON
        const jsonWithoutComments = jsonStr.replace(/\/\/.*$/gm, "");
        return JSON.parse(jsonWithoutComments);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return null;
      }
    };

    try {
      const parsed = extractJSON(agentResponse);
      console.log("parsed", parsed);

      // Validate and format the result according to interface
      const result: ClassificationResult = {
        disease: parsed.disease || "Unknown",
        confidence:
          typeof parsed.confidence === "number"
            ? Number((parsed.confidence * 100).toFixed(2))
            : 0,
        severity: ["Low", "Medium", "High", "Critical"].includes(
          parsed.severity
        )
          ? parsed.severity
          : "Medium",
        description: parsed.description || "No description available",
        treatment: Array.isArray(parsed.treatment) ? parsed.treatment : [],
        prevention: Array.isArray(parsed.prevention) ? parsed.prevention : [],
        affectedAreas: Array.isArray(parsed.affectedAreas)
          ? parsed.affectedAreas
          : undefined,
        id: parsed.id || "",
        alternativeDiseases: Array.isArray(parsed.alternativeDiseases)
          ? parsed.alternativeDiseases.map((alt: DiseaseClassification) => ({
              disease: alt.disease || "Unknown",
              confidence:
                typeof alt.confidence === "number"
                  ? Number((alt.confidence * 100).toFixed(2))
                  : 0,
              severity: ["Low", "Medium", "High", "Critical"].includes(
                alt.severity
              )
                ? alt.severity
                : "Medium",
            }))
          : undefined,
      };

      return result;
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error}`);
    }
  }

  const feedbackForm = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      isCorrect: true,
      actualDisease: "",
      comments: "",
      userRating: 5,
    },
  });

  // Reset forms when modal opens
  useEffect(() => {
    if (isModalOpen) {
      resetModal();
    }
  }, [isModalOpen]);

  const resetModal = () => {
    setActiveTab("classify");
    setSelectedImage(null);
    setImagePreview(null);
    setImageUrl(null);
    setClassificationResult(null);
    setUploadProgress(0);
    setUploadComplete(false);
    classificationForm.reset();
    feedbackForm.reset();
  };

  // Upload image automatically
  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = sessionStorage.getItem("token") || "";

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await axios.post(
        "https://uzuznia502.execute-api.eu-north-1.amazonaws.com/v1/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Content-Type":
            //   "multipart/form-data; boundary=--------------------------878396315719284920595894",
            Authorization: `Bearer ${token}`,
            // Accept: "*/*",
            // Host: "uzuznia502.execute-api.eu-north-1.amazonaws.com",
          },
        }
      );

      clearInterval(progressInterval);
      console.log("Upload response:", response);
      // Expecting the uploaded image URL in response.data.url
      const data = response.data;
      if (!data.path) {
        setUploadProgress(0);
        setUploadComplete(false);
        throw new Error("No image URL returned from upload");
      }

      setUploadProgress(100);
      setImageUrl(data.path);
      classificationForm.setValue("imageUrl", data.path);
      // onOpen("notification", {
      //   notificationType: "success",
      //   notificationMessage: "Image uploaded successfully!",
      // });
      setUploadComplete(true);

      return data.path;
    } catch (error) {
      console.error("Upload error:", error);
      // Only reset progress if upload failed
      setUploadComplete(false);
      setUploadProgress(0);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: "Failed to upload image. Please try again.",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection with auto-upload
  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("Image size should be less than 10MB");
        return;
      }

      setSelectedImage(file);
      classificationForm.setValue("imageFile", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Auto-upload the image
      try {
        await uploadImage(file);
      } catch (error) {
        // Error handling is done in uploadImage function
        console.error("Auto-upload failed:", error);
      }
    },
    [classificationForm]
  );

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Classification form submission
  const onClassificationSubmit = async (
    data: z.infer<typeof classificationFormSchema>
  ) => {
    if (!selectedImage || !imageUrl) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    setIsClassifying(true);

    try {
      const submitImage = `https://uzuznia502.execute-api.eu-north-1.amazonaws.com/v1/images/${imageUrl}`;
      const farmTag = sessionStorage.getItem("farm_Tag");

      const mcpRequestQuery = `using autorization token: Bearer ${
        sessionStorage.getItem("token") || ""
      } for farmTag: "${farmTag} and  classify leaf disease tool,  predict disease class for  ${
        data.cropType
      } crop using the leaf image Url "${submitImage}", and  user userPrompt: "${
        data.userPrompt || ""
      } and provide the result in this format:  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  treatment: string[];
  prevention: string[];
  affectedAreas?: string[];
  id: string;
  alternativeDiseases?: Array<{disease: string; confidence: number; severity: "Low" | "Medium" | "High" | "Critical";}>;} the id is necessary for other operatrions so do well to provide it as part of the response. Also include the top 3 disease classifications in alternativeDiseases array with their confidence scores.`;

      const result = await getMcpRequest({
        variables: {
          query: mcpRequestQuery,
        },
      });

      if (result.error) {
        throw new Error(result?.errors?.[0].message);
      }

      console.log("result", result);
      // @ts-expect-error err
      setClassificationResult(parseAgentResponse(result?.data?.mcpRequest));
      console.log(
        "parsedResult",
        parseAgentResponse(result?.data?.mcpRequest || "")
      );

      setActiveTab("results");
      // onOpen("notification", {
      //   notificationType: "success",
      //   notificationMessage: "Classification completed successfully!",
      // });
    } catch (error) {
      console.error("Classification error:", error);
      toast("failed to aclassify leaf, try again");
      // onOpen("notification", {
      //   notificationType: "error",
      //   notificationMessage: "Failed to classify image. Please try again.",
      // });
    } finally {
      setIsClassifying(false);
    }
  };

  // Feedback form submission
  const onFeedbackSubmit = async (data: z.infer<typeof feedbackFormSchema>) => {
    if (!classificationResult) return;

    try {
      // Replace with your actual feedback endpoint
      const response = await submitFeedback({
        variables: {
          actualDisease:
            data.isCorrect === true
              ? (classificationResult.disease
                  .toUpperCase()
                  .split(" ")
                  .join("_") as DiseaseType)
              : (data.actualDisease
                  ?.toUpperCase()
                  .split(" ")
                  .join("_") as DiseaseType) || "",
          userFeedback: data.comments || "",
          predictionId: classificationResult.id,
        },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage:
          "Thank you for your feedback! It helps improve our model.",
      });
    } catch (error) {
      console.error("Feedback error:", error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Failed to submit feedback. ${error}`,
      });
    }
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="backdrop-blur-sm bg-gray-400/60 fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => onClose()}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-green-50 p-4 border-b w-full  border-green-200">
                <div className="text-xl font-semibold text-green-800 flex items-center justify-center w-full">
                  <Bug className="h-5 w-5 mr-2 text-green-600" />
                  Crop Disease Classification
                </div>
                <div className="text-sm text-green-700 flex items-center justify-center mt-1">
                  Upload an image to identify crop diseases and get treatment
                  recommendations
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full flex flex-col flex-1 overflow-hidden"
              >
                <div className="border-b px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="classify" className="text-sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Classify
                    </TabsTrigger>
                    <TabsTrigger
                      value="results"
                      className="text-sm"
                      disabled={!classificationResult}
                    >
                      <Leaf className="h-4 w-4 mr-2" />
                      Results
                    </TabsTrigger>
                    <TabsTrigger
                      value="feedback"
                      className="text-sm"
                      disabled={!classificationResult}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Feedback
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  <TabsContent value="classify" className="h-full">
                    <Form {...classificationForm}>
                      <form
                        id="classification-form"
                        onSubmit={classificationForm.handleSubmit(
                          onClassificationSubmit
                        )}
                        className="space-y-6"
                      >
                        {!selectedImage ? (
                          <div className="space-y-4">
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Upload Crop Image
                              </h3>
                              <p className="text-sm text-gray-500 mb-4">
                                Drag and drop an image here, or click to select
                                a file
                              </p>
                              <div className="flex justify-center gap-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Choose File
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    cameraInputRef.current?.click();
                                  }}
                                >
                                  <Camera className="h-4 w-4 mr-2" />
                                  Take Photo
                                </Button>
                              </div>
                            </div>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(file);
                              }}
                            />

                            <input
                              ref={cameraInputRef}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(file);
                              }}
                            />

                            <Alert className="bg-blue-50 border-blue-200">
                              <Info className="h-4 w-4 text-blue-600" />
                              <AlertDescription className="text-blue-700 text-sm">
                                <strong>Tips for better classification:</strong>
                                <br />
                                • Take clear, well-lit photos
                                <br />
                                • Focus on the affected area
                                <br />
                                • Include multiple angles if possible
                                <br />• Avoid blurry or dark images
                              </AlertDescription>
                            </Alert>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <div className="relative">
                                  <img
                                    src={imagePreview || undefined}
                                    alt="Selected crop"
                                    className="w-full h-64 object-cover rounded-lg border"
                                  />

                                  {/* Upload Progress Overlay */}
                                  {isUploading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                      <div className="bg-white rounded-lg p-4 min-w-[200px]">
                                        <div className="flex items-center justify-center mb-2">
                                          <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                                          <span className="text-sm font-medium text-gray-700">
                                            Uploading... {uploadProgress}%
                                          </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{
                                              width: `${uploadProgress}%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Upload Success Indicator */}
                                  {uploadComplete && !isUploading && (
                                    <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                                      <Check className="h-4 w-4" />
                                    </div>
                                  )}

                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                      setSelectedImage(null);
                                      setImagePreview(null);
                                      setImageUrl(null);
                                      setUploadComplete(false);
                                      setUploadProgress(0);
                                      classificationForm.setValue(
                                        "imageFile",
                                        undefined
                                      );
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Upload Status */}
                                {selectedImage && (
                                  <div className="mt-2 text-sm">
                                    {isUploading ? (
                                      <div className="flex items-center text-blue-600">
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Uploading image...
                                      </div>
                                    ) : uploadComplete ? (
                                      <div className="flex items-center text-green-600">
                                        <Check className="h-4 w-4 mr-2" />
                                        Image uploaded successfully
                                      </div>
                                    ) : (
                                      <div className="flex items-center text-gray-600">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Ready to upload
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-4">
                                <FormField
                                  control={classificationForm.control}
                                  name="userPrompt"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Additional Information (Optional)
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Describe any symptoms you've noticed, affected area, or other relevant details..."
                                          rows={8}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Provide any additional context to
                                        improve classification accuracy
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={classificationForm.control}
                                  name="cropType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Select Crop Type</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Choose crop type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="Rice">
                                            Rice
                                          </SelectItem>
                                          <SelectItem value="Maize">
                                            Maize
                                          </SelectItem>
                                          <SelectItem value="Wheat">
                                            Wheat
                                          </SelectItem>
                                          <SelectItem value="Soybean">
                                            Soybean
                                          </SelectItem>
                                          <SelectItem value="Cassava">
                                            Cassava
                                          </SelectItem>
                                          <SelectItem value="Yam">
                                            Yam
                                          </SelectItem>
                                          <SelectItem value="Tomato">
                                            Tomato
                                          </SelectItem>
                                          <SelectItem value="Cashew">
                                            Cashew
                                          </SelectItem>
                                          <SelectItem value="Other">
                                            Other
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormDescription>
                                        Select the crop type for more accurate
                                        classification
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="results" className="h-full">
                    {classificationResult && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Image */}
                          <div>
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Analyzed crop"
                                className="w-full h-64 object-cover rounded-lg border"
                              />
                            )}
                          </div>

                          {/* Results */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xl font-semibold text-gray-900">
                                {classificationResult.disease}
                              </h4>
                              <Badge
                                className={`${getSeverityColor(
                                  classificationResult.severity
                                )} border`}
                              >
                                {classificationResult.severity} Severity
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                Confidence:
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{
                                    width: `${classificationResult.confidence}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {classificationResult.confidence}%
                              </span>
                            </div>

                            <p className="text-sm text-gray-600">
                              {classificationResult.description}
                            </p>

                            {classificationResult.affectedAreas && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-900 mb-2">
                                  Affected Areas:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {classificationResult.affectedAreas.map(
                                    (area, index) => (
                                      <Badge key={index} variant="outline">
                                        {area}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Alternative Disease Classifications */}
                            {classificationResult.alternativeDiseases &&
                              classificationResult.alternativeDiseases.length >
                                0 && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                                    Alternative Classifications:
                                  </h5>
                                  <div className="space-y-2">
                                    {classificationResult.alternativeDiseases.map(
                                      (altDisease, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">
                                              {altDisease.disease}
                                            </span>
                                            <Badge
                                              variant="outline"
                                              className={`text-xs ${getSeverityColor(
                                                altDisease.severity
                                              )}`}
                                            >
                                              {altDisease.severity}
                                            </Badge>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                              <div
                                                className="bg-blue-500 h-1.5 rounded-full"
                                                style={{
                                                  width: `${altDisease.confidence}%`,
                                                }}
                                              />
                                            </div>
                                            <span className="text-xs font-medium text-gray-600 min-w-[35px]">
                                              {altDisease.confidence}%
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>

                        {/* Treatment and Prevention */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Treatment */}
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h5 className="text-base font-medium text-orange-800 mb-3 flex items-center">
                              <Lightbulb className="h-4 w-4 mr-2" />
                              Treatment Recommendations
                            </h5>
                            <ul className="space-y-2">
                              {classificationResult.treatment.map(
                                (item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-orange-700">
                                      {item}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          {/* Prevention */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="text-base font-medium text-blue-800 mb-3 flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Prevention Tips
                            </h5>
                            <ul className="space-y-2">
                              {classificationResult.prevention.map(
                                (item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-blue-700">
                                      {item}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="feedback" className="h-full">
                    <Form {...feedbackForm}>
                      <form
                        id="feedback-form"
                        onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Help Improve Our Model
                          </h3>
                          <p className="text-sm text-gray-600">
                            Your feedback helps us improve disease
                            classification accuracy
                          </p>
                        </div>

                        {/* Accuracy Question */}
                        <FormField
                          control={feedbackForm.control}
                          name="isCorrect"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Was our classification accurate?
                              </FormLabel>
                              <div className="mt-3 flex gap-4">
                                <Button
                                  type="button"
                                  variant={field.value ? "default" : "outline"}
                                  onClick={() => field.onChange(true)}
                                  className="flex items-center gap-2"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  Yes, it&apos;s correct
                                </Button>
                                <Button
                                  type="button"
                                  variant={!field.value ? "default" : "outline"}
                                  onClick={() => field.onChange(false)}
                                  className="flex items-center gap-2"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                  No, it&apos;s incorrect
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Correct Disease */}
                        {!feedbackForm.watch("isCorrect") && (
                          <FormField
                            control={feedbackForm.control}
                            name="actualDisease"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  What disease do you think this is?
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select the correct disease" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {COMMON_DISEASES.map((disease) => (
                                      <SelectItem key={disease} value={disease}>
                                        {disease}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Comments */}
                        <FormField
                          control={feedbackForm.control}
                          name="comments"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Additional Comments (Optional)
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any additional feedback or observations..."
                                  rows={3}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Rating */}
                        <FormField
                          control={feedbackForm.control}
                          name="userRating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rate the overall experience</FormLabel>
                              <div className="mt-2 flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <Button
                                    key={rating}
                                    type="button"
                                    variant={
                                      field.value === rating
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => field.onChange(rating)}
                                  >
                                    {rating}★
                                  </Button>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </TabsContent>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </Button>

                  {activeTab === "classify" && (
                    <Button
                      type="submit"
                      form="classification-form"
                      className="bg-green-600 text-white hover:bg-green-700"
                      disabled={
                        isClassifying ||
                        isUploading ||
                        !selectedImage ||
                        !uploadComplete
                      }
                    >
                      {isClassifying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Classify Disease
                        </>
                      )}
                    </Button>
                  )}

                  {activeTab === "results" && (
                    <Button
                      type="button"
                      onClick={() => setActiveTab("feedback")}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Provide Feedback
                    </Button>
                  )}

                  {activeTab === "feedback" && (
                    <Button
                      type="submit"
                      form="feedback-form"
                      className="bg-green-600 text-white hover:bg-green-700"
                      disabled={feedbackSubmissionLoading}
                    >
                      {feedbackSubmissionLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CropDiseaseClassificationModal;
