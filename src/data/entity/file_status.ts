import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FileStatusAttributes {
  id: number;
  app_code: string;
  base_code: string;
  org_id?: string;
  type?: 'IMPORT' | 'EXPORT';
  status: string;
  message: string;
  file_name?: string;
  API?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type FileStatusPk = "id";
export type FileStatusId = FileStatus[FileStatusPk];
export type FileStatusOptionalAttributes = "id" | "org_id" | "type" | "file_name" | "API" | "createdAt" | "updatedAt" | "deletedAt";
export type FileStatusCreationAttributes = Optional<FileStatusAttributes, FileStatusOptionalAttributes>;

export class FileStatus extends Model<FileStatusAttributes, FileStatusCreationAttributes> implements FileStatusAttributes {
  id!: number;
  app_code!: string;
  base_code!: string;
  org_id?: string;
  type?: 'IMPORT' | 'EXPORT';
  status!: string;
  message!: string;
  file_name?: string;
  API?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof FileStatus {
    return FileStatus.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    app_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    base_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    org_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('IMPORT','EXPORT'),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    API: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'file_status',
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
