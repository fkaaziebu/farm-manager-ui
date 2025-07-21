import Link from "next/link";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown, User, UserCheck, LogOut } from "lucide-react";

interface DesktopAuthProps {
  isLoggedIn: boolean;
  userType: "admin" | "worker" | null;
  onLogout: () => void;
}

export const DesktopAuth = ({
  isLoggedIn,
  userType,
  onLogout,
}: DesktopAuthProps) => {
  if (!isLoggedIn) {
    return (
      <>
        {/* Login Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg border-0 text-sm px-3 py-2">
              <User className="h-4 w-4" />
              Login
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-white/95 backdrop-blur-sm border-green-200"
          >
            <DropdownMenuLabel className="text-green-800">
              Select Login Type
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-green-200" />
            <DropdownMenuItem asChild>
              <Link
                href="/auth/admin/login"
                className="cursor-pointer hover:bg-green-50 focus:bg-green-50 w-full"
              >
                <UserCheck className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-green-700">Login as Admin</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/auth/worker/login"
                className="cursor-pointer hover:bg-green-50 focus:bg-green-50 w-full"
              >
                <User className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-green-700">Login as Worker</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sign Up Button - Admin Only */}
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 shadow-md text-sm px-3 py-2"
        >
          <Link href="/auth/admin/register">
            <UserCheck className="h-4 w-4" />
            <span className="hidden lg:inline">Sign Up</span>
            <span className="lg:hidden">Join</span>
          </Link>
        </Button>
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs sm:text-sm text-green-700 capitalize font-medium hidden lg:block">
        Welcome, {userType}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 shadow-md text-sm px-3 py-2"
          >
            <User className="h-4 w-4" />
            <span className="hidden lg:inline">Account</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-white/95 backdrop-blur-sm border-green-200"
        >
          <DropdownMenuLabel className="text-green-800">
            Logged in as {userType}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-green-200" />
          <DropdownMenuItem className="cursor-pointer hover:bg-green-50 focus:bg-green-50">
            <User className="mr-2 h-4 w-4 text-green-600" />
            <span className="text-green-700">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-green-50 focus:bg-green-50">
            <UserCheck className="mr-2 h-4 w-4 text-green-600" />
            <span className="text-green-700">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-green-200" />
          <DropdownMenuItem
            onClick={onLogout}
            className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
