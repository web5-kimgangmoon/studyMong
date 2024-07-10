import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";

interface NoteAttributes {
  id: number;
  title: string;
  content: string;
}

type NoteCreationAttributes = Optional<NoteAttributes, "id" | "title">;

const Note: ModelDefined<NoteAttributes, NoteCreationAttributes> =
  sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(64),
        defaultValue: "Unnamed Note",
      },
      content: {
        type: new DataTypes.STRING(4096),
        allowNull: false,
      },
    },
    {
      tableName: "Notes",
    }
  );

export default Note;
