"use client";
// next imports
import Link from "next/link";
import { usePathname } from "next/navigation";
// shadcn imports
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
// lucide icons
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Wheat,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";
// local imports
import { cn } from "@/lib/utils";

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-50 via-amber-50/30 to-green-50 border-t border-green-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-green-800 font-semibold text-lg leading-tight">
                  Intelligent Farm
                </h3>
                <span className="text-green-600 font-medium text-sm -mt-0.5">
                  Manager
                </span>
              </div>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">
              Empowering farmers with intelligent solutions for modern
              grasscutter farming. Monitor, manage, and maximize your farm's
              potential with our comprehensive platform.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 border-green-300 hover:bg-green-50"
              >
                <Facebook className="w-4 h-4 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 border-green-300 hover:bg-green-50"
              >
                <Twitter className="w-4 h-4 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 border-green-300 hover:bg-green-50"
              >
                <Instagram className="w-4 h-4 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 border-green-300 hover:bg-green-50"
              >
                <Linkedin className="w-4 h-4 text-green-600" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-green-800 font-semibold text-base">
              Quick Links
            </h4>
            <div className="space-y-3">
              <Link
                href="/"
                className={cn(
                  "block text-sm text-green-700 hover:text-green-800 transition-colors duration-200",
                  pathname === "/" && "text-green-800 font-medium",
                )}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={cn(
                  "block text-sm text-green-700 hover:text-green-800 transition-colors duration-200",
                  pathname === "/about" && "text-green-800 font-medium",
                )}
              >
                About Us
              </Link>
              <Link
                href="/features"
                className={cn(
                  "block text-sm text-green-700 hover:text-green-800 transition-colors duration-200",
                  pathname === "/features" && "text-green-800 font-medium",
                )}
              >
                Features
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "block text-sm text-green-700 hover:text-green-800 transition-colors duration-200",
                  pathname === "/blog" && "text-green-800 font-medium",
                )}
              >
                Blog
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-green-700 hover:text-green-800 transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                href="/support"
                className="block text-sm text-green-700 hover:text-green-800 transition-colors duration-200"
              >
                Support
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-green-800 font-semibold text-base">
              Platform Features
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Farm Management</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">
                  Analytics & Reports
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Breeding Records</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">
                  Health Monitoring
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-green-800 font-semibold text-base">
              Stay Connected
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">
                  info@farmmanager.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">+233 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Accra, Ghana</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3 pt-2">
              <p className="text-sm text-green-700">
                Get farming tips & updates
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email"
                  className="text-sm border-green-300 focus:border-green-500"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-3"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-green-200" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-green-700">
            © {currentYear} Intelligent Farm Manager. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-green-700 hover:text-green-800 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-green-700 hover:text-green-800 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-green-700 hover:text-green-800 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
