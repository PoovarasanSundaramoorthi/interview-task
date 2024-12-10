import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from './utils/appError';
import globalError from './controller/errorController';
import userRouter from './routes/user';
import taskRouter from './routes/task';
import chatRouter from './routes/chat';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter)
app.use('/api', taskRouter)
app.use('/api', chatRouter)

// Sample API route
app.get('/api', (req: Request, res: Response): Response => {
    console.log('req.body :>> ', req.body);
    return res.status(200).json({
        status: 201,
        message: "API is working fine"
    });
});

// Handle undefined routes
app.use('*', (req: Request, res: Response, next: NextFunction): void => {
    const err = new AppError(404, 'fail', 'Undefined route');
    next(err);  // Pass error to global error handler
});

// Global error handler
app.use(globalError);

export default app;
