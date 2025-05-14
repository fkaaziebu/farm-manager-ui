import { useLazyQuery } from "@apollo/client";

import { ListBarns } from "@/graphql/queries/list-barns.graphql";

import type {
  ListBarnsQuery,
  ListBarnsQueryVariables,
} from "@/graphql/generated/graphql";

const useListBarns = (args?: ListBarnsQueryVariables) => {
  const [listBarns, { data, loading, error }] = useLazyQuery<
    ListBarnsQuery,
    ListBarnsQueryVariables
  >(ListBarns, {
    variables: args,
  });
  return {
    listBarns,
    data: data?.listBarns,
    loading,
    error,
  };
};
export default useListBarns;
