import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Orchestration, OrchestrationId } from './orchestration';

export interface OrchestrationActionsAttributes {
  oa_id: number;
  action_environment: string;
  feature_name: string;
  payload?: string;
  extra_headers?: string;
  extra_body?: string;
  orchestration_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  priority: number;
}

export type OrchestrationActionsPk = "oa_id";
export type OrchestrationActionsId = OrchestrationActions[OrchestrationActionsPk];
export type OrchestrationActionsOptionalAttributes = "oa_id" | "payload" | "extra_headers" | "extra_body" | "createdAt" | "updatedAt" | "deletedAt" | "priority";
export type OrchestrationActionsCreationAttributes = Optional<OrchestrationActionsAttributes, OrchestrationActionsOptionalAttributes>;

export class OrchestrationActions extends Model<OrchestrationActionsAttributes, OrchestrationActionsCreationAttributes> implements OrchestrationActionsAttributes {
  oa_id!: number;
  action_environment!: string;
  feature_name!: string;
  payload?: string;
  extra_headers?: string;
  extra_body?: string;
  orchestration_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  priority!: number;

  // OrchestrationActions belongsTo Orchestration via orchestration_id
  orchestration!: Orchestration;
  getOrchestration!: Sequelize.BelongsToGetAssociationMixin<Orchestration>;
  setOrchestration!: Sequelize.BelongsToSetAssociationMixin<Orchestration, OrchestrationId>;
  createOrchestration!: Sequelize.BelongsToCreateAssociationMixin<Orchestration>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrchestrationActions {
    return OrchestrationActions.init({
    oa_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    action_environment: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    feature_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    payload: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    extra_headers: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    extra_body: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    orchestration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orchestration',
        key: 'orchestration_id'
      }
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    }
  }, {
    sequelize,
    tableName: 'orchestration_actions',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "oa_id" },
        ]
      },
      {
        name: "fk_orchestration_id_1",
        using: "BTREE",
        fields: [
          { name: "orchestration_id" },
        ]
      },
    ]
  });
  }
}
