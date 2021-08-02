import React, { useEffect, useState } from "react";
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
					<Route exact path="/browse">
						<Home />
					</Route>
					<Route exact path={`/browse/category/:name/:value`}>
						<Cards />
					</Route>
					<Route exact path={`/browse/sets`}>
						<Sets path={path} />
					</Route>
					<Route exact path={`/browse/card/:id`}>
						<IndivCard />
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
