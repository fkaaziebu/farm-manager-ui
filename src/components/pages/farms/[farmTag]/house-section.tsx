export default function HouseSection() {
  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      {farms[0].barns?.length ? (
        <div className="bg-white overflow-hidden shadow rounded-lg mb-4 sm:mb-6">
          <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              Farm Houses
            </h3>
            <Link
              href={`/farms/${farmId}/barns`}
              className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
            >
              View All
            </Link>
          </div>
          <div className="p-3 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {farms[0]?.barns?.map((barn) => (
                <div
                  key={barn.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">
                          {barn.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {barn.area_sqm} area_sqm
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                          barn.status.toLowerCase(),
                        )}`}
                      >
                        {barn.status.charAt(0) +
                          barn.status.slice(1).toLowerCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <div className="flex items-center">
                        {barn.pens?.length &&
                          barn?.pens.reduce(
                            (sum, pen) =>
                              sum +
                              (pen?.livestock?.length
                                ? pen?.livestock?.length
                                : 0),
                            0,
                          ) > 0 && (
                            <div className="flex items-center text-xs sm:text-sm text-gray-500 mr-3">
                              <Mouse size={14} className="mr-1" />
                              <span>
                                {barn?.pens.reduce(
                                  (sum, pen) =>
                                    sum +
                                    (pen?.livestock?.length
                                      ? pen?.livestock?.length
                                      : 0),
                                  0,
                                )}
                              </span>
                            </div>
                          )}

                        <div className="flex items-center text-xs sm:text-sm text-amber-500">
                          <AlertTriangle size={14} className="mr-1" />
                          <span>3</span>
                        </div>
                      </div>
                      <Link
                        href={`/farms/${farmId}/barns/${barn.unit_id}/`}
                        className="inline-flex items-center px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <FarmHouseEmptyState
          farmId={farmId.toString()}
          farmTag={farms?.[0]?.farm_tag ?? ""}
        />
      )}
    </div>
  );
}
