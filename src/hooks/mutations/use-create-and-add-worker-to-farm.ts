import { useMutation } from "@apollo/client";

import { AddWorkersToFarm } from "@/graphql/mutations/create-and-add-workers-to-farm.graphql";

import type {
  AddWorkersToFarmMutation,
  AddWorkersToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useCreateAndAddWorkerToFarm = () => {
  const [addWorkersToFarm, { loading, error }] = useMutation<
    AddWorkersToFarmMutation,
    AddWorkersToFarmMutationVariables
  >(AddWorkersToFarm);

  return { addWorkersToFarm, loading, error };
};
export default useCreateAndAddWorkerToFarm;
