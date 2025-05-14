import React from "react";
import { Calendar, Plus, AlertCircle } from "lucide-react";
import EventSchedulerDialog from "./animal-event-schedular";

const EmptyStateAnimalEvents = () => {
  return (
    <div className="mt-4 sm:mt-6 bg-white shadow sm:rounded-lg">
      <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
        <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
          Upcoming Animal Events
        </h3>
        <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
          Next 7 days schedule
        </p>
      </div>

      <div className="px-4 py-10 sm:py-12 flex flex-col items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>

        <h3 className="mt-4 text-sm font-medium text-gray-900">
          No upcoming events
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center max-w-md">
          Schedule health checks, vaccinations, and other important activities
          to keep track of your animal care tasks.
        </p>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => {
              // Open the event scheduler dialog
              EventSchedulerDialog({ open });
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Schedule Event
          </button>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-md p-4 w-full max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Event suggestions
              </h3>
              <div className="mt-2 text-xs sm:text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Regular health checks for early disease detection</li>
                  <li>Vaccination schedules based on animal species</li>
                  <li>Weight tracking for growth monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-3 sm:px-4 sm:py-4 border-t border-gray-200">
        <a
          href="#"
          className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
        >
          Learn about animal care schedules{" "}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default EmptyStateAnimalEvents;
