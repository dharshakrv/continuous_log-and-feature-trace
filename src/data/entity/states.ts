import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StatesAttributes {
  state_id: number;
  state_name?: string;
  country_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type StatesPk = "state_id";
export type StatesId = States[StatesPk];
export type StatesOptionalAttributes = "state_id" | "state_name" | "country_name" | "createdAt" | "updatedAt" | "deletedAt";
export type StatesCreationAttributes = Optional<StatesAttributes, StatesOptionalAttributes>;

export class States extends Model<StatesAttributes, StatesCreationAttributes> implements StatesAttributes {
  state_id!: number;
  state_name?: string;
  country_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof States {
    return States.init({
    state_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'states',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
  }
}
