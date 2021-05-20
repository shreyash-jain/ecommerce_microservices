import express from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post('/api/users/signin',
    [body('email').isEmail().withMessage('Email is not valid'),

    body('password').trim().notEmpty().withMessage('Password should not be empty')],
    validateRequest,
    async (req: express.Request, res: express.Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("User not present");

            throw new BadRequestError({ message: "User not registered", field: "Signin" });
        }
        else {
            const does_pass_match = await Password.compare(existingUser.password, password);

            if (!does_pass_match) throw new BadRequestError({ message: "Wrong password", field: "Signin" });
            else {
                const jwtToken = jwt.sign({
                    id: existingUser._id,
                    email: email
                }, process.env.jwt_key!);

                // Store it in session object

                req.session = {
                    jwt: jwtToken
                };



                res.status(200).send(existingUser);


            }



        }

        res.status(400).send({});







    });




export { router as signinRouter };