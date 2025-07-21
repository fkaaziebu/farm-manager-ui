"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Lock,
  Wheat,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Shield,
  Check,
} from "lucide-react";

type ResetFormInput = {
  password: string;
  confirmPassword: string;
};

// Background Pattern Component
const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
  </div>
);

// Success State Component
const SuccessState = ({ onGoToLogin }: { onGoToLogin: () => void }) => (
  <div className="text-center space-y-6">
    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
      <CheckCircle2 className="w-8 h-8 text-green-600" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Password Reset Successful!
      </h2>
      <p className="text-green-600">
        Your password has been successfully updated. You can now log in with
        your new password.
      </p>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-green-800">
        <Shield className="w-5 h-5" />
        <p className="text-sm font-medium">
          Your account is now secure with the new password.
        </p>
      </div>
    </div>

    <Button
      onClick={onGoToLogin}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
    >
      Continue to Login
    </Button>
  </div>
);

export default function AuthResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormInput>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2) return { score, label: "Weak", color: "text-red-600" };
    if (score < 4) return { score, label: "Medium", color: "text-yellow-600" };
    return { score, label: "Strong", color: "text-green-600" };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit: SubmitHandler<ResetFormInput> = async (data) => {
    console.log(data);
    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: Implement actual password reset API call
      if (!token) {
        throw new Error("Invalid or expired reset token");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (error) {
      // @ts-expect-error ignore
      setError(error.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push("/auth/admin/login");
  };

  // Check if token is missing
  if (!token) {
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
                    Invalid Reset Link
                  </h2>
                  <p className="text-red-600">
                    This password reset link is invalid or has expired. Please
                    request a new one.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
                  >
                    <Link href="/auth/admin/request-password-reset">
                      Request New Reset Link
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-green-300 text-green-700 hover:bg-green-50 py-6"
                  >
                    <Link href="/auth/admin/login">Back to Login</Link>
                  </Button>
                </div>
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
                  Set New Password
                </h2>
                <p className="text-green-600">
                  Choose a strong password to secure your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className={`pl-10 pr-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.score < 2
                                ? "bg-red-500"
                                : passwordStrength.score < 4
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${passwordStrength.color}`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Use uppercase, lowercase, numbers, and special
                        characters
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Please confirm your password",
                        },
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className={`pl-10 pr-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {watch("confirmPassword") &&
                    watch("confirmPassword") === password && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Check className="w-4 h-4" />
                        Passwords match
                      </div>
                    )}
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword.message}
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
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Update Password
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
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50">
              <SuccessState onGoToLogin={handleGoToLogin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
