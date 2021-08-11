const express = require("express");
const morgan = require("morgan");
const {
	createUser,
	getUser,
	updateUser,
	deleteUser,
	getUsersId,
	userLogin,
	createFriendRequest,
	acceptFriendRequest,
	getFriendRequests,
	declineFriendRequest,
} = require("./handlers");
const {
	createConversation,
	createMessage,
	getConversations,
	getMessages,
} = require("./socialHandlers");

require("dotenv").config();
const { MONGO_URI } = process.env;

const PORT = 8000;

express()
	.use(morgan("tiny"))
	.use(express.json())

	.post("/api/users", createUser)
	.get("/api/users", getUsersId)
	.put("/api/users/createFriendRequest", createFriendRequest)
	.put("/api/users/acceptFriendRequest", acceptFriendRequest)
	.put("/api/users/declineFriendRequest", declineFriendRequest)
	.get("/api/users/getFriendRequests/:userId", getFriendRequests)
	.get("/api/users/:_id", getUser)
	.put("/api/users/:_id", updateUser)
	.delete("/api/users/:_id", deleteUser)
	.post("/api/users/login/", userLogin)

	.post("/api/conversations", createConversation)
	.get("/api/conversations/:userId", getConversations)

	.post("/api/messages", createMessage)
	.get("/api/messages/:conversationId", getMessages)
	.get("*", (req, res) => {
		res.status(404).json({ status: 404, message: "Route not Found" });
	})

	.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
