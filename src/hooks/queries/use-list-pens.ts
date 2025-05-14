import { useLazyQuery } from "@apollo/client";

import { ListPens } from "@/graphql/queries/list-pens.graphql";

import type {
  ListPensQuery,
  ListPensQueryVariables,
} from "@/graphql/generated/graphql";

const useListPens = (args?: ListPensQueryVariables) => {
  const [listPens, { error, loading, data }] = useLazyQuery<
    ListPensQuery,
    ListPensQueryVariables
  >(ListPens, {
    variables: args,
  });

  return {
    listPens,
    loading,
    error,
    data: data?.listPens,
  };
};

export default useListPens;
