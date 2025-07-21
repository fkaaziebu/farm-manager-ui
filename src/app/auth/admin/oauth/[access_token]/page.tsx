"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  Wheat,
  Chrome,
  ArrowRight,
  Loader2,
  Shield,
  Home,
} from "lucide-react";

// Background Pattern Component
const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
  </div>
);

// Logo Component
const Logo = () => (
  <div className="flex items-center justify-center gap-3 mb-8">
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg">
      <Wheat className="w-6 h-6 text-white" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-green-800 font-semibold text-lg leading-tight">
        Intelligent Farm
      </h1>
      <span className="text-green-600 font-medium text-sm -mt-0.5">
        Manager
      </span>
    </div>
  </div>
);

// Loading State Component
const LoadingState = () => (
  <div className="text-center space-y-6">
    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Completing Your Login
      </h2>
      <p className="text-green-600">
        Please wait while we securely log you in with Google...
      </p>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-center gap-3">
        <Chrome className="w-5 h-5 text-blue-600" />
        <span className="text-blue-800 text-sm font-medium">
          Authenticating with Google OAuth
        </span>
      </div>
    </div>
  </div>
);

// Success State Component
const SuccessState = ({ onContinue }: { onContinue: () => void }) => (
  <div className="text-center space-y-6">
    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
      <CheckCircle2 className="w-8 h-8 text-green-600" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Login Successful!
      </h2>
      <p className="text-green-600">
        You have been successfully authenticated with Google. Welcome to your
        farm dashboard!
      </p>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-center gap-3">
        <Shield className="w-5 h-5 text-green-600" />
        <span className="text-green-800 text-sm font-medium">
          Your session is now secure and active
        </span>
      </div>
    </div>

    <Button
      onClick={onContinue}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
    >
      <Home className="w-4 h-4 mr-2" />
      Go to Dashboard
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </div>
);

// Error State Component
const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="text-center space-y-6">
    <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto">
      <AlertCircle className="w-8 h-8 text-red-600" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-red-800 mb-2">
        Authentication Failed
      </h2>
      <p className="text-red-600 mb-4">
        We encountered an issue while logging you in with Google.
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    </div>

    <div className="space-y-3">
      <Button
        onClick={onRetry}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
      >
        Try Again
      </Button>

      <Button
        onClick={() => (window.location.href = "/auth/admin/login")}
        variant="outline"
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6"
      >
        Back to Login
      </Button>
    </div>
  </div>
);

export default function OAuthRedirectPage() {
  const router = useRouter();
  const params = useParams();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [error, setError] = useState<string>();
  const [retryCount, setRetryCount] = useState(0);

  // Extract access token from URL parameters
  const accessToken = params.access_token as string;

  const processOAuthLogin = async (token: string) => {
    try {
      setStatus("loading");
      setError(undefined);

      // TODO: Implement API call to complete OAuth login
      const response = await fetch("/api/auth/oauth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          access_token: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Store authentication data
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role || "admin");
        sessionStorage.setItem("id", data.id);
      }

      setStatus("success");

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        router.push("/farms");
      }, 2000);
    } catch (error) {
      console.error("OAuth login error:", error);
      setError(
        // @ts-expect-error ignore
        error.message || "An unexpected error occurred during authentication",
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid access token. Please try logging in again.");
      setStatus("error");
      return;
    }

    // Process the OAuth login
    processOAuthLogin(accessToken);
  }, [accessToken]);

  const handleRetry = () => {
    if (retryCount < 3 && accessToken) {
      setRetryCount((prev) => prev + 1);
      processOAuthLogin(accessToken);
    } else {
      router.push("/auth/admin/login");
    }
  };

  const handleContinue = () => {
    router.push("/farms");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
      <BackgroundPattern />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50">
            {/* Header */}
            <div className="text-center mb-8">
              <Logo />
            </div>

            {/* Dynamic Content Based on Status */}
            {status === "loading" && <LoadingState />}
            {status === "success" && (
              <SuccessState onContinue={handleContinue} />
            )}
            {status === "error" && (
              <ErrorState
                error={error || "Unknown error occurred"}
                onRetry={handleRetry}
              />
            )}

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                Secure authentication powered by Google OAuth 2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
