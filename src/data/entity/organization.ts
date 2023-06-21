import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProductMapping, ProductMappingId } from './product_mapping';

export interface OrganizationAttributes {
  id: number;
  org_id: string;
  org_code: string;
  org_name?: string;
  org_type?: string;
  email: string;
  mobile: string;
  realm: string;
  cin?: string;
  gstin?: string;
  state?: string;
  district?: string;
  area?: string;
  address?: string;
  active_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export type OrganizationPk = "id" | "org_id";
export type OrganizationId = Organization[OrganizationPk];
export type OrganizationOptionalAttributes = "id" | "org_name" | "org_type" | "cin" | "gstin" | "state" | "district" | "area" | "address" | "active_status" | "createdAt" | "updatedAt" | "deletedAt" | "createdBy" | "updatedBy" | "deletedBy";
export type OrganizationCreationAttributes = Optional<OrganizationAttributes, OrganizationOptionalAttributes>;

export class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
  id!: number;
  org_id!: string;
  org_code!: string;
  org_name?: string;
  org_type?: string;
  email!: string;
  mobile!: string;
  realm!: string;
  cin?: string;
  gstin?: string;
  state?: string;
  district?: string;
  area?: string;
  address?: string;
  active_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;

  // Organization hasMany ProductMapping via org_id
  product_mappings!: ProductMapping[];
  getProduct_mappings!: Sequelize.HasManyGetAssociationsMixin<ProductMapping>;
  setProduct_mappings!: Sequelize.HasManySetAssociationsMixin<ProductMapping, ProductMappingId>;
  addProduct_mapping!: Sequelize.HasManyAddAssociationMixin<ProductMapping, ProductMappingId>;
  addProduct_mappings!: Sequelize.HasManyAddAssociationsMixin<ProductMapping, ProductMappingId>;
  createProduct_mapping!: Sequelize.HasManyCreateAssociationMixin<ProductMapping>;
  removeProduct_mapping!: Sequelize.HasManyRemoveAssociationMixin<ProductMapping, ProductMappingId>;
  removeProduct_mappings!: Sequelize.HasManyRemoveAssociationsMixin<ProductMapping, ProductMappingId>;
  hasProduct_mapping!: Sequelize.HasManyHasAssociationMixin<ProductMapping, ProductMappingId>;
  hasProduct_mappings!: Sequelize.HasManyHasAssociationsMixin<ProductMapping, ProductMappingId>;
  countProduct_mappings!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Organization {
    return Organization.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    org_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    org_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "org_code_UNIQUE"
    },
    org_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    org_type: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "tenant,app admin or app engineer"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    realm: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cin: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    gstin: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    active_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'organization',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "org_id" },
        ]
      },
      {
        name: "org_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
      {
        name: "org_code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "org_code" },
        ]
      },
    ]
  });
  }
}
