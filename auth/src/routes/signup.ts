import express from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DbConnectionError } from '../errors/db-connection-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post('/api/users/signup',

    [body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password should be greater thn 6 digits')],
    validateRequest,
    async (req: express.Request, res: express.Response) => {



        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already present");

            throw new BadRequestError({ message: "Email in use", field: "Signup" });


        }

        const new_user = User.build({ email, password });
        await new_user.save();

        // Generate jwt

        const jwtToken = jwt.sign({
            id: new_user.id,
            email: new_user.email
        }, process.env.jwt_key!);

        // Store it in session object

        req.session = {
            jwt: jwtToken
        };



        res.status(201).send(new_user);

    });




export { router as signupRouter };