const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const { User, Orders } = require("../db");
const { getAllUsers } = require("../db/models/user");
const { getActiveOrderByUserId } = require("../db/models/orders");

// POST: api/users/register
router.post("/register", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.getUserByEmail(email);
		if (user) {
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

		const newUser = await User.createUser({ email, password });

		const token = jwt.sign(
			{
				id: newUser.id,
				email,
			},
			JWT_SECRET,
			{
				expiresIn: "2w",
			}
		);

		//do not need to return user- this is taken care of with a useEffect on App
		res.send({
			message: "Thank you for registering!",
			newUser,
			token,
		});
	} catch (error) {
		next(error);
	}
});

// POST: api/users/login
router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		next({
			message: "must enter both an email and password",
			name: "missing info",
		});
	}
	try {
		const user = await User.getUserByEmail(email);
		console.log("user @ login BE route: ", user);

		if (user && bcrypt.compare(user.password, password)) {
			const token = jwt.sign(
				{
					id: user.id,
					email,
				},
				JWT_SECRET,
				{
					expiresIn: "2w",
				}
			);

			user.activeOrder = await getActiveOrderByUserId(user.id);
			delete user.password;

			res.send({
				message: "You're logged in!",
				user,
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

// GET: api/users/me

router.get("/me", async (req, res, next) => {
	const prefix = "Bearer ";
	const auth = req.header("Authorization");

	if (!auth) {
		res.statusCode = 401;
		next({
			name: "unauthorize error",
			message: "your not logged in",
		});
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);
		try {
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				const user = await User.getUserById(id);
				res.send(user);
			}
		} catch (error) {
			console.error(error);
		}
	}
});

// GET: api/users/me/activeorders

router.get("/me/activeOrder", async (req, res, next) => {
	const prefix = "Bearer ";
	const auth = req.header("Authorization");

	if (!auth) {
		res.statusCode = 401;
		next({
			name: "unauthorize error",
			message: "youre not logged in",
		});
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);
		try {
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				const activeOrder = await Orders.getActiveOrderByUserId(id);
				if (activeOrder.id) {
					res.send(activeOrder);
				} else {
					res.send(await Orders.createOrder(id));
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
});

// GET: api/users/getAll

router.get("/getAll", async (req, res, next) => {
	try {
		res.send(await getAllUsers());
	} catch (error) {
		next(error);
	}
});

module.exports = router;
