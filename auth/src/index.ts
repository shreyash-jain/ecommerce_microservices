import mongoose from 'mongoose';

import { app } from './app';


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

