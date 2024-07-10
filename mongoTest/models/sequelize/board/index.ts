import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyAddAssociationsMixinOptions,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  ModelDefined,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  Sequelize,
} from "sequelize";
import User from "../user";

class Board extends Model<
  InferAttributes<Board>,
  InferCreationAttributes<Board>
> {
  id!: CreationOptional<number>;
  ownerId!: ForeignKey<User["id"]>;
  title!: string;
  content!: string;
  writer!: string;
  createdAt!: CreationOptional<Date>;
  updatedAt!: CreationOptional<Date>;

  static initTable(sequelize: Sequelize): NonAttribute<void> {
    Board.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: new DataTypes.STRING(30),
          allowNull: false,
        },
        content: {
          type: new DataTypes.STRING(120),
          allowNull: false,
        },
        writer: { type: new DataTypes.STRING(20), allowNull: false },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "boards",
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default Board;
