import { useMutation } from "@apollo/client";

import { AddPensToBarn } from "@/graphql/mutations/add-pens-to-barn.graphql";

import type {
  AddPensToBarnMutation,
  AddPensToBarnMutationVariables,
} from "@/graphql/generated/graphql";

const useAddPensToBarn = () => {
  const [addPensToBarn, { loading, error }] = useMutation<
    AddPensToBarnMutation,
    AddPensToBarnMutationVariables
  >(AddPensToBarn);

  return {
    addPensToBarn,
    loading,
    error,
  };
};
export default useAddPensToBarn;
