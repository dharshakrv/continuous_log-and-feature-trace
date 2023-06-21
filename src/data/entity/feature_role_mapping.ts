import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Features, FeaturesId } from './features';

export interface FeatureRoleMappingAttributes {
  id: number;
  role_code: string;
  feature_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  feature_id: number;
  role_name: string;
}

export type FeatureRoleMappingPk = "id";
export type FeatureRoleMappingId = FeatureRoleMapping[FeatureRoleMappingPk];
export type FeatureRoleMappingOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type FeatureRoleMappingCreationAttributes = Optional<FeatureRoleMappingAttributes, FeatureRoleMappingOptionalAttributes>;

export class FeatureRoleMapping extends Model<FeatureRoleMappingAttributes, FeatureRoleMappingCreationAttributes> implements FeatureRoleMappingAttributes {
  id!: number;
  role_code!: string;
  feature_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  feature_id!: number;
  role_name!: string;

  // FeatureRoleMapping belongsTo Features via feature_id
  feature!: Features;
  getFeature!: Sequelize.BelongsToGetAssociationMixin<Features>;
  setFeature!: Sequelize.BelongsToSetAssociationMixin<Features, FeaturesId>;
  createFeature!: Sequelize.BelongsToCreateAssociationMixin<Features>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FeatureRoleMapping {
    return FeatureRoleMapping.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    feature_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'features',
        key: 'id'
      }
    },
    role_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'feature_role_mapping',
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
        name: "fk_feature_role_mapping_1_idx",
        using: "BTREE",
        fields: [
          { name: "feature_id" },
        ]
      },
    ]
  });
  }
}
