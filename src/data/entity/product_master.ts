import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProductMapping, ProductMappingId } from './product_mapping';

export interface ProductMasterAttributes {
  product_id: number;
  product_code?: string;
  product_name?: string;
  product_image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletionAt?: Date;
}

export type ProductMasterPk = "product_id";
export type ProductMasterId = ProductMaster[ProductMasterPk];
export type ProductMasterOptionalAttributes = "product_id" | "product_code" | "product_name" | "product_image" | "createdAt" | "updatedAt" | "deletionAt";
export type ProductMasterCreationAttributes = Optional<ProductMasterAttributes, ProductMasterOptionalAttributes>;

export class ProductMaster extends Model<ProductMasterAttributes, ProductMasterCreationAttributes> implements ProductMasterAttributes {
  product_id!: number;
  product_code?: string;
  product_name?: string;
  product_image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletionAt?: Date;

  // ProductMaster hasMany ProductMapping via product_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductMaster {
    return ProductMaster.init({
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    product_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    product_image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    deletionAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_master',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
