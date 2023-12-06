import { verify } from "jsonwebtoken";
import User from "../models/user";
import express from 'express';


interface CustomError extends Error {
    statusCode?: number;
}


export const authGuard = async (req: express.Request & { user?: { admin: boolean } }, res: express.Response, next: express.NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET) as { id: string };
            req.user = await User.findById(id).select("-password");
            next();
        } catch (error) {
            let err: CustomError = new Error("Not authorized, Token failed");
            err.statusCode = 401;
            next(err);
        }
    } else {
        let error: CustomError = new Error("Not authorized, No token");
        error.statusCode = 401;
        next(error);
    }
};

export const adminGuard = ((req: express.Request & { user?: { admin: boolean } }, res: express.Response, next: express.NextFunction) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        let error: CustomError = new Error("Not authorized as an admin");
        error.statusCode = 401;
        next(error);
    }
});