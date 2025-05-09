import React from "react";

type TaskSummaryCardProps = {
  task: {
    id: string;
    type: string;
    status: string;
    starting_date: string;
    completion_date: string | null;
    notes?: string | null;
    worker?: { name: string } | null;
    barns?: { id: string; unit_id: string; name: string }[];
    pens?: { id: string; unit_id: string; name: string }[];
  };
};

const TaskSummaryCard: React.FC<{ task: TaskSummaryCardProps["task"] }> = ({
  task,
}) => {
  return (
    <div className="border rounded-2xl shadow-md p-6 bg-white space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold capitalize">
            {task.type.replace("_", " ")}
          </h2>
          <p className="text-gray-500 text-sm">Task ID: {task.id}</p>
        </div>
        <span
          className={`text-sm px-3 py-1 rounded-full self-start ${
            task.status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : task.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(task.starting_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Completion Date:</strong>{" "}
          {task.completion_date
            ? new Date(task.completion_date).toLocaleDateString()
            : "—"}
        </p>
        <p>
          <strong>Assigned to:</strong> {task.worker?.name || "Unassigned"}
        </p>
      </div>

      {task.notes && (
        <div>
          <strong className="block mb-1 text-sm">Notes:</strong>
          <p className="bg-gray-50 rounded-md p-3 text-sm text-gray-600 whitespace-pre-wrap">
            {task.notes}
          </p>
        </div>
      )}

      {(task.barns?.length || task.pens?.length) && (
        <div>
          <strong className="block mb-1 text-sm">Location:</strong>
          <div className="flex flex-wrap gap-2 text-sm">
            {task.barns?.map((barn) => (
              <span
                key={barn.id}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                🛖 {barn.name}
              </span>
            ))}
            {task.pens?.map((pen) => (
              <span
                key={pen.id}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full"
              >
                🐖 {pen.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSummaryCard;
