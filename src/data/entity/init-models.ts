import type { Sequelize } from "sequelize";
import { Applications as _Applications } from "./applications";
import type { ApplicationsAttributes, ApplicationsCreationAttributes } from "./applications";
import { Areas as _Areas } from "./areas";
import type { AreasAttributes, AreasCreationAttributes } from "./areas";
import { AuthTokens as _AuthTokens } from "./auth_tokens";
import type { AuthTokensAttributes, AuthTokensCreationAttributes } from "./auth_tokens";
import { City as _City } from "./city";
import type { CityAttributes, CityCreationAttributes } from "./city";
import { Country as _Country } from "./country";
import type { CountryAttributes, CountryCreationAttributes } from "./country";
import { County as _County } from "./county";
import type { CountyAttributes, CountyCreationAttributes } from "./county";
import { DataObjectKeys as _DataObjectKeys } from "./data_object_keys";
import type { DataObjectKeysAttributes, DataObjectKeysCreationAttributes } from "./data_object_keys";
import { DataObjects as _DataObjects } from "./data_objects";
import type { DataObjectsAttributes, DataObjectsCreationAttributes } from "./data_objects";
import { Districts as _Districts } from "./districts";
import type { DistrictsAttributes, DistrictsCreationAttributes } from "./districts";
import { FeatureDetailed as _FeatureDetailed } from "./feature_detailed";
import type { FeatureDetailedAttributes, FeatureDetailedCreationAttributes } from "./feature_detailed";
import { FeatureExternalConfig as _FeatureExternalConfig } from "./feature_external_config";
import type { FeatureExternalConfigAttributes, FeatureExternalConfigCreationAttributes } from "./feature_external_config";
import { FeatureHlfConfig as _FeatureHlfConfig } from "./feature_hlf_config";
import type { FeatureHlfConfigAttributes, FeatureHlfConfigCreationAttributes } from "./feature_hlf_config";
import { FeatureRoleMapping as _FeatureRoleMapping } from "./feature_role_mapping";
import type { FeatureRoleMappingAttributes, FeatureRoleMappingCreationAttributes } from "./feature_role_mapping";
import { FeatureSodView as _FeatureSodView } from "./feature_sod_view";
import type { FeatureSodViewAttributes, FeatureSodViewCreationAttributes } from "./feature_sod_view";
import { Features as _Features } from "./features";
import type { FeaturesAttributes, FeaturesCreationAttributes } from "./features";
import { FileStatus as _FileStatus } from "./file_status";
import type { FileStatusAttributes, FileStatusCreationAttributes } from "./file_status";
import { KcMap as _KcMap } from "./kc_map";
import type { KcMapAttributes, KcMapCreationAttributes } from "./kc_map";
import { ObjectMapping as _ObjectMapping } from "./object_mapping";
import type { ObjectMappingAttributes, ObjectMappingCreationAttributes } from "./object_mapping";
import { Orchestration as _Orchestration } from "./orchestration";
import type { OrchestrationAttributes, OrchestrationCreationAttributes } from "./orchestration";
import { OrchestrationActions as _OrchestrationActions } from "./orchestration_actions";
import type { OrchestrationActionsAttributes, OrchestrationActionsCreationAttributes } from "./orchestration_actions";
import { Organization as _Organization } from "./organization";
import type { OrganizationAttributes, OrganizationCreationAttributes } from "./organization";
import { OrganizationType as _OrganizationType } from "./organization_type";
import type { OrganizationTypeAttributes, OrganizationTypeCreationAttributes } from "./organization_type";
import { PartyMaster as _PartyMaster } from "./party_master";
import type { PartyMasterAttributes, PartyMasterCreationAttributes } from "./party_master";
import { ProductMapping as _ProductMapping } from "./product_mapping";
import type { ProductMappingAttributes, ProductMappingCreationAttributes } from "./product_mapping";
import { ProductMaster as _ProductMaster } from "./product_master";
import type { ProductMasterAttributes, ProductMasterCreationAttributes } from "./product_master";
import { QueryTypes as _QueryTypes } from "./query_types";
import type { QueryTypesAttributes, QueryTypesCreationAttributes } from "./query_types";
import { RoleMaster as _RoleMaster } from "./role_master";
import type { RoleMasterAttributes, RoleMasterCreationAttributes } from "./role_master";
import { Roles as _Roles } from "./roles";
import type { RolesAttributes, RolesCreationAttributes } from "./roles";
import { SiteType as _SiteType } from "./site_type";
import type { SiteTypeAttributes, SiteTypeCreationAttributes } from "./site_type";
import { Sites as _Sites } from "./sites";
import type { SitesAttributes, SitesCreationAttributes } from "./sites";
import { State as _State } from "./state";
import type { StateAttributes, StateCreationAttributes } from "./state";
import { States as _States } from "./states";
import type { StatesAttributes, StatesCreationAttributes } from "./states";
import { SubType as _SubType } from "./sub_type";
import type { SubTypeAttributes, SubTypeCreationAttributes } from "./sub_type";
import { TenantConnections as _TenantConnections } from "./tenant_connections";
import type { TenantConnectionsAttributes, TenantConnectionsCreationAttributes } from "./tenant_connections";
import { Tenants as _Tenants } from "./tenants";
import type { TenantsAttributes, TenantsCreationAttributes } from "./tenants";
import { UserRoles as _UserRoles } from "./user_roles";
import type { UserRolesAttributes, UserRolesCreationAttributes } from "./user_roles";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _Applications as Applications,
  _Areas as Areas,
  _AuthTokens as AuthTokens,
  _City as City,
  _Country as Country,
  _County as County,
  _DataObjectKeys as DataObjectKeys,
  _DataObjects as DataObjects,
  _Districts as Districts,
  _FeatureDetailed as FeatureDetailed,
  _FeatureExternalConfig as FeatureExternalConfig,
  _FeatureHlfConfig as FeatureHlfConfig,
  _FeatureRoleMapping as FeatureRoleMapping,
  _FeatureSodView as FeatureSodView,
  _Features as Features,
  _FileStatus as FileStatus,
  _KcMap as KcMap,
  _ObjectMapping as ObjectMapping,
  _Orchestration as Orchestration,
  _OrchestrationActions as OrchestrationActions,
  _Organization as Organization,
  _OrganizationType as OrganizationType,
  _PartyMaster as PartyMaster,
  _ProductMapping as ProductMapping,
  _ProductMaster as ProductMaster,
  _QueryTypes as QueryTypes,
  _RoleMaster as RoleMaster,
  _Roles as Roles,
  _SiteType as SiteType,
  _Sites as Sites,
  _State as State,
  _States as States,
  _SubType as SubType,
  _TenantConnections as TenantConnections,
  _Tenants as Tenants,
  _UserRoles as UserRoles,
  _Users as Users,
};

export type {
  ApplicationsAttributes,
  ApplicationsCreationAttributes,
  AreasAttributes,
  AreasCreationAttributes,
  AuthTokensAttributes,
  AuthTokensCreationAttributes,
  CityAttributes,
  CityCreationAttributes,
  CountryAttributes,
  CountryCreationAttributes,
  CountyAttributes,
  CountyCreationAttributes,
  DataObjectKeysAttributes,
  DataObjectKeysCreationAttributes,
  DataObjectsAttributes,
  DataObjectsCreationAttributes,
  DistrictsAttributes,
  DistrictsCreationAttributes,
  FeatureDetailedAttributes,
  FeatureDetailedCreationAttributes,
  FeatureExternalConfigAttributes,
  FeatureExternalConfigCreationAttributes,
  FeatureHlfConfigAttributes,
  FeatureHlfConfigCreationAttributes,
  FeatureRoleMappingAttributes,
  FeatureRoleMappingCreationAttributes,
  FeatureSodViewAttributes,
  FeatureSodViewCreationAttributes,
  FeaturesAttributes,
  FeaturesCreationAttributes,
  FileStatusAttributes,
  FileStatusCreationAttributes,
  KcMapAttributes,
  KcMapCreationAttributes,
  ObjectMappingAttributes,
  ObjectMappingCreationAttributes,
  OrchestrationAttributes,
  OrchestrationCreationAttributes,
  OrchestrationActionsAttributes,
  OrchestrationActionsCreationAttributes,
  OrganizationAttributes,
  OrganizationCreationAttributes,
  OrganizationTypeAttributes,
  OrganizationTypeCreationAttributes,
  PartyMasterAttributes,
  PartyMasterCreationAttributes,
  ProductMappingAttributes,
  ProductMappingCreationAttributes,
  ProductMasterAttributes,
  ProductMasterCreationAttributes,
  QueryTypesAttributes,
  QueryTypesCreationAttributes,
  RoleMasterAttributes,
  RoleMasterCreationAttributes,
  RolesAttributes,
  RolesCreationAttributes,
  SiteTypeAttributes,
  SiteTypeCreationAttributes,
  SitesAttributes,
  SitesCreationAttributes,
  StateAttributes,
  StateCreationAttributes,
  StatesAttributes,
  StatesCreationAttributes,
  SubTypeAttributes,
  SubTypeCreationAttributes,
  TenantConnectionsAttributes,
  TenantConnectionsCreationAttributes,
  TenantsAttributes,
  TenantsCreationAttributes,
  UserRolesAttributes,
  UserRolesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Applications = _Applications.initModel(sequelize);
  const Areas = _Areas.initModel(sequelize);
  const AuthTokens = _AuthTokens.initModel(sequelize);
  const City = _City.initModel(sequelize);
  const Country = _Country.initModel(sequelize);
  const County = _County.initModel(sequelize);
  const DataObjectKeys = _DataObjectKeys.initModel(sequelize);
  const DataObjects = _DataObjects.initModel(sequelize);
  const Districts = _Districts.initModel(sequelize);
  const FeatureDetailed = _FeatureDetailed.initModel(sequelize);
  const FeatureExternalConfig = _FeatureExternalConfig.initModel(sequelize);
  const FeatureHlfConfig = _FeatureHlfConfig.initModel(sequelize);
  const FeatureRoleMapping = _FeatureRoleMapping.initModel(sequelize);
  const FeatureSodView = _FeatureSodView.initModel(sequelize);
  const Features = _Features.initModel(sequelize);
  const FileStatus = _FileStatus.initModel(sequelize);
  const KcMap = _KcMap.initModel(sequelize);
  const ObjectMapping = _ObjectMapping.initModel(sequelize);
  const Orchestration = _Orchestration.initModel(sequelize);
  const OrchestrationActions = _OrchestrationActions.initModel(sequelize);
  const Organization = _Organization.initModel(sequelize);
  const OrganizationType = _OrganizationType.initModel(sequelize);
  const PartyMaster = _PartyMaster.initModel(sequelize);
  const ProductMapping = _ProductMapping.initModel(sequelize);
  const ProductMaster = _ProductMaster.initModel(sequelize);
  const QueryTypes = _QueryTypes.initModel(sequelize);
  const RoleMaster = _RoleMaster.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);
  const SiteType = _SiteType.initModel(sequelize);
  const Sites = _Sites.initModel(sequelize);
  const State = _State.initModel(sequelize);
  const States = _States.initModel(sequelize);
  const SubType = _SubType.initModel(sequelize);
  const TenantConnections = _TenantConnections.initModel(sequelize);
  const Tenants = _Tenants.initModel(sequelize);
  const UserRoles = _UserRoles.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  DataObjects.belongsTo(Applications, { as: "application_code_application", foreignKey: "application_code"});
  Applications.hasMany(DataObjects, { as: "data_objects", foreignKey: "application_code"});
  Features.belongsTo(Applications, { as: "application_code_application", foreignKey: "application_code"});
  Applications.hasMany(Features, { as: "features", foreignKey: "application_code"});
  ObjectMapping.belongsTo(Applications, { as: "application_code_application", foreignKey: "application_code"});
  Applications.hasMany(ObjectMapping, { as: "object_mappings", foreignKey: "application_code"});
  Orchestration.belongsTo(Applications, { as: "application_code_application", foreignKey: "application_code"});
  Applications.hasMany(Orchestration, { as: "orchestrations", foreignKey: "application_code"});
  County.belongsTo(City, { as: "city_code_city", foreignKey: "city_code"});
  City.hasMany(County, { as: "counties", foreignKey: "city_code"});
  Sites.belongsTo(City, { as: "city_code_city", foreignKey: "city_code"});
  City.hasMany(Sites, { as: "sites", foreignKey: "city_code"});
  Sites.belongsTo(Country, { as: "country_code_country", foreignKey: "country_code"});
  Country.hasMany(Sites, { as: "sites", foreignKey: "country_code"});
  State.belongsTo(Country, { as: "country_code_country", foreignKey: "country_code"});
  Country.hasMany(State, { as: "states", foreignKey: "country_code"});
  Sites.belongsTo(County, { as: "county_code_county", foreignKey: "county_code"});
  County.hasMany(Sites, { as: "sites", foreignKey: "county_code"});
  DataObjectKeys.belongsTo(DataObjects, { as: "data_object", foreignKey: "data_object_id"});
  DataObjects.hasMany(DataObjectKeys, { as: "data_object_keys", foreignKey: "data_object_id"});
  DataObjectKeys.belongsTo(DataObjects, { as: "data_object_type", foreignKey: "data_object_type_id"});
  DataObjects.hasMany(DataObjectKeys, { as: "data_object_type_data_object_keys", foreignKey: "data_object_type_id"});
  Features.belongsTo(DataObjects, { as: "data_object", foreignKey: "data_object_id"});
  DataObjects.hasMany(Features, { as: "features", foreignKey: "data_object_id"});
  Features.belongsTo(DataObjects, { as: "request_object", foreignKey: "request_object_id"});
  DataObjects.hasMany(Features, { as: "request_object_features", foreignKey: "request_object_id"});
  Features.belongsTo(DataObjects, { as: "response_object", foreignKey: "response_object_id"});
  DataObjects.hasMany(Features, { as: "response_object_features", foreignKey: "response_object_id"});
  ObjectMapping.belongsTo(DataObjects, { as: "source_object", foreignKey: "source_object_id"});
  DataObjects.hasMany(ObjectMapping, { as: "object_mappings", foreignKey: "source_object_id"});
  ObjectMapping.belongsTo(DataObjects, { as: "target_object", foreignKey: "target_object_id"});
  DataObjects.hasMany(ObjectMapping, { as: "target_object_object_mappings", foreignKey: "target_object_id"});
  Orchestration.belongsTo(DataObjects, { as: "source_object", foreignKey: "source_object_id"});
  DataObjects.hasMany(Orchestration, { as: "orchestrations", foreignKey: "source_object_id"});
  FeatureExternalConfig.belongsTo(Features, { as: "feature", foreignKey: "feature_id"});
  Features.hasMany(FeatureExternalConfig, { as: "feature_external_configs", foreignKey: "feature_id"});
  FeatureHlfConfig.belongsTo(Features, { as: "feature", foreignKey: "feature_id"});
  Features.hasMany(FeatureHlfConfig, { as: "feature_hlf_configs", foreignKey: "feature_id"});
  FeatureRoleMapping.belongsTo(Features, { as: "feature", foreignKey: "feature_id"});
  Features.hasMany(FeatureRoleMapping, { as: "feature_role_mappings", foreignKey: "feature_id"});
  FeatureSodView.belongsTo(Features, { as: "feature", foreignKey: "feature_id"});
  Features.hasMany(FeatureSodView, { as: "feature_sod_views", foreignKey: "feature_id"});
  OrchestrationActions.belongsTo(Orchestration, { as: "orchestration", foreignKey: "orchestration_id"});
  Orchestration.hasMany(OrchestrationActions, { as: "orchestration_actions", foreignKey: "orchestration_id"});
  ProductMapping.belongsTo(Organization, { as: "org", foreignKey: "org_id"});
  Organization.hasMany(ProductMapping, { as: "product_mappings", foreignKey: "org_id"});
  ProductMapping.belongsTo(ProductMaster, { as: "product", foreignKey: "product_id"});
  ProductMaster.hasMany(ProductMapping, { as: "product_mappings", foreignKey: "product_id"});
  Features.belongsTo(QueryTypes, { as: "query_type_code_query_type", foreignKey: "query_type_code"});
  QueryTypes.hasMany(Features, { as: "features", foreignKey: "query_type_code"});
  Sites.belongsTo(SiteType, { as: "site_type_code_site_type", foreignKey: "site_type_code"});
  SiteType.hasMany(Sites, { as: "sites", foreignKey: "site_type_code"});
  City.belongsTo(State, { as: "state_code_state", foreignKey: "state_code"});
  State.hasMany(City, { as: "cities", foreignKey: "state_code"});
  Sites.belongsTo(State, { as: "state_code_state", foreignKey: "state_code"});
  State.hasMany(Sites, { as: "sites", foreignKey: "state_code"});
  UserRoles.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(UserRoles, { as: "user_roles", foreignKey: "user_id"});

  return {
    Applications: Applications,
    Areas: Areas,
    AuthTokens: AuthTokens,
    City: City,
    Country: Country,
    County: County,
    DataObjectKeys: DataObjectKeys,
    DataObjects: DataObjects,
    Districts: Districts,
    FeatureDetailed: FeatureDetailed,
    FeatureExternalConfig: FeatureExternalConfig,
    FeatureHlfConfig: FeatureHlfConfig,
    FeatureRoleMapping: FeatureRoleMapping,
    FeatureSodView: FeatureSodView,
    Features: Features,
    FileStatus: FileStatus,
    KcMap: KcMap,
    ObjectMapping: ObjectMapping,
    Orchestration: Orchestration,
    OrchestrationActions: OrchestrationActions,
    Organization: Organization,
    OrganizationType: OrganizationType,
    PartyMaster: PartyMaster,
    ProductMapping: ProductMapping,
    ProductMaster: ProductMaster,
    QueryTypes: QueryTypes,
    RoleMaster: RoleMaster,
    Roles: Roles,
    SiteType: SiteType,
    Sites: Sites,
    State: State,
    States: States,
    SubType: SubType,
    TenantConnections: TenantConnections,
    Tenants: Tenants,
    UserRoles: UserRoles,
    Users: Users,
  };
}
