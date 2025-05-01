import { useMutation } from "@apollo/client";

import { AddLivestockToPen } from "@/graphql/mutations/add-livestock-to-pen.graphql";

import type {
  AddLivestockToPenMutation,
  AddLivestockToPenMutationVariables,
} from "@/graphql/generated/graphql";

const useAddLivestockToPen = () => {
  const [addLivestockToPen, { loading, error }] = useMutation<
    AddLivestockToPenMutation,
    AddLivestockToPenMutationVariables
  >(AddLivestockToPen);

  return { addLivestockToPen, loading, error };
};
export default useAddLivestockToPen;
