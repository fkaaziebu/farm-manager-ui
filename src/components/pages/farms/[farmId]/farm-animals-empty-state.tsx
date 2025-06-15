import React from "react";
import { Plus, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Farm } from "@/graphql/generated/graphql";

type farmProp = NonNullable<Farm>;
const EmptyStateFarmAnimals = ({
  farmId,
  farm,
}: {
  farmId: string;
  farm: farmProp;
}) => {
  const { onOpen } = useModal();

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Farm Animals
        </h3>
      </div>
      <div className="p-3 sm:p-5">
        <div className="text-center py-10">
          <PawPrint className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No animals</h3>
          {!farm?.barns?.length || !farm.pens?.length ? (
            <>
              <p className="mt-1 text-sm text-gray-500 mb-6">
                Start tracking your livestock by adding a barn or pen to your
                farm
              </p>
              <Button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                onClick={() => onOpen("add-livestock-to-pen", { farmId })}
                disabled={!farm?.barns?.length && !farm?.pens?.length}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add animals to Farm
              </Button>
              {!farm?.barns?.length && !farm?.pens?.length && (
                <div className="mt-3 rounded bg-yellow-100 border-l-4 border-yellow-500 p-4 text-yellow-800 text-sm">
                  Button is disabled until a barn or pen is added.
                </div>
              )}
            </>
          ) : (
            <>
              <p className="mt-1 text-sm text-gray-500 mb-6">
                Start tracking your livestock by adding animals to your farm
              </p>
              <Button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                onClick={() => onOpen("add-livestock-to-pen", { farmId })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add animals to Farm
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFarmAnimals;
