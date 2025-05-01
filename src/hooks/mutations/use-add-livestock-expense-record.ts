import { useMutation } from "@apollo/client";

import { AddLivestockExpenseRecord } from "@/graphql/mutations/add-livestock-expense-record.graphql";

import type {
  AddLivestockExpenseRecordMutation,
  AddLivestockExpenseRecordMutationVariables,
} from "@/graphql/generated/graphql";

const useAddLivestockExpenseRecord = () => {
  const [addLivestockExpenseRecord, { loading, error }] = useMutation<
    AddLivestockExpenseRecordMutation,
    AddLivestockExpenseRecordMutationVariables
  >(AddLivestockExpenseRecord);

  return {
    addLivestockExpenseRecord,
    loading,
    error,
  };
};
export default useAddLivestockExpenseRecord;
