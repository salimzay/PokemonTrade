import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Cards from "./Cards";
import Home from "./Home";
import IndivCard from "./IndivCard";
import Sets from "./Sets";
import Sidebar from "./Sidebar";

const Browse = () => {
	let { path, url } = useRouteMatch();
	console.log(path, url);
	return (
		<Wrapper>
			<Router>
				<Sidebar />
				<Switch>
					<Route exact path={`${url}`}>
						<Home />
					</Route>
					<Route exact path={`${url}/category/:name/:value`}>
						<Cards />
					</Route>
					<Route exact path={`${url}/sets`}>
						<Sets path={path} />
					</Route>
					<Route exact path={`${url}/card/:id`}>
						<IndivCard path={path} />
					</Route>
				</Switch>
			</Router>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	min-height: 100%;
`;

export default Browse;
