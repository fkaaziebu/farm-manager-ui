import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { classname } from "@/components/common";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Check,
} from "lucide-react";

type RegisterFormInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormInput>;
  onSubmit: (
    data: RegisterFormInput,
    event?: React.BaseSyntheticEvent,
  ) => Promise<void>;
  loading: boolean;
  error?: string;
}

export const RegisterForm = ({
  form,
  onSubmit,
  loading,
  error,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={classname(
              "pl-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500",
              errors.name &&
                "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
          />
        </div>
        {errors.name && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.name.message}
          </div>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              maxLength: 256,
            })}
            className={classname(
              "pl-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500",
              errors.email &&
                "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
          />
        </div>
        {errors.email && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
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
            className={classname(
              "pl-10 pr-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500",
              errors.password &&
                "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
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
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              Password should contain uppercase, lowercase, numbers, and special
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
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Please confirm your password",
              },
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={classname(
              "pl-10 pr-10 py-6 border-gray-300 focus:border-green-500 focus:ring-green-500",
              errors.confirmPassword &&
                "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {watch("confirmPassword") && watch("confirmPassword") === password && (
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

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
          required
        />
        <Label
          htmlFor="terms"
          className="text-sm text-gray-700 leading-relaxed"
        >
          I agree to the{" "}
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
        </Label>
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
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-medium"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};
