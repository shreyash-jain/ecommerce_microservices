import express from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DbConnectionError } from '../errors/db-connection-error';

const router = express.Router();

router.post('/api/users/signup',

    body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password should be greater thn 6 digits'),
    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());

        }

        console.log('Creating a user....');
        throw new DbConnectionError();


        const { email, password } = req.body;
       

    
    });




export { router as signupRouter };