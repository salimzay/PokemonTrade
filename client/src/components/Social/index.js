import React from "react";
import styled from "styled-components";
import { Switch, Route, useRouteMatch } from "react-router";
import SocialSidenav from "./SocialSidenav";
import Profile from "../Profile";
import SocialHomepage from "./SocialHomepage";
import Chat from "./Chat";
import FriendRequests from "./FriendRequests";

const Social = () => {
	const { path } = useRouteMatch();
	return (
		<Wrapper>
			<StyledNav>
				<SocialSidenav path={path} />
			</StyledNav>
			<Main>
				<Switch>
					<Route exact path={path}>
						<SocialHomepage />
					</Route>
					<Route exact path={`/profile`}>
						<Profile />
					</Route>
					<Route exact path={`${path}/users/:userId`}>
						<Profile />
					</Route>
					<Route path={`${path}/chat`}>
						<Chat />
					</Route>
					<Route path={`${path}/requests`}>
						<FriendRequests />
					</Route>
				</Switch>
			</Main>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100vw;
	min-height: calc(100vh - 130px - 2rem);
`;

const StyledNav = styled.nav`
	width: 12vw;
`;

const Main = styled.main`
	width: 88vw;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Social;
