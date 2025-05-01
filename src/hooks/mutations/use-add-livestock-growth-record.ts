import { useMutation } from "@apollo/client";

import { AddLivestockGrowthRecord } from "@/graphql/mutations/add-livestock-growth-record.graphql";

import type {
  AddLivestockGrowthRecordMutation,
  AddLivestockGrowthRecordMutationVariables,
} from "@/graphql/generated/graphql";

const useAddLivestockGrowthRecord = () => {
  const [addLivestockGrowthRecord, { loading, error }] = useMutation<
    AddLivestockGrowthRecordMutation,
    AddLivestockGrowthRecordMutationVariables
  >(AddLivestockGrowthRecord);

  return {
    addLivestockGrowthRecord,
    loading,
    error,
  };
};
export default useAddLivestockGrowthRecord;
