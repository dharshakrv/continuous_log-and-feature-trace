import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Applications, ApplicationsId } from './applications';
import type { DataObjectKeys, DataObjectKeysId } from './data_object_keys';
import type { Features, FeaturesId } from './features';
import type { ObjectMapping, ObjectMappingId } from './object_mapping';
import type { Orchestration, OrchestrationId } from './orchestration';

export interface DataObjectsAttributes {
  data_object_id: number;
  code: string;
  name: string;
  description?: string;
  user_defined: number;
  object_type: 'COMMON_OBJECT' | 'DATA_OBJECT' | 'REQUEST_OBJECT' | 'RESPONSE_OBJECT';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  application_code: string;
}

export type DataObjectsPk = "data_object_id";
export type DataObjectsId = DataObjects[DataObjectsPk];
export type DataObjectsOptionalAttributes = "data_object_id" | "description" | "user_defined" | "createdAt" | "updatedAt" | "deletedAt";
export type DataObjectsCreationAttributes = Optional<DataObjectsAttributes, DataObjectsOptionalAttributes>;

export class DataObjects extends Model<DataObjectsAttributes, DataObjectsCreationAttributes> implements DataObjectsAttributes {
  data_object_id!: number;
  code!: string;
  name!: string;
  description?: string;
  user_defined!: number;
  object_type!: 'COMMON_OBJECT' | 'DATA_OBJECT' | 'REQUEST_OBJECT' | 'RESPONSE_OBJECT';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  application_code!: string;

  // DataObjects belongsTo Applications via application_code
  application_code_application!: Applications;
  getApplication_code_application!: Sequelize.BelongsToGetAssociationMixin<Applications>;
  setApplication_code_application!: Sequelize.BelongsToSetAssociationMixin<Applications, ApplicationsId>;
  createApplication_code_application!: Sequelize.BelongsToCreateAssociationMixin<Applications>;
  // DataObjects hasMany DataObjectKeys via data_object_id
  data_object_keys!: DataObjectKeys[];
  getData_object_keys!: Sequelize.HasManyGetAssociationsMixin<DataObjectKeys>;
  setData_object_keys!: Sequelize.HasManySetAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  addData_object_key!: Sequelize.HasManyAddAssociationMixin<DataObjectKeys, DataObjectKeysId>;
  addData_object_keys!: Sequelize.HasManyAddAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  createData_object_key!: Sequelize.HasManyCreateAssociationMixin<DataObjectKeys>;
  removeData_object_key!: Sequelize.HasManyRemoveAssociationMixin<DataObjectKeys, DataObjectKeysId>;
  removeData_object_keys!: Sequelize.HasManyRemoveAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  hasData_object_key!: Sequelize.HasManyHasAssociationMixin<DataObjectKeys, DataObjectKeysId>;
  hasData_object_keys!: Sequelize.HasManyHasAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  countData_object_keys!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany DataObjectKeys via data_object_type_id
  data_object_type_data_object_keys!: DataObjectKeys[];
  getData_object_type_data_object_keys!: Sequelize.HasManyGetAssociationsMixin<DataObjectKeys>;
  setData_object_type_data_object_keys!: Sequelize.HasManySetAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  addData_object_type_data_object_key!: Sequelize.HasManyAddAssociationMixin<DataObjectKeys, DataObjectKeysId>;
  addData_object_type_data_object_keys!: Sequelize.HasManyAddAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  createData_object_type_data_object_key!: Sequelize.HasManyCreateAssociationMixin<DataObjectKeys>;
  removeData_object_type_data_object_key!: Sequelize.HasManyRemoveAssociationMixin<DataObjectKeys, DataObjectKeysId>;
  removeData_object_type_data_object_keys!: Sequelize.HasManyRemoveAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  hasData_object_type_data_object_key!: Sequelize.HasManyHasAssociationMixin<DataObjectKeys, DataObjectKeysId>;
  hasData_object_type_data_object_keys!: Sequelize.HasManyHasAssociationsMixin<DataObjectKeys, DataObjectKeysId>;
  countData_object_type_data_object_keys!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany Features via data_object_id
  features!: Features[];
  getFeatures!: Sequelize.HasManyGetAssociationsMixin<Features>;
  setFeatures!: Sequelize.HasManySetAssociationsMixin<Features, FeaturesId>;
  addFeature!: Sequelize.HasManyAddAssociationMixin<Features, FeaturesId>;
  addFeatures!: Sequelize.HasManyAddAssociationsMixin<Features, FeaturesId>;
  createFeature!: Sequelize.HasManyCreateAssociationMixin<Features>;
  removeFeature!: Sequelize.HasManyRemoveAssociationMixin<Features, FeaturesId>;
  removeFeatures!: Sequelize.HasManyRemoveAssociationsMixin<Features, FeaturesId>;
  hasFeature!: Sequelize.HasManyHasAssociationMixin<Features, FeaturesId>;
  hasFeatures!: Sequelize.HasManyHasAssociationsMixin<Features, FeaturesId>;
  countFeatures!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany Features via request_object_id
  request_object_features!: Features[];
  getRequest_object_features!: Sequelize.HasManyGetAssociationsMixin<Features>;
  setRequest_object_features!: Sequelize.HasManySetAssociationsMixin<Features, FeaturesId>;
  addRequest_object_feature!: Sequelize.HasManyAddAssociationMixin<Features, FeaturesId>;
  addRequest_object_features!: Sequelize.HasManyAddAssociationsMixin<Features, FeaturesId>;
  createRequest_object_feature!: Sequelize.HasManyCreateAssociationMixin<Features>;
  removeRequest_object_feature!: Sequelize.HasManyRemoveAssociationMixin<Features, FeaturesId>;
  removeRequest_object_features!: Sequelize.HasManyRemoveAssociationsMixin<Features, FeaturesId>;
  hasRequest_object_feature!: Sequelize.HasManyHasAssociationMixin<Features, FeaturesId>;
  hasRequest_object_features!: Sequelize.HasManyHasAssociationsMixin<Features, FeaturesId>;
  countRequest_object_features!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany Features via response_object_id
  response_object_features!: Features[];
  getResponse_object_features!: Sequelize.HasManyGetAssociationsMixin<Features>;
  setResponse_object_features!: Sequelize.HasManySetAssociationsMixin<Features, FeaturesId>;
  addResponse_object_feature!: Sequelize.HasManyAddAssociationMixin<Features, FeaturesId>;
  addResponse_object_features!: Sequelize.HasManyAddAssociationsMixin<Features, FeaturesId>;
  createResponse_object_feature!: Sequelize.HasManyCreateAssociationMixin<Features>;
  removeResponse_object_feature!: Sequelize.HasManyRemoveAssociationMixin<Features, FeaturesId>;
  removeResponse_object_features!: Sequelize.HasManyRemoveAssociationsMixin<Features, FeaturesId>;
  hasResponse_object_feature!: Sequelize.HasManyHasAssociationMixin<Features, FeaturesId>;
  hasResponse_object_features!: Sequelize.HasManyHasAssociationsMixin<Features, FeaturesId>;
  countResponse_object_features!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany ObjectMapping via source_object_id
  object_mappings!: ObjectMapping[];
  getObject_mappings!: Sequelize.HasManyGetAssociationsMixin<ObjectMapping>;
  setObject_mappings!: Sequelize.HasManySetAssociationsMixin<ObjectMapping, ObjectMappingId>;
  addObject_mapping!: Sequelize.HasManyAddAssociationMixin<ObjectMapping, ObjectMappingId>;
  addObject_mappings!: Sequelize.HasManyAddAssociationsMixin<ObjectMapping, ObjectMappingId>;
  createObject_mapping!: Sequelize.HasManyCreateAssociationMixin<ObjectMapping>;
  removeObject_mapping!: Sequelize.HasManyRemoveAssociationMixin<ObjectMapping, ObjectMappingId>;
  removeObject_mappings!: Sequelize.HasManyRemoveAssociationsMixin<ObjectMapping, ObjectMappingId>;
  hasObject_mapping!: Sequelize.HasManyHasAssociationMixin<ObjectMapping, ObjectMappingId>;
  hasObject_mappings!: Sequelize.HasManyHasAssociationsMixin<ObjectMapping, ObjectMappingId>;
  countObject_mappings!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany ObjectMapping via target_object_id
  target_object_object_mappings!: ObjectMapping[];
  getTarget_object_object_mappings!: Sequelize.HasManyGetAssociationsMixin<ObjectMapping>;
  setTarget_object_object_mappings!: Sequelize.HasManySetAssociationsMixin<ObjectMapping, ObjectMappingId>;
  addTarget_object_object_mapping!: Sequelize.HasManyAddAssociationMixin<ObjectMapping, ObjectMappingId>;
  addTarget_object_object_mappings!: Sequelize.HasManyAddAssociationsMixin<ObjectMapping, ObjectMappingId>;
  createTarget_object_object_mapping!: Sequelize.HasManyCreateAssociationMixin<ObjectMapping>;
  removeTarget_object_object_mapping!: Sequelize.HasManyRemoveAssociationMixin<ObjectMapping, ObjectMappingId>;
  removeTarget_object_object_mappings!: Sequelize.HasManyRemoveAssociationsMixin<ObjectMapping, ObjectMappingId>;
  hasTarget_object_object_mapping!: Sequelize.HasManyHasAssociationMixin<ObjectMapping, ObjectMappingId>;
  hasTarget_object_object_mappings!: Sequelize.HasManyHasAssociationsMixin<ObjectMapping, ObjectMappingId>;
  countTarget_object_object_mappings!: Sequelize.HasManyCountAssociationsMixin;
  // DataObjects hasMany Orchestration via source_object_id
  orchestrations!: Orchestration[];
  getOrchestrations!: Sequelize.HasManyGetAssociationsMixin<Orchestration>;
  setOrchestrations!: Sequelize.HasManySetAssociationsMixin<Orchestration, OrchestrationId>;
  addOrchestration!: Sequelize.HasManyAddAssociationMixin<Orchestration, OrchestrationId>;
  addOrchestrations!: Sequelize.HasManyAddAssociationsMixin<Orchestration, OrchestrationId>;
  createOrchestration!: Sequelize.HasManyCreateAssociationMixin<Orchestration>;
  removeOrchestration!: Sequelize.HasManyRemoveAssociationMixin<Orchestration, OrchestrationId>;
  removeOrchestrations!: Sequelize.HasManyRemoveAssociationsMixin<Orchestration, OrchestrationId>;
  hasOrchestration!: Sequelize.HasManyHasAssociationMixin<Orchestration, OrchestrationId>;
  hasOrchestrations!: Sequelize.HasManyHasAssociationsMixin<Orchestration, OrchestrationId>;
  countOrchestrations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof DataObjects {
    return DataObjects.init({
    data_object_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    user_defined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    object_type: {
      type: DataTypes.ENUM('COMMON_OBJECT','DATA_OBJECT','REQUEST_OBJECT','RESPONSE_OBJECT'),
      allowNull: false
    },
    application_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'applications',
        key: 'code'
      }
    }
  }, {
    sequelize,
    tableName: 'data_objects',
    hasTrigger: true,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "data_object_id" },
        ]
      },
      {
        name: "index3",
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
        name: "fk_data_objects_1_idx",
        using: "BTREE",
        fields: [
          { name: "application_code" },
        ]
      },
    ]
  });
  }
}
