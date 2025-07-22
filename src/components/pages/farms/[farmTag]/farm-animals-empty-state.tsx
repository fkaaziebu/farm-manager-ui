import React from "react";
import { Plus, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const EmptyStateFarmAnimals = ({ farmId }: { farmId: string }) => {
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
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFarmAnimals;
