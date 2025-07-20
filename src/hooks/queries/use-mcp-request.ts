import { useLazyQuery } from "@apollo/client";

import { McpRequest } from "@/graphql/queries/mcp-request.graphql";
import type {
  McpRequestQuery,
  McpRequestQueryVariables,
} from "@/graphql/generated/graphql";

const useMcpRequest = (args?: McpRequestQueryVariables) => {
  const [getMcpRequest, { data, loading, error }] = useLazyQuery<
    McpRequestQuery,
    McpRequestQueryVariables
  >(McpRequest, { variables: args });

  return { getMcpRequest, data, loading, error };
};

export default useMcpRequest;
