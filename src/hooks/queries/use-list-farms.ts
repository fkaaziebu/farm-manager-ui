import { useLazyQuery } from "@apollo/client";

import { ListFarms } from "@/graphql/queries/list-farms.graphql";

import type {
  ListFarmsQuery,
  ListFarmsQueryVariables,
} from "@/graphql/generated/graphql";

function useListFarms(args?: ListFarmsQueryVariables) {
  const [listFarms, { data, loading, error }] = useLazyQuery<
    ListFarmsQuery,
    ListFarmsQueryVariables
  >(ListFarms, {
    variables: args,
  });
  return {
    listFarms,
    data: data?.listFarms,
    loading,
    error,
  };
}

export default useListFarms;
