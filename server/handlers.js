const { MongoClient } = require("mongodb");
const assert = require("assert");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const dbName = "final-project";

// Anytime a handler needs to connect to mongodb
const connectToClient = async (MONGO_URI, options) => {
	try {
		const client = await new MongoClient(MONGO_URI, options);
		await client.connect();
		return client;
	} catch (err) {
		throw err;
	}
};

// Default error when try/catching
const sendCatchError = (err, res) => {
	console.log(err);
	res.status(400).json({ status: 400, message: err.message });
};

// Create User
const createUser = async (req, res) => {
	const { username, firstName, lastName, password, email } = req.body;
	if (username && firstName && lastName && password && email) {
		// Sets the default variables
		const _id = uuidv4();
		const list = [];
		const wishList = [];
		const createdAt = new Date();
		const friends = [];
		const friendRequests = [];
		const hashedPassword = await bcrypt.hash(password, 10);
		const newBody = {
			_id,
			list,
			wishList,
			createdAt,
			friends,
			friendRequests,
			...req.body,
			password: hashedPassword,
		};

		try {
			const client = await connectToClient(MONGO_URI, options);

			const db = client.db(dbName);

			// Validating email
			const existingEmail = await db.collection("users").findOne({ email });
			if (!existingEmail) {
				const existingUsername = await db
					.collection("users")
					.findOne({ username });

				// Validating Username
				if (!existingUsername) {
					const result = await db.collection("users").insertOne(newBody);
					assert.equal(true, result.acknowledged);

					res.status(201).json({ status: 201, success: true, data: newBody });
				} else {
					res
						.status(400)
						.json({ status: 400, message: "That username is already taken" });
				}
			} else {
				console.log(existingEmail);
				res
					.status(400)
					.json({ status: 400, message: "That email is already taken" });
			}
			client.close();
		} catch (err) {
			sendCatchError(err, res);
			client.close();
		}
	} else {
		res.status(400).json({ status: 400, message: "Missing a required field" });
	}
};

// Get All Users
// Returns all users' id
const getUsersId = async (req, res) => {
	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = client.db(dbName);
		const users = await db.collection("users").find().toArray();
		const usersId = users.map((user) => {
			return user._id;
		});

		res.status(200).json({ status: 200, data: usersId });
		client.close();
	} catch (err) {
		sendCatchError(err, res);
		client.close();
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
		client.close();
	} catch (err) {
		sendCatchError(err, res);
		client.close();
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
			console.log(req.body);
			const newValues = { $set: { ...req.body } };

			const result = await db.collection("users").updateOne(query, newValues);

			res.status(200).json({ status: 200, success: true, data: req.body });
		} else {
			res.status(404).json({ status: 404, message: "User not found" });
		}
		client.close();
	} catch (err) {
		sendCatchError(err.stack, res);
		client.close();
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
			client.close();
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
		const db = client.db(dbName);

		const user = await db.collection("users").findOne({ username: username });

		if (user) {
			if (await bcrypt.compare(password, user.password)) {
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
		client.close();
	} catch (err) {
		sendCatchError(err, res);
		client.close();
	}
};

const getFriendRequests = async (req, res) => {
	// Get
	const { userId } = req.params;
	const query = { _id: userId };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = await client.db(dbName);

		const user = await db.collection("users").findOne(query);
		if (user) {
			const friendRequests = user.friendRequests;
			res.status(200).json({ status: 200, data: friendRequests });
		} else {
			res
				.status(404)
				.json({ status: 404, message: "User not found", data: userId });
		}
		client.close();
	} catch (err) {
		sendCatchError(err, res);
		client.close();
	}
};

const createFriendRequest = async (req, res) => {
	// PUT
	const { senderId, receiverId } = req.body;
	const query = { _id: receiverId };
	const update = { $push: { friendRequests: senderId } };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = client.db(dbName);
		const receiver = await db.collection("users").findOne(query);
		if (receiver) {
			const result = await db.collection("users").updateOne(query, update);
			assert.equal(true, result.acknowledged);

			res.status(200).json({ status: 200, data: receiverId, success: true });
		} else {
			res
				.status(404)
				.json({ status: 404, message: "User not found", receiverId });
		}
		client.close();
	} catch (err) {
		console.log("test");
		sendCatchError(err, res);
		client.close();
	}
};

const acceptFriendRequest = async (req, res) => {
	const { currentUserId, senderId } = req.body;
	const currentUserQuery = { _id: currentUserId };
	const senderQuery = { _id: senderId };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = await client.db(dbName);

		// Add sender to friends
		const senderUser = await db.collection("users").findOne(senderQuery);
		const currentUser = await db.collection("users").findOne(currentUserQuery);

		if (senderUser && currentUser) {
			const currentUserResult = await db
				.collection("users")
				.updateOne(currentUserQuery, { $push: { friends: senderId } });
			assert.equal(true, currentUserResult.acknowledged);

			const senderUserResult = await db
				.collection("users")
				.updateOne(senderQuery, { $push: { friends: currentUserId } });
			assert.equal(true, senderUserResult.acknowledged);
		} else {
			res
				.status(404)
				.json({ status: 404, data: senderId, message: "User not found" });
		}

		// Remove friend request from friendRequests array
		const result = await db
			.collection("users")
			.updateOne(currentUserQuery, { $pull: { friendRequests: senderId } });
		assert.equal(true, result.acknowledged);

		// Return response if successful
		res.status(200).json({
			status: 200,
			data: { senderId, currentUserId },
			success: true,
		});
		client.close();
	} catch (err) {
		sendCatchError(err, res);
		client.close();
	}
};

const declineFriendRequest = async (req, res) => {
	// PUT
	const { currentUserId, senderId } = req.body;
	const currentUserQuery = { _id: currentUserId };
	const senderQuery = { _id: senderId };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = await client.db(dbName);

		const senderUser = await db.collection("users").findOne(senderQuery);
		const currentUser = await db.collection("users").findOne(currentUserQuery);
		if (senderUser && currentUser) {
			// Remove friend request from friendRequests array
			const result = await db
				.collection("users")
				.updateOne(currentUserQuery, { $pull: { friendRequests: senderId } });
			assert.equal(true, result.acknowledged);
		} else {
			res
				.status(404)
				.json({ status: 404, data: senderId, message: "User not found" });
		}

		// Return response if successful
		res.status(200).json({
			status: 200,
			success: true,
		});
		client.close();
	} catch (err) {
		sendCatchError(err, res);
		client.close();
	}
};

module.exports = {
	createUser,
	getUser,
	getUsersId,
	updateUser,
	deleteUser,
	userLogin,
	createFriendRequest,
	acceptFriendRequest,
	declineFriendRequest,
	getFriendRequests,
};
