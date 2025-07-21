import { Wheat } from "lucide-react";

export const BrandingSide = () => {
  const features = [
    "Complete farm management suite",
    "Advanced analytics & insights",
    "Multi-user collaboration tools",
    "AI-powered recommendations",
  ];

  return (
    <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 xl:px-16 bg-gradient-to-br from-green-600 to-green-700">
      <div className="text-white">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
            <Wheat className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-semibold text-xl leading-tight">
              Intelligent Farm
            </h1>
            <span className="text-green-100 font-medium text-sm -mt-0.5">
              Manager
            </span>
          </div>
        </div>

        <h2 className="text-3xl xl:text-4xl font-bold mb-6">
          Start your agricultural journey today
        </h2>
        <p className="text-green-100 text-lg xl:text-xl leading-relaxed mb-8">
          Join thousands of farmers who are transforming their operations with
          our comprehensive farm management platform designed for success.
        </p>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-green-100">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 pt-8 border-t border-green-500/30">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-2xl font-bold text-white">2,500+</div>
              <div className="text-green-100 text-sm">Active Farms</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">40%</div>
              <div className="text-green-100 text-sm">Avg. Growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
