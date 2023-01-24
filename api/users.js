const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
import { response } from "express";
import { client, User } from "../db";
import { createUser, getUserByEmail } from "../db/models/user";

router.post("/register", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			next({
				message: `${email} is already linked to an account`,
				name: "email taken error",
			});
		}

		if (password.length < 6) {
			next({
				message: `password is too short`,
				name: "password too short",
			});
		}

		const user = await createUser({ email, password });

		const token = jwt.sign(
			{
				id: user.id,
				email,
			},
			JWT_SECRET,
			{
				expairesIn: "2w",
			}
		);

		res.send({
			message: "thank you for registering",
			token,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		next({
			message: "must enter both an email and password",
			name: "missing info",
		});
	}
	try {
		const user = await getUserByEmail(email);
		if (user && bcrypt.compare(user.password, password)) {
			const token = jwt.sign(
				{
					id: user.id,
					email,
				},
				JWT_SECRET,
				{
					expairesIn: "2w",
				}
			);

			res.send({
				message: "youre logged in",
				token,
			});
		} else {
			next({
				message: "incorrect email or password",
				name: "login error",
			});
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
