/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateFarm($name: String!, $location: String!, $area: String!) {\n  createFarm(name: $name, location: $location, area: $area) {\n    id\n    name\n  }\n}": typeof types.CreateFarmDocument,
    "query ListFarms($filter: FarmFilterInput, $pagination: PaginationInput, $searchTerm: String, $sort: [FarmSortInput!]) {\n  listFarms(\n    filter: $filter\n    searchTerm: $searchTerm\n    pagination: $pagination\n    sort: $sort\n  ) {\n    count\n    edges {\n      node {\n        id\n        name\n        performance\n        location\n        area\n        admin {\n          id\n          email\n          name\n        }\n        animals {\n          id\n          tag_number\n          type\n          breed\n          health_status\n        }\n        workers {\n          id\n          email\n          name\n          roles\n        }\n        houses {\n          id\n          house_number\n          status\n          rooms {\n            room_number\n            animals {\n              tag_number\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": typeof types.ListFarmsDocument,
};
const documents: Documents = {
    "mutation CreateFarm($name: String!, $location: String!, $area: String!) {\n  createFarm(name: $name, location: $location, area: $area) {\n    id\n    name\n  }\n}": types.CreateFarmDocument,
    "query ListFarms($filter: FarmFilterInput, $pagination: PaginationInput, $searchTerm: String, $sort: [FarmSortInput!]) {\n  listFarms(\n    filter: $filter\n    searchTerm: $searchTerm\n    pagination: $pagination\n    sort: $sort\n  ) {\n    count\n    edges {\n      node {\n        id\n        name\n        performance\n        location\n        area\n        admin {\n          id\n          email\n          name\n        }\n        animals {\n          id\n          tag_number\n          type\n          breed\n          health_status\n        }\n        workers {\n          id\n          email\n          name\n          roles\n        }\n        houses {\n          id\n          house_number\n          status\n          rooms {\n            room_number\n            animals {\n              tag_number\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.ListFarmsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateFarm($name: String!, $location: String!, $area: String!) {\n  createFarm(name: $name, location: $location, area: $area) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateFarm($name: String!, $location: String!, $area: String!) {\n  createFarm(name: $name, location: $location, area: $area) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListFarms($filter: FarmFilterInput, $pagination: PaginationInput, $searchTerm: String, $sort: [FarmSortInput!]) {\n  listFarms(\n    filter: $filter\n    searchTerm: $searchTerm\n    pagination: $pagination\n    sort: $sort\n  ) {\n    count\n    edges {\n      node {\n        id\n        name\n        performance\n        location\n        area\n        admin {\n          id\n          email\n          name\n        }\n        animals {\n          id\n          tag_number\n          type\n          breed\n          health_status\n        }\n        workers {\n          id\n          email\n          name\n          roles\n        }\n        houses {\n          id\n          house_number\n          status\n          rooms {\n            room_number\n            animals {\n              tag_number\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query ListFarms($filter: FarmFilterInput, $pagination: PaginationInput, $searchTerm: String, $sort: [FarmSortInput!]) {\n  listFarms(\n    filter: $filter\n    searchTerm: $searchTerm\n    pagination: $pagination\n    sort: $sort\n  ) {\n    count\n    edges {\n      node {\n        id\n        name\n        performance\n        location\n        area\n        admin {\n          id\n          email\n          name\n        }\n        animals {\n          id\n          tag_number\n          type\n          breed\n          health_status\n        }\n        workers {\n          id\n          email\n          name\n          roles\n        }\n        houses {\n          id\n          house_number\n          status\n          rooms {\n            room_number\n            animals {\n              tag_number\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;