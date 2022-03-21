import express from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {

    console.log("current user");



    try {

        res.send({ currentUser: req.currentUser || null });

    }
    catch {
        console.log("no user");
        return res.send({ currentUser: null });
    }

});


export { router as currentUserRouter };