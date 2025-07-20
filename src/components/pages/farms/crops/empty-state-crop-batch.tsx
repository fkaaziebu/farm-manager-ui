import { Sprout } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export default function EmptyStateCropBatch({
  fieldUnitId,
}: {
  fieldUnitId: string;
}) {
  const { onOpen } = useModal();
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mt-4 sm:mt-6">
      <div className="p-3 sm:p-5 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Crop Management
        </h3>
      </div>
      <div className="p-3 sm:p-5">
        <div className="text-center py-6 sm:py-10">
          <Sprout className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No crops planted
          </h3>
          <p className="mt-1 text-sm text-gray-500 mb-4 sm:mb-6">
            Start managing your crops by adding crop fields to your farm
          </p>
          <button
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            onClick={() => onOpen("add-crop-batch-to-field", { fieldUnitId })}
          >
            <Sprout className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Add Crop Field
          </button>
        </div>
      </div>
    </div>
  );
}
