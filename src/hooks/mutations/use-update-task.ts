import { useMutation } from "@apollo/client";

import { UpdateTask } from "@/graphql/mutations/update-task.graphql";

import type {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdateTask = () => {
  const [updateTask, { loading, error }] = useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UpdateTask);

  return {
    updateTask,
    loading,
    error,
  };
};

export default useUpdateTask;
