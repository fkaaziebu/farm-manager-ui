import React from "react";
import Link from "next/link";

type TaskCardProps = {
  id: string;
  type: string;
  status: string;
  starting_date: string;
  completion_date: string | null;
  worker: { name: string } | null;
  farmTag: string;
  farmId: string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  type,
  status,
  starting_date,
  completion_date,
  worker,
  farmTag,
  farmId,
}) => {
  return (
    <div className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold capitalize">
          {type.replace("_", " ")}
        </h3>
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status.replace("_", " ")}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Start:</strong> {new Date(starting_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Completed:</strong>{" "}
          {completion_date
            ? new Date(completion_date).toLocaleDateString()
            : "—"}
        </p>
        <p>
          <strong>Assigned to:</strong> {worker?.name ?? "Unassigned"}
        </p>
      </div>
      <div className="mt-3 text-right">
        <Link
          href={`${farmId}/tasks/${farmTag}`}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
