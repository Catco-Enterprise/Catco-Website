import { createUser, getUserByEmail } from '../db/models/user';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const { User } = require('../db')

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email)
        if (user) {
            next({
                message: `${email} is already linked to an account`,
                name: 'email taken error'
            });
        }

        if (password.length < 6) {
            next({
                message: `password is too short`,
                name: 'password too short'
            });
        }

        const newUser = await User.createUser({ email, password })

        const token = jwt.sign({
            id: user.id,
            email
        }, JWT_SECRET, {
            expiresIn: '2w'
        })

        res.send({
            message: 'Thank you for registering!',
            newUser,
            token
        });

    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next({
            message: 'must enter both an email and password',
            name: 'missing info'
        })
    }
    try {
        const user = await User.getUserByEmail(email)

        if (user && bcrypt.compare(user.password, password)) {

            const token = jwt.sign({
                id: user.id,
                email
            }, JWT_SECRET, {
                expiresIn: '2w'
            })

            res.send({
                message: 'You\'re logged in!',
                user, token
            });
        } else {
            next({
                message: 'incorrect email or password',
                name: 'login error'
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;