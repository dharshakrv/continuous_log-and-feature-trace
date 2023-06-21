import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RoleMasterAttributes {
  id: number;
  role_code?: string;
  role_name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export type RoleMasterPk = "id";
export type RoleMasterId = RoleMaster[RoleMasterPk];
export type RoleMasterOptionalAttributes = "id" | "role_code" | "role_name" | "createdAt" | "updatedAt" | "deletedAt";
export type RoleMasterCreationAttributes = Optional<RoleMasterAttributes, RoleMasterOptionalAttributes>;

export class RoleMaster extends Model<RoleMasterAttributes, RoleMasterCreationAttributes> implements RoleMasterAttributes {
  id!: number;
  role_code?: string;
  role_name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof RoleMaster {
    return RoleMaster.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    role_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'role_master',
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
    ]
  });
  }
}
