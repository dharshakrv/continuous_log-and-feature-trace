import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Organization, OrganizationId } from './organization';
import type { ProductMaster, ProductMasterId } from './product_master';

export interface ProductMappingAttributes {
  id: number;
  org_id?: string;
  product_id?: number;
  app_code?: string;
  domain_details?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ProductMappingPk = "id";
export type ProductMappingId = ProductMapping[ProductMappingPk];
export type ProductMappingOptionalAttributes = "id" | "org_id" | "product_id" | "app_code" | "domain_details" | "createdAt" | "updatedAt" | "deletedAt";
export type ProductMappingCreationAttributes = Optional<ProductMappingAttributes, ProductMappingOptionalAttributes>;

export class ProductMapping extends Model<ProductMappingAttributes, ProductMappingCreationAttributes> implements ProductMappingAttributes {
  id!: number;
  org_id?: string;
  product_id?: number;
  app_code?: string;
  domain_details?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // ProductMapping belongsTo Organization via org_id
  org!: Organization;
  getOrg!: Sequelize.BelongsToGetAssociationMixin<Organization>;
  setOrg!: Sequelize.BelongsToSetAssociationMixin<Organization, OrganizationId>;
  createOrg!: Sequelize.BelongsToCreateAssociationMixin<Organization>;
  // ProductMapping belongsTo ProductMaster via product_id
  product!: ProductMaster;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<ProductMaster>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<ProductMaster, ProductMasterId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<ProductMaster>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductMapping {
    return ProductMapping.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    org_id: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'organization',
        key: 'org_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_master',
        key: 'product_id'
      }
    },
    app_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    domain_details: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_mapping',
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
        name: "productm_fk1_idx",
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
      {
        name: "productm_fk2_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
