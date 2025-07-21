"use client";
import {
  Database,
  BarChart3,
  Bot,
  Users,
  Heart,
  DollarSign,
  Wheat,
  Calendar,
  TrendingUp,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeatureSection = () => {
  const features = [
    {
      icon: Database,
      title: "Universal Records",
      description:
        "Store breeding cycles, planting schedules, and financial data across all farm types.",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description:
        "Compare performance between livestock and crop operations with detailed insights.",
    },
    {
      icon: Bot,
      title: "AI Farm Assistant",
      description:
        "Get intelligent recommendations for both animal husbandry and crop management.",
    },
    {
      icon: Users,
      title: "Team Management",
      description:
        "Coordinate workers across different farm sections with role-based access.",
    },
    {
      icon: Heart,
      title: "Health & Growth Tracking",
      description:
        "Monitor animal health and track crop growth stages with automated alerts.",
    },
    {
      icon: DollarSign,
      title: "Financial Reports",
      description:
        "Track expenses and revenue across livestock and crop operations separately.",
    },
    {
      icon: Calendar,
      title: "Scheduling System",
      description:
        "Manage breeding cycles, planting seasons, and harvest schedules in one place.",
    },
    {
      icon: TrendingUp,
      title: "Performance Monitoring",
      description:
        "Track yields, growth rates, and productivity across all farming activities.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200 mb-6">
            <Wheat className="w-4 h-4 text-green-600" />
            <Sprout className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Platform Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            Everything You Need for
            <span className="block text-green-600">
              Mixed Agricultural Operations
            </span>
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Comprehensive tools for managing both grasscutter farming and crop
            cultivation in one integrated platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-green-700 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-green-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Manage All Your Agricultural Operations Smarter
          </h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join farmers managing both livestock and crops with our unified
            platform for complete agricultural management.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 px-8 py-3"
          >
            Try Free for 30 Days
          </Button>
        </div>
      </div>
    </section>
  );
};
