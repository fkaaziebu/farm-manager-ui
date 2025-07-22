"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export default function FarmHouseEmptyState({
  farmId,
  farmTag,
}: {
  farmId: string;
  farmTag: string;
}) {
  const { onOpen } = useModal();

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mb-4 sm:mb-6">
      <div className="p-3 sm:p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          Farm Houses
        </h3>
      </div>
      <div className="p-3 sm:p-5">
        <div className="text-center py-8 sm:py-12">
          <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">
            No farm houses yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto mb-6">
            You haven&apos;t added any houses to this farm. Add your first house
            to start managing your farm&apos;s buildings and animals.
          </p>

          <Button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => onOpen("add-house-to-farm", { farmId, farmTag })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add house to Farm
          </Button>
        </div>
      </div>
    </div>
  );
}
