/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  workers?: Maybe<Array<Worker>>;
};

export type AdminFilterInput = {
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
};

export type Animal = {
  __typename?: 'Animal';
  available: Scalars['Boolean']['output'];
  birth_date: Scalars['DateTime']['output'];
  breed: Scalars['String']['output'];
  breeding_records?: Maybe<Array<BreedingRecord>>;
  direct_children?: Maybe<Array<Animal>>;
  direct_parents?: Maybe<Array<Animal>>;
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  gender: Scalars['String']['output'];
  growth_records?: Maybe<Array<GrowthRecord>>;
  health_records?: Maybe<Array<HealthRecord>>;
  health_status: HealthStatus;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  room?: Maybe<Room>;
  sales_record?: Maybe<SalesRecord>;
  tag_number: Scalars['String']['output'];
  type: Type;
  updated_at: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
};

export type AnimalFilterInput = {
  available?: InputMaybe<BooleanFilterInput>;
  birth_date?: InputMaybe<DateFilterInput>;
  breed?: InputMaybe<StringFilterInput>;
  gender?: InputMaybe<StringFilterInput>;
  health_status?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IntFilterInput>;
  tag_number?: InputMaybe<StringFilterInput>;
  weight?: InputMaybe<IntFilterInput>;
};

export type BooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BreedingRecord = {
  __typename?: 'BreedingRecord';
  actual_delivery?: Maybe<Scalars['DateTime']['output']>;
  animals?: Maybe<Array<Animal>>;
  expected_delivery: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  liter_size?: Maybe<Scalars['Float']['output']>;
  mating_date: Scalars['DateTime']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  status: BreedingStatus;
};

export enum BreedingStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Successful = 'SUCCESSFUL'
}

export type DateFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  greaterThan?: InputMaybe<Scalars['DateTime']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['DateTime']['input']>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['DateTime']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['DateTime']['input']>;
  notEq?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum ExpenseCategory {
  Breeding = 'BREEDING',
  Feed = 'FEED',
  Grooming = 'GROOMING',
  Identification = 'IDENTIFICATION',
  Medical = 'MEDICAL',
  Other = 'OTHER',
  Quarantine = 'QUARANTINE',
  SpecialHousing = 'SPECIAL_HOUSING',
  Supplements = 'SUPPLEMENTS',
  Testing = 'TESTING',
  Transport = 'TRANSPORT',
  Vaccination = 'VACCINATION'
}

export type ExpenseRecord = {
  __typename?: 'ExpenseRecord';
  amount: Scalars['Float']['output'];
  animal?: Maybe<Animal>;
  category: ExpenseCategory;
  expense_date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
};

export type Farm = {
  __typename?: 'Farm';
  admin?: Maybe<Admin>;
  animals?: Maybe<Array<Animal>>;
  area: Scalars['String']['output'];
  houses?: Maybe<Array<House>>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  performance: Scalars['Float']['output'];
  workers?: Maybe<Array<Worker>>;
};

export type FarmConnection = {
  __typename?: 'FarmConnection';
  count: Scalars['Int']['output'];
  edges: Array<FarmTypeEdge>;
  pageInfo: PageInfo;
};

export type FarmFilterInput = {
  admin?: InputMaybe<AdminFilterInput>;
  animal?: InputMaybe<AnimalFilterInput>;
  animalCount?: InputMaybe<IntFilterInput>;
  house?: InputMaybe<HouseFilterInput>;
  houseCount?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  worker?: InputMaybe<WorkerFilterInput>;
  workerCount?: InputMaybe<IntFilterInput>;
};

export enum FarmSortField {
  Id = 'ID',
  InsertedAt = 'INSERTED_AT',
  Name = 'NAME'
}

export type FarmSortInput = {
  direction: SortDirection;
  field: FarmSortField;
};

export type FarmTypeEdge = {
  __typename?: 'FarmTypeEdge';
  cursor: Scalars['String']['output'];
  node: Farm;
};

export enum GrowthPeriod {
  Adulthood = 'ADULTHOOD',
  Birth = 'BIRTH',
  EightWeeks = 'EIGHT_WEEKS',
  FourWeeks = 'FOUR_WEEKS'
}

export type GrowthRecord = {
  __typename?: 'GrowthRecord';
  animal?: Maybe<Animal>;
  growth_rate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
  period: GrowthPeriod;
};

export type HealthRecord = {
  __typename?: 'HealthRecord';
  animal?: Maybe<Animal>;
  cost: Scalars['Float']['output'];
  diagnosis: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  issue: Scalars['String']['output'];
  medication: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  symptoms: Scalars['String']['output'];
  vet_name: Scalars['String']['output'];
};

export enum HealthStatus {
  Critical = 'CRITICAL',
  Healthy = 'HEALTHY',
  Recovering = 'RECOVERING',
  Sick = 'SICK',
  Treated = 'TREATED'
}

export type House = {
  __typename?: 'House';
  farm?: Maybe<Farm>;
  house_number: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rooms?: Maybe<Array<Room>>;
  status: HouseStatus;
  type: Scalars['String']['output'];
};

export type HouseFilterInput = {
  house_number?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IntFilterInput>;
};

export enum HouseStatus {
  Maintenance = 'MAINTENANCE',
  Operational = 'OPERATIONAL'
}

export type IntFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  notEq?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFarm: Farm;
};


export type MutationCreateFarmArgs = {
  area: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginationInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  listFarms: FarmConnection;
};


export type QueryListFarmsArgs = {
  filter?: InputMaybe<FarmFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<FarmSortInput>>;
};

export type Room = {
  __typename?: 'Room';
  animals?: Maybe<Array<Animal>>;
  house?: Maybe<House>;
  id: Scalars['ID']['output'];
  room_number: Scalars['String']['output'];
};

export type SalesRecord = {
  __typename?: 'SalesRecord';
  animal?: Maybe<Animal>;
  buyer_name: Scalars['String']['output'];
  expenses?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
  price_sold: Scalars['Float']['output'];
  sale_date: Scalars['DateTime']['output'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringFilterInput = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum Type {
  Cattle = 'CATTLE',
  Goat = 'GOAT',
  Grasscutter = 'GRASSCUTTER'
}

export type Worker = {
  __typename?: 'Worker';
  admin?: Maybe<Admin>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<WorkerRole>;
};

export type WorkerFilterInput = {
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
};

export enum WorkerRole {
  AnimalCaretaker = 'ANIMAL_CARETAKER',
  FarmManager = 'FARM_MANAGER',
  FeedSpecialist = 'FEED_SPECIALIST',
  Veterinarian = 'VETERINARIAN'
}

export type CreateFarmMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  area: Scalars['String']['input'];
}>;


export type CreateFarmMutation = { __typename?: 'Mutation', createFarm: { __typename?: 'Farm', id: string, name: string } };

export type ListFarmsQueryVariables = Exact<{
  filter?: InputMaybe<FarmFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<FarmSortInput> | FarmSortInput>;
}>;


export type ListFarmsQuery = { __typename?: 'Query', listFarms: { __typename?: 'FarmConnection', count: number, edges: Array<{ __typename?: 'FarmTypeEdge', node: { __typename?: 'Farm', id: string, name: string, performance: number, location: string, area: string, admin?: { __typename?: 'Admin', id: string, email: string, name: string } | null, animals?: Array<{ __typename?: 'Animal', id: string, tag_number: string, type: Type, breed: string, health_status: HealthStatus }> | null, workers?: Array<{ __typename?: 'Worker', id: string, email: string, name: string, roles: Array<WorkerRole> }> | null, houses?: Array<{ __typename?: 'House', id: string, house_number: string, status: HouseStatus, rooms?: Array<{ __typename?: 'Room', room_number: string, animals?: Array<{ __typename?: 'Animal', tag_number: string }> | null }> | null }> | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const CreateFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"area"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"area"},"value":{"kind":"Variable","name":{"kind":"Name","value":"area"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateFarmMutation, CreateFarmMutationVariables>;
export const ListFarmsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFarms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFarms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag_number"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"breed"}},{"kind":"Field","name":{"kind":"Name","value":"health_status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}},{"kind":"Field","name":{"kind":"Name","value":"houses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"house_number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room_number"}},{"kind":"Field","name":{"kind":"Name","value":"animals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag_number"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ListFarmsQuery, ListFarmsQueryVariables>;