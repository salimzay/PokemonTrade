import React from "react";
import styled from "styled-components";
import List from "../List";
import ListedCard from "../List/ListedCard";

const ProfileList = ({ user }) => {
	return (
		<div>
			{user && user["wishList"] && user["wishList"].length === 0 ? (
				<div>This list is currently empty</div>
			) : (
				<StyledList>
					{user &&
						user["wishList"].map((item) => {
							return <ListedCard type="wishlist" card={item} />;
						})}
				</StyledList>
			)}
		</div>
	);
};

const Wrapper = styled.div`
	display: flex;
`;

const StyledList = styled.ul`
	border: 1px solid var(--main-color);
	border-radius: 5px;
`;

export default ProfileList;
