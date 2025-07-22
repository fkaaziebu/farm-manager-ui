export default function WorkerSection() {
  return (
  {farms?.length && farms[0].workers?.length ? (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Farm Workers
        </h3>
        <Link
          href={`/farms/${farmId}/workers`}
          className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
        >
          View All
        </Link>
      </div>
      <div className="p-3 sm:p-5">
        <div className="flow-root">
          <ul className="-my-4 divide-y divide-gray-200">
            {farms[0].workers.map((worker) => (
              <li key={worker.id} className="py-3 sm:py-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                      src={ProfilePic}
                      alt={worker.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {worker.name}
                    </p>
                    {worker.roles.length > 0 && (
                      <p className="text-xs sm:text-sm text-gray-500 truncate bg-amber-100 px-2 w-fit rounded-full mt-1">
                        {worker.roles[0].toLowerCase()}
                        {worker.roles.length > 1 && (
                          <span className="ml-1 text-amber-600">
                            +{worker.roles.length - 1} more
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/farms/${farmId}/workers/${worker.worker_tag}`}
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
    <EmptyStateFarmWorkers
      farmId={farmId.toString()}
      farmTag={farms?.[0]?.farm_tag ?? ""}
      farmName={farms?.[0]?.name ?? ""}
    />
  )}
  );
}
