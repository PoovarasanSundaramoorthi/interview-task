import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

// Global error handler
const globalError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Send the error response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

export default globalError;
