import { useMutation } from "@apollo/client";

import { AddWorkersToFarm } from "@/graphql/mutations/add-workers-to-farm.graphql";
import { AssignWorkersToFarm } from "@/graphql/mutations/assign-workers-to-farm.graphql";

import type {
  AddWorkersToFarmMutation,
  AddWorkersToFarmMutationVariables,
  AssignWorkersToFarmMutation,
  AssignWorkersToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useCreateAndAddWorkerToFarm = () => {
  const [addWorkersToFarm, { loading, error }] = useMutation<
    AddWorkersToFarmMutation,
    AddWorkersToFarmMutationVariables
  >(AddWorkersToFarm);

  return { addWorkersToFarm, loading, error };
};

const useAssignWorkersToFarm = () => {
  const [assignWorkersToFarm, { loading, error }] = useMutation<
    AssignWorkersToFarmMutation,
    AssignWorkersToFarmMutationVariables
  >(AssignWorkersToFarm);
  return { assignWorkersToFarm, loading, error };
};

export { useCreateAndAddWorkerToFarm, useAssignWorkersToFarm };
