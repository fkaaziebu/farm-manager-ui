import { useMutation } from "@apollo/client";

import { AddGreenhousesToFarm } from "@/graphql/mutations/add-greenhouse-to-farm.graphql";

import type {
  AddGreenhousesToFarmMutation,
  AddGreenhousesToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useAddGreenhouseToFarm = () => {
  const [addGreenhouse, { loading, error }] = useMutation<
    AddGreenhousesToFarmMutation,
    AddGreenhousesToFarmMutationVariables
  >(AddGreenhousesToFarm);

  return { addGreenhouse, loading, error };
};

export default useAddGreenhouseToFarm;
