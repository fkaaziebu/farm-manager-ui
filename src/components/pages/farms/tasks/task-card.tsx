import React from "react";
import Link from "next/link";
import { CheckSquare, Plus, Calendar, Users } from "lucide-react";

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

// Empty State Component for Tasks
type TasksEmptyStateProps = {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  showCreateButton?: boolean;
  farmId?: string;
};

const TasksEmptyState: React.FC<TasksEmptyStateProps> = ({
  title = "No tasks yet",
  description = "Get started by creating your first task to keep track of farm activities and assignments.",
  actionText = "Create First Task",
  onAction,
  showCreateButton = true,
  farmId,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {/* Icon */}
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <CheckSquare className="w-10 h-10 text-blue-500" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      {showCreateButton && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {actionText}
          </button>

          {farmId && (
            <Link
              href={`/${farmId}/workers`}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              Manage Workers
            </Link>
          )}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Calendar className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            Schedule Tasks
          </h4>
          <p className="text-xs text-gray-600">
            Plan and organize farm activities
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            Assign Workers
          </h4>
          <p className="text-xs text-gray-600">
            Delegate tasks to team members
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <CheckSquare className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            Track Progress
          </h4>
          <p className="text-xs text-gray-600">
            Monitor task completion status
          </p>
        </div>
      </div>
    </div>
  );
};

// Compact Empty State for smaller spaces
const TasksEmptyStateCompact: React.FC<TasksEmptyStateProps> = ({
  title = "No tasks",
  description = "Create your first task to get started.",
  actionText = "Add Task",
  onAction,
  showCreateButton = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <CheckSquare className="w-6 h-6 text-blue-500" />
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 max-w-xs">{description}</p>

      {showCreateButton && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          {actionText}
        </button>
      )}
    </div>
  );
};

// Usage Example Component
const TasksGrid: React.FC<{
  tasks: TaskCardProps[];
  farmId: string;
  onCreateTask: () => void;
}> = ({ tasks, farmId, onCreateTask }) => {
  if (tasks.length === 0) {
    return <TasksEmptyState farmId={farmId} onAction={onCreateTask} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskCard;
export { TasksEmptyState, TasksEmptyStateCompact, TasksGrid };
