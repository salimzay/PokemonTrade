import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
	const { currentUser } = useContext(UserContext);
	const handleLogout = (ev) => {
		localStorage.removeItem("currentUser");
		window.location.replace("/");
	};

	return (
		<Wrapper>
			<Title>
				<StyledNavLink exact to="/">
					PokemonTrade
				</StyledNavLink>
			</Title>
			<StyledNavItem>
				<StyledNavLink exact to="/browse">
					Browse
				</StyledNavLink>
			</StyledNavItem>
			<StyledNavItem>SearchBar</StyledNavItem>
			<div>
				{currentUser ? (
					<RightSide>
						<StyledNavItem>
							<StyledNavLink to="#">Chat</StyledNavLink>
						</StyledNavItem>
						<StyledNavItem>
							<StyledNavLink to="#">Wish List</StyledNavLink>
						</StyledNavItem>
						<StyledNavItem>
							<StyledNavLink to="#">My List</StyledNavLink>
						</StyledNavItem>
						<StyledNavItem>
							<StyledNavLink to="#">Profile</StyledNavLink>
						</StyledNavItem>
						<StyledNavItem>
							<StyledButton onClick={handleLogout}>Logout</StyledButton>
						</StyledNavItem>
					</RightSide>
				) : (
					<RightSide>
						<StyledNavItem>
							<StyledNavLink to="/login">
								<StyledButton>Login</StyledButton>
							</StyledNavLink>
						</StyledNavItem>
						<StyledNavItem>
							<StyledNavLink to="/register">
								<StyledButton>Register</StyledButton>
							</StyledNavLink>
						</StyledNavItem>
					</RightSide>
				)}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;
	background-color: var(--background-darken);
	border-bottom: 1px solid var(--main-color);
	height: 40px;
	max-width: 100vw;
`;

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	color: var(--main-color);
	cursor: pointer;

	&.active {
		text-shadow: 0 0 2px white;
	}

	&:hover {
		text-shadow: 0 0 1px white, 0 0 2px white, 0 0 2px white;
	}
`;

const Title = styled.h1`
	font-size: 30px;
	font-weight: 900;
	margin-right: 1rem;
	padding-left: 1rem;
`;

const RightSide = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledNavItem = styled.div`
	margin: 0 2rem;
	margin-right: auto;
`;

const StyledButton = styled.button`
	background-color: transparent;
	border: 1px solid white;
	font-size: inherit;
	color: inherit;
	padding: 3px 7px;
	border-radius: 3px;
	cursor: pointer;
	transition: all 200ms;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}

	&:last-child {
		margin-right: 1rem;
	}
`;

export default Header;
