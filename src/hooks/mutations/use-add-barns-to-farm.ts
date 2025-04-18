import { useMutation } from "@apollo/client";

import { AddBarnsToFarm } from "@/graphql/mutations/add-barns-to-farm.graphql";

import type {
  AddBarnsToFarmMutation,
  AddBarnsToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useAddBarnsToFarm = () => {
  const [addBarnsToFarm, { loading, error }] = useMutation<
    AddBarnsToFarmMutation,
    AddBarnsToFarmMutationVariables
  >(AddBarnsToFarm);

  return { addBarnsToFarm, loading, error };
};
export default useAddBarnsToFarm;
