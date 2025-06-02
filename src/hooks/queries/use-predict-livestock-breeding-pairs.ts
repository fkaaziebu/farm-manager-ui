import { useLazyQuery } from "@apollo/client";

import { LivestockBreedingPairPrediction } from "@/graphql/queries/predict-livestock-breeding-pairs.graphql";

import {
  LivestockBreedingPairPredictionQuery,
  LivestockBreedingPairPredictionQueryVariables,
} from "@/graphql/generated/graphql";

const usePredictLuvestockBreedingPair = (
  args?: LivestockBreedingPairPredictionQueryVariables
) => {
  const [predictLivestockBreedingPair, { loading, error, data }] = useLazyQuery<
    LivestockBreedingPairPredictionQuery,
    LivestockBreedingPairPredictionQueryVariables
  >(LivestockBreedingPairPrediction, {
    variables: args,
  });

  return {
    predictLivestockBreedingPair,
    loading,
    error,
    data,
  };
};

export default usePredictLuvestockBreedingPair;
