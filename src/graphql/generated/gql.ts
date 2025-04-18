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
    "mutation AddBarnsToFarm($farmTag: String!, $barns: [BarnInput!]!) {\n  addBarnsToFarm(farmTag: $farmTag, barns: $barns) {\n    id\n  }\n}": typeof types.AddBarnsToFarmDocument,
    "mutation AddLivestockHealthRecord($livestockTag: String!, $healthRecord: HealthRecordInput!) {\n  addLivestockHealthRecord(\n    livestockTag: $livestockTag\n    healthRecord: $healthRecord\n  ) {\n    id\n  }\n}": typeof types.AddLivestockHealthRecordDocument,
    "mutation AddLivestockToPen($penUnitId: String!, $livestock: [LivestockInput!]!) {\n  addLivestockToPen(penUnitId: $penUnitId, livestock: $livestock) {\n    id\n  }\n}": typeof types.AddLivestockToPenDocument,
    "mutation AddPensToBarn($barnUnitId: String!, $pens: [PenInput!]!) {\n  addPensToBarn(barnUnitId: $barnUnitId, pens: $pens) {\n    id\n  }\n}": typeof types.AddPensToBarnDocument,
    "mutation AddWorkersToFarm($farmTag: String!, $workers: [WorkerInput!]!) {\n  addWorkersToFarm(farmTag: $farmTag, workers: $workers) {\n    id\n  }\n}": typeof types.AddWorkersToFarmDocument,
    "mutation CreateFarm($name: String!, $location: String!, $area: String!, $farmType: FarmType!) {\n  createFarm(name: $name, location: $location, area: $area, farmType: $farmType) {\n    id\n    name\n  }\n}": typeof types.CreateFarmDocument,
    "mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    token\n    name\n    id\n  }\n}": typeof types.LoginAdminDocument,
    "mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n  }\n}": typeof types.RegisterAdminDocument,
    "query GetBarn($barnUnitId: String!) {\n  getBarn(barnUnitId: $barnUnitId) {\n    area_sqm\n    capacity\n    construction_date\n    id\n    name\n    pens {\n      area_sqm\n      bedding_type\n      capacity\n      status\n      unit_id\n      feeder_type\n      livestock {\n        livestock_type\n      }\n      id\n      name\n      waterer_type\n    }\n    ventilation_type\n    status\n  }\n}": typeof types.GetBarnDocument,
    "query ListFarms($searchTerm: String!, $pagination: PaginationInput, $sort: [FarmSortInput!]) {\n  listFarms(searchTerm: $searchTerm, pagination: $pagination, sort: $sort) {\n    edges {\n      node {\n        barns {\n          capacity\n          pens {\n            livestock {\n              weight\n              updated_at\n              birth_date\n              id\n            }\n            id\n            unit_id\n            area_sqm\n            status\n          }\n          id\n          status\n          name\n          area_sqm\n          unit_id\n        }\n        name\n        performance\n        area\n        location\n        livestock {\n          id\n        }\n        workers {\n          id\n        }\n        farm_tag\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}": typeof types.ListFarmsDocument,
};
const documents: Documents = {
    "mutation AddBarnsToFarm($farmTag: String!, $barns: [BarnInput!]!) {\n  addBarnsToFarm(farmTag: $farmTag, barns: $barns) {\n    id\n  }\n}": types.AddBarnsToFarmDocument,
    "mutation AddLivestockHealthRecord($livestockTag: String!, $healthRecord: HealthRecordInput!) {\n  addLivestockHealthRecord(\n    livestockTag: $livestockTag\n    healthRecord: $healthRecord\n  ) {\n    id\n  }\n}": types.AddLivestockHealthRecordDocument,
    "mutation AddLivestockToPen($penUnitId: String!, $livestock: [LivestockInput!]!) {\n  addLivestockToPen(penUnitId: $penUnitId, livestock: $livestock) {\n    id\n  }\n}": types.AddLivestockToPenDocument,
    "mutation AddPensToBarn($barnUnitId: String!, $pens: [PenInput!]!) {\n  addPensToBarn(barnUnitId: $barnUnitId, pens: $pens) {\n    id\n  }\n}": types.AddPensToBarnDocument,
    "mutation AddWorkersToFarm($farmTag: String!, $workers: [WorkerInput!]!) {\n  addWorkersToFarm(farmTag: $farmTag, workers: $workers) {\n    id\n  }\n}": types.AddWorkersToFarmDocument,
    "mutation CreateFarm($name: String!, $location: String!, $area: String!, $farmType: FarmType!) {\n  createFarm(name: $name, location: $location, area: $area, farmType: $farmType) {\n    id\n    name\n  }\n}": types.CreateFarmDocument,
    "mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    token\n    name\n    id\n  }\n}": types.LoginAdminDocument,
    "mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n  }\n}": types.RegisterAdminDocument,
    "query GetBarn($barnUnitId: String!) {\n  getBarn(barnUnitId: $barnUnitId) {\n    area_sqm\n    capacity\n    construction_date\n    id\n    name\n    pens {\n      area_sqm\n      bedding_type\n      capacity\n      status\n      unit_id\n      feeder_type\n      livestock {\n        livestock_type\n      }\n      id\n      name\n      waterer_type\n    }\n    ventilation_type\n    status\n  }\n}": types.GetBarnDocument,
    "query ListFarms($searchTerm: String!, $pagination: PaginationInput, $sort: [FarmSortInput!]) {\n  listFarms(searchTerm: $searchTerm, pagination: $pagination, sort: $sort) {\n    edges {\n      node {\n        barns {\n          capacity\n          pens {\n            livestock {\n              weight\n              updated_at\n              birth_date\n              id\n            }\n            id\n            unit_id\n            area_sqm\n            status\n          }\n          id\n          status\n          name\n          area_sqm\n          unit_id\n        }\n        name\n        performance\n        area\n        location\n        livestock {\n          id\n        }\n        workers {\n          id\n        }\n        farm_tag\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}": types.ListFarmsDocument,
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
export function graphql(source: "mutation AddBarnsToFarm($farmTag: String!, $barns: [BarnInput!]!) {\n  addBarnsToFarm(farmTag: $farmTag, barns: $barns) {\n    id\n  }\n}"): (typeof documents)["mutation AddBarnsToFarm($farmTag: String!, $barns: [BarnInput!]!) {\n  addBarnsToFarm(farmTag: $farmTag, barns: $barns) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddLivestockHealthRecord($livestockTag: String!, $healthRecord: HealthRecordInput!) {\n  addLivestockHealthRecord(\n    livestockTag: $livestockTag\n    healthRecord: $healthRecord\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation AddLivestockHealthRecord($livestockTag: String!, $healthRecord: HealthRecordInput!) {\n  addLivestockHealthRecord(\n    livestockTag: $livestockTag\n    healthRecord: $healthRecord\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddLivestockToPen($penUnitId: String!, $livestock: [LivestockInput!]!) {\n  addLivestockToPen(penUnitId: $penUnitId, livestock: $livestock) {\n    id\n  }\n}"): (typeof documents)["mutation AddLivestockToPen($penUnitId: String!, $livestock: [LivestockInput!]!) {\n  addLivestockToPen(penUnitId: $penUnitId, livestock: $livestock) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddPensToBarn($barnUnitId: String!, $pens: [PenInput!]!) {\n  addPensToBarn(barnUnitId: $barnUnitId, pens: $pens) {\n    id\n  }\n}"): (typeof documents)["mutation AddPensToBarn($barnUnitId: String!, $pens: [PenInput!]!) {\n  addPensToBarn(barnUnitId: $barnUnitId, pens: $pens) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddWorkersToFarm($farmTag: String!, $workers: [WorkerInput!]!) {\n  addWorkersToFarm(farmTag: $farmTag, workers: $workers) {\n    id\n  }\n}"): (typeof documents)["mutation AddWorkersToFarm($farmTag: String!, $workers: [WorkerInput!]!) {\n  addWorkersToFarm(farmTag: $farmTag, workers: $workers) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateFarm($name: String!, $location: String!, $area: String!, $farmType: FarmType!) {\n  createFarm(name: $name, location: $location, area: $area, farmType: $farmType) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateFarm($name: String!, $location: String!, $area: String!, $farmType: FarmType!) {\n  createFarm(name: $name, location: $location, area: $area, farmType: $farmType) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    token\n    name\n    id\n  }\n}"): (typeof documents)["mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    token\n    name\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n  }\n}"): (typeof documents)["mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBarn($barnUnitId: String!) {\n  getBarn(barnUnitId: $barnUnitId) {\n    area_sqm\n    capacity\n    construction_date\n    id\n    name\n    pens {\n      area_sqm\n      bedding_type\n      capacity\n      status\n      unit_id\n      feeder_type\n      livestock {\n        livestock_type\n      }\n      id\n      name\n      waterer_type\n    }\n    ventilation_type\n    status\n  }\n}"): (typeof documents)["query GetBarn($barnUnitId: String!) {\n  getBarn(barnUnitId: $barnUnitId) {\n    area_sqm\n    capacity\n    construction_date\n    id\n    name\n    pens {\n      area_sqm\n      bedding_type\n      capacity\n      status\n      unit_id\n      feeder_type\n      livestock {\n        livestock_type\n      }\n      id\n      name\n      waterer_type\n    }\n    ventilation_type\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListFarms($searchTerm: String!, $pagination: PaginationInput, $sort: [FarmSortInput!]) {\n  listFarms(searchTerm: $searchTerm, pagination: $pagination, sort: $sort) {\n    edges {\n      node {\n        barns {\n          capacity\n          pens {\n            livestock {\n              weight\n              updated_at\n              birth_date\n              id\n            }\n            id\n            unit_id\n            area_sqm\n            status\n          }\n          id\n          status\n          name\n          area_sqm\n          unit_id\n        }\n        name\n        performance\n        area\n        location\n        livestock {\n          id\n        }\n        workers {\n          id\n        }\n        farm_tag\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}"): (typeof documents)["query ListFarms($searchTerm: String!, $pagination: PaginationInput, $sort: [FarmSortInput!]) {\n  listFarms(searchTerm: $searchTerm, pagination: $pagination, sort: $sort) {\n    edges {\n      node {\n        barns {\n          capacity\n          pens {\n            livestock {\n              weight\n              updated_at\n              birth_date\n              id\n            }\n            id\n            unit_id\n            area_sqm\n            status\n          }\n          id\n          status\n          name\n          area_sqm\n          unit_id\n        }\n        name\n        performance\n        area\n        location\n        livestock {\n          id\n        }\n        workers {\n          id\n        }\n        farm_tag\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;