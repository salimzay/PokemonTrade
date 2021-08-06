import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
	FiCalendar,
	FiMapPin,
	FiUsers,
	FiBookOpen,
	FiList,
} from "react-icons/fi";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading";
import Binder from "./Binder";
import Friends from "./Friends";
import ProfileList from "./ProfileList";

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
	const [friends, setFriends] = useState(null);
	const [friendsStatus, setFriendsStatus] = useState("idle");
	const [activeFeed, setActiveFeed] = useState("binder");
	const { currentUser } = useContext(UserContext);
	const user = JSON.parse(localStorage.getItem("currentUser"));

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
		setFriendsStatus("loading");
		getFriends(user).then((data) => {
			setFriends(data);
			setFriendsStatus("idle");
		});
	}, []);

	let dateJoined = new Date(user.createdAt);

	return (
		<Wrapper>
			{currentUser ? (
				<ProfileWrapper>
					<StyledProfileHead>
						<StyledName>
							{currentUser.firstName} {currentUser.lastName}
						</StyledName>
						<StyledUsername>@{currentUser.username}</StyledUsername>
						<div>
							<FiMapPin /> {currentUser.city}, {currentUser["province/state"]},{" "}
							{currentUser.country}
						</div>
						<div>
							<FiCalendar />{" "}
							{`Joined on ${
								MONTHS[dateJoined.getMonth()]
							} ${dateJoined.getDay()}, ${dateJoined.getFullYear()}`}
						</div>
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
			) : (
				<Loading />
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: var(--second-font);
`;

const ProfileWrapper = styled.div`
	min-height: 100%;
	width: 80vw;
	border: 1px solid var(--main-color);
	border-top: none;
	margin-bottom: 1rem;
`;

const StyledProfileHead = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledName = styled.div`
	margin-top: 2rem;
	font-size: 30px;
	font-family: var(--main-font);
`;

const StyledUsername = styled.div`
	margin-bottom: 1rem;
`;

const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid var(--main-color);
	border-bottom: 1px solid var(--main-color);
	width: 100%;
	margin-top: 2rem;
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
`;

export default Profile;
