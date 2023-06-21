import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Applications, ApplicationsId } from './applications';
import type { DataObjects, DataObjectsId } from './data_objects';

export interface ObjectMappingAttributes {
  id: number;
  source_object_code?: string;
  target_object_code?: string;
  source_attribute_code: string;
  target_attribute_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  application_code: string;
  source_object_id: number;
  target_object_id: number;
}

export type ObjectMappingPk = "id";
export type ObjectMappingId = ObjectMapping[ObjectMappingPk];
export type ObjectMappingOptionalAttributes = "id" | "source_object_code" | "target_object_code" | "createdAt" | "updatedAt" | "deletedAt";
export type ObjectMappingCreationAttributes = Optional<ObjectMappingAttributes, ObjectMappingOptionalAttributes>;

export class ObjectMapping extends Model<ObjectMappingAttributes, ObjectMappingCreationAttributes> implements ObjectMappingAttributes {
  id!: number;
  source_object_code?: string;
  target_object_code?: string;
  source_attribute_code!: string;
  target_attribute_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  application_code!: string;
  source_object_id!: number;
  target_object_id!: number;

  // ObjectMapping belongsTo Applications via application_code
  application_code_application!: Applications;
  getApplication_code_application!: Sequelize.BelongsToGetAssociationMixin<Applications>;
  setApplication_code_application!: Sequelize.BelongsToSetAssociationMixin<Applications, ApplicationsId>;
  createApplication_code_application!: Sequelize.BelongsToCreateAssociationMixin<Applications>;
  // ObjectMapping belongsTo DataObjects via source_object_id
  source_object!: DataObjects;
  getSource_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setSource_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createSource_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;
  // ObjectMapping belongsTo DataObjects via target_object_id
  target_object!: DataObjects;
  getTarget_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setTarget_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createTarget_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ObjectMapping {
    return ObjectMapping.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    source_object_code: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    target_object_code: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    source_attribute_code: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    target_attribute_code: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    application_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'applications',
        key: 'code'
      }
    },
    source_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    },
    target_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    }
  }, {
    sequelize,
    tableName: 'object_mapping',
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
          { name: "source_attribute_code" },
          { name: "target_attribute_code" },
          { name: "application_code" },
          { name: "deletedAt" },
          { name: "source_object_id" },
          { name: "target_object_id" },
        ]
      },
      {
        name: "fk_object_mapping_1_idx",
        using: "BTREE",
        fields: [
          { name: "source_object_id" },
        ]
      },
      {
        name: "fk_object_mapping_2_idx",
        using: "BTREE",
        fields: [
          { name: "target_object_id" },
        ]
      },
      {
        name: "fk_object_mapping_3_idx",
        using: "BTREE",
        fields: [
          { name: "application_code" },
        ]
      },
    ]
  });
  }
}
