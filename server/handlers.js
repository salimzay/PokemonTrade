const { MongoClient } = require("mongodb");
const assert = require("assert");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const dbName = "final-project";

const connectToClient = async (MONGO_URI, options) => {
	try {
		const client = await new MongoClient(MONGO_URI, options);
		await client.connect();
		return client;
	} catch (err) {
		throw err;
	}
};

const sendCatchError = (err, res) => {
	console.log(err);
	res.status(400).json({ status: 400, message: err.message });
};

// Create User
const createUser = async (req, res) => {
	const { username, firstName, lastName, password } = req.body;
	if (username && firstName && lastName && password) {
		const _id = uuidv4();
		const newBody = { _id, ...req.body };
		try {
			const client = await connectToClient(MONGO_URI, options);

			const db = client.db(dbName);
			const result = await db.collection("users").insertOne(newBody);
			assert.equal(true, result.acknowledged);

			res.status(201).json({ status: 201, success: true, data: newBody });
		} catch (err) {
			sendCatchError(err, res);
		}
	} else {
		res.status(400).json({ status: 400, message: "Missing a required field" });
	}
};

// Get All Users
const getUsersId = async (req, res) => {
	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = client.db(dbName);
		const users = await db.collection("users").find().toArray();
		const usersId = users.map((user) => {
			return user._id;
		});

		res.status(200).json({ status: 200, data: usersId });
	} catch (err) {
		sendCatchError(err, res);
	}
};

// Get User
const getUser = async (req, res) => {
	const { _id } = req.params;
	try {
		const client = await connectToClient(MONGO_URI, options);

		const db = client.db(dbName);
		const user = await db.collection("users").findOne({ _id });

		if (user) {
			const { password, ...publicInfo } = user;
			res.status(200).json({ status: 200, success: true, data: publicInfo });
		} else {
			res.status(404).json({ status: 404, message: "User not found" });
		}
	} catch (err) {
		sendCatchError(err, res);
	}
};

// Update User
const updateUser = async (req, res) => {
	const { _id } = req.params;
	try {
		const client = await connectToClient(MONGO_URI, options);

		const db = client.db(dbName);
		const user = await db.collection("users").findOne({ _id });

		if (user) {
			const query = { _id };
			const newValues = { $set: { ...req.body } };

			const result = await db.collection("users").updateOne(query, newValues);
			assert.equal(1, result.matchedCount);
			assert.equal(1, result.modifiedCount);

			res.status(200).json({ status: 200, success: true, data: req.body });
		} else {
			res.status(404).json({ status: 404, message: "User not found" });
		}
	} catch (err) {
		sendCatchError(err, res);
	}
};

// Delete User
const deleteUser = async (req, res) => {
	// Send the client's username in req.body
	// Send user-to-delete username in req.params
	const { userId, isAdmin } = req.body;
	const { _id } = req.params;
	if (userId === _id || isAdmin) {
		try {
			const client = await connectToClient(MONGO_URI, options);

			const db = await client.db(dbName);
			const user = await db.collection("users").findOne({ _id });

			if (user) {
				const result = await db.collection("users").deleteOne({ _id });
				assert(1, result.deletedCount);
				res.status(204).json({ status: 204, message: "Deleted User" });
			} else {
				res.status(404).json({ status: 404, message: "User not found" });
			}
		} catch (err) {
			sendCatchError(err, res);
		}
	} else {
		res.status(401).json({
			status: 401,
			message: "You are not authorized to delete this user",
		});
	}
};

const userLogin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = await client.db(dbName);

		const user = await db.collection("users").findOne({ username: username });

		if (user) {
			if (user.password === password) {
				res.status(200).json({ status: 200, data: user });
			} else {
				res
					.status(404)
					.json({ status: 404, message: "Username or password is incorrect" });
			}
		} else {
			res
				.status(404)
				.json({ status: 404, message: "Username or password is incorrect" });
		}
	} catch (err) {
		sendCatchError(err, res);
	}
};

module.exports = {
	createUser,
	getUser,
	getUsersId,
	updateUser,
	deleteUser,
	userLogin,
};
