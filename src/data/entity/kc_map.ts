import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface KcMapAttributes {
  id: number;
  realm: string;
  client_id: string;
}

export type KcMapPk = "id";
export type KcMapId = KcMap[KcMapPk];
export type KcMapOptionalAttributes = "id";
export type KcMapCreationAttributes = Optional<KcMapAttributes, KcMapOptionalAttributes>;

export class KcMap extends Model<KcMapAttributes, KcMapCreationAttributes> implements KcMapAttributes {
  id!: number;
  realm!: string;
  client_id!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof KcMap {
    return KcMap.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    realm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    client_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'kc_map',
    timestamps: false,
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
