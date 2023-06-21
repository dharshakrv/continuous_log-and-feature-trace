import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RolesAttributes {
  role_id: number;
  role_uuid: string;
  name: string;
  code: string;
  description?: string;
  org_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type RolesPk = "role_id";
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = "role_id" | "description" | "org_code" | "createdAt" | "updatedAt" | "deletedAt";
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles extends Model<RolesAttributes, RolesCreationAttributes> implements RolesAttributes {
  role_id!: number;
  role_uuid!: string;
  name!: string;
  code!: string;
  description?: string;
  org_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
    return Roles.init({
    role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_uuid: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    org_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
