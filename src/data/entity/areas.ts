import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AreasAttributes {
  area_id: number;
  area_name?: string;
  zip_code?: number;
  district_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type AreasPk = "area_id";
export type AreasId = Areas[AreasPk];
export type AreasOptionalAttributes = "area_id" | "area_name" | "zip_code" | "district_id" | "createdAt" | "updatedAt" | "deletedAt";
export type AreasCreationAttributes = Optional<AreasAttributes, AreasOptionalAttributes>;

export class Areas extends Model<AreasAttributes, AreasCreationAttributes> implements AreasAttributes {
  area_id!: number;
  area_name?: string;
  zip_code?: number;
  district_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Areas {
    return Areas.init({
    area_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    area_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'areas',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
      {
        name: "idx_district_id",
        using: "BTREE",
        fields: [
          { name: "district_id" },
        ]
      },
    ]
  });
  }
}
