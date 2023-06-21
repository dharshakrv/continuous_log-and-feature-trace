import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TenantsAttributes {
  id: number;
  tenant_id: string;
  tenant_Name: string;
  email: string;
  realm: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type TenantsPk = "id" | "tenant_id" | "realm";
export type TenantsId = Tenants[TenantsPk];
export type TenantsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type TenantsCreationAttributes = Optional<TenantsAttributes, TenantsOptionalAttributes>;

export class Tenants extends Model<TenantsAttributes, TenantsCreationAttributes> implements TenantsAttributes {
  id!: number;
  tenant_id!: string;
  tenant_Name!: string;
  email!: string;
  realm!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Tenants {
    return Tenants.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenant_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    tenant_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    realm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'tenants',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "tenant_id" },
          { name: "realm" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "tenant_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tenant_id" },
        ]
      },
      {
        name: "realm_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "realm" },
        ]
      },
    ]
  });
  }
}
