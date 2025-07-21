"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginAdmin } from "@/hooks/mutations";
import { useModal } from "@/hooks/use-modal-store";
import { BrandingSide } from "@/components/pages/admin/login/branding-side";
import { LoginHeader } from "@/components/pages/admin/login/login-header";
import { SocialLogin } from "@/components/pages/admin/login/social-login";
import { LoginForm } from "@/components/pages/admin/login/login-form";
import { BackgroundPattern } from "@/components/pages/admin/background-pattern";
// import axios from "axios";

type LoginFormInput = {
  email: string;
  password: string;
};

export default function AuthLogin() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>();
  const [oauthLoading, setOauthLoading] = useState<boolean>(false);
  const { loginAdmin, loading } = useLoginAdmin();
  const { onOpen } = useModal();

  const form = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data, event) => {
    event?.preventDefault();

    try {
      const response = await loginAdmin({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data?.loginAdmin || !response.data?.loginAdmin?.token) {
        throw new Error("Login failed");
      }

      setLoginError("");
      sessionStorage.setItem("token", response.data.loginAdmin.token);
      sessionStorage.setItem("role", "admin");
      sessionStorage.setItem("id", response.data.loginAdmin.id);
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Login successful",
      });
      router.push("/farms");
    } catch (error) {
      //  @ts-expect-error ignore
      setLoginError(error.message);
      console.error(error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Login unsuccessful: ${error}`,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setOauthLoading(true);
      setLoginError("");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      // const baseUrl = "http://localhost:3007/v1";
      // await axios.get(`${baseUrl}/auth/google/login`);
      router.push(`${baseUrl}/auth/google/login`);
    } catch (error) {
      // @ts-expect-error error
      setLoginError(error.message);
    } finally {
      setOauthLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/farms");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
      <BackgroundPattern />

      <div className="relative flex min-h-screen">
        <BrandingSide />

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            <LoginHeader />
            <SocialLogin
              onGoogleLogin={handleGoogleLogin}
              loading={oauthLoading}
            />
            <LoginForm
              form={form}
              // @ts-expect-error error
              onSubmit={onSubmit}
              loading={loading}
              error={loginError}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/admin/register"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
