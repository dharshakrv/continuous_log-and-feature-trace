import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Applications, ApplicationsId } from './applications';
import type { DataObjects, DataObjectsId } from './data_objects';
import type { FeatureExternalConfig, FeatureExternalConfigId } from './feature_external_config';
import type { FeatureHlfConfig, FeatureHlfConfigId } from './feature_hlf_config';
import type { FeatureRoleMapping, FeatureRoleMappingId } from './feature_role_mapping';
import type { FeatureSodView, FeatureSodViewId } from './feature_sod_view';
import type { QueryTypes, QueryTypesId } from './query_types';

export interface FeaturesAttributes {
  id: number;
  code: string;
  name: string;
  description?: string;
  access_type: 'CLIENT' | 'PRIVATE';
  data_object_code?: string;
  response_object_code?: string;
  request_object_code?: string;
  query_type_code: string;
  request_method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  static_parameters?: string;
  attribution_keys?: string;
  key_columns?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  feature_type: 'NORMAL' | 'CONDITIONAL' | 'ITERATIVE' | 'EXTERNAL_API_CALL' | 'HLF_CC_FUNCTION';
  feature_condition?: string;
  true_feature_code?: string;
  false_feature_code?: string;
  dont_use_request_obj_for_data_object: number;
  application_code: string;
  DB_operation_required: number;
  IT_count_expression?: string;
  IT_feature_code?: string;
  data_object_id: number;
  request_object_id: number;
  response_object_id: number;
  custom_response_object?: string;
}

export type FeaturesPk = "id" | "code" | "application_code";
export type FeaturesId = Features[FeaturesPk];
export type FeaturesOptionalAttributes = "id" | "description" | "data_object_code" | "response_object_code" | "request_object_code" | "request_method" | "static_parameters" | "attribution_keys" | "key_columns" | "createdAt" | "updatedAt" | "deletedAt" | "feature_type" | "feature_condition" | "true_feature_code" | "false_feature_code" | "dont_use_request_obj_for_data_object" | "DB_operation_required" | "IT_count_expression" | "IT_feature_code" | "response_object_id" | "custom_response_object";
export type FeaturesCreationAttributes = Optional<FeaturesAttributes, FeaturesOptionalAttributes>;

export class Features extends Model<FeaturesAttributes, FeaturesCreationAttributes> implements FeaturesAttributes {
  id!: number;
  code!: string;
  name!: string;
  description?: string;
  access_type!: 'CLIENT' | 'PRIVATE';
  data_object_code?: string;
  response_object_code?: string;
  request_object_code?: string;
  query_type_code!: string;
  request_method!: 'POST' | 'GET' | 'PUT' | 'DELETE';
  static_parameters?: string;
  attribution_keys?: string;
  key_columns?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  feature_type!: 'NORMAL' | 'CONDITIONAL' | 'ITERATIVE' | 'EXTERNAL_API_CALL' | 'HLF_CC_FUNCTION';
  feature_condition?: string;
  true_feature_code?: string;
  false_feature_code?: string;
  dont_use_request_obj_for_data_object!: number;
  application_code!: string;
  DB_operation_required!: number;
  IT_count_expression?: string;
  IT_feature_code?: string;
  data_object_id!: number;
  request_object_id!: number;
  response_object_id!: number;
  custom_response_object?: string;

  // Features belongsTo Applications via application_code
  application_code_application!: Applications;
  getApplication_code_application!: Sequelize.BelongsToGetAssociationMixin<Applications>;
  setApplication_code_application!: Sequelize.BelongsToSetAssociationMixin<Applications, ApplicationsId>;
  createApplication_code_application!: Sequelize.BelongsToCreateAssociationMixin<Applications>;
  // Features belongsTo DataObjects via data_object_id
  data_object!: DataObjects;
  getData_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setData_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createData_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;
  // Features belongsTo DataObjects via request_object_id
  request_object!: DataObjects;
  getRequest_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setRequest_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createRequest_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;
  // Features belongsTo DataObjects via response_object_id
  response_object!: DataObjects;
  getResponse_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setResponse_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createResponse_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;
  // Features hasMany FeatureExternalConfig via feature_id
  feature_external_configs!: FeatureExternalConfig[];
  getFeature_external_configs!: Sequelize.HasManyGetAssociationsMixin<FeatureExternalConfig>;
  setFeature_external_configs!: Sequelize.HasManySetAssociationsMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  addFeature_external_config!: Sequelize.HasManyAddAssociationMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  addFeature_external_configs!: Sequelize.HasManyAddAssociationsMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  createFeature_external_config!: Sequelize.HasManyCreateAssociationMixin<FeatureExternalConfig>;
  removeFeature_external_config!: Sequelize.HasManyRemoveAssociationMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  removeFeature_external_configs!: Sequelize.HasManyRemoveAssociationsMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  hasFeature_external_config!: Sequelize.HasManyHasAssociationMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  hasFeature_external_configs!: Sequelize.HasManyHasAssociationsMixin<FeatureExternalConfig, FeatureExternalConfigId>;
  countFeature_external_configs!: Sequelize.HasManyCountAssociationsMixin;
  // Features hasMany FeatureHlfConfig via feature_id
  feature_hlf_configs!: FeatureHlfConfig[];
  getFeature_hlf_configs!: Sequelize.HasManyGetAssociationsMixin<FeatureHlfConfig>;
  setFeature_hlf_configs!: Sequelize.HasManySetAssociationsMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  addFeature_hlf_config!: Sequelize.HasManyAddAssociationMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  addFeature_hlf_configs!: Sequelize.HasManyAddAssociationsMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  createFeature_hlf_config!: Sequelize.HasManyCreateAssociationMixin<FeatureHlfConfig>;
  removeFeature_hlf_config!: Sequelize.HasManyRemoveAssociationMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  removeFeature_hlf_configs!: Sequelize.HasManyRemoveAssociationsMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  hasFeature_hlf_config!: Sequelize.HasManyHasAssociationMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  hasFeature_hlf_configs!: Sequelize.HasManyHasAssociationsMixin<FeatureHlfConfig, FeatureHlfConfigId>;
  countFeature_hlf_configs!: Sequelize.HasManyCountAssociationsMixin;
  // Features hasMany FeatureRoleMapping via feature_id
  feature_role_mappings!: FeatureRoleMapping[];
  getFeature_role_mappings!: Sequelize.HasManyGetAssociationsMixin<FeatureRoleMapping>;
  setFeature_role_mappings!: Sequelize.HasManySetAssociationsMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  addFeature_role_mapping!: Sequelize.HasManyAddAssociationMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  addFeature_role_mappings!: Sequelize.HasManyAddAssociationsMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  createFeature_role_mapping!: Sequelize.HasManyCreateAssociationMixin<FeatureRoleMapping>;
  removeFeature_role_mapping!: Sequelize.HasManyRemoveAssociationMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  removeFeature_role_mappings!: Sequelize.HasManyRemoveAssociationsMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  hasFeature_role_mapping!: Sequelize.HasManyHasAssociationMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  hasFeature_role_mappings!: Sequelize.HasManyHasAssociationsMixin<FeatureRoleMapping, FeatureRoleMappingId>;
  countFeature_role_mappings!: Sequelize.HasManyCountAssociationsMixin;
  // Features hasMany FeatureSodView via feature_id
  feature_sod_views!: FeatureSodView[];
  getFeature_sod_views!: Sequelize.HasManyGetAssociationsMixin<FeatureSodView>;
  setFeature_sod_views!: Sequelize.HasManySetAssociationsMixin<FeatureSodView, FeatureSodViewId>;
  addFeature_sod_view!: Sequelize.HasManyAddAssociationMixin<FeatureSodView, FeatureSodViewId>;
  addFeature_sod_views!: Sequelize.HasManyAddAssociationsMixin<FeatureSodView, FeatureSodViewId>;
  createFeature_sod_view!: Sequelize.HasManyCreateAssociationMixin<FeatureSodView>;
  removeFeature_sod_view!: Sequelize.HasManyRemoveAssociationMixin<FeatureSodView, FeatureSodViewId>;
  removeFeature_sod_views!: Sequelize.HasManyRemoveAssociationsMixin<FeatureSodView, FeatureSodViewId>;
  hasFeature_sod_view!: Sequelize.HasManyHasAssociationMixin<FeatureSodView, FeatureSodViewId>;
  hasFeature_sod_views!: Sequelize.HasManyHasAssociationsMixin<FeatureSodView, FeatureSodViewId>;
  countFeature_sod_views!: Sequelize.HasManyCountAssociationsMixin;
  // Features belongsTo QueryTypes via query_type_code
  query_type_code_query_type!: QueryTypes;
  getQuery_type_code_query_type!: Sequelize.BelongsToGetAssociationMixin<QueryTypes>;
  setQuery_type_code_query_type!: Sequelize.BelongsToSetAssociationMixin<QueryTypes, QueryTypesId>;
  createQuery_type_code_query_type!: Sequelize.BelongsToCreateAssociationMixin<QueryTypes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Features {
    return Features.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    access_type: {
      type: DataTypes.ENUM('CLIENT','PRIVATE'),
      allowNull: false
    },
    data_object_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    response_object_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    request_object_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    query_type_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'query_types',
        key: 'code'
      }
    },
    request_method: {
      type: DataTypes.ENUM('POST','GET','PUT','DELETE'),
      allowNull: false,
      defaultValue: "GET"
    },
    static_parameters: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attribution_keys: {
      type: DataTypes.STRING(20000),
      allowNull: true
    },
    key_columns: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    feature_type: {
      type: DataTypes.ENUM('NORMAL','CONDITIONAL','ITERATIVE','EXTERNAL_API_CALL','HLF_CC_FUNCTION'),
      allowNull: false,
      defaultValue: "NORMAL"
    },
    feature_condition: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    true_feature_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    false_feature_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dont_use_request_obj_for_data_object: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    application_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'applications',
        key: 'code'
      }
    },
    DB_operation_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    IT_count_expression: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    IT_feature_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    data_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    },
    request_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    },
    response_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 48,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    },
    custom_response_object: {
      type: DataTypes.STRING(10000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'features',
    hasTrigger: true,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "code" },
          { name: "application_code" },
        ]
      },
      {
        name: "index7",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
          { name: "name" },
          { name: "application_code" },
          { name: "deletedAt" },
        ]
      },
      {
        name: "fk_features_4_idx",
        using: "BTREE",
        fields: [
          { name: "query_type_code" },
        ]
      },
      {
        name: "fk_features_5_idx",
        using: "BTREE",
        fields: [
          { name: "application_code" },
        ]
      },
      {
        name: "fk_features_6_idx",
        using: "BTREE",
        fields: [
          { name: "data_object_id" },
        ]
      },
      {
        name: "fk_features_7_idx",
        using: "BTREE",
        fields: [
          { name: "request_object_id" },
        ]
      },
      {
        name: "fk_features_8_idx",
        using: "BTREE",
        fields: [
          { name: "response_object_id" },
        ]
      },
      {
        name: "index8",
        using: "BTREE",
        fields: [
          { name: "true_feature_code" },
          { name: "application_code" },
        ]
      },
      {
        name: "index9",
        using: "BTREE",
        fields: [
          { name: "false_feature_code" },
          { name: "application_code" },
        ]
      },
    ]
  });
  }
}
