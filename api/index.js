const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
	res.send({
		message: "API is under construction!",
	});
});

apiRouter.get("/health", (req, res, next) => {
	res.send({
		healthy: true,
	});
});

// place your routers here

apiRouter.get("/products", (req, res, next) => {
	res.send([ 
		{
			name: "prod1",
			description: "this is prod1",
			price: 10.99,
			stock: 10,
		},
		{
			name: "prod2",
			description: "this is prod2",
			price: 5.99,
			stock: 50,
		},
		{
			name: "prod3",
			description: "this is prod3",
			price: 20.99,
			stock: 5,
		},
		{
			name: "prod4",
			description: "this is prod4",
			price: 1.5,
			stock: 14,
		},
		{
			name: "prod5",
			description: "this is prod5",
			price: 100.0,
			stock: 1,
		}
	])
})

module.exports = apiRouter;
