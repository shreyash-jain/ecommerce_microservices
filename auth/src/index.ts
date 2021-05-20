import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

import mongoose from 'mongoose';

const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: true
}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', () => {
    throw new NotFoundError();

});

app.use(errorHandler);


const start = async () => {

    if (!process.env.jwt_key) {

        throw new Error("jwt_key must be defined");

    }

    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("connected to db");
    }
    catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Listening to port 3000c !!');
    })
};


start();

