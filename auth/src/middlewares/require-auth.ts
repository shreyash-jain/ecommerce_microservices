import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import jwt from 'jsonwebtoken';
import { NotAutherizedError } from "../errors/not-autherized-error";

interface UserPayload {
    id: string;
    email: string;
}


export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("current user 2");

    if (!req.currentUser) {
        console.log("current user 3");
        throw new NotAutherizedError();
    }
    console.log("current user 4");

    next();
}