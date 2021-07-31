import React, { useContext } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Homepage from "./Homepage";

const App = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			<GlobalStyles />
			<Router>
				<Header />
				<Wrapper>
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
					</Switch>
				</Wrapper>
			</Router>
		</div>
	);
};

const Wrapper = styled.div``;

export default App;
