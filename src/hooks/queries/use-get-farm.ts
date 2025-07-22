import { useLazyQuery } from "@apollo/client";

import { GetFarm } from "@/graphql/queries/get-farm.graphql";

import type {
  GetFarmQuery,
  GetFarmQueryVariables,
} from "@/graphql/generated/graphql";

const useGetFarm = (args?: GetFarmQueryVariables) => {
  const [getFarm, { data, loading, error }] = useLazyQuery<
    GetFarmQuery,
    GetFarmQueryVariables
  >(GetFarm, {
    variables: args,
    fetchPolicy: "no-cache",
  });
  return {
    getFarm,
    data: data?.getFarm,
    loading,
    error,
  };
};
export default useGetFarm;
