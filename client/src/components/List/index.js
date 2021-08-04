import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import ListedCard from "./ListedCard";

const List = () => {
	const { list } = useParams();
	const { currentUser } = useContext(UserContext);
	let userList,
		title = "";
	if (list === "mylist") {
		userList = "list";
		title = "My List";
	} else {
		userList = "wishList";
		title = "My Wish List";
	}

	return (
		<Wrapper>
			<StyledTitle>{title}</StyledTitle>
			<div>
				{currentUser &&
				currentUser[userList] &&
				currentUser[userList].length === 0 ? (
					<div>This list is currently empty</div>
				) : (
					<StyledList>
						{currentUser &&
							currentUser[userList].map((item) => {
								return <ListedCard type={list} card={item} />;
							})}
					</StyledList>
				)}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100vw;
	margin: 2rem 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: var(--second-font);
`;

const StyledTitle = styled.div`
	font-size: 30px;
	font-family: var(--main-font);
	margin-bottom: 1.5rem;
`;

const StyledList = styled.ul`
	border: 1px solid var(--main-color);
	border-radius: 5px;
	width: 50vw;
`;

export default List;
