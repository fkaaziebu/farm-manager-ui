export default function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
          <div
            key={val}
            className="flex flex-col gap-5 justify-center p-5 rounded-lg border bg-white animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="h-5 w-3/5 rounded-lg bg-gray-100 border" />
              <div className="h-5 w-5 rounded-full bg-gray-100 border" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="h-3 w-2/5 rounded-lg bg-gray-100 border" />
              <div className="flex items-center gap-5">
                <div className="h-20 w-full rounded-lg bg-gray-100 border" />
                <div className="h-20 w-full rounded-lg bg-gray-100 border" />
              </div>
            </div>
            <div className="h-16 w-full rounded-lg bg-gray-100 border" />
            <div className="flex items-center gap-5 mt-3">
              <div className="h-10 w-full rounded-lg bg-gray-100 border" />
              <div className="h-10 w-full rounded-lg bg-gray-100 border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
