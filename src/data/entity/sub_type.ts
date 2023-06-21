import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SubTypeAttributes {
  sub_typeid: number;
  code: string;
  name: string;
  description?: string;
  parent_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type SubTypePk = "sub_typeid";
export type SubTypeId = SubType[SubTypePk];
export type SubTypeOptionalAttributes = "sub_typeid" | "description" | "createdAt" | "updatedAt" | "deletedAt";
export type SubTypeCreationAttributes = Optional<SubTypeAttributes, SubTypeOptionalAttributes>;

export class SubType extends Model<SubTypeAttributes, SubTypeCreationAttributes> implements SubTypeAttributes {
  sub_typeid!: number;
  code!: string;
  name!: string;
  description?: string;
  parent_id!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof SubType {
    return SubType.init({
    sub_typeid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "code_UNIQUE"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    parent_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sub_type',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sub_typeid" },
        ]
      },
      {
        name: "code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
