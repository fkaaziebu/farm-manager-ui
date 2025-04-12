import { useMutation } from "@apollo/client";

import { CreateAndAddWorkerToFarm } from "@/graphql/mutations/create-and-add-workers-to-farm.graphql";

import type {
  CreateAndAddWorkerToFarmMutation,
  CreateAndAddWorkerToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useCreateAndAddWorkerToFarm = () => {
  const [createAndAddWorkerToFarm, { loading, error }] = useMutation<
    CreateAndAddWorkerToFarmMutation,
    CreateAndAddWorkerToFarmMutationVariables
  >(CreateAndAddWorkerToFarm);

  return { createAndAddWorkerToFarm, loading, error };
};
export default useCreateAndAddWorkerToFarm;
