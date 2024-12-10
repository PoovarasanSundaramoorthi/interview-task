// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { jwtKey } from '../config';

const secretKey = jwtKey // Store it in .env

// Generate JWT token
export const generateToken = (userId: number, username: string): string => {
    return jwt.sign({ userId, username }, secretKey, { expiresIn: '1h' });
};

// Verify JWT token
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};
