"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginWorker } from "@/hooks/mutations";
import { classname } from "@/components/common";
import { useModal } from "@/hooks/use-modal-store";

type LoginFormInput = {
  email: string;
  password: string;
};

export default function AuthLogin() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>();
  const { loginWorker, loading } = useLoginWorker();
  const { onOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data, event) => {
    event?.preventDefault();

    try {
      const response = await loginWorker({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data?.loginWorker || !response.data?.loginWorker?.token) {
        throw new Error("Login failed");
      }

      setLoginError("");
      sessionStorage.setItem("token", response.data.loginWorker.token);
      sessionStorage.setItem("id", response.data.loginWorker.id);
      sessionStorage.setItem("workerTag", response.data.loginWorker.worker_tag);
      sessionStorage.setItem(
        "workerRole",
        JSON.stringify(response.data.loginWorker.roles),
      );
      sessionStorage.setItem("role", "admin");
      router.push("/worker/farms");
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Login successful",
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `failed to login : ${error}`,
      });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/worker/farms");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            FarmManager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="text-lg font-medium text-gray-700 space-y-2"
              >
                Email address:
              </label>
              <input
                id="email-address"
                type="email"
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
                  "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm",
                  errors.email &&
                    "border-[#e4515180] outline-offset-0 outline-2 outline-[#e4515180]",
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-base ">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-lg font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
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
                  "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm",
                  errors.password &&
                    "border-[#e4515180] outline-offset-0 outline-2 outline-[#e4515180]",
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-base ">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-lg font-medium text-gray-700"
                >
                  Remember me:
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/admin/request-password-reset"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-base mb-4">{loginError}</p>
            )}

            <div className="mb-4">
              <button
                type="submit"
                className={classname(
                  "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
                  loading && "cursor-none",
                )}
              >
                {!loading ? "Sign in" : "Signing in..."}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/auth/admin/register"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
