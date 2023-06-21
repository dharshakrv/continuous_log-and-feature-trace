import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DistrictsAttributes {
  district_id: number;
  district_name?: string;
  state_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type DistrictsPk = "district_id";
export type DistrictsId = Districts[DistrictsPk];
export type DistrictsOptionalAttributes = "district_id" | "district_name" | "state_id" | "createdAt" | "updatedAt" | "deletedAt";
export type DistrictsCreationAttributes = Optional<DistrictsAttributes, DistrictsOptionalAttributes>;

export class Districts extends Model<DistrictsAttributes, DistrictsCreationAttributes> implements DistrictsAttributes {
  district_id!: number;
  district_name?: string;
  state_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Districts {
    return Districts.init({
    district_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    district_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'districts',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "district_id" },
        ]
      },
      {
        name: "idx_state_id",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
  }
}
