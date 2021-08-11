const io = require("socket.io")(9000, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => {
		return user.socketId !== socketId;
	});
};

const getUser = (receiverId) => {
	const user = users.find((user) => {
		return user.userId === receiverId;
	});
	return user;
};

io.on("connection", (socket) => {
	// On Connection
	console.log("A user connected");

	// Take User Id and Socket Id from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
	});

	// Remove User
	socket.on("disconnect", () => {
		console.log("User disconnected");
		removeUser(socket.id);
	});

	// Send and get messages
	socket.on("sendMessage", (message) => {
		const { senderId, receiverId, text } = message;
		const user = getUser(receiverId);
		user &&
			io.to(user.socketId).emit("getMessage", {
				senderId,
				text,
			});
	});
});
