"use client";
// next imports
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// shadcn imports
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { Menu } from "lucide-react";
// local imports
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { DesktopNavigation } from "./desktop-navigation";
import { DesktopAuth } from "./desktop-auth";
import { MobileAuth } from "./mobile-auth";

export const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"admin" | "worker" | null>("admin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setIsMobileMenuOpen(false);
    sessionStorage.clear();
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role") as "worker" | "admin" | null;
    if (token) {
      setIsLoggedIn(true);
      setUserType(role);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, [pathname]);

  return (
    <nav className="flex items-center justify-between border-b border-amber-100 py-3 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-amber-50 shadow-sm">
      {/* Logo */}
      <Logo />

      {/* Desktop Navigation */}
      <DesktopNavigation
        navigationItems={navigationItems}
        pathname={pathname}
      />

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center gap-3">
        <DesktopAuth
          isLoggedIn={isLoggedIn}
          userType={userType}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Section */}
      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Auth */}
        <MobileAuth
          isLoggedIn={isLoggedIn}
          userType={userType}
          onLogout={handleLogout}
        />

        {/* Mobile Navigation Sheet */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 px-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 bg-gradient-to-b from-green-50 to-amber-50 border-green-200"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-green-800">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg">
                  <span className="text-white font-bold text-sm">🌾</span>
                </div>
                Navigation
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                    pathname === item.href
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                      : "text-green-700 hover:text-green-800 hover:bg-white/60",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
