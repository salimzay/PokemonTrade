import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import styled from "styled-components";
import Loading from "../Loading";
import { UserContext } from "../../contexts/UserContext";
import { ChatContext } from "../../contexts/ChatContext";

const Friends = ({ user, friends, friendsStatus }) => {
	const { currentUser } = useContext(UserContext);
	const { handleMessage } = useContext(ChatContext);
	const capitalize = (word) => {
		return word[0].toUpperCase() + word.slice(1);
	};
	return friends.length === 0 ? (
		<div>This user has no friends</div>
	) : (
		<div>
			{friendsStatus === "loading" ? (
				<Loading />
			) : (
				<ul>
					{friends.map((friend) => {
						return (
							<StyledListItem key={friend.username}>
								<StyledInfo>
									<StyledName>
										{capitalize(friend.firstName)} {capitalize(friend.lastName)}
									</StyledName>
									<div>@{friend.username}</div>
								</StyledInfo>
								<ButtonBlock>
									{currentUser.friends.includes(friend._id) && (
										<StyledButton
											to="/social/chat"
											onClick={() => {
												handleMessage(currentUser._id, friend._id);
											}}
										>
											<FiMessageCircle />
										</StyledButton>
									)}
									<StyledButton to={`/social/users/${friend._id}`}>
										<FiUser />
									</StyledButton>
								</ButtonBlock>
							</StyledListItem>
						);
					})}
				</ul>
			)}
		</div>
	);
};

const StyledListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	border-bottom: 1px solid var(--main-color);

	&:hover {
		background-color: var(--background-lighten);
	}

	&:last-child {
		border: none;
	}
`;

const StyledInfo = styled.div`
	line-height: 2;
`;

const StyledName = styled.div`
	font-size: 20px;
	font-family: var(--main-font);
`;

const ButtonBlock = styled.div`
	height: 100%;
	margin-left: auto;
	border-left: 1px solid var(--main-color);
	padding: 1rem;
	padding-right: 0;
	align-self: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const StyledButton = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	color: var(--main-color);
	background-color: transparent;
	border: 1px solid var(--main-color);
	border-radius: 5px;
	padding: 10px;
	cursor: pointer;
	transition: all 200ms;
	margin: 10px 2rem;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}
`;

export default Friends;
