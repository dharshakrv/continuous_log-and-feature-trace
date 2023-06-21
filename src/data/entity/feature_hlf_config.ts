import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Features, FeaturesId } from './features';

export interface FeatureHlfConfigAttributes {
  id: number;
  network_name: string;
  channel_name: string;
  chaincode_name: string;
  chaincode_function_name: string;
  transient_args?: string;
  non_transient_args?: string;
  feature_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type FeatureHlfConfigPk = "id";
export type FeatureHlfConfigId = FeatureHlfConfig[FeatureHlfConfigPk];
export type FeatureHlfConfigOptionalAttributes = "id" | "transient_args" | "non_transient_args" | "createdAt" | "updatedAt" | "deletedAt";
export type FeatureHlfConfigCreationAttributes = Optional<FeatureHlfConfigAttributes, FeatureHlfConfigOptionalAttributes>;

export class FeatureHlfConfig extends Model<FeatureHlfConfigAttributes, FeatureHlfConfigCreationAttributes> implements FeatureHlfConfigAttributes {
  id!: number;
  network_name!: string;
  channel_name!: string;
  chaincode_name!: string;
  chaincode_function_name!: string;
  transient_args?: string;
  non_transient_args?: string;
  feature_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // FeatureHlfConfig belongsTo Features via feature_id
  feature!: Features;
  getFeature!: Sequelize.BelongsToGetAssociationMixin<Features>;
  setFeature!: Sequelize.BelongsToSetAssociationMixin<Features, FeaturesId>;
  createFeature!: Sequelize.BelongsToCreateAssociationMixin<Features>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FeatureHlfConfig {
    return FeatureHlfConfig.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    network_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    channel_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    chaincode_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    chaincode_function_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    transient_args: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    non_transient_args: {
      type: DataTypes.STRING(1000),
      allowNull: true
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
    tableName: 'feature_hlf_config',
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
        name: "fk_feature_hlf_config_1_idx",
        using: "BTREE",
        fields: [
          { name: "feature_id" },
        ]
      },
    ]
  });
  }
}
