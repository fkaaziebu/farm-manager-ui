import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TaskSummaryCard from "@/components/pages/farms/tasks/task-summary-page";
import { Task } from "@/graphql/generated/graphql";
// Assume you have a GraphQL query hook or fetcher for task

const TaskDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    // Replace with real API fetch or GraphQL query
    async function fetchTask() {
      const response = await fakeFetchTask(id); // Replace with real query
      setTask(response);
    }
    fetchTask();
  }, [id]);

  if (!task) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <TaskSummaryCard task={task} />

      {/* Additional content can go here */}
      <div className="mt-6">
        {/* Optional: Edit button, status history, comments, etc. */}
      </div>
    </div>
  );
};

// Dummy fetch function for testing
const fakeFetchTask = async (id: string) => ({
  id,
  type: "FEEDING",
  status: "IN_PROGRESS",
  starting_date: "2025-05-01T08:00:00Z",
  completion_date: null,
  notes: "Feed twice daily. Avoid overfeeding.",
  worker: { name: "Jane Doe" },
  barns: [{ id: "b1", unit_id: "u1", name: "Main Barn" }],
  pens: [{ id: "p1", unit_id: "u1", name: "Pen A1" }],
});

export default TaskDetailPage;
