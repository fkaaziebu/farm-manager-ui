import { useMutation } from "@apollo/client";

import { AddLivestockHealthRecord } from "@/graphql/mutations/add-livestock-health-record.graphql";

import type {
  AddLivestockHealthRecordMutation,
  AddLivestockHealthRecordMutationVariables,
} from "@/graphql/generated/graphql";

const useAddLivestockHealthRecord = () => {
  const [addLivestockHealthRecord, { loading, error }] = useMutation<
    AddLivestockHealthRecordMutation,
    AddLivestockHealthRecordMutationVariables
  >(AddLivestockHealthRecord);

  return {
    addLivestockHealthRecord,
    loading,
    error,
  };
};
export default useAddLivestockHealthRecord;
