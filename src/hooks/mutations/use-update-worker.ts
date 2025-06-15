import { useMutation } from "@apollo/client";

import { UpdateWorker } from "@/graphql/mutations/update-worker.graphql";

import type {
  UpdateWorkerMutation,
  UpdateWorkerMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdateWorker = () => {
  const [updateWorker, { error, loading }] = useMutation<
    UpdateWorkerMutation,
    UpdateWorkerMutationVariables
  >(UpdateWorker);

  return {
    updateWorker,
    error,
    loading,
  };
};

export default useUpdateWorker;
