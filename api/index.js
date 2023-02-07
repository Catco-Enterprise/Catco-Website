const apiRouter = require("express").Router();

apiRouter.get("/health", (req, res, next) => {
	res.send({
		healthy: true,
	});
});


const usersRouter = require("./users");
apiRouter.use('/users', usersRouter);

const productsRouter = require("./products")
apiRouter.use("/products", productsRouter)

const orderProductsRouter = require("./OrderProducts")
apiRouter.use("/orderProducts", orderProductsRouter)

const ordersRouter = require("./orders")
apiRouter.use("/orders", ordersRouter)

module.exports = apiRouter;
