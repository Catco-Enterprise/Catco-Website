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
            })
        }

        if (password.length < 6) {
            next({
                message: `password is too short`,
                name: 'password too short'
            })
        }

        const newUser = await User.createUser({ email, password })

        const token = jwt.sign({
            id: newUser.id,
            email
        }, JWT_SECRET, {
            expiresIn: '2w'
        })

        res.send({
            message: 'thank you for registering',
            newUser, token
        })
    } catch (error) {
        next(error)
    }
})

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
                message: 'youre logged in',
                user, token
            })
        } else {
            next({
                message: 'incorrect email or password',
                name: 'login error'
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/me', async (req, res, next) => {
    const prefix = 'Bearer';
    const auth = req.header('authorization')

    if (!auth) {
        res.statusCode = 401;
        next({
            name: 'unauthorize error',
            message: 'your not logged in'
        })
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                const user = await getUserById(id);
                res.send(user);
            }
        } catch ({ name, message }) {
            throw (error);
        }
    }
})









module.exports = router;