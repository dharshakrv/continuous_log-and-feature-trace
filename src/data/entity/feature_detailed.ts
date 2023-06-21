import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FeatureDetailedAttributes {
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
  custom_response_object?: string;
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
  feid?: number;
  EXT_host?: string;
  EXT_path?: string;
  EXT_method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  EXT_payload?: string;
  EXT_port?: string;
  EXT_protocol?: 'http' | 'https';
  EXT_query?: string;
  EXT_auth_code?: string;
  EXT_auth_type?: 'NO_AUTH' | 'BASIC' | 'BEARER';
  EXT_headers?: string;
  dataObjectCode?: string;
  dataObjectName?: string;
  requestObjectCode?: string;
  requestObjectName?: string;
  responseObjectCode?: string;
  responseObjectName?: string;
  fhid?: number;
  network_name?: string;
  channel_name?: string;
  chaincode_name?: string;
  chaincode_function_name?: string;
  transient_args?: string;
  non_transient_args?: string;
  true_feature_name?: string;
  false_feature_name?: string;
}

export type FeatureDetailedPk = "id";
export type FeatureDetailedId = FeatureDetailed[FeatureDetailedPk];
export type FeatureDetailedOptionalAttributes = "id" | "description" | "data_object_code" | "response_object_code" | "request_object_code" | "request_method" | "static_parameters" | "custom_response_object" | "attribution_keys" | "key_columns" | "createdAt" | "updatedAt" | "deletedAt" | "feature_type" | "feature_condition" | "true_feature_code" | "false_feature_code" | "dont_use_request_obj_for_data_object" | "DB_operation_required" | "IT_count_expression" | "IT_feature_code" | "response_object_id" | "feid" | "EXT_host" | "EXT_path" | "EXT_method" | "EXT_payload" | "EXT_port" | "EXT_protocol" | "EXT_query" | "EXT_auth_code" | "EXT_auth_type" | "EXT_headers" | "dataObjectCode" | "dataObjectName" | "requestObjectCode" | "requestObjectName" | "responseObjectCode" | "responseObjectName" | "fhid" | "network_name" | "channel_name" | "chaincode_name" | "chaincode_function_name" | "transient_args" | "non_transient_args" | "true_feature_name" | "false_feature_name";
export type FeatureDetailedCreationAttributes = Optional<FeatureDetailedAttributes, FeatureDetailedOptionalAttributes>;

export class FeatureDetailed extends Model<FeatureDetailedAttributes, FeatureDetailedCreationAttributes> implements FeatureDetailedAttributes {
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
  custom_response_object?: string;
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
  feid?: number;
  EXT_host?: string;
  EXT_path?: string;
  EXT_method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  EXT_payload?: string;
  EXT_port?: string;
  EXT_protocol?: 'http' | 'https';
  EXT_query?: string;
  EXT_auth_code?: string;
  EXT_auth_type?: 'NO_AUTH' | 'BASIC' | 'BEARER';
  EXT_headers?: string;
  dataObjectCode?: string;
  dataObjectName?: string;
  requestObjectCode?: string;
  requestObjectName?: string;
  responseObjectCode?: string;
  responseObjectName?: string;
  fhid?: number;
  network_name?: string;
  channel_name?: string;
  chaincode_name?: string;
  chaincode_function_name?: string;
  transient_args?: string;
  non_transient_args?: string;
  true_feature_name?: string;
  false_feature_name?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof FeatureDetailed {
    return FeatureDetailed.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false
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
      allowNull: false
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
    custom_response_object: {
      type: DataTypes.STRING(10000),
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
      allowNull: false
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
      allowNull: false
    },
    request_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    response_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 48
    },
    feid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EXT_host: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EXT_path: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    EXT_method: {
      type: DataTypes.ENUM('GET','POST','PUT','DELETE'),
      allowNull: true
    },
    EXT_payload: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    EXT_port: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EXT_protocol: {
      type: DataTypes.ENUM('http','https'),
      allowNull: true
    },
    EXT_query: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    EXT_auth_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EXT_auth_type: {
      type: DataTypes.ENUM('NO_AUTH','BASIC','BEARER'),
      allowNull: true
    },
    EXT_headers: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    dataObjectCode: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    dataObjectName: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    requestObjectCode: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    requestObjectName: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    responseObjectCode: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    responseObjectName: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    fhid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    network_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    channel_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    chaincode_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    chaincode_function_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    transient_args: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    non_transient_args: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    true_feature_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    false_feature_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'feature_detailed',
    timestamps: true,
    paranoid: true
  });
  }
}
