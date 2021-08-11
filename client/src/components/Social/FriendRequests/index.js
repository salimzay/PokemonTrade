import React, { useContext, useEffect, useState } from "react";
import { FiMapPin, FiUserMinus, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../../Loading";

const FriendRequests = () => {
	const { currentUser } = useContext(UserContext);
	const [friendRequests, setFriendRequests] = useState([]);
	const [friendStatus, setFriendStatus] = useState("idle");
	const [refreshToggle, setRefreshToggle] = useState(false);

	// Fetches friend requests of current user from the API
	useEffect(() => {
		setFriendStatus("loading");
		fetch(`/api/users/getFriendRequests/${currentUser._id}`)
			.then((res) => res.json())
			.then((parsed) => {
				console.log(parsed.data);
				setFriendRequests(parsed.data);
				setFriendStatus("idle");
			});
	}, [currentUser, refreshToggle]);

	return (
		<Wrapper>
			{friendStatus === "loading" ? (
				<Loading />
			) : friendRequests && friendRequests.length === 0 ? (
				<div>No friend requests at the moment</div>
			) : (
				friendRequests && (
					<StyledList>
						<StyledListItem className="header">Friend Requests</StyledListItem>
						{friendRequests.map((request) => {
							return (
								<FriendRequest
									key={request}
									request={request}
									setRefreshToggle={setRefreshToggle}
									refreshToggle={refreshToggle}
								/>
							);
						})}
					</StyledList>
				)
			)}
		</Wrapper>
	);
};

// Displays each friend request
export const FriendRequest = ({ request, setRefreshToggle, refreshToggle }) => {
	const [requestUser, setRequestUser] = useState(null);
	const { currentUser } = useContext(UserContext);

	const capitalize = (word) => {
		return word[0].toUpperCase() + word.slice(1);
	};

	// Fetches request's user's info
	useEffect(() => {
		fetch(`/api/users/${request}`)
			.then((res) => res.json())
			.then((parsed) => {
				console.log(parsed.data);
				setRequestUser(parsed.data);
			});
	}, [request]);

	// Adds requester to currentUser's friend list,
	// Deletes the friend request
	// Makes the same changes in the backend/db
	const handleAccept = async (ev) => {
		ev.preventDefault();
		const requestBody = {
			currentUserId: currentUser._id,
			senderId: request,
		};
		const res = await fetch(`/api/users/acceptFriendRequest`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});
		const parsed = await res.json();
		const data = await parsed;
		if (data.success) {
			currentUser.friends.push(request);
			const requestIndex = currentUser.friendRequests.findIndex((id) => {
				return id === request;
			});
			currentUser.friendRequests.splice(requestIndex, 1);
		}
		setRefreshToggle(!refreshToggle);
	};

	// Deletes the friend request
	// Makes same changes to the backend/db
	const handleDecline = async (ev) => {
		ev.preventDefault();
		const requestBody = {
			currentUserId: currentUser._id,
			senderId: request,
		};
		const res = await fetch(`/api/users/declineFriendRequest`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});
		const parsed = await res.json();
		const data = await parsed;
		if (data.success) {
			const requestIndex = currentUser.friendRequests.findIndex((id) => {
				return id === request;
			});
			currentUser.friendRequests.splice(requestIndex, 1);
		}
		setRefreshToggle(!refreshToggle);
	};

	return (
		requestUser && (
			<StyledListItem key={requestUser.username}>
				<StyledLink to={`/social/users/${requestUser._id}`}>
					<StyledInfo>
						<StyledName>
							{capitalize(requestUser.firstName)}{" "}
							{capitalize(requestUser.lastName)}
						</StyledName>
						<div>@{requestUser.username}</div>
						<StyledLocation>
							<FiMapPin /> {requestUser.city}, {requestUser["province/state"]},{" "}
							{requestUser.country}
						</StyledLocation>
					</StyledInfo>
					<ButtonBlock>
						<StyledButton onClick={handleAccept}>
							<FiUserPlus />
						</StyledButton>
						<StyledButton onClick={handleDecline}>
							<FiUserMinus />
						</StyledButton>
					</ButtonBlock>
				</StyledLink>
			</StyledListItem>
		)
	);
};

const Wrapper = styled.div`
	width: 90%;
	min-height: calc(100vh - 130px - 2rem);
	border-left: 1px solid var(--main-color);
	border-right: 1px solid var(--main-color);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledList = styled.ul`
	width: 100%;
`;

const StyledListItem = styled.li`
	border-bottom: 1px solid var(--main-color);

	&:hover {
		background-color: var(--background-lighten);
	}

	&:last-child {
		border: none;
	}

	&.header {
		font-size: 24px;
		font-family: var(--main-font);
		padding: 1rem;
		&:hover {
			background-color: unset;
		}
	}
`;

const StyledLink = styled(Link)`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	text-decoration: none;
	color: inherit;
`;

const StyledInfo = styled.div`
	line-height: 2;
`;

const StyledName = styled.div`
	font-size: 20px;
	font-family: var(--main-font);
`;

const StyledLocation = styled.div`
	font-size: 12px;
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

const StyledButton = styled.button`
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
	margin: 5px 2rem;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}
`;

export default FriendRequests;
