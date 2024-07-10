import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize,
} from "sequelize";
import Board from "../board";

class User extends Model<
  InferAttributes<User, { omit: "boards" }>,
  InferCreationAttributes<User, { omit: "boards" }>
> {
  id!: CreationOptional<number>;
  name!: string;

  owner?: NonAttribute<Board>;
  createdAt!: CreationOptional<Date>;
  updatedAt!: CreationOptional<Date>;

  getBoards!: HasManyGetAssociationsMixin<Board>;
  addBoard!: HasManyAddAssociationMixin<Board, number>;
  addBoards!: HasManyAddAssociationsMixin<Board, number>;
  setBOards!: HasManySetAssociationsMixin<Board, number>;
  removeBoard!: HasManyRemoveAssociationMixin<Board, number>;
  removeBoards!: HasManyRemoveAssociationsMixin<Board, number>;
  hasBoard!: HasManyHasAssociationMixin<Board, number>;
  hasBoards!: HasManyHasAssociationsMixin<Board, number>;
  countBoards!: HasManyCountAssociationsMixin;
  createBoard!: HasManyCreateAssociationMixin<Board, "ownerId">;

  boards?: NonAttribute<User[]>;

  getfullName(): NonAttribute<string> {
    return this.name;
  }

  static initTable(sequelize: Sequelize): NonAttribute<void> {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associations: {
    users: Association<User, Board>;
  };
}

export default User;
