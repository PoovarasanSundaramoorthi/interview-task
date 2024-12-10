// src/routes/userRoutes.ts
import express from "express";
import authMiddleware from "../middleware/auth";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController";
import { validateTaskCreation, validateTaskQuery, validateTaskUpdate } from "../middleware/taskValidation";

const taskRouter = express.Router();

// Route for sign-in
taskRouter.post('/task/store', authMiddleware, validateTaskCreation, createTask);
taskRouter.post('/task/list', authMiddleware, validateTaskUpdate, getTasks);
taskRouter.put("/tasks/:id", authMiddleware, validateTaskQuery, updateTask);
taskRouter.delete("/tasks/:id", authMiddleware, deleteTask);

export default taskRouter;
