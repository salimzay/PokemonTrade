import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../../Loading";
import UserBlock from "./UserBlock";

// Search to be implemented
// Displays all users
const SocialHomepage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [allUsers, setAllUsers] = useState([]);
	const [userStatus, setUserStatus] = useState("idle");
	const { currentUser } = useContext(UserContext);

	// Fetches all users' id from the API
	useEffect(() => {
		setUserStatus("loading");
		fetch(`/api/users`)
			.then((res) => res.json())
			.then((parsed) => {
				const users = parsed.data.filter((userId) => {
					return userId !== currentUser._id;
				});
				setAllUsers(users);
				setUserStatus("idle");
			});
	}, [currentUser]);

	return (
		<Wrapper>
			<div>Search for a user, or card in a user's binder</div>
			<div>
				<input
					type="test"
					value={searchInput}
					onChange={(ev) => setSearchInput(ev.target.value)}
				></input>
				<button>Search</button>
			</div>
			<UserHeader>All Users</UserHeader>
			<UserWrapper>
				{userStatus === "loading" ? (
					<Loading />
				) : (
					allUsers.map((user) => {
						return <UserBlock userId={user} key={user} />;
					})
				)}
				<AlignerBlock aria-hidden="true"></AlignerBlock>
				<AlignerBlock aria-hidden="true"></AlignerBlock>
				<AlignerBlock aria-hidden="true"></AlignerBlock>
			</UserWrapper>
		</Wrapper>
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
	padding: 1rem;
`;

const UserHeader = styled.div`
	margin-top: 2rem;
	font-family: var(--main-font);
	font-size: 24px;
`;

const UserWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const AlignerBlock = styled.i`
	width: 225px;
	margin: 0 2rem;
	padding: 0 1rem;
`;

export default SocialHomepage;
