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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AcceptRequestResponse = {
  __typename?: 'AcceptRequestResponse';
  code: Scalars['Float']['output'];
  message: Scalars['String']['output'];
};

export type Admin = {
  __typename?: 'Admin';
  assigned_tasks?: Maybe<Array<Task>>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  workers?: Maybe<Array<Worker>>;
};

export type AdminAuthResponse = {
  __typename?: 'AdminAuthResponse';
  assigned_tasks?: Maybe<Array<Task>>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  token: Scalars['String']['output'];
  workers?: Maybe<Array<Worker>>;
};

export type Apiary = {
  __typename?: 'Apiary';
  area_sqm: Scalars['Float']['output'];
  capacity: Scalars['Float']['output'];
  gps_coordinates?: Maybe<Scalars['JSON']['output']>;
  hives?: Maybe<Array<Hive>>;
  id: Scalars['ID']['output'];
  location_features?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nearby_flora?: Maybe<Scalars['JSON']['output']>;
  status: HousingStatus;
  sun_exposure?: Maybe<Scalars['String']['output']>;
  unit_id: Scalars['String']['output'];
  water_source?: Maybe<Scalars['String']['output']>;
  wind_protection?: Maybe<Scalars['String']['output']>;
};

export type AquacultureBatch = {
  __typename?: 'AquacultureBatch';
  aquatic_type: AquaticType;
  average_weight: Scalars['Float']['output'];
  batch_id: Scalars['String']['output'];
  current_count: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  feed_consumption_kg: Scalars['Float']['output'];
  feed_conversion_ratio: Scalars['Float']['output'];
  growth_records?: Maybe<Array<GrowthRecord>>;
  harvested_count: Scalars['Float']['output'];
  health_records?: Maybe<Array<HealthRecord>>;
  health_status: BatchHealthStatus;
  id: Scalars['ID']['output'];
  initial_count: Scalars['Float']['output'];
  inserted_at: Scalars['DateTime']['output'];
  mortality_count: Scalars['Float']['output'];
  pond?: Maybe<Pond>;
  sales_records?: Maybe<Array<SalesRecord>>;
  species: Scalars['String']['output'];
  stocking_date: Scalars['DateTime']['output'];
  stocking_density: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  water_parameters?: Maybe<Scalars['JSON']['output']>;
  water_type: WaterType;
};

export type AquacultureSystem = {
  __typename?: 'AquacultureSystem';
  aeration_method?: Maybe<Scalars['String']['output']>;
  capacity: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  filtration_method?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ponds?: Maybe<Array<Pond>>;
  status: HousingStatus;
  system_type: AquacultureSystemType;
  total_water_volume: Scalars['Float']['output'];
  unit_id: Scalars['String']['output'];
  water_source?: Maybe<Scalars['String']['output']>;
};

/** Type of aquaculture system */
export enum AquacultureSystemType {
  Aquaponics = 'AQUAPONICS',
  Biofloc = 'BIOFLOC',
  Cage = 'CAGE',
  Pond = 'POND',
  Raceway = 'RACEWAY',
  Ras = 'RAS'
}

/** Type of aquatic animal */
export enum AquaticType {
  Crab = 'CRAB',
  Fish = 'FISH',
  Other = 'OTHER',
  Oyster = 'OYSTER',
  Shrimp = 'SHRIMP'
}

export type Barn = {
  __typename?: 'Barn';
  area_sqm: Scalars['Float']['output'];
  building_material?: Maybe<Scalars['String']['output']>;
  capacity: Scalars['Float']['output'];
  climate_controlled: Scalars['Boolean']['output'];
  construction_date?: Maybe<Scalars['DateTime']['output']>;
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pens?: Maybe<Array<Pen>>;
  status: HousingStatus;
  tasks?: Maybe<Array<TaskType>>;
  unit_id: Scalars['String']['output'];
  ventilation_type?: Maybe<Scalars['String']['output']>;
};

export type BarnConnection = {
  __typename?: 'BarnConnection';
  count: Scalars['Int']['output'];
  edges: Array<BarnTypeEdge>;
  pageInfo: PageInfo;
};

export type BarnInput = {
  areaSqm: Scalars['Float']['input'];
  buildingMaterial?: InputMaybe<Scalars['String']['input']>;
  capacity: Scalars['Float']['input'];
  climateControlled: Scalars['Boolean']['input'];
  constructionDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  unitId: Scalars['String']['input'];
  ventilationType?: InputMaybe<Scalars['String']['input']>;
};

export enum BarnSortField {
  Id = 'ID',
  Name = 'NAME',
  Status = 'STATUS'
}

export type BarnSortInput = {
  direction: SortDirection;
  field: BarnSortField;
};

export type BarnTypeEdge = {
  __typename?: 'BarnTypeEdge';
  cursor: Scalars['String']['output'];
  node: Barn;
};

/** Health status of an animal batch */
export enum BatchHealthStatus {
  Healthy = 'HEALTHY',
  MinorIssues = 'MINOR_ISSUES',
  Outbreak = 'OUTBREAK',
  Quarantined = 'QUARANTINED',
  Recovering = 'RECOVERING'
}

export type BreedingPairPredictionResponse = {
  __typename?: 'BreedingPairPredictionResponse';
  breedingPairs: Array<Livestock>;
  description: Scalars['String']['output'];
};

export type BreedingRecord = {
  __typename?: 'BreedingRecord';
  actual_delivery?: Maybe<Scalars['DateTime']['output']>;
  animals?: Maybe<Array<Livestock>>;
  breeding_method?: Maybe<Scalars['JSON']['output']>;
  cost: Scalars['Float']['output'];
  expected_delivery: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  litter_size?: Maybe<Scalars['Float']['output']>;
  mating_date: Scalars['DateTime']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  offspring_count_female?: Maybe<Scalars['Float']['output']>;
  offspring_count_male?: Maybe<Scalars['Float']['output']>;
  status: BreedingStatus;
  updated_at: Scalars['DateTime']['output'];
};

export type BreedingRecordInput = {
  breedingMethod?: InputMaybe<Scalars['JSON']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  expectedDelivery: Scalars['DateTime']['input'];
  matingDate: Scalars['DateTime']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  status: BreedingStatus;
};

/** Status of a breeding record */
export enum BreedingStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Planned = 'PLANNED',
  Successful = 'SUCCESSFUL'
}

export type Coop = {
  __typename?: 'Coop';
  area_sqm: Scalars['Float']['output'];
  capacity: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  feeder_type?: Maybe<Scalars['String']['output']>;
  floor_type?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nest_boxes: Scalars['Float']['output'];
  poultryHouse?: Maybe<PoultryHouse>;
  poultry_batches?: Maybe<Array<PoultryBatch>>;
  status: HousingStatus;
  unit_id: Scalars['String']['output'];
  waterer_type?: Maybe<Scalars['String']['output']>;
};

export type CoordinatesInput = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

export type CropBatch = {
  __typename?: 'CropBatch';
  actual_yield: Scalars['Float']['output'];
  area_planted: Scalars['Float']['output'];
  area_unit: Scalars['String']['output'];
  batch_id: Scalars['String']['output'];
  crop_type: CropType;
  expected_yield: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  fertilizer_applications?: Maybe<Scalars['JSON']['output']>;
  field?: Maybe<Field>;
  greenhouse?: Maybe<Greenhouse>;
  harvest_date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  irrigation_method: IrrigationMethod;
  name: Scalars['String']['output'];
  pesticide_applications?: Maybe<Scalars['JSON']['output']>;
  planting_date: Scalars['DateTime']['output'];
  planting_method: PlantingMethod;
  plants_count: Scalars['Float']['output'];
  sales_records?: Maybe<Array<SalesRecord>>;
  seed_amount: Scalars['Float']['output'];
  seed_unit: Scalars['String']['output'];
  status: CropStatus;
  updated_at: Scalars['DateTime']['output'];
  variety: Scalars['String']['output'];
  weather_conditions?: Maybe<Scalars['JSON']['output']>;
  yield_unit: Scalars['String']['output'];
};

/** Growth status of a crop */
export enum CropStatus {
  Failed = 'FAILED',
  Flowering = 'FLOWERING',
  Fruiting = 'FRUITING',
  Growing = 'GROWING',
  Harvested = 'HARVESTED',
  ReadyForHarvest = 'READY_FOR_HARVEST',
  Seedling = 'SEEDLING'
}

/** Type of crop */
export enum CropType {
  Fiber = 'FIBER',
  Fodder = 'FODDER',
  Fruit = 'FRUIT',
  Grain = 'GRAIN',
  Herb = 'HERB',
  Legume = 'LEGUME',
  Oil = 'OIL',
  Other = 'OTHER',
  Root = 'ROOT',
  Spice = 'SPICE',
  Tuber = 'TUBER',
  Vegetable = 'VEGETABLE'
}

/** Category of farm expense */
export enum ExpenseCategory {
  Bedding = 'BEDDING',
  Breeding = 'BREEDING',
  Cleaning = 'CLEANING',
  Equipment = 'EQUIPMENT',
  Feed = 'FEED',
  Fertilizer = 'FERTILIZER',
  Grooming = 'GROOMING',
  Harvesting = 'HARVESTING',
  Herbicide = 'HERBICIDE',
  Housing = 'HOUSING',
  Identification = 'IDENTIFICATION',
  Irrigation = 'IRRIGATION',
  Labor = 'LABOR',
  Maintenance = 'MAINTENANCE',
  Medical = 'MEDICAL',
  Other = 'OTHER',
  Pesticide = 'PESTICIDE',
  Seeds = 'SEEDS',
  Supplements = 'SUPPLEMENTS',
  Testing = 'TESTING',
  Transport = 'TRANSPORT',
  Utilities = 'UTILITIES',
  Vaccination = 'VACCINATION'
}

export type ExpenseRecord = {
  __typename?: 'ExpenseRecord';
  amount: Scalars['Float']['output'];
  apiary?: Maybe<Apiary>;
  aquaculture_batch?: Maybe<AquacultureBatch>;
  aquaculture_system?: Maybe<AquacultureSystem>;
  barn?: Maybe<Barn>;
  category: ExpenseCategory;
  coop?: Maybe<Coop>;
  crop_batch?: Maybe<CropBatch>;
  expense_date: Scalars['DateTime']['output'];
  field?: Maybe<Field>;
  greenhouse?: Maybe<Greenhouse>;
  hive?: Maybe<Hive>;
  id: Scalars['ID']['output'];
  livestock?: Maybe<Livestock>;
  notes: Scalars['String']['output'];
  pen?: Maybe<Pen>;
  pond?: Maybe<Pond>;
  poultry_batch?: Maybe<PoultryBatch>;
  poultry_house?: Maybe<PoultryHouse>;
};

export type ExpenseRecordInput = {
  amount: Scalars['Float']['input'];
  category: ExpenseCategory;
  expenseDate: Scalars['DateTime']['input'];
  notes: Scalars['String']['input'];
};

export type Farm = {
  __typename?: 'Farm';
  admin?: Maybe<Admin>;
  apiaries?: Maybe<Array<Apiary>>;
  aquaculture_batches?: Maybe<Array<AquacultureBatch>>;
  aquaculture_systems?: Maybe<Array<AquacultureSystem>>;
  area?: Maybe<Scalars['String']['output']>;
  barns?: Maybe<Array<Barn>>;
  coops?: Maybe<Array<Coop>>;
  crop_batches?: Maybe<Array<CropBatch>>;
  farm_tag: Scalars['String']['output'];
  farm_type: FarmType;
  fields?: Maybe<Array<Field>>;
  greenhouses?: Maybe<Array<Greenhouse>>;
  hives?: Maybe<Array<Hive>>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  livestock?: Maybe<Array<Livestock>>;
  location?: Maybe<Scalars['String']['output']>;
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  pens?: Maybe<Array<Pen>>;
  performance: Scalars['Float']['output'];
  ponds?: Maybe<Array<Pond>>;
  poultry_batches?: Maybe<Array<PoultryBatch>>;
  poultry_houses?: Maybe<Array<PoultryHouse>>;
  reports?: Maybe<Array<Report>>;
  tasks?: Maybe<Array<Task>>;
  workers?: Maybe<Array<Worker>>;
};

export type FarmConnection = {
  __typename?: 'FarmConnection';
  count: Scalars['Int']['output'];
  edges: Array<FarmTypeClassEdge>;
  pageInfo: PageInfo;
};

export type FarmFilterInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
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

/** Type of farm operation */
export enum FarmType {
  Apiary = 'APIARY',
  Aquaculture = 'AQUACULTURE',
  Crop = 'CROP',
  Livestock = 'LIVESTOCK',
  Mixed = 'MIXED',
  Poultry = 'POULTRY'
}

export type FarmTypeClassEdge = {
  __typename?: 'FarmTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: Farm;
};

export type Field = {
  __typename?: 'Field';
  area_hectares: Scalars['Float']['output'];
  capacity: Scalars['Float']['output'];
  crop_batches?: Maybe<Array<CropBatch>>;
  drainage?: Maybe<Scalars['String']['output']>;
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  gps_coordinates?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  irrigation_type?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  previous_crop?: Maybe<Scalars['String']['output']>;
  slope?: Maybe<Scalars['String']['output']>;
  soil_test_results?: Maybe<Scalars['JSON']['output']>;
  soil_type?: Maybe<Scalars['String']['output']>;
  status: HousingStatus;
  unit_id: Scalars['String']['output'];
};

export type Greenhouse = {
  __typename?: 'Greenhouse';
  area_sqm: Scalars['Float']['output'];
  capacity: Scalars['Float']['output'];
  climate_controlled: Scalars['Boolean']['output'];
  construction_date?: Maybe<Scalars['DateTime']['output']>;
  covering_material?: Maybe<Scalars['String']['output']>;
  crop_batches?: Maybe<Array<CropBatch>>;
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  irrigation_system?: Maybe<Scalars['String']['output']>;
  lighting_system?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: HousingStatus;
  temperature_control?: Maybe<Scalars['String']['output']>;
  unit_id: Scalars['String']['output'];
  ventilation_system?: Maybe<Scalars['String']['output']>;
};

export type Group = {
  __typename?: 'Group';
  admin?: Maybe<Admin>;
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  requests?: Maybe<Array<Request>>;
  workers?: Maybe<Array<Worker>>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  count: Scalars['Int']['output'];
  edges: Array<GroupTypeEdge>;
  pageInfo: PageInfo;
};

export type GroupTypeEdge = {
  __typename?: 'GroupTypeEdge';
  cursor: Scalars['String']['output'];
  node: Group;
};

/** Period of growth record measurement */
export enum GrowthPeriod {
  Adulthood = 'ADULTHOOD',
  Birth = 'BIRTH',
  Custom = 'CUSTOM',
  EightWeeks = 'EIGHT_WEEKS',
  FourWeeks = 'FOUR_WEEKS',
  SixteenWeeks = 'SIXTEEN_WEEKS',
  TwelveWeeks = 'TWELVE_WEEKS',
  TwentyWeeks = 'TWENTY_WEEKS'
}

export type GrowthRecord = {
  __typename?: 'GrowthRecord';
  aquaculture_batch?: Maybe<AquacultureBatch>;
  feed_consumption?: Maybe<Scalars['Float']['output']>;
  feed_conversion?: Maybe<Scalars['Float']['output']>;
  growth_rate?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  livestock?: Maybe<Livestock>;
  notes: Scalars['String']['output'];
  period: GrowthPeriod;
  poultry_batch?: Maybe<PoultryBatch>;
  record_date: Scalars['DateTime']['output'];
  record_type: GrowthRecordType;
  weight: Scalars['Float']['output'];
};

export type GrowthRecordInput = {
  feedConsumption?: InputMaybe<Scalars['Float']['input']>;
  growthRate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes: Scalars['String']['input'];
  period: GrowthPeriod;
  recordDate: Scalars['DateTime']['input'];
  recordType?: InputMaybe<GrowthRecordType>;
  weight: Scalars['Float']['input'];
};

/** Type of growth record (individual or batch) */
export enum GrowthRecordType {
  Batch = 'BATCH',
  Individual = 'INDIVIDUAL'
}

export type HealthRecord = {
  __typename?: 'HealthRecord';
  aquaculture_batch?: Maybe<AquacultureBatch>;
  cost: Scalars['Float']['output'];
  diagnosis: Scalars['String']['output'];
  dosage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issue: Scalars['String']['output'];
  livestock?: Maybe<Livestock>;
  medication?: Maybe<Scalars['String']['output']>;
  notes: Scalars['String']['output'];
  poultry_batch?: Maybe<PoultryBatch>;
  record_date: Scalars['DateTime']['output'];
  record_status: HealthRecordStatus;
  record_type: HealthRecordType;
  symptoms: Scalars['String']['output'];
  treatment: Scalars['String']['output'];
  vet_name?: Maybe<Scalars['String']['output']>;
};

export type HealthRecordInput = {
  cost: Scalars['Float']['input'];
  diagnosis: Scalars['String']['input'];
  dosage?: InputMaybe<Scalars['String']['input']>;
  issue: Scalars['String']['input'];
  medication?: InputMaybe<Scalars['String']['input']>;
  notes: Scalars['String']['input'];
  recordDate: Scalars['DateTime']['input'];
  recordStatus: HealthRecordStatus;
  symptoms: Scalars['String']['input'];
  treatment: Scalars['String']['input'];
  vetName?: InputMaybe<Scalars['String']['input']>;
};

/** Status of health record (individual or batch) */
export enum HealthRecordStatus {
  Critical = 'CRITICAL',
  Healthy = 'HEALTHY',
  Recovering = 'RECOVERING',
  Sick = 'SICK',
  Treated = 'TREATED'
}

/** Type of health record (individual or batch) */
export enum HealthRecordType {
  Batch = 'BATCH',
  Individual = 'INDIVIDUAL'
}

/** Health status of an animal */
export enum HealthStatus {
  Critical = 'CRITICAL',
  Healthy = 'HEALTHY',
  Recovering = 'RECOVERING',
  Sick = 'SICK',
  Treated = 'TREATED'
}

export type Hive = {
  __typename?: 'Hive';
  apiary?: Maybe<Apiary>;
  bee_population: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  hive_id: Scalars['String']['output'];
  honey_production: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  last_inspection?: Maybe<Scalars['DateTime']['output']>;
  pollen_collection: Scalars['Float']['output'];
  queen_age: Scalars['Float']['output'];
  sales_record?: Maybe<SalesRecord>;
  status: HiveStatus;
  updated_at: Scalars['DateTime']['output'];
  wax_production: Scalars['Float']['output'];
};

/** Status of a beehive */
export enum HiveStatus {
  Active = 'ACTIVE',
  Collapsed = 'COLLAPSED',
  Strong = 'STRONG',
  Swarming = 'SWARMING',
  Weak = 'WEAK'
}

/** Status of a housing unit */
export enum HousingStatus {
  Empty = 'EMPTY',
  Full = 'FULL',
  Maintenance = 'MAINTENANCE',
  Operational = 'OPERATIONAL'
}

/** Method used for irrigation */
export enum IrrigationMethod {
  Drip = 'DRIP',
  Flood = 'FLOOD',
  Furrow = 'FURROW',
  Manual = 'MANUAL',
  RainFed = 'RAIN_FED',
  Sprinkler = 'SPRINKLER'
}

export type Livestock = {
  __typename?: 'Livestock';
  availability_status?: Maybe<LivestockAvailabilityStatus>;
  birth_date: Scalars['DateTime']['output'];
  breed: Scalars['String']['output'];
  breeding_records?: Maybe<Array<BreedingRecord>>;
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  father?: Maybe<Livestock>;
  gender: LivestockGender;
  growth_records?: Maybe<Array<GrowthRecord>>;
  health_records?: Maybe<Array<HealthRecord>>;
  health_status: HealthStatus;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  livestock_tag: Scalars['String']['output'];
  livestock_type: LivestockType;
  maternalOffspring?: Maybe<Array<Livestock>>;
  meat_grade?: Maybe<Scalars['String']['output']>;
  milk_production?: Maybe<Scalars['Float']['output']>;
  mother?: Maybe<Livestock>;
  paternalOffspring?: Maybe<Array<Livestock>>;
  pen?: Maybe<Pen>;
  unavailability_reason?: Maybe<LivestockUnavailabilityReason>;
  updated_at: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
};

/** Shows animal availability */
export enum LivestockAvailabilityStatus {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE'
}

export type LivestockConnection = {
  __typename?: 'LivestockConnection';
  count: Scalars['Int']['output'];
  edges: Array<LivestockTypeClassEdge>;
  pageInfo: PageInfo;
};

export type LivestockFilterInput = {
  livestock_type?: InputMaybe<LivestockType>;
};

/** Gender of an animal */
export enum LivestockGender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type LivestockInput = {
  birthDate: Scalars['DateTime']['input'];
  breed: Scalars['String']['input'];
  gender: LivestockGender;
  livestockTag?: InputMaybe<Scalars['String']['input']>;
  livestockType: LivestockType;
  weight: Scalars['Float']['input'];
};

export enum LivestockSortField {
  Id = 'ID',
  LivestockType = 'LIVESTOCK_TYPE'
}

export type LivestockSortInput = {
  direction: SortDirection;
  field: LivestockSortField;
};

/** Type of livestock animal */
export enum LivestockType {
  Cattle = 'CATTLE',
  Goat = 'GOAT',
  Grasscutter = 'GRASSCUTTER',
  Other = 'OTHER',
  Pig = 'PIG',
  Sheep = 'SHEEP'
}

export type LivestockTypeClassEdge = {
  __typename?: 'LivestockTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: Livestock;
};

/** Shows animal unavailability reason */
export enum LivestockUnavailabilityReason {
  Dead = 'DEAD',
  NotApplicable = 'NOT_APPLICABLE',
  Sold = 'SOLD'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest: AcceptRequestResponse;
  addBarnsToFarm: Farm;
  addLivestockBreedingRecord: BreedingRecord;
  addLivestockExpenseRecord: ExpenseRecord;
  addLivestockGrowthRecord: GrowthRecord;
  addLivestockHealthRecord: HealthRecord;
  addLivestockSalesRecord: SalesRecord;
  addLivestockToPen: Pen;
  addPensToBarn: Barn;
  addWorkerReview: Review;
  addWorkersToFarm: Farm;
  assignTaskToWorker: Task;
  assignWorkersToFarm: Farm;
  completeReport: Report;
  createAuditor: Worker;
  createFarm: Farm;
  createGroup: Group;
  createReport: Report;
  createTask: Task;
  loginAdmin: AdminAuthResponse;
  loginWorker: WorkerAuthResponse;
  markLivestockAsUnavailable: Livestock;
  registerAdmin: Admin;
  requestAdminPasswordReset: RequestResetResponse;
  requestFarmsToJoinGroup: RequestToJoinResponse;
  requestWorkerPasswordReset: RequestResetResponse;
  requestWorkersToJoinGroup: RequestToJoinResponse;
  resetAdminPassword: ResetResponse;
  resetWorkerPassword: ResetResponse;
  updateBarn: Barn;
  updateFarm: Farm;
  updateLivestock: Livestock;
  updateLivestockBreedingRecord: BreedingRecord;
  updateLivestockExpenseRecord: ExpenseRecord;
  updateLivestockGrowthRecord: GrowthRecord;
  updateLivestockHealthRecord: HealthRecord;
  updateLivestockSalesRecord: SalesRecord;
  updatePen: Pen;
  updateReport: Report;
  updateTask: Task;
  updateTaskProgress: Task;
  updateWorker: Worker;
  verifyReport: Report;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationAddBarnsToFarmArgs = {
  barns: Array<BarnInput>;
  farmTag: Scalars['String']['input'];
};


export type MutationAddLivestockBreedingRecordArgs = {
  breedingRecord: BreedingRecordInput;
  femaleLivestockTag: Scalars['String']['input'];
  maleLivestockTag: Scalars['String']['input'];
};


export type MutationAddLivestockExpenseRecordArgs = {
  expenseRecord: ExpenseRecordInput;
  livestockTag: Scalars['String']['input'];
};


export type MutationAddLivestockGrowthRecordArgs = {
  growthRecord: GrowthRecordInput;
  livestockTag: Scalars['String']['input'];
};


export type MutationAddLivestockHealthRecordArgs = {
  healthRecord: HealthRecordInput;
  livestockTag: Scalars['String']['input'];
};


export type MutationAddLivestockSalesRecordArgs = {
  livestockTag: Scalars['String']['input'];
  salesRecord: SalesRecordInput;
};


export type MutationAddLivestockToPenArgs = {
  livestock: Array<LivestockInput>;
  penUnitId: Scalars['String']['input'];
};


export type MutationAddPensToBarnArgs = {
  barnUnitId: Scalars['String']['input'];
  pens: Array<PenInput>;
};


export type MutationAddWorkerReviewArgs = {
  review: ReviewInput;
  workerTag: Scalars['String']['input'];
};


export type MutationAddWorkersToFarmArgs = {
  farmTag: Scalars['String']['input'];
  workers: Array<WorkerInput>;
};


export type MutationAssignTaskToWorkerArgs = {
  taskId: Scalars['Float']['input'];
  workerTag: Scalars['String']['input'];
};


export type MutationAssignWorkersToFarmArgs = {
  farmTag: Scalars['String']['input'];
  workerTags: Array<Scalars['String']['input']>;
};


export type MutationCompleteReportArgs = {
  reportId: Scalars['String']['input'];
};


export type MutationCreateAuditorArgs = {
  groupId: Scalars['String']['input'];
  worker: WorkerInput;
};


export type MutationCreateFarmArgs = {
  area: Scalars['String']['input'];
  farmType: FarmType;
  latitude: Scalars['Float']['input'];
  location: Scalars['String']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateGroupArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateReportArgs = {
  farmTag: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  farmTag: Scalars['String']['input'];
  task: TaskInput;
};


export type MutationLoginAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginWorkerArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkLivestockAsUnavailableArgs = {
  livestockTag: Scalars['String']['input'];
  unavailabilityReason: LivestockUnavailabilityReason;
};


export type MutationRegisterAdminArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRequestAdminPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationRequestFarmsToJoinGroupArgs = {
  farmTags: Array<Scalars['String']['input']>;
  groupId: Scalars['String']['input'];
};


export type MutationRequestWorkerPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationRequestWorkersToJoinGroupArgs = {
  groupId: Scalars['String']['input'];
  workerEmails: Array<Scalars['String']['input']>;
};


export type MutationResetAdminPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  resetCode: Scalars['String']['input'];
};


export type MutationResetWorkerPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  resetCode: Scalars['String']['input'];
};


export type MutationUpdateBarnArgs = {
  barn: UpdateBarnInput;
  barnUnitId: Scalars['String']['input'];
};


export type MutationUpdateFarmArgs = {
  area?: InputMaybe<Scalars['String']['input']>;
  defaultStartTag?: InputMaybe<Scalars['String']['input']>;
  farmTag: Scalars['String']['input'];
  farmType?: InputMaybe<FarmType>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateLivestockArgs = {
  livestock: UpdateLivestockInput;
  livestockTag: Scalars['String']['input'];
};


export type MutationUpdateLivestockBreedingRecordArgs = {
  breedingRecord: UpdateBreedingRecordInput;
  breedingRecordId: Scalars['Float']['input'];
};


export type MutationUpdateLivestockExpenseRecordArgs = {
  expenseRecord: UpdateExpenseRecordInput;
  expenseRecordId: Scalars['Float']['input'];
};


export type MutationUpdateLivestockGrowthRecordArgs = {
  growthRecord: UpdateGrowthRecordInput;
  growthRecordId: Scalars['Float']['input'];
};


export type MutationUpdateLivestockHealthRecordArgs = {
  healthRecord: UpdateHealthRecordInput;
  healthRecordId: Scalars['Float']['input'];
};


export type MutationUpdateLivestockSalesRecordArgs = {
  salesRecord: UpdateSalesRecordInput;
  salesRecordId: Scalars['Float']['input'];
};


export type MutationUpdatePenArgs = {
  pen: UpdatePenInput;
  penUnitId: Scalars['String']['input'];
};


export type MutationUpdateReportArgs = {
  reportData: UpdateReportInput;
  reportId: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  task: UpdateTaskInput;
  taskId: Scalars['Float']['input'];
};


export type MutationUpdateTaskProgressArgs = {
  task: UpdateTaskProgressInput;
  taskId: Scalars['Float']['input'];
};


export type MutationUpdateWorkerArgs = {
  workerData: UpdateWorkerInput;
  workerTag: Scalars['String']['input'];
};


export type MutationVerifyReportArgs = {
  coordinate: CoordinatesInput;
  reportId: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
};

export type Offspring = {
  breed: Scalars['String']['input'];
  gender: LivestockGender;
  livestockTag?: InputMaybe<Scalars['String']['input']>;
  weight: Scalars['Float']['input'];
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

export type Pen = {
  __typename?: 'Pen';
  area_sqm: Scalars['Float']['output'];
  barn?: Maybe<Barn>;
  bedding_type?: Maybe<Scalars['String']['output']>;
  capacity: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  feeder_type?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  livestock?: Maybe<Array<Livestock>>;
  name: Scalars['String']['output'];
  status: HousingStatus;
  tasks?: Maybe<Array<TaskType>>;
  unit_id: Scalars['String']['output'];
  waterer_type?: Maybe<Scalars['String']['output']>;
};

export type PenConnection = {
  __typename?: 'PenConnection';
  count: Scalars['Int']['output'];
  edges: Array<PenTypeEdge>;
  pageInfo: PageInfo;
};

export type PenInput = {
  areaSqm: Scalars['Float']['input'];
  beddingType?: InputMaybe<Scalars['String']['input']>;
  capacity: Scalars['Float']['input'];
  feederType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  unitId: Scalars['String']['input'];
  watererType?: InputMaybe<Scalars['String']['input']>;
};

export enum PenSortField {
  Id = 'ID',
  Name = 'NAME',
  Status = 'STATUS'
}

export type PenSortInput = {
  direction: SortDirection;
  field: PenSortField;
};

export type PenTypeEdge = {
  __typename?: 'PenTypeEdge';
  cursor: Scalars['String']['output'];
  node: Pen;
};

/** Method used for planting */
export enum PlantingMethod {
  Cutting = 'CUTTING',
  DirectSeeding = 'DIRECT_SEEDING',
  Division = 'DIVISION',
  Grafting = 'GRAFTING',
  Layering = 'LAYERING',
  Transplanting = 'TRANSPLANTING'
}

export type Pond = {
  __typename?: 'Pond';
  aquacultureSystem?: Maybe<AquacultureSystem>;
  aquaculture_batches?: Maybe<Array<AquacultureBatch>>;
  capacity: Scalars['Float']['output'];
  depth_meters: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  liner_type?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: HousingStatus;
  surface_area_sqm: Scalars['Float']['output'];
  unit_id: Scalars['String']['output'];
  volume_liters: Scalars['Float']['output'];
  water_parameters?: Maybe<Scalars['JSON']['output']>;
  water_source?: Maybe<Scalars['String']['output']>;
};

export type PoultryBatch = {
  __typename?: 'PoultryBatch';
  average_weight: Scalars['Float']['output'];
  batch_id: Scalars['String']['output'];
  breed: Scalars['String']['output'];
  coop?: Maybe<Coop>;
  current_count: Scalars['Float']['output'];
  egg_production: Scalars['Float']['output'];
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  feed_consumption_kg: Scalars['Float']['output'];
  feed_conversion_ratio: Scalars['Float']['output'];
  growth_records?: Maybe<Array<GrowthRecord>>;
  hatch_date: Scalars['DateTime']['output'];
  health_records?: Maybe<Array<HealthRecord>>;
  health_status: BatchHealthStatus;
  id: Scalars['ID']['output'];
  initial_count: Scalars['Float']['output'];
  inserted_at: Scalars['DateTime']['output'];
  mortality_count: Scalars['Float']['output'];
  poultry_type: PoultryType;
  purpose: PoultryPurpose;
  sales_records?: Maybe<Array<SalesRecord>>;
  sold_count: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type PoultryHouse = {
  __typename?: 'PoultryHouse';
  area_sqm: Scalars['Float']['output'];
  capacity: Scalars['Float']['output'];
  climate_controlled: Scalars['Boolean']['output'];
  construction_date?: Maybe<Scalars['DateTime']['output']>;
  coops?: Maybe<Array<Coop>>;
  expense_records?: Maybe<Array<ExpenseRecord>>;
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  lighting_program?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: HousingStatus;
  unit_id: Scalars['String']['output'];
  ventilation_type?: Maybe<Scalars['String']['output']>;
};

/** Purpose of raising poultry */
export enum PoultryPurpose {
  Breeding = 'BREEDING',
  DualPurpose = 'DUAL_PURPOSE',
  Eggs = 'EGGS',
  Meat = 'MEAT'
}

/** Type of poultry */
export enum PoultryType {
  Chicken = 'CHICKEN',
  Duck = 'DUCK',
  Other = 'OTHER',
  Quail = 'QUAIL',
  Turkey = 'TURKEY'
}

/** Type of product being sold */
export enum ProductType {
  Crop = 'CROP',
  Fish = 'FISH',
  Honey = 'HONEY',
  Livestock = 'LIVESTOCK',
  Other = 'OTHER',
  Poultry = 'POULTRY'
}

export type QrCodeResponse = {
  __typename?: 'QrCodeResponse';
  qrCode: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getBarn: Barn;
  getGroup: Group;
  getGroupAuditor: Worker;
  getLivestock: Livestock;
  getPen: Pen;
  getQrCode: QrCodeResponse;
  getReport: Report;
  getWorker: Worker;
  listBarns: BarnConnection;
  listFarms: FarmConnection;
  listGroupAuditors: WorkerConnection;
  listGroupFarms: FarmConnection;
  listGroups: GroupConnection;
  listLivestock: LivestockConnection;
  listPens: PenConnection;
  listReports: ReportConnection;
  listTask: Array<Task>;
  listWorkers: WorkerConnection;
  livestockBreedingPairPrediction: BreedingPairPredictionResponse;
  mcpRequest: Scalars['String']['output'];
};


export type QueryGetBarnArgs = {
  barnUnitId: Scalars['String']['input'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryGetGroupAuditorArgs = {
  groupId: Scalars['String']['input'];
  workerTag: Scalars['String']['input'];
};


export type QueryGetLivestockArgs = {
  livestockTag: Scalars['String']['input'];
};


export type QueryGetPenArgs = {
  penUnitId: Scalars['String']['input'];
};


export type QueryGetQrCodeArgs = {
  farmTag: Scalars['String']['input'];
};


export type QueryGetReportArgs = {
  reportId: Scalars['String']['input'];
};


export type QueryGetWorkerArgs = {
  workerTag: Scalars['String']['input'];
};


export type QueryListBarnsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<BarnSortInput>>;
};


export type QueryListFarmsArgs = {
  filter?: InputMaybe<FarmFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<FarmSortInput>>;
};


export type QueryListGroupAuditorsArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryListGroupFarmsArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryListLivestockArgs = {
  filter?: InputMaybe<LivestockFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<LivestockSortInput>>;
};


export type QueryListPensArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<PenSortInput>>;
};


export type QueryListReportsArgs = {
  filter?: InputMaybe<ReportFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<ReportSortInput>>;
};


export type QueryListTaskArgs = {
  filter?: InputMaybe<TaskFilterInput>;
};


export type QueryListWorkersArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
};


export type QueryLivestockBreedingPairPredictionArgs = {
  livestockTag: Scalars['String']['input'];
};


export type QueryMcpRequestArgs = {
  query: Scalars['String']['input'];
};

export type Report = {
  __typename?: 'Report';
  completed: Scalars['Boolean']['output'];
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  report_tag: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  worker?: Maybe<Worker>;
};

export type ReportConnection = {
  __typename?: 'ReportConnection';
  count: Scalars['Int']['output'];
  edges: Array<ReportTypeEdge>;
  pageInfo: PageInfo;
};

export type ReportFilterInput = {
  reportId?: InputMaybe<Scalars['String']['input']>;
};

export enum ReportSortField {
  Id = 'ID',
  Name = 'NAME',
  Status = 'STATUS'
}

export type ReportSortInput = {
  direction: SortDirection;
  field: ReportSortField;
};

export type ReportTypeEdge = {
  __typename?: 'ReportTypeEdge';
  cursor: Scalars['String']['output'];
  node: Report;
};

export type Request = {
  __typename?: 'Request';
  expires_at: Scalars['DateTime']['output'];
  farm?: Maybe<Farm>;
  group?: Maybe<Group>;
  id: Scalars['ID']['output'];
  status: RequestStatus;
  type: RequestType;
  worker?: Maybe<Worker>;
};

export type RequestResetResponse = {
  __typename?: 'RequestResetResponse';
  message: Scalars['String']['output'];
};

/** Whether it is pending, declined or accepted */
export enum RequestStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type RequestToJoinResponse = {
  __typename?: 'RequestToJoinResponse';
  code: Scalars['Float']['output'];
  message: Scalars['String']['output'];
};

/** This specifies the entity we are sending the request to */
export enum RequestType {
  Farm = 'FARM',
  Worker = 'WORKER'
}

export type ResetResponse = {
  __typename?: 'ResetResponse';
  message: Scalars['String']['output'];
};

export type Review = {
  __typename?: 'Review';
  admin?: Maybe<Admin>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  rating: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  worker?: Maybe<Worker>;
};

export type ReviewInput = {
  description: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type SalesRecord = {
  __typename?: 'SalesRecord';
  aquaculture_batch?: Maybe<AquacultureBatch>;
  buyer_name: Scalars['String']['output'];
  crop_batch?: Maybe<CropBatch>;
  expenses?: Maybe<Scalars['Float']['output']>;
  farm?: Maybe<Farm>;
  hive?: Maybe<Hive>;
  id: Scalars['ID']['output'];
  livestock?: Maybe<Livestock>;
  notes: Scalars['String']['output'];
  poultry_batch?: Maybe<PoultryBatch>;
  price_per_unit: Scalars['Float']['output'];
  product_type: ProductType;
  quantity: Scalars['Float']['output'];
  sale_date: Scalars['DateTime']['output'];
  total_amount: Scalars['Float']['output'];
  unit: Scalars['String']['output'];
};

export type SalesRecordInput = {
  buyerName: Scalars['String']['input'];
  expenses?: InputMaybe<Scalars['Float']['input']>;
  notes: Scalars['String']['input'];
  pricePerUnit: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  saleDate: Scalars['DateTime']['input'];
  totalAmount: Scalars['Float']['input'];
  unit: Scalars['String']['input'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  admin?: Maybe<Admin>;
  barns?: Maybe<Array<Barn>>;
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  completion_date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  pens?: Maybe<Array<Pen>>;
  started_at?: Maybe<Scalars['DateTime']['output']>;
  starting_date: Scalars['DateTime']['output'];
  status: TaskStatus;
  type: TaskType;
  worker?: Maybe<Worker>;
};

export type TaskFilterInput = {
  farmTag?: InputMaybe<Scalars['String']['input']>;
};

export type TaskInput = {
  completionDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  startingDate: Scalars['DateTime']['input'];
  status: TaskStatus;
  type: TaskType;
};

/** Status of a task */
export enum TaskStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

/** Type of a task */
export enum TaskType {
  Cleaning = 'CLEANING',
  ElectricCheck = 'ELECTRIC_CHECK',
  Maintenance = 'MAINTENANCE',
  RegularInspection = 'REGULAR_INSPECTION',
  TrainingSession = 'TRAINING_SESSION'
}

export type UpdateBarnInput = {
  areaSqm?: InputMaybe<Scalars['Float']['input']>;
  buildingMaterial?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Float']['input']>;
  climateControlled?: InputMaybe<Scalars['Boolean']['input']>;
  constructionDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<HousingStatus>;
  ventilationType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBreedingRecordInput = {
  actualDelivery?: InputMaybe<Scalars['DateTime']['input']>;
  breedingMethod?: InputMaybe<Scalars['JSON']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  expectedDelivery?: InputMaybe<Scalars['DateTime']['input']>;
  matingDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  offsprings?: InputMaybe<Array<Offspring>>;
  status?: InputMaybe<BreedingStatus>;
};

export type UpdateExpenseRecordInput = {
  amount: Scalars['Float']['input'];
  category: ExpenseCategory;
  expenseDate: Scalars['DateTime']['input'];
  notes: Scalars['String']['input'];
};

export type UpdateGrowthRecordInput = {
  feedConsumption?: InputMaybe<Scalars['Float']['input']>;
  growthRate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<GrowthPeriod>;
  recordDate?: InputMaybe<Scalars['DateTime']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateHealthRecordInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  dosage?: InputMaybe<Scalars['String']['input']>;
  issue?: InputMaybe<Scalars['String']['input']>;
  medication?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recordDate?: InputMaybe<Scalars['DateTime']['input']>;
  recordStatus?: InputMaybe<HealthRecordStatus>;
  symptoms?: InputMaybe<Scalars['String']['input']>;
  treatment?: InputMaybe<Scalars['String']['input']>;
  vetName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLivestockInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  breed?: InputMaybe<Scalars['String']['input']>;
  fatherTag?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<LivestockGender>;
  livestockType?: InputMaybe<LivestockType>;
  meatGrade?: InputMaybe<Scalars['String']['input']>;
  milkProduction?: InputMaybe<Scalars['Float']['input']>;
  motherTag?: InputMaybe<Scalars['String']['input']>;
  offspringTags?: InputMaybe<Array<Scalars['String']['input']>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePenInput = {
  areaSqm?: InputMaybe<Scalars['Float']['input']>;
  beddingType?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Float']['input']>;
  feederType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<HousingStatus>;
  watererType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReportInput = {
  completionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startingDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<TaskStatus>;
};

export type UpdateSalesRecordInput = {
  buyerName?: InputMaybe<Scalars['String']['input']>;
  expenses?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pricePerUnit?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  saleDate?: InputMaybe<Scalars['DateTime']['input']>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  completionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startingDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTaskProgressInput = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt: Scalars['DateTime']['input'];
  status: TaskStatus;
};

export type UpdateWorkerInput = {
  achievements?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['JSON']['input']>;
  join_date?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<WorkerRole>>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Type of water environment */
export enum WaterType {
  Brackish = 'BRACKISH',
  Freshwater = 'FRESHWATER',
  Saltwater = 'SALTWATER'
}

export type Worker = {
  __typename?: 'Worker';
  achievements?: Maybe<Array<Scalars['JSON']['output']>>;
  address?: Maybe<Scalars['String']['output']>;
  admin?: Maybe<Admin>;
  assigned_reviews?: Maybe<Array<Review>>;
  assigned_tasks?: Maybe<Array<Task>>;
  bio?: Maybe<Scalars['JSON']['output']>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  join_date?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  reports?: Maybe<Array<Report>>;
  reviews?: Maybe<Array<Review>>;
  roles: Array<WorkerRole>;
  skills?: Maybe<Array<Scalars['String']['output']>>;
  worker_tag: Scalars['String']['output'];
};

export type WorkerAuthResponse = {
  __typename?: 'WorkerAuthResponse';
  achievements?: Maybe<Array<Scalars['JSON']['output']>>;
  address?: Maybe<Scalars['String']['output']>;
  admin?: Maybe<Admin>;
  assigned_reviews?: Maybe<Array<Review>>;
  assigned_tasks?: Maybe<Array<Task>>;
  bio?: Maybe<Scalars['JSON']['output']>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  join_date?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  reports?: Maybe<Array<Report>>;
  reviews?: Maybe<Array<Review>>;
  roles: Array<WorkerRole>;
  skills?: Maybe<Array<Scalars['String']['output']>>;
  token: Scalars['String']['output'];
  worker_tag: Scalars['String']['output'];
};

export type WorkerConnection = {
  __typename?: 'WorkerConnection';
  count: Scalars['Int']['output'];
  edges: Array<WorkerTypeEdge>;
  pageInfo: PageInfo;
};

export type WorkerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  roles: Array<WorkerRole>;
};

/** The roles a worker can have on the farm */
export enum WorkerRole {
  AnimalCaretaker = 'ANIMAL_CARETAKER',
  Auditor = 'AUDITOR',
  CropSpecialist = 'CROP_SPECIALIST',
  FarmManager = 'FARM_MANAGER',
  FeedSpecialist = 'FEED_SPECIALIST',
  GeneralWorker = 'GENERAL_WORKER',
  Maintenance = 'MAINTENANCE',
  Veterinarian = 'VETERINARIAN'
}

export type WorkerTypeEdge = {
  __typename?: 'WorkerTypeEdge';
  cursor: Scalars['String']['output'];
  node: Worker;
};

export type AddBarnsToFarmMutationVariables = Exact<{
  farmTag: Scalars['String']['input'];
  barns: Array<BarnInput> | BarnInput;
}>;


export type AddBarnsToFarmMutation = { __typename?: 'Mutation', addBarnsToFarm: { __typename?: 'Farm', id: string } };

export type AddLivestockBreedingRecordMutationVariables = Exact<{
  maleLivestockTag: Scalars['String']['input'];
  femaleLivestockTag: Scalars['String']['input'];
  breedingRecord: BreedingRecordInput;
}>;


export type AddLivestockBreedingRecordMutation = { __typename?: 'Mutation', addLivestockBreedingRecord: { __typename?: 'BreedingRecord', id: string } };

export type AddLivestockExpenseRecordMutationVariables = Exact<{
  livestockTag: Scalars['String']['input'];
  expenseRecord: ExpenseRecordInput;
}>;


export type AddLivestockExpenseRecordMutation = { __typename?: 'Mutation', addLivestockExpenseRecord: { __typename?: 'ExpenseRecord', id: string } };

export type AddLivestockGrowthRecordMutationVariables = Exact<{
  livestockTag: Scalars['String']['input'];
  growthRecord: GrowthRecordInput;
}>;


export type AddLivestockGrowthRecordMutation = { __typename?: 'Mutation', addLivestockGrowthRecord: { __typename?: 'GrowthRecord', id: string } };

export type AddLivestockHealthRecordMutationVariables = Exact<{
  livestockTag: Scalars['String']['input'];
  healthRecord: HealthRecordInput;
}>;


export type AddLivestockHealthRecordMutation = { __typename?: 'Mutation', addLivestockHealthRecord: { __typename?: 'HealthRecord', id: string } };

export type AddLivestockToPenMutationVariables = Exact<{
  penUnitId: Scalars['String']['input'];
  livestock: Array<LivestockInput> | LivestockInput;
}>;


export type AddLivestockToPenMutation = { __typename?: 'Mutation', addLivestockToPen: { __typename?: 'Pen', id: string } };

export type AddPensToBarnMutationVariables = Exact<{
  barnUnitId: Scalars['String']['input'];
  pens: Array<PenInput> | PenInput;
}>;


export type AddPensToBarnMutation = { __typename?: 'Mutation', addPensToBarn: { __typename?: 'Barn', id: string } };

export type AddWorkersToFarmMutationVariables = Exact<{
  farmTag: Scalars['String']['input'];
  workers: Array<WorkerInput> | WorkerInput;
}>;


export type AddWorkersToFarmMutation = { __typename?: 'Mutation', addWorkersToFarm: { __typename?: 'Farm', id: string } };

export type AssignTaskToWorkerMutationVariables = Exact<{
  taskId: Scalars['Float']['input'];
  workerTag: Scalars['String']['input'];
}>;


export type AssignTaskToWorkerMutation = { __typename?: 'Mutation', assignTaskToWorker: { __typename?: 'Task', id: string } };

export type AssignWorkersToFarmMutationVariables = Exact<{
  farmTag: Scalars['String']['input'];
  workerTags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AssignWorkersToFarmMutation = { __typename?: 'Mutation', assignWorkersToFarm: { __typename?: 'Farm', id: string } };

export type CreateFarmMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  area: Scalars['String']['input'];
  farmType: FarmType;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}>;


export type CreateFarmMutation = { __typename?: 'Mutation', createFarm: { __typename?: 'Farm', id: string, name: string } };

export type CreateTaskMutationVariables = Exact<{
  farmTag: Scalars['String']['input'];
  task: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string } };

export type LoginAdminMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: { __typename?: 'AdminAuthResponse', token: string, name: string, id: string } };

export type LoginWorkerMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginWorkerMutation = { __typename?: 'Mutation', loginWorker: { __typename?: 'WorkerAuthResponse', id: string, token: string, worker_tag: string, roles: Array<WorkerRole> } };

export type RegisterAdminMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'Admin', id: string } };

export type UpdateBarnMutationVariables = Exact<{
  barnUnitId: Scalars['String']['input'];
  barn: UpdateBarnInput;
}>;


export type UpdateBarnMutation = { __typename?: 'Mutation', updateBarn: { __typename?: 'Barn', id: string } };

export type UpdateFarmMutationVariables = Exact<{
  farmTag: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  farmType?: InputMaybe<FarmType>;
}>;


export type UpdateFarmMutation = { __typename?: 'Mutation', updateFarm: { __typename?: 'Farm', id: string } };

export type UpdateLivestockBreedingRecordMutationVariables = Exact<{
  breedingRecordId: Scalars['Float']['input'];
  breedingRecord: UpdateBreedingRecordInput;
}>;


export type UpdateLivestockBreedingRecordMutation = { __typename?: 'Mutation', updateLivestockBreedingRecord: { __typename?: 'BreedingRecord', id: string } };

export type UpdateLivestockMutationVariables = Exact<{
  livestockTag: Scalars['String']['input'];
  livestock: UpdateLivestockInput;
}>;


export type UpdateLivestockMutation = { __typename?: 'Mutation', updateLivestock: { __typename?: 'Livestock', id: string } };

export type UpdatePenMutationVariables = Exact<{
  penUnitId: Scalars['String']['input'];
  pen: UpdatePenInput;
}>;


export type UpdatePenMutation = { __typename?: 'Mutation', updatePen: { __typename?: 'Pen', id: string } };

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars['Float']['input'];
  task: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string } };

export type UpdateWorkerMutationVariables = Exact<{
  workerTag: Scalars['String']['input'];
  workerData: UpdateWorkerInput;
}>;


export type UpdateWorkerMutation = { __typename?: 'Mutation', updateWorker: { __typename?: 'Worker', id: string } };

export type GetBarnQueryVariables = Exact<{
  barnUnitId: Scalars['String']['input'];
}>;


export type GetBarnQuery = { __typename?: 'Query', getBarn: { __typename?: 'Barn', area_sqm: number, capacity: number, construction_date?: any | null, id: string, name: string, unit_id: string, climate_controlled: boolean, ventilation_type?: string | null, status: HousingStatus, pens?: Array<{ __typename?: 'Pen', area_sqm: number, bedding_type?: string | null, capacity: number, status: HousingStatus, unit_id: string, feeder_type?: string | null, id: string, name: string, waterer_type?: string | null, livestock?: Array<{ __typename?: 'Livestock', livestock_type: LivestockType }> | null }> | null } };

export type GetLivestockQueryVariables = Exact<{
  livestockTag: Scalars['String']['input'];
}>;


export type GetLivestockQuery = { __typename?: 'Query', getLivestock: { __typename?: 'Livestock', availability_status?: LivestockAvailabilityStatus | null, birth_date: any, livestock_tag: string, livestock_type: LivestockType, weight: number, gender: LivestockGender, health_status: HealthStatus, id: string, pen?: { __typename?: 'Pen', id: string, unit_id: string, livestock?: Array<{ __typename?: 'Livestock', id: string, gender: LivestockGender, livestock_tag: string, breed: string }> | null } | null, breeding_records?: Array<{ __typename?: 'BreedingRecord', id: string, status: BreedingStatus, mating_date: any, notes?: string | null, breeding_method?: any | null, expected_delivery: any, offspring_count_female?: number | null, offspring_count_male?: number | null, actual_delivery?: any | null }> | null, health_records?: Array<{ __typename?: 'HealthRecord', record_status: HealthRecordStatus, medication?: string | null, notes: string, record_type: HealthRecordType, record_date: any, diagnosis: string, vet_name?: string | null, id: string, issue: string, symptoms: string, treatment: string, dosage?: string | null }> | null, farm?: { __typename?: 'Farm', workers?: Array<{ __typename?: 'Worker', roles: Array<WorkerRole>, name: string }> | null } | null, growth_records?: Array<{ __typename?: 'GrowthRecord', id: string, growth_rate?: number | null, height?: number | null, length?: number | null, notes: string, period: GrowthPeriod, record_date: any, record_type: GrowthRecordType, weight: number }> | null, expense_records?: Array<{ __typename?: 'ExpenseRecord', amount: number, expense_date: any, id: string, category: ExpenseCategory, notes: string }> | null } };

export type GetPenQueryVariables = Exact<{
  penUnitId: Scalars['String']['input'];
}>;


export type GetPenQuery = { __typename?: 'Query', getPen: { __typename?: 'Pen', area_sqm: number, bedding_type?: string | null, capacity: number, status: HousingStatus, waterer_type?: string | null, unit_id: string, name: string, id: string, feeder_type?: string | null, livestock?: Array<{ __typename?: 'Livestock', id: string, livestock_type: LivestockType, livestock_tag: string, inserted_at: any, birth_date: any, weight: number, updated_at: any, gender: LivestockGender, breed: string, health_status: HealthStatus }> | null } };

export type GetWorkerQueryVariables = Exact<{
  workerTag: Scalars['String']['input'];
}>;


export type GetWorkerQuery = { __typename?: 'Query', getWorker: { __typename?: 'Worker', achievements?: Array<any> | null, address?: string | null, bio?: any | null, email: string, id: string, join_date?: any | null, name: string, phone?: string | null, roles: Array<WorkerRole>, skills?: Array<string> | null, worker_tag: string, admin?: { __typename?: 'Admin', name: string, id: string, email: string } | null, farms?: Array<{ __typename?: 'Farm', id: string, name: string, farm_tag: string, farm_type: FarmType, barns?: Array<{ __typename?: 'Barn', id: string, name: string, status: HousingStatus, pens?: Array<{ __typename?: 'Pen', id: string, livestock?: Array<{ __typename?: 'Livestock', id: string }> | null }> | null }> | null }> | null, assigned_tasks?: Array<{ __typename?: 'Task', id: string, status: TaskStatus, type: TaskType, completion_date: any, description: string, starting_date: any, notes?: string | null, worker?: { __typename?: 'Worker', name: string } | null }> | null } };

export type ListBarnsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<BarnSortInput> | BarnSortInput>;
}>;


export type ListBarnsQuery = { __typename?: 'Query', listBarns: { __typename?: 'BarnConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'BarnTypeEdge', node: { __typename?: 'Barn', area_sqm: number, building_material?: string | null, capacity: number, construction_date?: any | null, id: string, name: string, status: HousingStatus, unit_id: string, ventilation_type?: string | null, pens?: Array<{ __typename?: 'Pen', id: string, livestock?: Array<{ __typename?: 'Livestock', id: string, livestock_type: LivestockType }> | null }> | null } }> } };

export type ListFarmsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<FarmSortInput> | FarmSortInput>;
  searchTerm: Scalars['String']['input'];
  filter?: InputMaybe<FarmFilterInput>;
}>;


export type ListFarmsQuery = { __typename?: 'Query', listFarms: { __typename?: 'FarmConnection', edges: Array<{ __typename?: 'FarmTypeClassEdge', node: { __typename?: 'Farm', name: string, performance: number, area?: string | null, location?: string | null, farm_tag: string, id: string, barns?: Array<{ __typename?: 'Barn', capacity: number, id: string, status: HousingStatus, name: string, area_sqm: number, unit_id: string, pens?: Array<{ __typename?: 'Pen', id: string, unit_id: string, area_sqm: number, status: HousingStatus, livestock?: Array<{ __typename?: 'Livestock', breed: string, weight: number, updated_at: any, birth_date: any, id: string }> | null }> | null }> | null, livestock?: Array<{ __typename?: 'Livestock', id: string, health_status: HealthStatus, livestock_tag: string, livestock_type: LivestockType, breed: string }> | null, workers?: Array<{ __typename?: 'Worker', id: string, name: string, roles: Array<WorkerRole>, worker_tag: string }> | null, tasks?: Array<{ __typename?: 'Task', id: string, starting_date: any, status: TaskStatus, type: TaskType, completion_date: any }> | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type ListLivestockQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<LivestockSortInput> | LivestockSortInput>;
}>;


export type ListLivestockQuery = { __typename?: 'Query', listLivestock: { __typename?: 'LivestockConnection', edges: Array<{ __typename?: 'LivestockTypeClassEdge', node: { __typename?: 'Livestock', availability_status?: LivestockAvailabilityStatus | null, birth_date: any, gender: LivestockGender, health_status: HealthStatus, livestock_tag: string, weight: number, updated_at: any, livestock_type: LivestockType, inserted_at: any, id: string, pen?: { __typename?: 'Pen', unit_id: string, barn?: { __typename?: 'Barn', unit_id: string } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export type ListPensQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<PenSortInput> | PenSortInput>;
}>;


export type ListPensQuery = { __typename?: 'Query', listPens: { __typename?: 'PenConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'PenTypeEdge', node: { __typename?: 'Pen', area_sqm: number, bedding_type?: string | null, capacity: number, feeder_type?: string | null, id: string, name: string, status: HousingStatus, unit_id: string, barn?: { __typename?: 'Barn', name: string } | null, livestock?: Array<{ __typename?: 'Livestock', id: string, livestock_type: LivestockType }> | null } }> } };

export type ListTaskQueryVariables = Exact<{
  filter?: InputMaybe<TaskFilterInput>;
}>;


export type ListTaskQuery = { __typename?: 'Query', listTask: Array<{ __typename?: 'Task', id: string, starting_date: any, status: TaskStatus, type: TaskType, completion_date: any, notes?: string | null, description: string, worker?: { __typename?: 'Worker', name: string } | null, barns?: Array<{ __typename?: 'Barn', id: string, unit_id: string, name: string }> | null, pens?: Array<{ __typename?: 'Pen', id: string, unit_id: string, name: string }> | null }> };

export type LivestockBreedingPairPredictionQueryVariables = Exact<{
  livestockTag: Scalars['String']['input'];
}>;


export type LivestockBreedingPairPredictionQuery = { __typename?: 'Query', livestockBreedingPairPrediction: { __typename?: 'BreedingPairPredictionResponse', description: string, breedingPairs: Array<{ __typename?: 'Livestock', id: string, livestock_tag: string }> } };


export const AddBarnsToFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBarnsToFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barns"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BarnInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBarnsToFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"barns"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barns"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddBarnsToFarmMutation, AddBarnsToFarmMutationVariables>;
export const AddLivestockBreedingRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockBreedingRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maleLivestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"femaleLivestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"breedingRecord"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BreedingRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockBreedingRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"maleLivestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maleLivestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"femaleLivestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"femaleLivestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"breedingRecord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"breedingRecord"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockBreedingRecordMutation, AddLivestockBreedingRecordMutationVariables>;
export const AddLivestockExpenseRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockExpenseRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseRecord"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockExpenseRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"expenseRecord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseRecord"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockExpenseRecordMutation, AddLivestockExpenseRecordMutationVariables>;
export const AddLivestockGrowthRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockGrowthRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"growthRecord"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GrowthRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockGrowthRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"growthRecord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"growthRecord"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockGrowthRecordMutation, AddLivestockGrowthRecordMutationVariables>;
export const AddLivestockHealthRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockHealthRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"healthRecord"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HealthRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockHealthRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"healthRecord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"healthRecord"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockHealthRecordMutation, AddLivestockHealthRecordMutationVariables>;
export const AddLivestockToPenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockToPen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestock"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LivestockInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockToPen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"penUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"livestock"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestock"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockToPenMutation, AddLivestockToPenMutationVariables>;
export const AddPensToBarnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPensToBarn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pens"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PenInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPensToBarn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"barnUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pens"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pens"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddPensToBarnMutation, AddPensToBarnMutationVariables>;
export const AddWorkersToFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWorkersToFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkerInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addWorkersToFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"workers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddWorkersToFarmMutation, AddWorkersToFarmMutationVariables>;
export const AssignTaskToWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignTaskToWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignTaskToWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"workerTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerTag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignTaskToWorkerMutation, AssignTaskToWorkerMutationVariables>;
export const AssignWorkersToFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignWorkersToFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerTags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignWorkersToFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"workerTags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerTags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignWorkersToFarmMutation, AssignWorkersToFarmMutationVariables>;
export const CreateFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"area"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"area"},"value":{"kind":"Variable","name":{"kind":"Name","value":"area"}}},{"kind":"Argument","name":{"kind":"Name","value":"farmType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmType"}}},{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateFarmMutation, CreateFarmMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const LoginAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LoginAdminMutation, LoginAdminMutationVariables>;
export const LoginWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"worker_tag"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<LoginWorkerMutation, LoginWorkerMutationVariables>;
export const RegisterAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterAdminMutation, RegisterAdminMutationVariables>;
export const UpdateBarnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBarn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBarnInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBarn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"barnUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"barn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateBarnMutation, UpdateBarnMutationVariables>;
export const UpdateFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"area"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"area"},"value":{"kind":"Variable","name":{"kind":"Name","value":"area"}}},{"kind":"Argument","name":{"kind":"Name","value":"farmType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateFarmMutation, UpdateFarmMutationVariables>;
export const UpdateLivestockBreedingRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLivestockBreedingRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"breedingRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"breedingRecord"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBreedingRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLivestockBreedingRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"breedingRecordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"breedingRecordId"}}},{"kind":"Argument","name":{"kind":"Name","value":"breedingRecord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"breedingRecord"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLivestockBreedingRecordMutation, UpdateLivestockBreedingRecordMutationVariables>;
export const UpdateLivestockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLivestock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLivestockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLivestock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"livestock"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestock"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLivestockMutation, UpdateLivestockMutationVariables>;
export const UpdatePenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pen"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"penUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pen"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pen"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePenMutation, UpdatePenMutationVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workerTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"workerData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkerMutation, UpdateWorkerMutationVariables>;
export const GetBarnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBarn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBarn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"barnUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"construction_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"bedding_type"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"feeder_type"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"waterer_type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"climate_controlled"}},{"kind":"Field","name":{"kind":"Name","value":"ventilation_type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetBarnQuery, GetBarnQueryVariables>;
export const GetLivestockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLivestock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLivestock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availability_status"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"health_status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}},{"kind":"Field","name":{"kind":"Name","value":"breed"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"breeding_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mating_date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"breeding_method"}},{"kind":"Field","name":{"kind":"Name","value":"expected_delivery"}},{"kind":"Field","name":{"kind":"Name","value":"offspring_count_female"}},{"kind":"Field","name":{"kind":"Name","value":"offspring_count_male"}},{"kind":"Field","name":{"kind":"Name","value":"actual_delivery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"health_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record_status"}},{"kind":"Field","name":{"kind":"Name","value":"medication"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"record_type"}},{"kind":"Field","name":{"kind":"Name","value":"record_date"}},{"kind":"Field","name":{"kind":"Name","value":"diagnosis"}},{"kind":"Field","name":{"kind":"Name","value":"vet_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issue"}},{"kind":"Field","name":{"kind":"Name","value":"symptoms"}},{"kind":"Field","name":{"kind":"Name","value":"treatment"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"farm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"growth_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"growth_rate"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"record_date"}},{"kind":"Field","name":{"kind":"Name","value":"record_type"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expense_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<GetLivestockQuery, GetLivestockQueryVariables>;
export const GetPenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"penUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"bedding_type"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"waterer_type"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"feeder_type"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"breed"}},{"kind":"Field","name":{"kind":"Name","value":"health_status"}}]}}]}}]}}]} as unknown as DocumentNode<GetPenQuery, GetPenQueryVariables>;
export const GetWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workerTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerTag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"achievements"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"farms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"farm_tag"}},{"kind":"Field","name":{"kind":"Name","value":"farm_type"}},{"kind":"Field","name":{"kind":"Name","value":"barns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"join_date"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"worker_tag"}},{"kind":"Field","name":{"kind":"Name","value":"assigned_tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"worker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completion_date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"starting_date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorkerQuery, GetWorkerQueryVariables>;
export const ListBarnsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListBarns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BarnSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listBarns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"building_material"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"construction_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"ventilation_type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListBarnsQuery, ListBarnsQueryVariables>;
export const ListFarmsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFarms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmSortInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFarms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"breed"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"health_status"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}},{"kind":"Field","name":{"kind":"Name","value":"breed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"worker_tag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"farm_tag"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starting_date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"completion_date"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ListFarmsQuery, ListFarmsQueryVariables>;
export const ListLivestockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListLivestock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LivestockSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listLivestock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availability_status"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"health_status"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}},{"kind":"Field","name":{"kind":"Name","value":"pen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"barn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ListLivestockQuery, ListLivestockQueryVariables>;
export const ListPensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PenSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"bedding_type"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"feeder_type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"barn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListPensQuery, ListPensQueryVariables>;
export const ListTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starting_date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"worker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completion_date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"barns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ListTaskQuery, ListTaskQueryVariables>;
export const LivestockBreedingPairPredictionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LivestockBreedingPairPrediction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livestockBreedingPairPrediction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"breedingPairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"livestock_tag"}}]}}]}}]}}]} as unknown as DocumentNode<LivestockBreedingPairPredictionQuery, LivestockBreedingPairPredictionQueryVariables>;