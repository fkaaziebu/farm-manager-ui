import React from "react";
import { Plus, LandPlot, HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const EmptyStateFarms = () => {
  const { onOpen } = useModal();

  return (
    <div className="max-w-7xl mx-auto pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-8 sm:p-10 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <LandPlot className="h-10 w-10 text-green-600" />
          </div>

          <h3 className="mt-5 text-lg font-medium text-gray-900">
            No farms yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Get started by creating your first farm. You&apos;ll be able to add
            animals, workers, and manage houses once your farm is set up.
          </p>

          <div className="mt-8">
            <Button
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onOpen("add-farm")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Farm
            </Button>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              With your farm, you&apos;ll be able to:
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-5">
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <HouseIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Manage Houses
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Track and organize animal housing and facilities
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Add Workers
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Assign staff and manage their roles
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      Track Performance
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Monitor farm metrics and productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFarms;
