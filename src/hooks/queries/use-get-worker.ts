import { useLazyQuery } from "@apollo/client";

import { GetWorker } from "@/graphql/queries/get-worker.graphql";

import type {
  GetWorkerQuery,
  GetWorkerQueryVariables,
} from "@/graphql/generated/graphql";

const useGetWorker = (args?: GetWorkerQueryVariables) => {
  const [getWorker, { data, loading, error }] = useLazyQuery<
    GetWorkerQuery,
    GetWorkerQueryVariables
  >(GetWorker, {
    variables: args,
  });
  return {
    getWorker,
    data: data?.getWorker,
    loading,
    error,
  };
};
export default useGetWorker;
