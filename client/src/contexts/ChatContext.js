import React, { createContext, useState } from "react";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children }) => {
	const [currentChat, setCurrentChat] = useState("");

	const handleMessage = async (senderId, receiverId) => {
		const requestBody = JSON.stringify({
			senderId,
			receiverId,
		});
		const res = await fetch(`/api/conversations`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: requestBody,
		});
		const parsedRes = await res.json();
		const conversation = await parsedRes.data;
		setCurrentChat(conversation);
	};

	return (
		<ChatContext.Provider
			value={{ currentChat, setCurrentChat, handleMessage }}
		>
			{children}
		</ChatContext.Provider>
	);
};
