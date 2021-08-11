import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
	FiCalendar,
	FiMapPin,
	FiUsers,
	FiBookOpen,
	FiList,
	FiUserPlus,
	FiUserMinus,
	FiMessageCircle,
} from "react-icons/fi";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading";
import Binder from "./Binder";
import Friends from "./Friends";
import ProfileList from "./ProfileList";
import Avatar from "./Avatar";
import { Link, useParams } from "react-router-dom";
import { ChatContext } from "../../contexts/ChatContext";

const MONTHS = [
	"Januray",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const Profile = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [user, setUser] = useState(null);
	const [userStatus, setUserStatus] = useState("idle");
	const [dateJoined, setDateJoined] = useState(null);
	const [friends, setFriends] = useState(null);
	const [friendsStatus, setFriendsStatus] = useState("idle");
	const [activeFeed, setActiveFeed] = useState("binder");
	const { userId } = useParams();

	const getFriends = async (user) => {
		const friendsArray = await Promise.all(
			user.friends.map(async (friend) => {
				const fetched = await fetch(`/api/users/${friend}`, {
					method: "GET",
					headers: {
						"content-type": "application/json",
					},
				});
				const res = await fetched.json();
				return res.data;
			})
		);
		return friendsArray;
	};

	useEffect(() => {
		if (userId !== undefined) {
			setUserStatus("loading");
			fetch(`/api/users/${userId}`)
				.then((res) => res.json())
				.then((parsed) => {
					setUser(parsed.data);
					const createdDate = new Date(parsed.data.createdAt);
					setDateJoined(createdDate);
				});
		} else {
			setUser(currentUser);
			const createdDate = new Date(currentUser.createdAt);
			setDateJoined(createdDate);
		}
		setUserStatus("idle");
	}, [userId, currentUser]);

	useEffect(() => {
		if (user) {
			setFriendsStatus("loading");
			getFriends(user).then((data) => {
				setFriends(data);
				setFriendsStatus("idle");
			});
		}
	}, [user]);

	useEffect(() => {
		fetch(`/api/users/${currentUser._id}`)
			.then((res) => res.json())
			.then((parsed) => {
				console.log(parsed);
				setCurrentUser({
					...currentUser,
					friendRequests: parsed.data.friendRequests,
				});
			});
	}, []);

	return (
		<Wrapper>
			{userStatus === "loading" ? (
				<Loading />
			) : (
				user &&
				dateJoined && (
					<ProfileWrapper>
						<StyledProfileHead>
							<Avatar user={user} />
							<StyledName>
								{user.firstName} {user.lastName}
							</StyledName>
							<StyledUsername>@{user.username}</StyledUsername>
							<div>
								<FiMapPin /> {user.city}, {user["province/state"]},{" "}
								{currentUser.country}
							</div>
							<div>
								<FiCalendar />{" "}
								{`Joined on ${
									MONTHS[dateJoined.getMonth()]
								} ${dateJoined.getDate()}, ${dateJoined.getFullYear()}`}
							</div>
							{currentUser._id !== user._id && (
								<ButtonBlock user={user} currentUser={currentUser} />
							)}
						</StyledProfileHead>
						<div>
							<Navbar>
								<Navitem
									onClick={() => setActiveFeed("binder")}
									className={activeFeed === "binder" ? "active" : ""}
								>
									<FiBookOpen /> Binder
								</Navitem>
								<Navitem
									onClick={() => setActiveFeed("friends")}
									className={activeFeed === "friends" ? "active" : ""}
								>
									<FiUsers /> Friends
								</Navitem>
								<Navitem
									onClick={() => setActiveFeed("list")}
									className={activeFeed === "list" ? "active" : ""}
								>
									<FiList /> Wish List
								</Navitem>
							</Navbar>
							<div>
								{activeFeed === "binder" ? (
									<Binder user={user} />
								) : activeFeed === "friends" ? (
									<Friends
										user={user}
										friends={friends}
										friendsStatus={friendsStatus}
									/>
								) : (
									<ProfileList user={user} />
								)}
							</div>
						</div>
					</ProfileWrapper>
				)
			)}
		</Wrapper>
	);
};

const ButtonBlock = ({ user, currentUser }) => {
	const [requestMessage, setRequestMessage] = useState("Add as friend");
	const [reloadToggle, setReloadToggle] = useState(false);
	const { handleMessage } = useContext(ChatContext);

	useEffect(() => {
		if (user) {
			user.friendRequests.includes(currentUser._id) &&
				setRequestMessage("Request sent!");
		}
	}, [user, currentUser]);

	const handleRequest = async (type) => {
		switch (type) {
			case "add":
				if (requestMessage === "Add as friend") {
					setRequestMessage("Sending request");
					const requestBody = {
						senderId: currentUser._id,
						receiverId: user._id,
					};
					const res = await fetch(`/api/users/createFriendRequest`, {
						method: "PUT",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(requestBody),
					});
					const parsed = await res.json();
					const success = await parsed.success;
					if (success) {
						setRequestMessage("Request Sent!");
					}
				}
				break;
			case "accept":
				const acceptBody = {
					currentUserId: currentUser._id,
					senderId: user._id,
				};
				const acceptRes = await fetch(`/api/users/acceptFriendRequest`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(acceptBody),
				});
				const acceptParsed = await acceptRes.json();
				const data = await acceptParsed;
				if (data.success) {
					currentUser.friends.push(user._id);
					const requestIndex = currentUser.friendRequests.findIndex((id) => {
						return id === user._id;
					});
					currentUser.friendRequests.splice(requestIndex, 1);
				}
				break;
			case "decline":
				const declineBody = {
					currentUserId: currentUser._id,
					senderId: user._id,
				};
				const declineRes = await fetch(`/api/users/declineFriendRequest`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(declineBody),
				});
				const declineParsed = await declineRes.json();
				const declineData = await declineParsed;
				if (declineData.success) {
					const requestIndex = currentUser.friendRequests.findIndex((id) => {
						return id === user._id;
					});
					currentUser.friendRequests.splice(requestIndex, 1);
				}
				break;
			default:
				break;
		}
		setReloadToggle(!reloadToggle);
	};

	return (
		<ButtonBlockWrapper>
			{currentUser.friends.includes(user._id) ? (
				<StyledLink
					to="/social/chat"
					onClick={() => {
						handleMessage(currentUser._id, user._id);
					}}
				>
					Message <FiMessageCircle />
				</StyledLink>
			) : currentUser.friendRequests.includes(user._id) ? (
				<>
					<StyledButton
						onClick={() => {
							handleRequest("accept");
						}}
					>
						Accept request <FiUserPlus />
					</StyledButton>
					<StyledButton
						onClick={() => {
							handleRequest("decline");
						}}
					>
						Decline Request <FiUserMinus />
					</StyledButton>
				</>
			) : (
				<StyledButton
					onClick={() => {
						handleRequest("add");
					}}
				>
					{requestMessage} <FiUserPlus />
				</StyledButton>
			)}
		</ButtonBlockWrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: var(--second-font);
	align-self: center;
	width: 90%;
`;

const ProfileWrapper = styled.div`
	min-height: calc(100vh - 130px - 2rem);
	width: 100%;
	border: 1px solid var(--main-color);
	border-top: none;
	margin-bottom: 1rem;
`;

const StyledProfileHead = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2rem;
`;

const StyledName = styled.div`
	font-size: 30px;
	font-family: var(--main-font);
`;

const StyledUsername = styled.div`
	margin-bottom: 1rem;
`;

const ButtonBlockWrapper = styled.div`
	margin: 2rem 0;
	display: flex;
`;

const StyledLink = styled(Link)`
	background-color: transparent;
	color: var(--main-color);
	border: 1px solid var(--main-color);
	border-radius: 5px;
	padding: 10px;
	width: 8rem;
	cursor: pointer;
	transition: all 200ms;
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}
`;

const StyledButton = styled.button`
	background-color: transparent;
	color: var(--main-color);
	border: 1px solid var(--main-color);
	border-radius: 5px;
	font-size: inherit;
	padding: 10px;
	width: 11rem;
	cursor: pointer;
	transition: all 200ms;
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 0 10px;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}
`;

const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid var(--main-color);
	border-bottom: 1px solid var(--main-color);
	width: 100%;
	margin-top: 1rem;
`;

const Navitem = styled.button`
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	justify-content: space-evenly;
	background-color: transparent;
	color: var(--main-color);
	border: none;
	border-right: 1px solid var(--main-color);
	font-size: inherit;
	height: 4rem;
	width: 33.3%;
	cursor: pointer;

	&:hover {
		background-color: var(--background-lighten);
		text-shadow: 0 0 1px var(--main-color);
	}

	&.active {
		font-weight: bold;
		text-shadow: 0 0 2px var(--main-color);
	}

	&:last-child {
		border-right: none;
	}
`;

export default Profile;
