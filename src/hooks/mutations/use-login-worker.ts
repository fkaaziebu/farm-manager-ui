import { useMutation } from "@apollo/client";

import { LoginWorker } from "@/graphql/mutations/login-worker.graphql";

import type {
  LoginWorkerMutation,
  LoginWorkerMutationVariables,
} from "@/graphql/generated/graphql";

const useLoginWorker = () => {
  const [loginWorker, { loading, error }] = useMutation<
    LoginWorkerMutation,
    LoginWorkerMutationVariables
  >(LoginWorker);

  return { loginWorker, loading, error };
};

export default useLoginWorker;
