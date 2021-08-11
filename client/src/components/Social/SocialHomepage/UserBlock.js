import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMapPin } from "react-icons/fi";
import Loading from "../../Loading";

const UserBlock = ({ userId }) => {
	const [fullUser, setFullUser] = useState(null);
	const [fullUserStatus, setFullUserStatus] = useState("idle");

	// Fetches user's info from API
	useEffect(() => {
		setFullUserStatus("loading");
		fetch(`/api/users/${userId}`)
			.then((res) => res.json())
			.then((parsed) => {
				setFullUser(parsed.data);
				setFullUserStatus("idle");
			});
	}, [userId]);
	return (
		<Wrapper>
			{fullUserStatus === "loading" ? (
				<Loading />
			) : (
				fullUser && (
					<StyledLink to={`/social/users/${userId}`}>
						<ProfilePicture>
							{fullUser.username[0].toUpperCase()}
						</ProfilePicture>
						<div>
							<StyledUsername>@{fullUser.username}</StyledUsername>
							<div>
								<FiMapPin />
								{fullUser.city}, {fullUser["province/state"]},{" "}
								{fullUser.country}
							</div>
						</div>
					</StyledLink>
				)
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 200px;
	height: 250px;
	margin: 1rem;
	font-size: 16px;
	font-family: var(--second-font);
	padding: 1rem;
	background-color: var(--background-lighten);
	border: 1px solid transparent;
	border-radius: 5px;

	&:hover {
		text-shadow: 0 0 2px white;
		border: 1px solid var(--main-color);
	}
`;

const ProfilePicture = styled.div`
	font-size: 30px;
	background-color: var(--background-darken);
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	border: 1px solid var(--main-color);
	border-radius: 50%;
	margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	color: var(--main-color);
	text-decoration: none;
`;

const StyledUsername = styled.div`
	font-family: var(--main-font);
`;

export default UserBlock;
