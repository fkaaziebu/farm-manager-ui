import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wheat } from "lucide-react";

export const LoginHeader = () => {
  return (
    <>
      {/* Back Button */}
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          className="text-green-700 hover:text-green-800 hover:bg-green-50 p-0"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl">
          <Wheat className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-green-800 font-semibold text-lg leading-tight">
            Intelligent Farm Manager
          </h1>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
          Admin Login
        </h2>
        <p className="text-green-600">Access your farm management dashboard</p>
      </div>
    </>
  );
};
