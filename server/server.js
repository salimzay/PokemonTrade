const express = require("express");
const morgan = require("morgan");
const {
	createUser,
	getUser,
	updateUser,
	deleteUser,
	getUsersId,
} = require("./handlers");

require("dotenv").config();
const { MONGO_URI } = process.env;

const PORT = 8000;

express()
	.use(morgan("tiny"))
	.use(express.json())

	.post("/api/users", createUser)
	.get("/api/users", getUsersId)
	.get("/api/users/:_id", getUser)
	.put("/api/users/:_id", updateUser)
	.delete("/api/users/:_id", deleteUser)
	.get("*", (req, res) => {
		res.status(404).json({ status: 404, message: "Page not Found" });
	})

	.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
