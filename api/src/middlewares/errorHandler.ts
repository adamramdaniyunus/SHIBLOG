import express from 'express';

interface CustomError extends Error {
    statusCode?: number;
}


export const errorResponserHandler = (err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = (err as any).statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export const invalidPathHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let error: CustomError = new Error("Invalid Path");
    error.statusCode = 404;
    next(error);
};