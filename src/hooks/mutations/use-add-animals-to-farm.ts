import { useMutation } from "@apollo/client";

import { AddAnimalsToFarm } from "@/graphql/mutations/add-animals-to-farm.graphql";

import type {
  AddAnimalsToFarmMutation,
  AddAnimalsToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useAddAnimalsToFarm = () => {
  const [addAnimalsToFarm, { loading, error }] = useMutation<
    AddAnimalsToFarmMutation,
    AddAnimalsToFarmMutationVariables
  >(AddAnimalsToFarm);

  return { addAnimalsToFarm, loading, error };
};
export default useAddAnimalsToFarm;
