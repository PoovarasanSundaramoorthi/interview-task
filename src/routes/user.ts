// src/routes/userRoutes.ts
import express from "express";
import { signIn, login } from "../controller/userController";
import authMiddleware from "../middleware/auth";

const userRouter = express.Router();

// Route for sign-in
userRouter.post('/user/signin', authMiddleware, signIn);
userRouter.post('/user/signin', login);

export default userRouter;
