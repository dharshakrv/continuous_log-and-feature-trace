import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { City, CityId } from './city';
import type { Country, CountryId } from './country';
import type { Sites, SitesId } from './sites';

export interface StateAttributes {
  id: number;
  state_name: string;
  state_code: string;
  country_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type StatePk = "id";
export type StateId = State[StatePk];
export type StateOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type StateCreationAttributes = Optional<StateAttributes, StateOptionalAttributes>;

export class State extends Model<StateAttributes, StateCreationAttributes> implements StateAttributes {
  id!: number;
  state_name!: string;
  state_code!: string;
  country_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // State belongsTo Country via country_code
  country_code_country!: Country;
  getCountry_code_country!: Sequelize.BelongsToGetAssociationMixin<Country>;
  setCountry_code_country!: Sequelize.BelongsToSetAssociationMixin<Country, CountryId>;
  createCountry_code_country!: Sequelize.BelongsToCreateAssociationMixin<Country>;
  // State hasMany City via state_code
  cities!: City[];
  getCities!: Sequelize.HasManyGetAssociationsMixin<City>;
  setCities!: Sequelize.HasManySetAssociationsMixin<City, CityId>;
  addCity!: Sequelize.HasManyAddAssociationMixin<City, CityId>;
  addCities!: Sequelize.HasManyAddAssociationsMixin<City, CityId>;
  createCity!: Sequelize.HasManyCreateAssociationMixin<City>;
  removeCity!: Sequelize.HasManyRemoveAssociationMixin<City, CityId>;
  removeCities!: Sequelize.HasManyRemoveAssociationsMixin<City, CityId>;
  hasCity!: Sequelize.HasManyHasAssociationMixin<City, CityId>;
  hasCities!: Sequelize.HasManyHasAssociationsMixin<City, CityId>;
  countCities!: Sequelize.HasManyCountAssociationsMixin;
  // State hasMany Sites via state_code
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

  static initModel(sequelize: Sequelize.Sequelize): typeof State {
    return State.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    state_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "state_code_UNIQUE"
    },
    country_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'country',
        key: 'country_code'
      }
    }
  }, {
    sequelize,
    tableName: 'state',
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
        name: "state_code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "state_code" },
        ]
      },
      {
        name: "fk_state_country_code_idx",
        using: "BTREE",
        fields: [
          { name: "country_code" },
        ]
      },
    ]
  });
  }
}
