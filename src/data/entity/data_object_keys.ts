import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { DataObjects, DataObjectsId } from './data_objects';

export interface DataObjectKeysAttributes {
  dok_id: number;
  code: string;
  name: string;
  description?: string;
  is_array: number;
  object_type_code?: string;
  object_code?: string;
  is_optional: number;
  key_location?: 'HEADER' | 'QUERY' | 'BODY';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  data_object_id: number;
  data_object_type_id: number;
  sequence_format?: string;
  sequence_start?: string;
}

export type DataObjectKeysPk = "dok_id";
export type DataObjectKeysId = DataObjectKeys[DataObjectKeysPk];
export type DataObjectKeysOptionalAttributes = "dok_id" | "description" | "is_array" | "object_type_code" | "object_code" | "is_optional" | "key_location" | "createdAt" | "updatedAt" | "deletedAt" | "sequence_format" | "sequence_start";
export type DataObjectKeysCreationAttributes = Optional<DataObjectKeysAttributes, DataObjectKeysOptionalAttributes>;

export class DataObjectKeys extends Model<DataObjectKeysAttributes, DataObjectKeysCreationAttributes> implements DataObjectKeysAttributes {
  dok_id!: number;
  code!: string;
  name!: string;
  description?: string;
  is_array!: number;
  object_type_code?: string;
  object_code?: string;
  is_optional!: number;
  key_location?: 'HEADER' | 'QUERY' | 'BODY';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  data_object_id!: number;
  data_object_type_id!: number;
  sequence_format?: string;
  sequence_start?: string;

  // DataObjectKeys belongsTo DataObjects via data_object_id
  data_object!: DataObjects;
  getData_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setData_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createData_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;
  // DataObjectKeys belongsTo DataObjects via data_object_type_id
  data_object_type!: DataObjects;
  getData_object_type!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setData_object_type!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createData_object_type!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;

  static initModel(sequelize: Sequelize.Sequelize): typeof DataObjectKeys {
    return DataObjectKeys.init({
    dok_id: {
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
    is_array: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    object_type_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    object_code: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    is_optional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    key_location: {
      type: DataTypes.ENUM('HEADER','QUERY','BODY'),
      allowNull: true,
      defaultValue: "BODY"
    },
    data_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    },
    data_object_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    },
    sequence_format: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sequence_start: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'data_object_keys',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dok_id" },
        ]
      },
      {
        name: "unique_code_object",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
          { name: "name" },
          { name: "data_object_id" },
          { name: "deletedAt" },
        ]
      },
      {
        name: "fk_data_object_keys_2_idx_idx",
        using: "BTREE",
        fields: [
          { name: "data_object_type_id" },
        ]
      },
      {
        name: "fk_data_object_keys_1_idx",
        using: "BTREE",
        fields: [
          { name: "data_object_id" },
        ]
      },
    ]
  });
  }
}
