import { useMutation } from "@apollo/client";

import { LoginAdmin } from "@/graphql/mutations/login-admin.graphql";

import type {
  LoginAdminMutation,
  LoginAdminMutationVariables,
} from "@/graphql/generated/graphql";

const useLoginAdmin = () => {
  const [loginAdmin, { loading, error }] = useMutation<
    LoginAdminMutation,
    LoginAdminMutationVariables
  >(LoginAdmin);

  return { loginAdmin, loading, error };
};

export default useLoginAdmin;
