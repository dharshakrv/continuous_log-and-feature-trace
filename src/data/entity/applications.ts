import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { DataObjects, DataObjectsId } from './data_objects';
import type { Features, FeaturesId } from './features';
import type { ObjectMapping, ObjectMappingId } from './object_mapping';
import type { Orchestration, OrchestrationId } from './orchestration';

export interface ApplicationsAttributes {
  id: number;
  code: string;
  name: string;
  description?: string;
  widget_color?: string;
  type: 'PUBLIC' | 'PRIVATE';
  base_application_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ApplicationsPk = "id";
export type ApplicationsId = Applications[ApplicationsPk];
export type ApplicationsOptionalAttributes = "id" | "description" | "widget_color" | "type" | "base_application_code" | "createdAt" | "updatedAt" | "deletedAt";
export type ApplicationsCreationAttributes = Optional<ApplicationsAttributes, ApplicationsOptionalAttributes>;

export class Applications extends Model<ApplicationsAttributes, ApplicationsCreationAttributes> implements ApplicationsAttributes {
  id!: number;
  code!: string;
  name!: string;
  description?: string;
  widget_color?: string;
  type!: 'PUBLIC' | 'PRIVATE';
  base_application_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // Applications hasMany DataObjects via application_code
  data_objects!: DataObjects[];
  getData_objects!: Sequelize.HasManyGetAssociationsMixin<DataObjects>;
  setData_objects!: Sequelize.HasManySetAssociationsMixin<DataObjects, DataObjectsId>;
  addData_object!: Sequelize.HasManyAddAssociationMixin<DataObjects, DataObjectsId>;
  addData_objects!: Sequelize.HasManyAddAssociationsMixin<DataObjects, DataObjectsId>;
  createData_object!: Sequelize.HasManyCreateAssociationMixin<DataObjects>;
  removeData_object!: Sequelize.HasManyRemoveAssociationMixin<DataObjects, DataObjectsId>;
  removeData_objects!: Sequelize.HasManyRemoveAssociationsMixin<DataObjects, DataObjectsId>;
  hasData_object!: Sequelize.HasManyHasAssociationMixin<DataObjects, DataObjectsId>;
  hasData_objects!: Sequelize.HasManyHasAssociationsMixin<DataObjects, DataObjectsId>;
  countData_objects!: Sequelize.HasManyCountAssociationsMixin;
  // Applications hasMany Features via application_code
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
  // Applications hasMany ObjectMapping via application_code
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
  // Applications hasMany Orchestration via application_code
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Applications {
    return Applications.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    widget_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('PUBLIC','PRIVATE'),
      allowNull: false,
      defaultValue: "PUBLIC"
    },
    base_application_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'applications',
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
        ]
      },
      {
        name: "index2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
          { name: "name" },
          { name: "deletedAt" },
        ]
      },
    ]
  });
  }
}
