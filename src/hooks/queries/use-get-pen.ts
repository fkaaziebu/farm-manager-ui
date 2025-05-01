import { useLazyQuery } from "@apollo/client";

import { GetPen } from "@/graphql/queries/get-pen.graphql";

import type {
  GetPenQuery,
  GetPenQueryVariables,
} from "@/graphql/generated/graphql";

const useGetPen = (args?: GetPenQueryVariables) => {
  const [getPen, { data, loading, error }] = useLazyQuery<
    GetPenQuery,
    GetPenQueryVariables
  >(GetPen, { variables: args });

  return {
    getPen,
    data: data?.getPen,
    loading,
    error,
  };
};
export default useGetPen;
