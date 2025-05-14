import { useMutation } from "@apollo/client";

import { AddLivestockBreedingRecord } from "@/graphql/mutations/add-livestock-breeding-record.graphql";

import type {
  AddLivestockBreedingRecordMutation,
  AddLivestockBreedingRecordMutationVariables,
} from "@/graphql/generated/graphql";

const useAddLivestockBreedingRecord = () => {
  const [addLivestockBreedingRecord, { loading, error }] = useMutation<
    AddLivestockBreedingRecordMutation,
    AddLivestockBreedingRecordMutationVariables
  >(AddLivestockBreedingRecord);

  return {
    addLivestockBreedingRecord,
    loading,
    error,
  };
};
export default useAddLivestockBreedingRecord;
