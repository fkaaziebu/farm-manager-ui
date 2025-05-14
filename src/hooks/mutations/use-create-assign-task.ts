import { useMutation } from "@apollo/client";

import { CreateTask } from "@/graphql/mutations/create-task.graphql";
import { AssignTaskToWorker } from "@/graphql/mutations/assign-task-to-worker.graphql";

import type {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  AssignTaskToWorkerMutation,
  AssignTaskToWorkerMutationVariables,
} from "@/graphql/generated/graphql";

const useCreateTask = () => {
  const [createTask, { loading, error }] = useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTask);

  return { createTask, loading, error };
};

const useAssignTaskToWorker = () => {
  const [assignTaskToWorker, { loading, error }] = useMutation<
    AssignTaskToWorkerMutation,
    AssignTaskToWorkerMutationVariables
  >(AssignTaskToWorker);

  return { assignTaskToWorker, loading, error };
};
export { useCreateTask, useAssignTaskToWorker };
