// src/models/task.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Assuming your sequelize instance is here

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: string;  // Example: "Pending", "In Progress", "Completed"
    public dueDate!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending",  // Default status can be "Pending"
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "tasks",
    }
);

export default Task;
