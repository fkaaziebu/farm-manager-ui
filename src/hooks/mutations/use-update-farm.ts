import { useMutation } from "@apollo/client";

import { UpdateFarm } from "@/graphql/mutations/update-farm.graphql";

import type {
  UpdateFarmMutation,
  UpdateFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdateFarm = () => {
  const [updateFarm, { loading, error }] = useMutation<
    UpdateFarmMutation,
    UpdateFarmMutationVariables
  >(UpdateFarm);

  return { updateFarm, loading, error };
};
export default useUpdateFarm;
