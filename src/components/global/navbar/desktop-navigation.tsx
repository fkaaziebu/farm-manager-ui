import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavigationItem {
  href: string;
  label: string;
}

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
  pathname: string;
}

export const DesktopNavigation = ({
  navigationItems,
  pathname,
}: DesktopNavigationProps) => {
  return (
    <div className="hidden lg:flex items-center">
      <div className="flex items-center bg-gradient-to-r from-green-100/50 to-amber-100/50 backdrop-blur-sm rounded-xl p-1.5 gap-1 shadow-inner border border-green-200/30">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out",
              pathname === item.href
                ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105"
                : "text-green-700 hover:text-green-800 hover:bg-white/80 hover:shadow-md",
            )}
          >
            {item.label}
            {pathname === item.href && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full shadow-sm" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
