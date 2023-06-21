import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sites, SitesId } from './sites';
import type { State, StateId } from './state';

export interface CountryAttributes {
  id: number;
  name: string;
  country_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type CountryPk = "id";
export type CountryId = Country[CountryPk];
export type CountryOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type CountryCreationAttributes = Optional<CountryAttributes, CountryOptionalAttributes>;

export class Country extends Model<CountryAttributes, CountryCreationAttributes> implements CountryAttributes {
  id!: number;
  name!: string;
  country_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // Country hasMany Sites via country_code
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
  // Country hasMany State via country_code
  states!: State[];
  getStates!: Sequelize.HasManyGetAssociationsMixin<State>;
  setStates!: Sequelize.HasManySetAssociationsMixin<State, StateId>;
  addState!: Sequelize.HasManyAddAssociationMixin<State, StateId>;
  addStates!: Sequelize.HasManyAddAssociationsMixin<State, StateId>;
  createState!: Sequelize.HasManyCreateAssociationMixin<State>;
  removeState!: Sequelize.HasManyRemoveAssociationMixin<State, StateId>;
  removeStates!: Sequelize.HasManyRemoveAssociationsMixin<State, StateId>;
  hasState!: Sequelize.HasManyHasAssociationMixin<State, StateId>;
  hasStates!: Sequelize.HasManyHasAssociationsMixin<State, StateId>;
  countStates!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Country {
    return Country.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    country_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "country_code_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'country',
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
        name: "country_code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_code" },
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
