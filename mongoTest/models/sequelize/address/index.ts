import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import User from "../user";

class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {
  userId!: ForeignKey<User["id"]>;
  address!: string;

  createdAt!: CreationOptional<Date>;
  updatedAt!: CreationOptional<Date>;

  static initTable(sequelize: Sequelize): NonAttribute<void> {
    Address.init(
      {
        address: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "address",
        sequelize,
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default Address;
