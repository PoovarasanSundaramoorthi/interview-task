import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Your Sequelize instance

class ChatMessage extends Model {
    public id!: number;
    public sender!: string;
    public message!: string;
    public timestamp!: Date;
}

ChatMessage.init(
    {
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ChatMessage",
    }
);

export { ChatMessage };
