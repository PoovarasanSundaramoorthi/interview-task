// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { createTaskSchema, updateTaskSchema, getTasksSchema } from "../validation/taskValidation";

// Middleware to validate task creation data
export const validateTaskCreation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware to validate task update data
export const validateTaskUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware to validate task query parameters for filtering
export const validateTaskQuery = (req: Request, res: Response, next: NextFunction) => {
    const { error } = getTasksSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
