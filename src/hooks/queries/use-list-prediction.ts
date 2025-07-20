import { useLazyQuery } from "@apollo/client";

import { ListPredictions } from "@/graphql/queries/list-predictions.graphql";

import type {
  ListPredictionsQuery,
  ListPredictionsQueryVariables,
} from "@/graphql/generated/graphql";

const useListPredictions = (args?: ListPredictionsQueryVariables) => {
  const [listPredictions, { data, loading, error }] = useLazyQuery<
    ListPredictionsQuery,
    ListPredictionsQueryVariables
  >(ListPredictions, { variables: args });
  return { listPredictions, loading, error, data };
};

export default useListPredictions;
