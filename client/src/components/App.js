import React, { useContext } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Homepage from "./Homepage";
import Footer from "./Footer";
import Browse from "./Browse";

const App = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			<GlobalStyles />
			<Router>
				<Wrapper>
					<Header />
					<Main>
						<Switch>
							<Route exact path="/">
								<Homepage />
							</Route>
							<Route exact path="/register">
								<Register />
							</Route>
							<Route exact path="/login">
								<Login />
							</Route>
							<Route path="/browse">
								<Browse />
							</Route>
						</Switch>
					</Main>
					<Footer />
				</Wrapper>
			</Router>
		</div>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const Main = styled.main`
	flex: 1;
`;

export default App;
