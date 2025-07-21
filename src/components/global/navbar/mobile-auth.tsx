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
import { User, UserCheck, LogOut } from "lucide-react";

interface MobileAuthProps {
  isLoggedIn: boolean;
  userType: "admin" | "worker" | null;
  onLogout: () => void;
}

export const MobileAuth = ({
  isLoggedIn,
  userType,
  onLogout,
}: MobileAuthProps) => {
  if (!isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md border-0 px-2"
          >
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-white/95 backdrop-blur-sm border-green-200"
        >
          <DropdownMenuLabel className="text-green-800">
            Authentication
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
          <DropdownMenuSeparator className="bg-green-200" />
          <DropdownMenuItem asChild>
            <Link
              href="/auth/admin/register"
              className="cursor-pointer hover:bg-green-50 focus:bg-green-50 w-full"
            >
              <UserCheck className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-green-700">Sign Up as Admin</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 px-2"
        >
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white/95 backdrop-blur-sm border-green-200"
      >
        <DropdownMenuLabel className="text-green-800">
          {userType} Account
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
  );
};
