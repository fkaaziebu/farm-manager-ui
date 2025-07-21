"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Wheat, Chrome, Loader2 } from "lucide-react";

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

// Loading State Component
const LoadingState = () => (
  <div className="text-center space-y-6">
    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Completing Your Login
      </h2>
      <p className="text-green-600">
        Please wait while we securely log you in with Google...
      </p>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-center gap-3">
        <Chrome className="w-5 h-5 text-blue-600" />
        <span className="text-blue-800 text-sm font-medium">
          Authenticating with Google OAuth
        </span>
      </div>
    </div>
  </div>
);

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract access token from URL parameters
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const id = searchParams.get("id");

  useEffect(() => {
    if (token && role && id) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("id", id);

      router.push("/farms");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
      <BackgroundPattern />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50">
            {/* Header */}
            <div className="text-center mb-8">
              <Logo />
            </div>

            {/* Dynamic Content Based on Status */}
            <LoadingState />

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                Secure authentication powered by Google OAuth 2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
