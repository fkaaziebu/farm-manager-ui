import { useMutation } from "@apollo/client";

import { UpdateLivestockBreedingRecord } from "@/graphql/mutations/update-livestock-breeding-record.graphql";

import type {
  UpdateLivestockBreedingRecordMutation,
  UpdateLivestockBreedingRecordMutationVariables,
} from "@/graphql/generated/graphql";

const useUpdateLivestockBreedingRecord = () => {
  const [updateLivestockBreedingRecord, { loading, error }] = useMutation<
    UpdateLivestockBreedingRecordMutation,
    UpdateLivestockBreedingRecordMutationVariables
  >(UpdateLivestockBreedingRecord);

  return {
    updateLivestockBreedingRecord,
    loading,
    error,
  };
};
export default useUpdateLivestockBreedingRecord;
