import { useMutation } from "@apollo/client";

import { UpdatePen } from "@/graphql/mutations/update-pen.graphql";

import type {
  UpdatePenMutation,
  UpdatePenMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdatePen = () => {
  const [updatePen, { loading, error }] = useMutation<
    UpdatePenMutation,
    UpdatePenMutationVariables
  >(UpdatePen);

  return { updatePen, loading, error };
};
export default useUpdatePen;
