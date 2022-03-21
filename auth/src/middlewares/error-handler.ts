import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { DbConnectionError } from "../errors/db-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {



    res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
    }


    res.status(400).send({
        message: 'Something went wrong'
    });


}