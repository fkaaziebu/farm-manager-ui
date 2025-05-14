// imports
import {
  split,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

if (process.env.GRAPHQL_BASE_URL === undefined) {
  throw new Error("GRAPHQL_BASE_URL is undefined");
}

if (process.env.GRAPGQL_WS_BASE_URL === undefined) {
  throw new Error("GRAPGQL_WS_BASE_URL is undefined");
}

// apollo http link
const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_BASE_URL,
});

// apollo ws link
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.GRAPGQL_WS_BASE_URL,
    connectionParams() {
      // get the authentication token from local storage if it exists
      const token = sessionStorage.getItem("token");
      // return the connection params sothe ws connects can use them
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// apollo auth link
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// apollo client
const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
