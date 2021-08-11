import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../../Loading";
import Message from "./Message";
import { ChatContext } from "../../../contexts/ChatContext";

const Chatbox = ({ messages, setMessages }) => {
	const [receiverUser, setReceiverUser] = useState(null);
	const [receiverUserStatus, setReceiverUserStatus] = useState("idle");
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [socket, setSocket] = useState(null);

	const { currentUser } = useContext(UserContext);
	const { currentChat } = useContext(ChatContext);

	const scrollRef = useRef();

	const receiverId = currentChat
		? currentChat.members.find((member) => member !== currentUser._id)
		: "";

	useEffect(() => {
		if (currentChat) {
			setReceiverUserStatus("loading");
			fetch(`/api/users/${receiverId}`)
				.then((res) => res.json())
				.then((parsed) => {
					setReceiverUser(parsed.data);
					setReceiverUserStatus("idle");
				});
		}
	}, [currentChat, receiverId]);

	// Connect to socket.io server
	useEffect(() => {
		setSocket(io("ws://localhost:9000"));
	}, []);

	// Adding socket events on connect and on getting messages
	useEffect(() => {
		const time = new Date();
		const timestamp = time.toISOString();
		socket?.emit("addUser", currentUser._id);
		socket?.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: timestamp,
			});
		});
	}, [currentUser._id, socket]);

	// Getting conversation messages from API
	useEffect(() => {
		if (currentChat) {
			fetch(`/api/messages/${currentChat._id}`)
				.then((res) => res.json())
				.then((parsed) => {
					setMessages(parsed.data);
				});
		}
	}, [currentChat]);

	// Setting messages when received from socket server
	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Saves message to database, and sends it to the socket server, which then sends it to the receiver user
	const handleSubmit = (ev) => {
		ev.preventDefault();
		const message = {
			sender: currentUser._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		// Send message to socket server
		socket?.emit("sendMessage", {
			senderId: currentUser._id,
			receiverId,
			text: newMessage,
		});

		// Save message to database
		fetch(`/api/messages`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(message),
		})
			.then((res) => res.json())
			.then((parsed) => {
				setNewMessage("");
				setMessages([...messages, parsed.data]);
			});
	};
	return (
		<Wrapper>
			{currentChat ? (
				receiverUserStatus === "loading" ? (
					<Loading />
				) : (
					receiverUser && (
						<>
							<ChatBoxHeader>
								<Avatar>{receiverUser.firstName[0]}</Avatar>
								<div>
									{receiverUser.firstName} {receiverUser.lastName}
								</div>
							</ChatBoxHeader>
							<ChatboxTopWrapper>
								{messages.map((message, index) => {
									return (
										<div ref={scrollRef} key={index}>
											<Message message={message} receiver={receiverUser} />
										</div>
									);
								})}
							</ChatboxTopWrapper>
							<ChatboxBottomWrapper>
								<ChatInput
									value={newMessage}
									placeholder="Write about something..."
									onChange={(ev) => setNewMessage(ev.target.value)}
								></ChatInput>
								<StyledButton
									onClick={handleSubmit}
									disabled={newMessage.length === 0}
								>
									Send
								</StyledButton>
							</ChatboxBottomWrapper>
						</>
					)
				)
			) : (
				<NoConvo>Resume conversation on the right</NoConvo>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: calc(100vh - 130px - 2rem);
	display: flex;
	flex-direction: column;
`;

const NoConvo = styled.div`
	align-self: center;
	font-size: 25px;
	padding: 1rem;
`;

const ChatBoxHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid var(--main-color);
	font-family: var(--main-font);
	font-size: 20px;
`;

const Avatar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	width: 40px;
	height: 40px;
	padding: 1px;
	background-color: var(--background-darken);
	border: 1px solid var(--main-color);
	border-radius: 50%;
	margin-right: 10px;
`;

const ChatboxTopWrapper = styled.div`
	height: 100%;
	overflow-y: scroll;
	padding-right: 10px;
`;

const ChatboxBottomWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin: 10px 0;
`;

const ChatInput = styled.textarea`
	width: 80%;
	border-radius: 5px;
	padding: 1rem;
	font-family: inherit;
`;

const StyledButton = styled.button`
	width: 70px;
	height: 40px;
	border: 1px solid transparent;
	border-radius: 5px;
	color: var(--main-color);
	background-color: var(--user-chat-color);
	cursor: pointer;

	&:hover {
		border: 1px solid var(--main-color);
	}
`;

export default Chatbox;
