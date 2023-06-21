import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrganizationTypeAttributes {
  id: number;
  code: string;
  name: string;
  description?: string;
  parent_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type OrganizationTypePk = "id";
export type OrganizationTypeId = OrganizationType[OrganizationTypePk];
export type OrganizationTypeOptionalAttributes = "id" | "description" | "createdAt" | "updatedAt" | "deletedAt";
export type OrganizationTypeCreationAttributes = Optional<OrganizationTypeAttributes, OrganizationTypeOptionalAttributes>;

export class OrganizationType extends Model<OrganizationTypeAttributes, OrganizationTypeCreationAttributes> implements OrganizationTypeAttributes {
  id!: number;
  code!: string;
  name!: string;
  description?: string;
  parent_id!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof OrganizationType {
    return OrganizationType.init({
    id: {
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
    tableName: 'organization_type',
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
