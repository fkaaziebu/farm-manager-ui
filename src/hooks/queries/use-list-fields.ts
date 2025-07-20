// import { useQuery } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";

import { ListFields } from "@/graphql/queries/list-fields.graphql";

import type {
  ListFieldsQuery,
  ListFieldsQueryVariables,
} from "@/graphql/generated/graphql";

function useListFields(args?: ListFieldsQueryVariables) {
  const [listFields, { data, loading, error }] = useLazyQuery<
    ListFieldsQuery,
    ListFieldsQueryVariables
  >(ListFields, {
    variables: args,
    fetchPolicy: "no-cache",
  });
  return {
    listFields,
    data: data?.listFields,
    loading,
    error,
  };
}

// function useFetchFields(args?: ListFieldsQueryVariables) {
//   const { data, loading, error } = useQuery<
//     ListFieldsQuery,
//     ListFieldsQueryVariables
//   >(ListFields, {
//     variables: args,
//     fetchPolicy: "no-cache",
//   });

//   return {
//     fields: data?.listFields,
//     loadingFields: loading,
//     errorFields: error,
//   };
// }

export default useListFields;
