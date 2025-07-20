import { useMutation } from "@apollo/client";

import { AddFieldsToFarm } from "@/graphql/mutations/add-field-to-farm.graphql";
import type {
  AddFieldsToFarmMutation,
  AddFieldsToFarmMutationVariables,
} from "@/graphql/generated/graphql";

const useAddFieldToFarm = () => {
  const [addField, { loading, error }] = useMutation<
    AddFieldsToFarmMutation,
    AddFieldsToFarmMutationVariables
  >(AddFieldsToFarm);

  return { addField, loading, error };
};
export default useAddFieldToFarm;
