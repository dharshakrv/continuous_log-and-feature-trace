import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TenantConnectionsAttributes {
  connection_id: number;
  org_id: string;
  connection_type: string;
  app_code: string;
  db_name: string;
  db_host: string;
  db_port: string;
  db_user: string;
  db_pwd: string;
}

export type TenantConnectionsPk = "connection_id";
export type TenantConnectionsId = TenantConnections[TenantConnectionsPk];
export type TenantConnectionsOptionalAttributes = "connection_id";
export type TenantConnectionsCreationAttributes = Optional<TenantConnectionsAttributes, TenantConnectionsOptionalAttributes>;

export class TenantConnections extends Model<TenantConnectionsAttributes, TenantConnectionsCreationAttributes> implements TenantConnectionsAttributes {
  connection_id!: number;
  org_id!: string;
  connection_type!: string;
  app_code!: string;
  db_name!: string;
  db_host!: string;
  db_port!: string;
  db_user!: string;
  db_pwd!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TenantConnections {
    return TenantConnections.init({
    connection_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    org_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    connection_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    app_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    db_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    db_host: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    db_port: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    db_user: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    db_pwd: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tenant_connections',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "connection_id" },
        ]
      },
    ]
  });
  }
}
