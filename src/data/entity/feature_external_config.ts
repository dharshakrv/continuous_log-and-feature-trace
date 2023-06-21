import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Features, FeaturesId } from './features';

export interface FeatureExternalConfigAttributes {
  id: number;
  EXT_method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  EXT_host?: string;
  EXT_port?: string;
  EXT_path?: string;
  EXT_query?: string;
  EXT_headers?: string;
  EXT_payload?: string;
  EXT_auth_type?: 'NO_AUTH' | 'BASIC' | 'BEARER';
  EXT_auth_code?: string;
  feature_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  EXT_protocol: 'http' | 'https';
  feature_id: number;
}

export type FeatureExternalConfigPk = "id";
export type FeatureExternalConfigId = FeatureExternalConfig[FeatureExternalConfigPk];
export type FeatureExternalConfigOptionalAttributes = "id" | "EXT_method" | "EXT_host" | "EXT_port" | "EXT_path" | "EXT_query" | "EXT_headers" | "EXT_payload" | "EXT_auth_type" | "EXT_auth_code" | "feature_code" | "createdAt" | "updatedAt" | "deletedAt";
export type FeatureExternalConfigCreationAttributes = Optional<FeatureExternalConfigAttributes, FeatureExternalConfigOptionalAttributes>;

export class FeatureExternalConfig extends Model<FeatureExternalConfigAttributes, FeatureExternalConfigCreationAttributes> implements FeatureExternalConfigAttributes {
  id!: number;
  EXT_method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  EXT_host?: string;
  EXT_port?: string;
  EXT_path?: string;
  EXT_query?: string;
  EXT_headers?: string;
  EXT_payload?: string;
  EXT_auth_type?: 'NO_AUTH' | 'BASIC' | 'BEARER';
  EXT_auth_code?: string;
  feature_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  EXT_protocol!: 'http' | 'https';
  feature_id!: number;

  // FeatureExternalConfig belongsTo Features via feature_id
  feature!: Features;
  getFeature!: Sequelize.BelongsToGetAssociationMixin<Features>;
  setFeature!: Sequelize.BelongsToSetAssociationMixin<Features, FeaturesId>;
  createFeature!: Sequelize.BelongsToCreateAssociationMixin<Features>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FeatureExternalConfig {
    return FeatureExternalConfig.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EXT_method: {
      type: DataTypes.ENUM('GET','POST','PUT','DELETE'),
      allowNull: true
    },
    EXT_host: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EXT_port: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EXT_path: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    EXT_query: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    EXT_headers: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    EXT_payload: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    EXT_auth_type: {
      type: DataTypes.ENUM('NO_AUTH','BASIC','BEARER'),
      allowNull: true
    },
    EXT_auth_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    feature_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EXT_protocol: {
      type: DataTypes.ENUM('http','https'),
      allowNull: false
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'features',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'feature_external_config',
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
        name: "fk_feature_external_config_1_idx",
        using: "BTREE",
        fields: [
          { name: "feature_id" },
        ]
      },
    ]
  });
  }
}
