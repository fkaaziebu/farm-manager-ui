"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  User,
  UserCheck,
  Play,
  Wheat,
  Sprout,
} from "lucide-react";

export const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (type: "admin" | "worker") => {
    setIsLoggedIn(true);
    console.log(`Logging in as ${type}`);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-amber-50 py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200 mb-8">
          <Wheat className="w-4 h-4 text-green-600" />
          <Sprout className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            Smart Agricultural Management
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-bold text-green-800 mb-6">
          Transform Your
          <span className="block text-green-600">Farm Operations</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
          Comprehensive farm management for grasscutter and crop farming.
          Monitor, analyze, and optimize your agricultural operations from
          anywhere.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
                  >
                    Get Started
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose Your Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogin("admin")}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Start as Farm Owner
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogin("worker")}>
                    <User className="mr-2 h-4 w-4" />
                    Join as Farm Worker
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="lg"
                className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
            >
              Go to Dashboard
            </Button>
          )}
        </div>

        {/* Simple Stats */}
        <div className="flex justify-center gap-8 mt-16 text-center">
          <div>
            <div className="text-2xl font-bold text-green-800">2,500+</div>
            <div className="text-sm text-green-600">Active Farms</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-800">40%</div>
            <div className="text-sm text-green-600">
              Avg. Productivity Increase
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-800">99.9%</div>
            <div className="text-sm text-green-600">Data Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
