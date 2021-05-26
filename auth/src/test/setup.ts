import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';


declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>;
        }

    }
}

let mongo: any;
beforeAll(async () => {

    process.env.jwt_key = 'ahndfdf';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    });



});

beforeEach(async () => {

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {

        await collection.deleteMany({});

    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();

})

global.signin = async () => {
    const email = 'test@test.com'
    const pass = 'password';

    const response = await request(app)
        .post('/api/users/current')
        .send({
            email,
            pass

        });
    const cookie = response.get("Set-Cookie");
    return cookie;
}