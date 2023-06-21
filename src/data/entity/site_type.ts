import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sites, SitesId } from './sites';

export interface SiteTypeAttributes {
  id: number;
  code: string;
  description: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type SiteTypePk = "id";
export type SiteTypeId = SiteType[SiteTypePk];
export type SiteTypeOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type SiteTypeCreationAttributes = Optional<SiteTypeAttributes, SiteTypeOptionalAttributes>;

export class SiteType extends Model<SiteTypeAttributes, SiteTypeCreationAttributes> implements SiteTypeAttributes {
  id!: number;
  code!: string;
  description!: string;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // SiteType hasMany Sites via site_type_code
  sites!: Sites[];
  getSites!: Sequelize.HasManyGetAssociationsMixin<Sites>;
  setSites!: Sequelize.HasManySetAssociationsMixin<Sites, SitesId>;
  addSite!: Sequelize.HasManyAddAssociationMixin<Sites, SitesId>;
  addSites!: Sequelize.HasManyAddAssociationsMixin<Sites, SitesId>;
  createSite!: Sequelize.HasManyCreateAssociationMixin<Sites>;
  removeSite!: Sequelize.HasManyRemoveAssociationMixin<Sites, SitesId>;
  removeSites!: Sequelize.HasManyRemoveAssociationsMixin<Sites, SitesId>;
  hasSite!: Sequelize.HasManyHasAssociationMixin<Sites, SitesId>;
  hasSites!: Sequelize.HasManyHasAssociationsMixin<Sites, SitesId>;
  countSites!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof SiteType {
    return SiteType.init({
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
    description: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'site_type',
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
    ]
  });
  }
}
