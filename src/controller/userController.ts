// src/controller/userController.ts
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user"; // Assuming you have a User model
import { generateToken } from "../utils/jwt"; // JWT token generation function

// Controller to handle user sign-in
export default async function signIn(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for the user
    const token = generateToken(user.id, user.username);

    // Return the token to the client
    res.status(200).json({
        message: "Sign-in successful",
        token,
    });
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the user
    const token = generateToken(user.id, user.username);

    // Return the JWT token to the client
    res.status(200).json({
        message: "Login successful",
        token,
    });
};
