import { useMutation } from "@apollo/client";
import { CreateFarm } from "@/graphql/mutations/create-farm.graphql";
import type {
  CreateFarmMutation,
  CreateFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useCreateFarm = () => {
  const [createFarm, { loading, error }] = useMutation<
    CreateFarmMutation,
    CreateFarmMutationVariables
  >(CreateFarm);

  return { createFarm, loading, error };
};

export default useCreateFarm;
