import { useMutation } from "@apollo/client";

import { RegisterAdmin } from "@/graphql/mutations/register-admin.graphql";
import {
  RegisterAdminMutation,
  RegisterAdminMutationVariables,
} from "@/graphql/generated/graphql";

const useRegisterAdmin = () => {
  const [registerAdmin, { loading, error }] = useMutation<
    RegisterAdminMutation,
    RegisterAdminMutationVariables
  >(RegisterAdmin, {
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  return { registerAdmin, loading, error };
};

export default useRegisterAdmin;
