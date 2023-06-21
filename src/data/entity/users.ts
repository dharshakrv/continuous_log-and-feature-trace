import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { UserRoles, UserRolesId } from './user_roles';

export interface UsersAttributes {
  id: number;
  user_id: string;
  name: string;
  email: string;
  mobile?: string;
  org_id?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "mobile" | "org_id" | "deletedAt" | "createdAt" | "updatedAt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  user_id!: string;
  name!: string;
  email!: string;
  mobile?: string;
  org_id?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  // Users hasMany UserRoles via user_id
  user_roles!: UserRoles[];
  getUser_roles!: Sequelize.HasManyGetAssociationsMixin<UserRoles>;
  setUser_roles!: Sequelize.HasManySetAssociationsMixin<UserRoles, UserRolesId>;
  addUser_role!: Sequelize.HasManyAddAssociationMixin<UserRoles, UserRolesId>;
  addUser_roles!: Sequelize.HasManyAddAssociationsMixin<UserRoles, UserRolesId>;
  createUser_role!: Sequelize.HasManyCreateAssociationMixin<UserRoles>;
  removeUser_role!: Sequelize.HasManyRemoveAssociationMixin<UserRoles, UserRolesId>;
  removeUser_roles!: Sequelize.HasManyRemoveAssociationsMixin<UserRoles, UserRolesId>;
  hasUser_role!: Sequelize.HasManyHasAssociationMixin<UserRoles, UserRolesId>;
  hasUser_roles!: Sequelize.HasManyHasAssociationsMixin<UserRoles, UserRolesId>;
  countUser_roles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "user_id_UNIQUE"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email_address_UNIQUE"
    },
    mobile: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    org_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "user_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
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
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email_address_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
