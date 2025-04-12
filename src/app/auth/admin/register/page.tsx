"use client";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRegisterAdmin } from "@/hooks/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { classname } from "@/components/common";

type RegisterFormInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthRegister() {
  const [registerError, setRegisterError] = useState<string>();
  const router = useRouter();
  const { registerAdmin, loading } = useRegisterAdmin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data, event) => {
    event?.preventDefault();

    try {
      const response = await registerAdmin({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      // if (
      //   !response.data?.registerAdmin ||
      //   !response.data?.registerAdmin?.token
      // ) {
      //   throw new Error("Registration failed");
      // }

      setRegisterError("");
      // sessionStorage.setItem("token", response.data.registerAdmin.token);
      // sessionStorage.setItem("id", response.data.registerAdmin.id);
      router.push("/auth/admin/login");
    } catch (error) {
      //  @ts-expect-error ignore
      setRegisterError(error.message);
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            FarmManager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create a new account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="full-name"
                className="text-base font-medium text-gray-700 mb-2"
              >
                Full name
              </label>
              <input
                id="full-name"
                type="text"
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
                  "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm",
                  errors.name &&
                    "border-[#e4515180] outline-offset-0 outline-2 outline-[#e4515180]"
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-base ">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="text-base font-medium text-gray-700 mb-2"
              >
                Email address
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
                    "border-[#e4515180] outline-offset-0 outline-2 outline-[#e4515180]"
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
                className="text-base font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
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
                    "border-[#e4515180] outline-offset-0 outline-2 outline-[#e4515180]"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-base ">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="text-base font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className={classname(
                  "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm",
                  errors.confirmPassword &&
                    "border-[#e4515180] outline-offset-0 outline-2 outline-[#e4515180]"
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          {registerError && (
            <p className="text-red-500 text-base mb-4">{registerError}</p>
          )}
          <div>
            <button
              type="submit"
              className={classname(
                "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
                loading && "cursor-none"
              )}
              disabled={loading}
            >
              {!loading ? "Register" : "Registering..."}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/auth/admin/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
