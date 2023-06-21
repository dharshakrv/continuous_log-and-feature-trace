import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Applications, ApplicationsId } from './applications';
import type { DataObjects, DataObjectsId } from './data_objects';
import type { OrchestrationActions, OrchestrationActionsId } from './orchestration_actions';

export interface OrchestrationAttributes {
  orchestration_id: number;
  source_object_code?: string;
  source_action_code: 'CREATE' | 'UPDATE';
  source_condition?: string;
  request_condition?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  application_code: string;
  source_object_id: number;
}

export type OrchestrationPk = "orchestration_id";
export type OrchestrationId = Orchestration[OrchestrationPk];
export type OrchestrationOptionalAttributes = "orchestration_id" | "source_object_code" | "source_action_code" | "source_condition" | "request_condition" | "createdAt" | "updatedAt" | "deletedAt";
export type OrchestrationCreationAttributes = Optional<OrchestrationAttributes, OrchestrationOptionalAttributes>;

export class Orchestration extends Model<OrchestrationAttributes, OrchestrationCreationAttributes> implements OrchestrationAttributes {
  orchestration_id!: number;
  source_object_code?: string;
  source_action_code!: 'CREATE' | 'UPDATE';
  source_condition?: string;
  request_condition?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  application_code!: string;
  source_object_id!: number;

  // Orchestration belongsTo Applications via application_code
  application_code_application!: Applications;
  getApplication_code_application!: Sequelize.BelongsToGetAssociationMixin<Applications>;
  setApplication_code_application!: Sequelize.BelongsToSetAssociationMixin<Applications, ApplicationsId>;
  createApplication_code_application!: Sequelize.BelongsToCreateAssociationMixin<Applications>;
  // Orchestration belongsTo DataObjects via source_object_id
  source_object!: DataObjects;
  getSource_object!: Sequelize.BelongsToGetAssociationMixin<DataObjects>;
  setSource_object!: Sequelize.BelongsToSetAssociationMixin<DataObjects, DataObjectsId>;
  createSource_object!: Sequelize.BelongsToCreateAssociationMixin<DataObjects>;
  // Orchestration hasMany OrchestrationActions via orchestration_id
  orchestration_actions!: OrchestrationActions[];
  getOrchestration_actions!: Sequelize.HasManyGetAssociationsMixin<OrchestrationActions>;
  setOrchestration_actions!: Sequelize.HasManySetAssociationsMixin<OrchestrationActions, OrchestrationActionsId>;
  addOrchestration_action!: Sequelize.HasManyAddAssociationMixin<OrchestrationActions, OrchestrationActionsId>;
  addOrchestration_actions!: Sequelize.HasManyAddAssociationsMixin<OrchestrationActions, OrchestrationActionsId>;
  createOrchestration_action!: Sequelize.HasManyCreateAssociationMixin<OrchestrationActions>;
  removeOrchestration_action!: Sequelize.HasManyRemoveAssociationMixin<OrchestrationActions, OrchestrationActionsId>;
  removeOrchestration_actions!: Sequelize.HasManyRemoveAssociationsMixin<OrchestrationActions, OrchestrationActionsId>;
  hasOrchestration_action!: Sequelize.HasManyHasAssociationMixin<OrchestrationActions, OrchestrationActionsId>;
  hasOrchestration_actions!: Sequelize.HasManyHasAssociationsMixin<OrchestrationActions, OrchestrationActionsId>;
  countOrchestration_actions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Orchestration {
    return Orchestration.init({
    orchestration_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    source_object_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    source_action_code: {
      type: DataTypes.ENUM('CREATE','UPDATE'),
      allowNull: false,
      defaultValue: "CREATE"
    },
    source_condition: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    request_condition: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    application_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'applications',
        key: 'code'
      }
    },
    source_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'data_objects',
        key: 'data_object_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orchestration',
    hasTrigger: true,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orchestration_id" },
        ]
      },
      {
        name: "fk_orchestration_1_idx",
        using: "BTREE",
        fields: [
          { name: "source_object_code" },
        ]
      },
      {
        name: "fk_orchestration_1_idx1",
        using: "BTREE",
        fields: [
          { name: "source_object_id" },
        ]
      },
      {
        name: "fk_orchestration_2_idx",
        using: "BTREE",
        fields: [
          { name: "application_code" },
        ]
      },
    ]
  });
  }
}
