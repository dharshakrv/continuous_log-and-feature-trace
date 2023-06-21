import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AuthTokensAttributes {
  id: number;
  code?: string;
  name?: string;
  description?: string;
  type?: 'NO_AUTH' | 'BASIC' | 'BEARER';
  value?: string;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type AuthTokensPk = "id";
export type AuthTokensId = AuthTokens[AuthTokensPk];
export type AuthTokensOptionalAttributes = "id" | "code" | "name" | "description" | "type" | "value" | "provider" | "createdAt" | "updatedAt" | "deletedAt";
export type AuthTokensCreationAttributes = Optional<AuthTokensAttributes, AuthTokensOptionalAttributes>;

export class AuthTokens extends Model<AuthTokensAttributes, AuthTokensCreationAttributes> implements AuthTokensAttributes {
  id!: number;
  code?: string;
  name?: string;
  description?: string;
  type?: 'NO_AUTH' | 'BASIC' | 'BEARER';
  value?: string;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AuthTokens {
    return AuthTokens.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "code_UNIQUE"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('NO_AUTH','BASIC','BEARER'),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'auth_tokens',
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
        name: "code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
  }
}
