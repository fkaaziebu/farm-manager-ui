import { useLazyQuery } from "@apollo/client";

import { ListLivestock } from "@/graphql/queries/list-livestock.graphql";

import type {
  ListLivestockQuery,
  ListLivestockQueryVariables,
} from "@/graphql/generated/graphql";

const useListLivestocks = (args?: ListLivestockQueryVariables) => {
  const [getLivestocks, { data, loading, error }] = useLazyQuery<
    ListLivestockQuery,
    ListLivestockQueryVariables
  >(ListLivestock, {
    variables: args,
  });

  return {
    getLivestocks,
    data,
    loading,
    error,
  };
};
export default useListLivestocks;
