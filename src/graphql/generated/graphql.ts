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

export type Admin = {
  __typename?: 'Admin';
  assigned_tasks?: Maybe<Array<Task>>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  workers?: Maybe<Array<Worker>>;
};

export type AdminAuthResponse = {
  __typename?: 'AdminAuthResponse';
  assigned_tasks?: Maybe<Array<Task>>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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
  tasks?: Maybe<Array<Task>>;
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

export type BreedingRecord = {
  __typename?: 'BreedingRecord';
  actual_delivery?: Maybe<Scalars['DateTime']['output']>;
  animals?: Maybe<Array<Livestock>>;
  breeding_method?: Maybe<Scalars['JSON']['output']>;
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
  livestock?: Maybe<Array<Livestock>>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  pens?: Maybe<Array<Pen>>;
  performance: Scalars['Float']['output'];
  ponds?: Maybe<Array<Pond>>;
  poultry_batches?: Maybe<Array<PoultryBatch>>;
  poultry_houses?: Maybe<Array<PoultryHouse>>;
  tasks?: Maybe<Array<Task>>;
  workers?: Maybe<Array<Worker>>;
};

export type FarmConnection = {
  __typename?: 'FarmConnection';
  count: Scalars['Int']['output'];
  edges: Array<FarmTypeClassEdge>;
  pageInfo: PageInfo;
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
  feedConversion?: InputMaybe<Scalars['Float']['input']>;
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
  symptoms: Scalars['String']['input'];
  treatment: Scalars['String']['input'];
  vetName?: InputMaybe<Scalars['String']['input']>;
};

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

/** Gender of an animal */
export enum LivestockGender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type LivestockInput = {
  birthDate: Scalars['DateTime']['input'];
  breed: Scalars['String']['input'];
  gender: LivestockGender;
  livestockTag: Scalars['String']['input'];
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
  addBarnsToFarm: Farm;
  addLivestockBreedingRecord: BreedingRecord;
  addLivestockExpenseRecord: ExpenseRecord;
  addLivestockGrowthRecord: GrowthRecord;
  addLivestockHealthRecord: HealthRecord;
  addLivestockSalesRecord: SalesRecord;
  addLivestockToPen: Pen;
  addPensToBarn: Barn;
  addWorkersToFarm: Farm;
  assignTaskToWorkers: Task;
  assignWorkersToFarm: Farm;
  createFarm: Farm;
  createTask: Task;
  loginAdmin: AdminAuthResponse;
  loginWorker: WorkerAuthResponse;
  markLivestockAsUnavailable: Livestock;
  registerAdmin: Admin;
  requestAdminPasswordReset: RequestResetResponse;
  requestWorkerPasswordReset: RequestResetResponse;
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


export type MutationAddWorkersToFarmArgs = {
  farmTag: Scalars['String']['input'];
  workers: Array<WorkerInput>;
};


export type MutationAssignTaskToWorkersArgs = {
  taskId: Scalars['String']['input'];
  workerTags: Array<Scalars['String']['input']>;
};


export type MutationAssignWorkersToFarmArgs = {
  farmTag: Scalars['String']['input'];
  workerTags: Array<Scalars['String']['input']>;
};


export type MutationCreateFarmArgs = {
  area: Scalars['String']['input'];
  farmType: FarmType;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
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


export type MutationRequestWorkerPasswordResetArgs = {
  email: Scalars['String']['input'];
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
  tasks?: Maybe<Array<Task>>;
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

export type Query = {
  __typename?: 'Query';
  getBarn: Barn;
  getLivestock: Livestock;
  getPen: Pen;
  listBarns: BarnConnection;
  listFarms: FarmConnection;
  listLivestock: LivestockConnection;
  listPens: PenConnection;
};


export type QueryGetBarnArgs = {
  barnUnitId: Scalars['String']['input'];
};


export type QueryGetLivestockArgs = {
  livestockTag: Scalars['String']['input'];
};


export type QueryGetPenArgs = {
  penUnitId: Scalars['String']['input'];
};


export type QueryListBarnsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<BarnSortInput>>;
};


export type QueryListFarmsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<FarmSortInput>>;
};


export type QueryListLivestockArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<LivestockSortInput>>;
};


export type QueryListPensArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm: Scalars['String']['input'];
  sort?: InputMaybe<Array<PenSortInput>>;
};

export type RequestResetResponse = {
  __typename?: 'RequestResetResponse';
  message: Scalars['String']['output'];
};

export type ResetResponse = {
  __typename?: 'ResetResponse';
  message: Scalars['String']['output'];
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
  completion_date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  farm?: Maybe<Farm>;
  id: Scalars['ID']['output'];
  pens?: Maybe<Array<Pen>>;
  starting_date: Scalars['DateTime']['output'];
  status: TaskStatus;
  worker?: Maybe<Worker>;
};

export type TaskInput = {
  completionDate: Scalars['String']['input'];
  description: Scalars['String']['input'];
  startingDate: Scalars['Float']['input'];
  status: TaskStatus;
};

/** Status of a task */
export enum TaskStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
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
  expectedDelivery?: InputMaybe<Scalars['DateTime']['input']>;
  matingDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  offspringCountFemale?: InputMaybe<Scalars['Float']['input']>;
  offspringCountMale?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<BreedingStatus>;
};

export type UpdateExpenseRecordInput = {
  amount: Scalars['Float']['input'];
  category: ExpenseCategory;
  expenseDate: Scalars['DateTime']['input'];
  notes: Scalars['String']['input'];
};

export type UpdateGrowthRecordInput = {
  feedConversion?: InputMaybe<Scalars['Float']['input']>;
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

/** Type of water environment */
export enum WaterType {
  Brackish = 'BRACKISH',
  Freshwater = 'FRESHWATER',
  Saltwater = 'SALTWATER'
}

export type Worker = {
  __typename?: 'Worker';
  admin?: Maybe<Admin>;
  assigned_tasks?: Maybe<Array<Task>>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<WorkerRole>;
  worker_tag: Scalars['String']['output'];
};

export type WorkerAuthResponse = {
  __typename?: 'WorkerAuthResponse';
  admin?: Maybe<Admin>;
  assigned_tasks?: Maybe<Array<Task>>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<WorkerRole>;
  token: Scalars['String']['output'];
  worker_tag: Scalars['String']['output'];
};

export type WorkerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  roles: Array<WorkerRole>;
};

/** The roles a worker can have on the farm */
export enum WorkerRole {
  AnimalCaretaker = 'ANIMAL_CARETAKER',
  CropSpecialist = 'CROP_SPECIALIST',
  FarmManager = 'FARM_MANAGER',
  FeedSpecialist = 'FEED_SPECIALIST',
  GeneralWorker = 'GENERAL_WORKER',
  Maintenance = 'MAINTENANCE',
  Veterinarian = 'VETERINARIAN'
}

export type AddBarnsToFarmMutationVariables = Exact<{
  farmTag: Scalars['String']['input'];
  barns: Array<BarnInput> | BarnInput;
}>;


export type AddBarnsToFarmMutation = { __typename?: 'Mutation', addBarnsToFarm: { __typename?: 'Farm', id: string } };

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

export type CreateFarmMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  area: Scalars['String']['input'];
  farmType: FarmType;
}>;


export type CreateFarmMutation = { __typename?: 'Mutation', createFarm: { __typename?: 'Farm', id: string, name: string } };

export type LoginAdminMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: { __typename?: 'AdminAuthResponse', token: string, name: string, id: string } };

export type RegisterAdminMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'Admin', id: string } };

export type GetBarnQueryVariables = Exact<{
  barnUnitId: Scalars['String']['input'];
}>;


export type GetBarnQuery = { __typename?: 'Query', getBarn: { __typename?: 'Barn', area_sqm: number, capacity: number, construction_date?: any | null, id: string, name: string, ventilation_type?: string | null, status: HousingStatus, pens?: Array<{ __typename?: 'Pen', area_sqm: number, bedding_type?: string | null, capacity: number, status: HousingStatus, unit_id: string, feeder_type?: string | null, id: string, name: string, waterer_type?: string | null, livestock?: Array<{ __typename?: 'Livestock', livestock_type: LivestockType }> | null }> | null } };

export type ListFarmsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<FarmSortInput> | FarmSortInput>;
}>;


export type ListFarmsQuery = { __typename?: 'Query', listFarms: { __typename?: 'FarmConnection', edges: Array<{ __typename?: 'FarmTypeClassEdge', node: { __typename?: 'Farm', name: string, performance: number, area?: string | null, location?: string | null, farm_tag: string, id: string, barns?: Array<{ __typename?: 'Barn', capacity: number, id: string, status: HousingStatus, name: string, area_sqm: number, unit_id: string, pens?: Array<{ __typename?: 'Pen', id: string, unit_id: string, area_sqm: number, status: HousingStatus, livestock?: Array<{ __typename?: 'Livestock', weight: number, updated_at: any, birth_date: any, id: string }> | null }> | null }> | null, livestock?: Array<{ __typename?: 'Livestock', id: string }> | null, workers?: Array<{ __typename?: 'Worker', id: string }> | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };


export const AddBarnsToFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBarnsToFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barns"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BarnInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBarnsToFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"barns"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barns"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddBarnsToFarmMutation, AddBarnsToFarmMutationVariables>;
export const AddLivestockHealthRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockHealthRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"healthRecord"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HealthRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockHealthRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"livestockTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestockTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"healthRecord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"healthRecord"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockHealthRecordMutation, AddLivestockHealthRecordMutationVariables>;
export const AddLivestockToPenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLivestockToPen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"livestock"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LivestockInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLivestockToPen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"penUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penUnitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"livestock"},"value":{"kind":"Variable","name":{"kind":"Name","value":"livestock"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLivestockToPenMutation, AddLivestockToPenMutationVariables>;
export const AddPensToBarnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPensToBarn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pens"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PenInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPensToBarn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"barnUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pens"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pens"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddPensToBarnMutation, AddPensToBarnMutationVariables>;
export const AddWorkersToFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWorkersToFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkerInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addWorkersToFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"farmTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"workers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddWorkersToFarmMutation, AddWorkersToFarmMutationVariables>;
export const CreateFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"area"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"area"},"value":{"kind":"Variable","name":{"kind":"Name","value":"area"}}},{"kind":"Argument","name":{"kind":"Name","value":"farmType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateFarmMutation, CreateFarmMutationVariables>;
export const LoginAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LoginAdminMutation, LoginAdminMutationVariables>;
export const RegisterAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterAdminMutation, RegisterAdminMutationVariables>;
export const GetBarnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBarn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBarn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"barnUnitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"barnUnitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"construction_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"bedding_type"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"feeder_type"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livestock_type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"waterer_type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ventilation_type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetBarnQuery, GetBarnQueryVariables>;
export const ListFarmsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFarms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FarmSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFarms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"pens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"area_sqm"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"livestock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"farm_tag"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ListFarmsQuery, ListFarmsQueryVariables>;