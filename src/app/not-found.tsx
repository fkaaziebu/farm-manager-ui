import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Wheat, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";

export default function NotFound() {
  const suggestedPages = [
    { href: "/", label: "Home", description: "Return to the main page" },
    {
      href: "/features",
      label: "Features",
      description: "Explore our platform features",
    },
    { href: "/about", label: "About", description: "Learn more about us" },
    { href: "/blog", label: "Blog", description: "Read our latest articles" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-green-50 via-white to-amber-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full shadow-lg mb-6">
              <AlertTriangle className="w-12 h-12 text-amber-600" />
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-8xl sm:text-9xl font-bold text-green-800 mb-4">
              404
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200 mb-4">
              <Wheat className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Page Not Found
              </span>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
              Oops! This page seems to have wandered off the farm
            </h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved. Let&apos;s get you back to managing your agricultural
              operations.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4"
            >
              <Link href="javascript:history.back()">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Link>
            </Button>
          </div>

          {/* Suggested Pages */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-green-800 mb-8">
              Here are some helpful pages to get you started:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <h4 className="text-lg font-semibold text-green-800 mb-2 group-hover:text-green-900">
                    {page.label}
                  </h4>
                  <p className="text-green-700 text-sm">{page.description}</p>
                  <div className="mt-4 flex items-center text-green-600 text-sm">
                    <span>Visit page</span>
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-16 p-6 bg-green-100/50 rounded-2xl border border-green-200">
            <div className="flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-green-800">
                Looking for something specific?
              </h4>
            </div>
            <p className="text-green-700 mb-4">
              Try browsing our features or contact our support team for
              assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Link href="/features">Browse Features</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
