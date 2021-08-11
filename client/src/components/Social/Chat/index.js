import React, { useState } from "react";
import styled from "styled-components";
import Chatbox from "./Chatbox";
import Conversations from "./Conversations";

const Chat = () => {
	const [messages, setMessages] = useState([]);
	return (
		<Wrapper>
			<ChatConversationsWrapper>
				<Conversations messages={messages} />
			</ChatConversationsWrapper>
			<ChatBoxWrapper>
				<Chatbox messages={messages} setMessages={setMessages} />
			</ChatBoxWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;
	min-width: 100%;
	max-height: calc(100vh - 130px - 2rem);
	border-left: 1px solid var(--main-color);
`;

const ChatConversationsWrapper = styled.div`
	flex: 1;
	border-left: 1px solid var(--main-color);
`;

const ChatBoxWrapper = styled.div`
	flex: 5;
	padding: 0 10px;
`;

export default Chat;
