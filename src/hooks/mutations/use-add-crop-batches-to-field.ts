import { useMutation } from "@apollo/client";

import { AddCropBatchesToField } from "@/graphql/mutations/add-crop-batches-to-field.graphql";

import type {
  AddCropBatchesToFieldMutation,
  AddCropBatchesToFieldMutationVariables,
} from "@/graphql/generated/graphql";

const useAddCropBatchesToField = () => {
  const [addCropBatchesToField, { loading, error }] = useMutation<
    AddCropBatchesToFieldMutation,
    AddCropBatchesToFieldMutationVariables
  >(AddCropBatchesToField);

  return { addCropBatchesToField, loading, error };
};

export default useAddCropBatchesToField;
