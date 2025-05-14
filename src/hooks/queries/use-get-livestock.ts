import { useLazyQuery } from "@apollo/client";

import { GetLivestock } from "@/graphql/queries/get-livestock.graphql";

import type {
  GetLivestockQuery,
  GetLivestockQueryVariables,
} from "@/graphql/generated/graphql";

const useGetLivestock = (args?: GetLivestockQueryVariables) => {
  const [getLivestock, { data, loading, error }] = useLazyQuery<
    GetLivestockQuery,
    GetLivestockQueryVariables
  >(GetLivestock, { variables: args });

  return { getLivestock, data, loading, error };
};
export default useGetLivestock;
