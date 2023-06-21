import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PartyMasterAttributes {
  id: number;
  party_id?: string;
  party_identifier?: string;
  party_name?: string;
  party_type?: string;
  org_id?: string;
  org_name?: string;
  org_type?: string;
  mobile_number?: string;
  email?: string;
  reporting_to?: string;
  reporting_to_name?: string;
  reporting_to_party_id?: string;
  active_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export type PartyMasterPk = "id";
export type PartyMasterId = PartyMaster[PartyMasterPk];
export type PartyMasterOptionalAttributes = "id" | "party_id" | "party_identifier" | "party_name" | "party_type" | "org_id" | "org_name" | "org_type" | "mobile_number" | "email" | "reporting_to" | "reporting_to_name" | "reporting_to_party_id" | "active_status" | "createdAt" | "updatedAt" | "deletedAt" | "createdBy" | "updatedBy" | "deletedBy";
export type PartyMasterCreationAttributes = Optional<PartyMasterAttributes, PartyMasterOptionalAttributes>;

export class PartyMaster extends Model<PartyMasterAttributes, PartyMasterCreationAttributes> implements PartyMasterAttributes {
  id!: number;
  party_id?: string;
  party_identifier?: string;
  party_name?: string;
  party_type?: string;
  org_id?: string;
  org_name?: string;
  org_type?: string;
  mobile_number?: string;
  email?: string;
  reporting_to?: string;
  reporting_to_name?: string;
  reporting_to_party_id?: string;
  active_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof PartyMaster {
    return PartyMaster.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    party_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    party_identifier: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    party_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    party_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    org_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    org_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    org_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    mobile_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    reporting_to: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    reporting_to_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    reporting_to_party_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    active_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'party_master',
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
