import { useMutation } from "@apollo/client";

import { AddHouseToFarm } from "@/graphql/mutations/add-house-to-farm.graphql";

import type {
  AddHouseToFarmMutation,
  AddHouseToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useAddHouseToFarm = () => {
  const [addHouseToFarm, { loading, error }] = useMutation<
    AddHouseToFarmMutation,
    AddHouseToFarmMutationVariables
  >(AddHouseToFarm);

  return { addHouseToFarm, loading, error };
};
export default useAddHouseToFarm;
