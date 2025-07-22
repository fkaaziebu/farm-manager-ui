export default function AnimalSection() {
  return (
    {(farms?.[0].farm_type === FarmType.Livestock ||
      farms?.[0].farm_type === FarmType.Mixed) &&
    farms?.length &&
    farms[0].livestock?.length ? (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            Farm Animals
          </h3>
          <Link
            href={`/farms/${farmId}/livestock`}
            className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
          >
            View All
          </Link>
        </div>
        <div className="p-3 sm:p-5">
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {transformAnimalData({
                livestocks: farms[0]?.livestock,
              }).map((livestock) => (
                <li key={livestock.type} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {livestock.type} - {livestock.breed}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <p className="text-xs sm:text-sm text-gray-500 truncate sm:mr-2">
                          Count: {livestock.count}
                        </p>
                        <span
                          className={`mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            livestock.health === "Excellent"
                              ? "bg-green-100 text-green-800"
                              : livestock.health === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : livestock.health === "Fair"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {livestock.health}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/farms/${farmId}/livestock?type=${livestock.type}`}
                        className="inline-flex items-center px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <EmptyStateFarmAnimals farmId={farmId.toString()} />
    )}
  )
}
