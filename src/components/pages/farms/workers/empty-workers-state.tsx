import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface WorkersEmptyStateProps {
  farmTag: string;
  farmName?: string;
}

const WorkersEmptyState = ({ farmTag, farmName }: WorkersEmptyStateProps) => {
  const { onOpen } = useModal();

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-full">
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <UserPlus className="h-8 w-8 text-blue-500" />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Workers Yet
        </h3>

        <p className="text-sm text-gray-500 max-w-md mb-6">
          There are no workers assigned to {farmName}. Add workers to manage
          your farm operations more efficiently.
        </p>

        <Button
          onClick={() => onOpen("add-workers-to-farm", { farmTag, farmName })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Workers
        </Button>
      </div>
    </div>
  );
};

export default WorkersEmptyState;
