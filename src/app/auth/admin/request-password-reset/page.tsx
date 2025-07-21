"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Mail,
  Wheat,
  AlertCircle,
  CheckCircle2,
  Send,
} from "lucide-react";

type ResetFormInput = {
  email: string;
};

// Background Pattern Component
const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
  </div>
);

// Success State Component
const SuccessState = ({
  email,
  onBackToLogin,
}: {
  email: string;
  onBackToLogin: () => void;
}) => (
  <div className="text-center space-y-6">
    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
      <CheckCircle2 className="w-8 h-8 text-green-600" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Check Your Email
      </h2>
      <p className="text-green-600 mb-4">
        We&apos;ve sent a password reset link to:
      </p>
      <p className="font-medium text-green-800 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
        {email}
      </p>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <p className="text-amber-800 text-sm">
        <strong>Didn&apos;t receive the email?</strong> Check your spam folder
        or contact support if the issue persists.
      </p>
    </div>

    <div className="space-y-3">
      <Button
        onClick={onBackToLogin}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
      >
        Back to Login
      </Button>

      <Button
        variant="outline"
        className="w-full border-green-300 text-green-700 hover:bg-green-50 py-6"
        onClick={() => window.location.reload()}
      >
        Send Another Email
      </Button>
    </div>
  </div>
);

export default function AuthRequestPasswordReset() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormInput>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ResetFormInput> = async (data) => {
    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: Implement actual password reset API call
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      setError(`Failed to send reset email. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/auth/admin/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
      <BackgroundPattern />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50">
              {/* Header */}
              <div className="text-center mb-8">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-6">
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

                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Reset Your Password
                </h2>
                <p className="text-green-600">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`pl-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Button
                  asChild
                  variant="ghost"
                  className="text-green-700 hover:text-green-800 hover:bg-green-50"
                >
                  <Link
                    href="/auth/admin/login"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </Button>
              </div>

              {/* Help Text */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Having trouble? Contact our{" "}
                  <a
                    href="/support"
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    support team
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50">
              <SuccessState
                email={submittedEmail}
                onBackToLogin={handleBackToLogin}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
