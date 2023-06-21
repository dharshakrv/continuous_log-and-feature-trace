import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Features, FeaturesId } from './features';

export interface QueryTypesAttributes {
  query_type_id: number;
  code: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type QueryTypesPk = "query_type_id" | "code";
export type QueryTypesId = QueryTypes[QueryTypesPk];
export type QueryTypesOptionalAttributes = "query_type_id" | "description" | "createdAt" | "updatedAt" | "deletedAt";
export type QueryTypesCreationAttributes = Optional<QueryTypesAttributes, QueryTypesOptionalAttributes>;

export class QueryTypes extends Model<QueryTypesAttributes, QueryTypesCreationAttributes> implements QueryTypesAttributes {
  query_type_id!: number;
  code!: string;
  name!: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // QueryTypes hasMany Features via query_type_code
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

  static initModel(sequelize: Sequelize.Sequelize): typeof QueryTypes {
    return QueryTypes.init({
    query_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'query_types',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "query_type_id" },
          { name: "code" },
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
