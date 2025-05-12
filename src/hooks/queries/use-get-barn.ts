import { useLazyQuery } from "@apollo/client";

import { GetBarn } from "@/graphql/queries/get-barn.graphql";

import type {
  GetBarnQuery,
  GetBarnQueryVariables,
} from "@/graphql/generated/graphql";

const useGetBarn = (args?: GetBarnQueryVariables) => {
  const [getBarn, { data, loading, error }] = useLazyQuery<
    GetBarnQuery,
    GetBarnQueryVariables
  >(GetBarn, {
    variables: args,
    fetchPolicy: "no-cache",
  });
  return {
    getBarn,
    data: data?.getBarn,
    loading,
    error,
  };
};
export default useGetBarn;
