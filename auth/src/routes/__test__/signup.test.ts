
import request from 'supertest';

import { app } from '../../app';

it('returns a 201 on sucessful signup', async () => {

    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    })
        .
        expect(201);
});


it('returns a 400 with invalid email', async () => {

    return request(app).post('/api/users/signup').send({
        email: 'testtest.com',
        password: 'password'
    })
        .
        expect(400);
});


it('returns a 400 with invalid password', async () => {

    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'pas'
    })
        .
        expect(400);
});


it('returns a 400 with missing email and apssword', async () => {

    return request(app).post('/api/users/signup').send({
        email: '',
        password: ''
    })
        .
        expect(400);
});



it('disallow dublicate emails', async () => {

    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    })
        .
        expect(201);

    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    })
        .
        expect(400);
});



it('sets a cookie after succesful sign up', async () => {

    const response = await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    })
        .
        expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});







