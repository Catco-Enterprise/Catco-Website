const apiRouter = require("express").Router();

// apiRouter.get("/", (req, res, next) => {
// 	res.send({
// 		message: "API is under construction!",
// 	});
// });

apiRouter.get("/health", (req, res, next) => {
	res.send({
		healthy: true,
	});
});

// place your routers here

const usersRouter = require("./users");
apiRouter.use('/users', usersRouter);

const productsRouter = require("./products")
apiRouter.use("/products", productsRouter)

const orderProductsRouter = require("./OrderProducts")
apiRouter.use("/orderProducts", orderProductsRouter)

const ordersRouter = require("./orders")
apiRouter.use("/orders", ordersRouter)

module.exports = apiRouter;
