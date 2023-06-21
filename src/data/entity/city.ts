import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { County, CountyId } from './county';
import type { Sites, SitesId } from './sites';
import type { State, StateId } from './state';

export interface CityAttributes {
  id: number;
  name: string;
  city_code: string;
  state_code: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type CityPk = "id";
export type CityId = City[CityPk];
export type CityOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type CityCreationAttributes = Optional<CityAttributes, CityOptionalAttributes>;

export class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
  id!: number;
  name!: string;
  city_code!: string;
  state_code!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // City hasMany County via city_code
  counties!: County[];
  getCounties!: Sequelize.HasManyGetAssociationsMixin<County>;
  setCounties!: Sequelize.HasManySetAssociationsMixin<County, CountyId>;
  addCounty!: Sequelize.HasManyAddAssociationMixin<County, CountyId>;
  addCounties!: Sequelize.HasManyAddAssociationsMixin<County, CountyId>;
  createCounty!: Sequelize.HasManyCreateAssociationMixin<County>;
  removeCounty!: Sequelize.HasManyRemoveAssociationMixin<County, CountyId>;
  removeCounties!: Sequelize.HasManyRemoveAssociationsMixin<County, CountyId>;
  hasCounty!: Sequelize.HasManyHasAssociationMixin<County, CountyId>;
  hasCounties!: Sequelize.HasManyHasAssociationsMixin<County, CountyId>;
  countCounties!: Sequelize.HasManyCountAssociationsMixin;
  // City hasMany Sites via city_code
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
  // City belongsTo State via state_code
  state_code_state!: State;
  getState_code_state!: Sequelize.BelongsToGetAssociationMixin<State>;
  setState_code_state!: Sequelize.BelongsToSetAssociationMixin<State, StateId>;
  createState_code_state!: Sequelize.BelongsToCreateAssociationMixin<State>;

  static initModel(sequelize: Sequelize.Sequelize): typeof City {
    return City.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    city_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "city_code_UNIQUE"
    },
    state_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'state',
        key: 'state_code'
      }
    }
  }, {
    sequelize,
    tableName: 'city',
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
        name: "city_code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "city_code" },
        ]
      },
      {
        name: "fk_city_state_code_idx",
        using: "BTREE",
        fields: [
          { name: "state_code" },
        ]
      },
    ]
  });
  }
}
