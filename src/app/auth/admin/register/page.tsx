"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRegisterAdmin } from "@/hooks/mutations";
import { useModal } from "@/hooks/use-modal-store";
import { BrandingSide } from "@/components/pages/admin/register/branding-side";
import { RegisterHeader } from "@/components/pages/admin/register/register-header";
import { SocialRegister } from "@/components/pages/admin/register/social-register";
import { RegisterForm } from "@/components/pages/admin/register/register-form";
import { BackgroundPattern } from "@/components/pages/admin/background-pattern";
import axios from "axios";

type RegisterFormInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthRegister() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string>();
  const [oauthLoading, setOauthLoading] = useState(false);
  const { registerAdmin, loading } = useRegisterAdmin();
  const { onOpen } = useModal();

  const form = useForm<RegisterFormInput>({
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

      setRegisterError("");
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: "Registration successful",
      });
      router.push("/auth/admin/login");
    } catch (error) {
      //  @ts-expect-error ignore
      setRegisterError(error.message);
      console.error(error);
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Registration unsuccessful: ${error}`,
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setOauthLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      // const baseUrl = "http://localhost:3007/v1";
      await axios.get(`${baseUrl}/auth/google/login`);
    } catch (error) {
      // @ts-expect-error error
      setLoginError(error.message);
    } finally {
      setOauthLoading(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
      <BackgroundPattern />

      <div className="relative flex min-h-screen">
        <BrandingSide />

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            <RegisterHeader />
            <SocialRegister
              onGoogleRegister={handleGoogleRegister}
              loading={oauthLoading}
            />
            <RegisterForm
              form={form}
              onSubmit={onSubmit}
              loading={loading}
              error={registerError}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/admin/login"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
