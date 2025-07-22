export default function CropSection() {
  return (
  {farms?.[0].fields?.length ? (
    <div className="bg-white overflow-hidden shadow rounded-lg mt-4 sm:mt-6">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Fields & Crop Management
        </h3>
        <Link
          href={`/farms/${farmId}/fields`}
          className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
        >
          View All
        </Link>
      </div>
      <div className="p-3 sm:p-5">
        <div className="space-y-4 sm:space-y-6">
          {farms[0].fields?.map((field) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">
                      {field?.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {field?.area_hectares} hectares
                    </p>
                  </div>
                  <Link
                    href={`/farms/${farmId}/fields/${field.unit_id}`}
                    className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    Manage Field
                  </Link>
                </div>
              </div>

              {field.crop_batches?.length ? (
                <div className="p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {field.crop_batches.map((crop) => (
                      <div
                        key={crop.id}
                        className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-100 rounded-md p-1.5 mr-2">
                              <Sprout className="h-3 w-3 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-medium text-gray-900">
                                {crop.name}
                              </h5>
                              <p className="text-xs text-gray-500">
                                {crop.crop_type}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                              crop.status === "SEEDLING"
                                ? "bg-yellow-100 text-yellow-800"
                                : crop.status === "GROWING"
                                  ? "bg-blue-100 text-blue-800"
                                  : crop.status === "FLOWERING"
                                    ? "bg-pink-100 text-pink-800"
                                    : crop.status === "FRUITING"
                                      ? "bg-orange-100 text-orange-800"
                                      : crop.status ===
                                          "READY_FOR_HARVEST"
                                        ? "bg-amber-100 text-amber-800"
                                        : crop.status ===
                                            "HARVESTED"
                                          ? "bg-green-100 text-green-800"
                                          : crop.status ===
                                              "FAILED"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {crop.status.charAt(0) +
                              crop.status
                                .slice(1)
                                .toLowerCase()
                                .replace(/_/g, " ")}
                          </span>
                        </div>

                        <div className="mt-2">
                          <Link
                            href={`/farms/${farms[0].farm_tag}/fields/${field.unit_id}/crop-batches/${crop.crop_batch_tag}?cropType=${crop.crop_kind}`}
                            className="inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-500">
                  <Sprout className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                  <p>No crop batches in this field</p>
                  <Link
                    href={`/farms/${farmId}/fields/${field.id}/add-crop`}
                    className="mt-2 inline-flex items-center text-green-600 hover:text-green-500"
                  >
                    Add Crop Batch
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <EmptyStateFarmField farmTag={farms?.[0]?.farm_tag ?? ""} />
  )}
  );
}
