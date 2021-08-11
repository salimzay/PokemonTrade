import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { NavLink } from "react-router-dom";

const SocialSidenav = ({ path }) => {
	const { currentUser } = useContext(UserContext);

	return (
		<Wrapper>
			<StyledListItem>
				<StyledNavLink exact to={path}>
					Social
				</StyledNavLink>
			</StyledListItem>
			<StyledListItem>
				<StyledNavLink to={`${path}/users/${currentUser._id}`}>
					Your Profile
				</StyledNavLink>
			</StyledListItem>
			<StyledListItem>
				<StyledNavLink to={`${path}/chat`}>Chat</StyledNavLink>
			</StyledListItem>
			<StyledListItem>
				<StyledNavLink to={`${path}/requests`}>Friend Requests</StyledNavLink>
			</StyledListItem>
		</Wrapper>
	);
};

const Wrapper = styled.ul`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const StyledListItem = styled.li`
	margin: 1rem 0;
	margin-left: 1rem;
`;

const StyledNavLink = styled(NavLink)`
	color: var(--main-color);
	text-decoration: none;

	&:hover {
		text-shadow: 0 0 2px var(--main-color);
		text-decoration: underline;
	}

	&.active {
		font-weight: bold;
		text-shadow: 0 0 1px var(--main-color);
	}
`;

export default SocialSidenav;
