// src/models/user.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Assuming sequelize instance is here
import bcrypt from "bcryptjs";

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        paranoid: true,
        deletedAt: 'deletedAt'
    }
);

// Hash password before saving to database
User.beforeSave(async (user) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10); // Hash password
    }
});

export default User;
