export const Logo = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg">
        <span className="text-white font-bold text-sm sm:text-lg">🌾</span>
      </div>
      <div className="flex flex-col">
        <h1 className="text-green-800 font-semibold text-base sm:text-lg leading-tight">
          Intelligent Farm
        </h1>
        <span className="text-green-600 font-medium text-xs sm:text-sm -mt-0.5">
          Manager
        </span>
      </div>
    </div>
  );
};
