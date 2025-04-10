"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { type AxiosResponse } from "axios";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "This must be an email",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function AuthLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoggingIn(true);
      const { email, password } = values;

      const response: AxiosResponse<{
        id: number;
        name: string;
        email: string;
        role: string;
        access_token: string;
      }> = await axios.post(`${baseUrl}/auth/admins/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      toast("Logged in successfully", {
        description: `Welcome back, ${response.data.name}`,
      });

      router.push("/farms");
    } catch (error) {
      toast("Login Error", {
        description: `${error?.response?.data?.message}`,
      });
    } finally {
      setIsLoggingIn(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/farms");
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md -space-y-px">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="email-address" className="sr-only">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email-address"
                        placeholder="Email address"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" className="sr-only">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/request-password-reset"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {!isLoggingIn ? "Sign in" : "Signing in..."}
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
          </form>
        </Form>
      </div>
    </div>
  );
}
