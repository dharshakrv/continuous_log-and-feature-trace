import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface UserRolesAttributes {
  ur_id: number;
  user_id: number;
  role_code: string;
  app_code?: string;
  org_id?: string;
  active_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type UserRolesPk = "ur_id";
export type UserRolesId = UserRoles[UserRolesPk];
export type UserRolesOptionalAttributes = "ur_id" | "app_code" | "org_id" | "active_status" | "createdAt" | "updatedAt" | "deletedAt";
export type UserRolesCreationAttributes = Optional<UserRolesAttributes, UserRolesOptionalAttributes>;

export class UserRoles extends Model<UserRolesAttributes, UserRolesCreationAttributes> implements UserRolesAttributes {
  ur_id!: number;
  user_id!: number;
  role_code!: string;
  app_code?: string;
  org_id?: string;
  active_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // UserRoles belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserRoles {
    return UserRoles.init({
    ur_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    app_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    org_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    active_status: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_roles',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ur_id" },
        ]
      },
      {
        name: "fk_users_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
