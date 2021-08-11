import React, { useContext } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { UserContext } from "../../../contexts/UserContext";

const Message = ({ message, receiver }) => {
	const { currentUser } = useContext(UserContext);

	const own = message.sender === currentUser._id;
	const timestamp = new Date(message.createdAt);
	const minutesSince = (Date.now() - timestamp.getTime()) / 60000;
	console.log(minutesSince);

	const add0 = (num) => {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	};

	return (
		<MessageWrapper className={own ? "own" : ""}>
			<MessageTopWrapper>
				<UserAvatar>
					{own ? currentUser.firstName[0] : receiver.firstName[0]}
				</UserAvatar>
				<MessageText className={own ? "own" : ""}>{message.text}</MessageText>
			</MessageTopWrapper>
			<Timestamp>
				{minutesSince > 5
					? `${add0(timestamp.getHours())}:${add0(timestamp.getMinutes())}`
					: format(timestamp)}
			</Timestamp>
		</MessageWrapper>
	);
};

const MessageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;

	&.own {
		align-items: flex-end;
	}
`;

const MessageTopWrapper = styled.div`
	display: flex;
	align-items: flex-start;
`;

const UserAvatar = styled.div`
	font-size: 12px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: var(--background-darken);
	border: 1px solid var(--main-color);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 5px;
	margin-right: 15px;
`;

const MessageText = styled.p`
	padding: 10px;
	border-radius: 10px;
	background-color: var(--background-lighten);
	max-width: 300px;

	&.own {
		background-color: var(--user-chat-color);
	}
`;

const Timestamp = styled.div`
	font-size: 12px;
	margin-top: 10px;
`;

export default Message;
