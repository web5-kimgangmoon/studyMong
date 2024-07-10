import configMySQL from "./config/config.json";
import { Sequelize, Options } from "sequelize";

import User from "./user";
import Board from "./board";
import Address from "./address";

const config = configMySQL["development"];

export const sequelize = new Sequelize(config as Options);
const db = { User, Board, Address };

Object.values(db).forEach((table) => {
  table.initTable(sequelize);
});

User.hasMany(Board, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "boards",
});

Address.belongsTo(User, { targetKey: "id" });
User.hasOne(Address, { sourceKey: "id" });

export default db;
