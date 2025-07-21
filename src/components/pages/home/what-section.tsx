"use client";
import Image from "next/image";
import { Database, BarChart3, Bot, Wheat, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

// Note: Replace with your actual image path
import FeatureSvg from "@/../public/images/features.svg";

export const WhatSection = () => {
  const features = [
    {
      icon: Database,
      title: "Comprehensive Record Management",
      description:
        "Track breeding cycles, crop planting schedules, health data, and financial records across all your farming operations.",
    },
    {
      icon: BarChart3,
      title: "Multi-Farm Analytics",
      description:
        "Get insights on productivity, growth rates, and profitability trends for both livestock and crop farming.",
    },
    {
      icon: Bot,
      title: "AI-Powered Farm Assistant",
      description:
        "Receive intelligent recommendations for optimal planting times, breeding schedules, and resource management.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white to-green-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200 mb-6">
            <Wheat className="w-4 h-4 text-green-600" />
            <Sprout className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Platform Overview
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            What is{" "}
            <span className="text-green-600">Intelligent Farm Manager</span>?
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            A comprehensive digital platform for modern agriculture, supporting
            both grasscutter farming and crop cultivation to boost productivity
            by up to 40%.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-amber-100 rounded-2xl p-8">
              <Image
                src={FeatureSvg}
                alt="Farm Management Features"
                className="w-full h-auto max-w-sm mx-auto"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-green-800">
              Intelligent Farm Manager supports:
            </h3>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-green-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-green-600 rounded-2xl p-8 mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Trusted by Agricultural Professionals
          </h3>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-white">2,500+</div>
              <div className="text-green-100">Mixed Farms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">40%</div>
              <div className="text-green-100">Avg. Productivity Boost</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-green-100">Data Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
