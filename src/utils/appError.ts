class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(statusCode: number, status: string, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.status = status;
        this.isOperational = true;

        // Capturing stack trace is helpful for debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
