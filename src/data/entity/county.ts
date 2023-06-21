import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { City, CityId } from './city';
import type { Sites, SitesId } from './sites';

export interface CountyAttributes {
  id: number;
  name: string;
  county_code: string;
  city_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type CountyPk = "id";
export type CountyId = County[CountyPk];
export type CountyOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type CountyCreationAttributes = Optional<CountyAttributes, CountyOptionalAttributes>;

export class County extends Model<CountyAttributes, CountyCreationAttributes> implements CountyAttributes {
  id!: number;
  name!: string;
  county_code!: string;
  city_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // County belongsTo City via city_code
  city_code_city!: City;
  getCity_code_city!: Sequelize.BelongsToGetAssociationMixin<City>;
  setCity_code_city!: Sequelize.BelongsToSetAssociationMixin<City, CityId>;
  createCity_code_city!: Sequelize.BelongsToCreateAssociationMixin<City>;
  // County hasMany Sites via county_code
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

  static initModel(sequelize: Sequelize.Sequelize): typeof County {
    return County.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    county_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "county_code_UNIQUE"
    },
    city_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'city',
        key: 'city_code'
      }
    }
  }, {
    sequelize,
    tableName: 'county',
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
        name: "county_code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "county_code" },
        ]
      },
      {
        name: "fk_county_city_code_idx",
        using: "BTREE",
        fields: [
          { name: "city_code" },
        ]
      },
    ]
  });
  }
}
