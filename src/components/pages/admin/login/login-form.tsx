import Link from "next/link";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { classname } from "@/components/common";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";

type LoginFormInput = {
  email: string;
  password: string;
};

interface LoginFormProps {
  form: UseFormReturn<LoginFormInput>;
  onSubmit: (
    data: LoginFormInput,
    event?: React.BaseSyntheticEvent,
  ) => Promise<void>;
  loading: boolean;
  error?: string;
}

export const LoginForm = ({
  form,
  onSubmit,
  loading,
  error,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
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
            placeholder="Enter your password"
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
        {errors.password && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.password.message}
          </div>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <Label htmlFor="remember" className="text-sm text-gray-700">
            Remember me
          </Label>
        </div>
        <Link
          href="/auth/admin/request-password-reset"
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          Forgot password?
        </Link>
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
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};
