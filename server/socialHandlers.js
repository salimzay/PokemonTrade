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

// Conversation

const createConversation = async (req, res) => {
	const { senderId, receiverId } = req.body;
	const createdAt = new Date();
	const _id = uuidv4();
	const members = [senderId, receiverId];
	const conversation = { members, createdAt, _id };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = await client.db(dbName);

		const existingConversation = await db
			.collection("conversations")
			.findOne({ members: { $all: [senderId, receiverId] } });
		if (existingConversation) {
			res.status(200).json({
				status: 200,
				data: existingConversation,
				message: "Conversation already exists",
			});
		} else {
			const result = await db
				.collection("conversations")
				.insertOne(conversation);
			assert.equal(true, result.acknowledged);

			res.status(201).json({ status: 201, data: conversation });
		}
	} catch (err) {
		sendCatchError(err, res);
	}
};

const getConversations = async (req, res) => {
	const { userId } = req.params;
	const query = { members: { $in: [userId] } };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = client.db(dbName);
		const conversations = await db
			.collection("conversations")
			.find(query)
			.toArray();
		res.status(200).json({ status: 200, data: conversations });
	} catch (err) {
		sendCatchError(err, res);
	}
};

// Messages

const createMessage = async (req, res) => {
	const { conversationId, sender, text } = req.body;
	const createdAt = new Date();
	const _id = uuidv4();
	const message = { _id, conversationId, sender, text, createdAt };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = await client.db(dbName);

		const result = await db.collection("messages").insertOne(message);
		assert.equal(true, result.acknowledged);

		res.status(201).json({ status: 201, data: message });
	} catch (err) {
		sendCatchError(err, res);
	}
};

const getMessages = async (req, res) => {
	const { conversationId } = req.params;
	const query = { conversationId };

	try {
		const client = await connectToClient(MONGO_URI, options);
		const db = client.db(dbName);
		const messages = await db.collection("messages").find(query).toArray();
		res.status(200).json({ status: 200, data: messages });
	} catch (err) {
		sendCatchError(err, res);
	}
};
module.exports = {
	createConversation,
	getConversations,
	createMessage,
	getMessages,
};
