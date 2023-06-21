import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Features, FeaturesId } from './features';

export interface FeatureSodViewAttributes {
  id: number;
  feature_code: string;
  sod_view_type_code: 'PART_OF_QUERY' | 'PRE_CHECK';
  view_data: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  priority: number;
  feature_id: number;
  status_enabled: number;
}

export type FeatureSodViewPk = "id";
export type FeatureSodViewId = FeatureSodView[FeatureSodViewPk];
export type FeatureSodViewOptionalAttributes = "id" | "sod_view_type_code" | "createdAt" | "updatedAt" | "deletedAt" | "priority" | "status_enabled";
export type FeatureSodViewCreationAttributes = Optional<FeatureSodViewAttributes, FeatureSodViewOptionalAttributes>;

export class FeatureSodView extends Model<FeatureSodViewAttributes, FeatureSodViewCreationAttributes> implements FeatureSodViewAttributes {
  id!: number;
  feature_code!: string;
  sod_view_type_code!: 'PART_OF_QUERY' | 'PRE_CHECK';
  view_data!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  priority!: number;
  feature_id!: number;
  status_enabled!: number;

  // FeatureSodView belongsTo Features via feature_id
  feature!: Features;
  getFeature!: Sequelize.BelongsToGetAssociationMixin<Features>;
  setFeature!: Sequelize.BelongsToSetAssociationMixin<Features, FeaturesId>;
  createFeature!: Sequelize.BelongsToCreateAssociationMixin<Features>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FeatureSodView {
    return FeatureSodView.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    feature_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sod_view_type_code: {
      type: DataTypes.ENUM('PART_OF_QUERY','PRE_CHECK'),
      allowNull: false,
      defaultValue: "PRE_CHECK"
    },
    view_data: {
      type: DataTypes.STRING(1500),
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'features',
        key: 'id'
      }
    },
    status_enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'feature_sod_view',
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
        name: "fk_feature_sod_view_1_idx",
        using: "BTREE",
        fields: [
          { name: "feature_id" },
        ]
      },
    ]
  });
  }
}
