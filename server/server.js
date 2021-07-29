const express = require("express");
const morgan = require("morgan");
const PORT = 8000;

express()
	.use(morgan("tiny"))
	.use(express.json())
	.get("*", (req, res) => {
		res.status(404).json({ status: 404, message: "Hello World" });
	})

	.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
