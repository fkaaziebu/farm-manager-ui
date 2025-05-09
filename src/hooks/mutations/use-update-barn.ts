import { useMutation } from "@apollo/client";

import { UpdateBarn } from "@/graphql/mutations/update-barn.graphql";

import type {
  UpdateBarnMutation,
  UpdateBarnMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdateBarn = () => {
  const [updateBarn, { loading, error }] = useMutation<
    UpdateBarnMutation,
    UpdateBarnMutationVariables
  >(UpdateBarn);

  return { updateBarn, loading, error };
};
export default useUpdateBarn;
