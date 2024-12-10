// src/controller/taskController.ts
import { Request, Response, NextFunction } from "express";
import Task from "../models/task";
import { Op } from "sequelize";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
        });

        res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        next(error);  // Pass error to error handler
    }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    const { status, dueDate, title } = req.query; // Query params for filtering
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10

    // Parse `page` and `limit` to integers
    const currentPage = parseInt(page as string, 10);
    const pageLimit = parseInt(limit as string, 10);

    // Calculate the offset
    const offset = (currentPage - 1) * pageLimit;

    const filters: any = {};

    // Add filters based on query params
    if (status) filters.status = status;
    if (dueDate) filters.dueDate = new Date(dueDate);
    if (title) filters.title = { [Op.like]: `%${title}%` };  // Filter by title with partial match

    try {
        // Get tasks with pagination
        const { count, rows } = await Task.findAndCountAll({
            where: filters,  // Apply filters
            limit: pageLimit, // Limit number of tasks returned
            offset,           // Skip tasks based on current page
            order: [["dueDate", "ASC"]],  // Optionally order by dueDate
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / pageLimit);

        // Return paginated tasks
        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks: rows,
            pagination: {
                currentPage,
                totalPages,
                totalTasks: count,
                pageLimit,
            },
        });
    } catch (error) {
        next(error); // Handle errors
    }
};

// src/controller/taskController.ts (Add this function)
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update task with new details
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};


// src/controller/taskController.ts (Add this function)
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.destroy();

        res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
