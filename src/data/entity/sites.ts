import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { City, CityId } from './city';
import type { Country, CountryId } from './country';
import type { County, CountyId } from './county';
import type { SiteType, SiteTypeId } from './site_type';
import type { State, StateId } from './state';

export interface SitesAttributes {
  id: number;
  site_name: string;
  address_line1?: string;
  address_line2?: string;
  country_code: string;
  state_code: string;
  county_code: string;
  city_code: string;
  zipcode: string;
  site_type_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type SitesPk = "id";
export type SitesId = Sites[SitesPk];
export type SitesOptionalAttributes = "id" | "address_line1" | "address_line2" | "createdAt" | "updatedAt" | "deletedAt";
export type SitesCreationAttributes = Optional<SitesAttributes, SitesOptionalAttributes>;

export class Sites extends Model<SitesAttributes, SitesCreationAttributes> implements SitesAttributes {
  id!: number;
  site_name!: string;
  address_line1?: string;
  address_line2?: string;
  country_code!: string;
  state_code!: string;
  county_code!: string;
  city_code!: string;
  zipcode!: string;
  site_type_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // Sites belongsTo City via city_code
  city_code_city!: City;
  getCity_code_city!: Sequelize.BelongsToGetAssociationMixin<City>;
  setCity_code_city!: Sequelize.BelongsToSetAssociationMixin<City, CityId>;
  createCity_code_city!: Sequelize.BelongsToCreateAssociationMixin<City>;
  // Sites belongsTo Country via country_code
  country_code_country!: Country;
  getCountry_code_country!: Sequelize.BelongsToGetAssociationMixin<Country>;
  setCountry_code_country!: Sequelize.BelongsToSetAssociationMixin<Country, CountryId>;
  createCountry_code_country!: Sequelize.BelongsToCreateAssociationMixin<Country>;
  // Sites belongsTo County via county_code
  county_code_county!: County;
  getCounty_code_county!: Sequelize.BelongsToGetAssociationMixin<County>;
  setCounty_code_county!: Sequelize.BelongsToSetAssociationMixin<County, CountyId>;
  createCounty_code_county!: Sequelize.BelongsToCreateAssociationMixin<County>;
  // Sites belongsTo SiteType via site_type_code
  site_type_code_site_type!: SiteType;
  getSite_type_code_site_type!: Sequelize.BelongsToGetAssociationMixin<SiteType>;
  setSite_type_code_site_type!: Sequelize.BelongsToSetAssociationMixin<SiteType, SiteTypeId>;
  createSite_type_code_site_type!: Sequelize.BelongsToCreateAssociationMixin<SiteType>;
  // Sites belongsTo State via state_code
  state_code_state!: State;
  getState_code_state!: Sequelize.BelongsToGetAssociationMixin<State>;
  setState_code_state!: Sequelize.BelongsToSetAssociationMixin<State, StateId>;
  createState_code_state!: Sequelize.BelongsToCreateAssociationMixin<State>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sites {
    return Sites.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    address_line1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address_line2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'country',
        key: 'name'
      }
    },
    state_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'state',
        key: 'state_code'
      }
    },
    county_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'county',
        key: 'county_code'
      }
    },
    city_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'city',
        key: 'city_code'
      }
    },
    zipcode: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    site_type_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'site_type',
        key: 'code'
      }
    }
  }, {
    sequelize,
    tableName: 'sites',
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
        name: "fk_sites_1_idx",
        using: "BTREE",
        fields: [
          { name: "city_code" },
        ]
      },
      {
        name: "fk_sites_3_idx",
        using: "BTREE",
        fields: [
          { name: "county_code" },
        ]
      },
      {
        name: "fk_sites_4_idx",
        using: "BTREE",
        fields: [
          { name: "state_code" },
        ]
      },
      {
        name: "fk_sites_2_idx",
        using: "BTREE",
        fields: [
          { name: "country_code" },
        ]
      },
      {
        name: "fk_sites_5_idx",
        using: "BTREE",
        fields: [
          { name: "site_type_code" },
        ]
      },
    ]
  });
  }
}
