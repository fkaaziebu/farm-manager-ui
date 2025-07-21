"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Check,
  X,
  Chrome,
  Wheat,
  User,
  Mail,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
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

export default function ConsentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  // Extract user data from URL parameters
  const email = searchParams.get("email");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  // Validate required parameters
  useEffect(() => {
    if (!email || !firstName || !lastName) {
      setError("Missing required user information. Please try again.");
    }
  }, [email, firstName, lastName]);

  const handleAcceptConsent = async () => {
    if (!email || !firstName || !lastName) {
      setError("Missing required user information.");
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: Implement API call to create user account with Google OAuth
      const response = await fetch("/api/auth/oauth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          provider: "google",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      // Redirect to OAuth login page with access token
      if (data.access_token) {
        router.push(`/oauth/${data.access_token}`);
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      // @ts-expect-error ignore
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineConsent = () => {
    // Redirect back to login page
    router.push("/auth/admin/login");
  };

  // Error state for missing parameters
  if (!email || !firstName || !lastName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
        <BackgroundPattern />

        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200/50">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-red-800 mb-2">
                    Authentication Error
                  </h2>
                  <p className="text-red-600">
                    Required user information is missing. Please try logging in
                    again.
                  </p>
                </div>

                <Button
                  onClick={() => router.push("/auth/admin/login")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
      <BackgroundPattern />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-lg">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50">
            {/* Header */}
            <div className="text-center mb-8">
              <Logo />
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Complete Your Registration
              </h2>
              <p className="text-green-600">
                Create your Intelligent Farm Manager account using Google
              </p>
            </div>

            {/* Google Account Info */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Chrome className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  Google Account
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">
                    {firstName} {lastName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">{email}</span>
                </div>
              </div>
            </div>

            {/* Permissions & Benefits */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  By creating an account, you&apos;ll get access to:
                </h3>
                <div className="space-y-3">
                  {[
                    "Complete farm management dashboard",
                    "Real-time analytics and insights",
                    "Multi-user collaboration tools",
                    "AI-powered farming recommendations",
                    "Secure data storage and backup",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-amber-800 text-sm">
                      <strong>Privacy Notice:</strong> We&apos;ll only use your
                      Google account information to create and secure your farm
                      management account. Your data remains private and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAcceptConsent}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Create Account & Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <Button
                onClick={handleDeclineConsent}
                disabled={isLoading}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel & Go Back
              </Button>
            </div>

            {/* Terms & Privacy */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-green-600 hover:text-green-500 font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-green-600 hover:text-green-500 font-medium"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
