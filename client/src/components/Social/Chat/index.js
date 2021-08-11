import React from "react";
import styled from "styled-components";
import Chatbox from "./Chatbox";
import Conversations from "./Conversations";

const Chat = () => {
	return (
		<Wrapper>
			<ChatConversationsWrapper>
				<Conversations />
			</ChatConversationsWrapper>
			<ChatBoxWrapper>
				<Chatbox />
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
