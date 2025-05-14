import { useMutation } from "@apollo/client";

import { UpdateLivestock } from "@/graphql/mutations/update-livestock.graphql";

import type {
  UpdateLivestockMutation,
  UpdateLivestockMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdateLivestock = () => {
  const [updateLivestock, { loading, error }] = useMutation<
    UpdateLivestockMutation,
    UpdateLivestockMutationVariables
  >(UpdateLivestock);

  return { updateLivestock, loading, error };
};

export default useUpdateLivestock;
