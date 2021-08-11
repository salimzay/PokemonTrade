import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../../contexts/ChatContext";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../../Loading";

// Lists all conversations where current user is a member
const Conversations = () => {
	const { currentUser } = useContext(UserContext);
	const { setCurrentChat } = useContext(ChatContext);
	const [conversations, setConversations] = useState([]);
	const [converstationsStatus, setConverstationsStatus] = useState("idle");

	useEffect(() => {
		setConverstationsStatus("loading");
		fetch(`/api/conversations/${currentUser._id}`)
			.then((res) => res.json())
			.then((parsed) => {
				setConversations(parsed.data);
				setConverstationsStatus("idle");
			});
	}, [currentUser]);

	return (
		<Wrapper>
			<Header>Conversations</Header>
			{converstationsStatus === "loading" ? (
				<Loading />
			) : (
				conversations.map((conversation) => {
					return (
						<IndivConversation
							conversation={conversation}
							key={conversation._id}
							setCurrentChat={setCurrentChat}
						/>
					);
				})
			)}
		</Wrapper>
	);
};

export const IndivConversation = ({ conversation, setCurrentChat }) => {
	const { currentUser } = useContext(UserContext);
	const { members } = conversation;
	const senderId = members.filter((userId) => {
		return userId !== currentUser._id;
	})[0];
	const [sender, setSender] = useState(null);

	// Get user from its ID
	useEffect(() => {
		fetch(`/api/users/${senderId}`)
			.then((res) => res.json())
			.then((parsed) => {
				setSender(parsed.data);
			});
	}, [senderId]);

	// Sets currentChat, which will display the whole conversation on the screen
	const handleChat = (conversation) => {
		setCurrentChat(conversation);
	};

	return (
		sender && (
			<ConversationWrapper
				onClick={() => {
					handleChat(conversation);
				}}
			>
				<UserProfilePic>{sender.firstName[0].toUpperCase()}</UserProfilePic>
				<Username>
					{sender.firstName} {sender.lastName}
				</Username>
			</ConversationWrapper>
		)
	);
};

const Wrapper = styled.div`
	margin-top: 1;
	text-align: center;
	height: var(--main-body-height);
	overflow-y: scroll;
`;

const Header = styled.p`
	font-size: 20px;
	font-family: var(--main-font);
	margin: 1rem 0;
`;

const ConversationWrapper = styled.button`
	width: 100%;
	padding: 10px 20px;
	display: flex;
	align-items: center;
	border: none;
	background-color: transparent;
	cursor: pointer;
	color: inherit;
	font-size: inherit;

	&:hover {
		background-color: var(--background-darken);
		text-shadow: 0 0 2px var(--main-color);
	}
`;

const UserProfilePic = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: var(--background-darken);
	border: 1px solid var(--main-color);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`;

const Username = styled.div``;

export default Conversations;
