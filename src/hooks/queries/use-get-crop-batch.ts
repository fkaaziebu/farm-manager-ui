import { useLazyQuery } from "@apollo/client";

import { GetCropBatch } from "@/graphql/queries/get-crop-batch.graphql";

import type {
  GetCropBatchQuery,
  GetCropBatchQueryVariables,
} from "@/graphql/generated/graphql";

const useGetCropBatch = (args?: GetCropBatchQueryVariables) => {
  const [getCropBatch, { data, loading, error }] = useLazyQuery<
    GetCropBatchQuery,
    GetCropBatchQueryVariables
  >(GetCropBatch, { variables: args });

  return { getCropBatch, data, loading, error };
};

export default useGetCropBatch;
