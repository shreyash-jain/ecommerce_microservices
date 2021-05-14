import express from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.post('/api/users/signup',

    body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password should be greater thn 6 digits'),
    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        console.log('Creating a user...');
        res.send({});
    });




export { router as signupRouter };