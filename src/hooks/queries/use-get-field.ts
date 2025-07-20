import { useLazyQuery } from "@apollo/client";

import { GetField } from "@/graphql/queries/get-field.graphql";

import type {
  GetFieldQuery,
  GetFieldQueryVariables,
} from "@/graphql/generated/graphql";

const useGetField = (args?: GetFieldQueryVariables) => {
  const [getField, { data, loading, error }] = useLazyQuery<
    GetFieldQuery,
    GetFieldQueryVariables
  >(GetField, {
    variables: args,
  });

  return {
    getField,
    data: data?.getField,
    loading,
    error,
  };
};

export default useGetField;
