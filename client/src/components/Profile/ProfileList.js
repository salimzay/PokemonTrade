import React from "react";
import styled from "styled-components";
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
							return (
								<ListedCard
									type="wishlist"
									card={item}
									user={user}
									key={item.id}
								/>
							);
						})}
				</StyledList>
			)}
		</div>
	);
};

const StyledList = styled.ul`
	border: 1px solid var(--main-color);
	border-radius: 5px;
`;

export default ProfileList;
