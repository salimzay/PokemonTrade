import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../contexts/UserContext";

const App = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<div>{currentUser && currentUser.username}</div>
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
