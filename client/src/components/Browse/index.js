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
	return (
		<Wrapper>
			<Sidebar />
			<Switch>
				<Route exact path={`${path}`}>
					<Home />
				</Route>
				<Route exact path={`${path}/category/:name/:value`}>
					<Cards />
				</Route>
				<Route exact path={`${path}/sets`}>
					<Sets path={path} />
				</Route>
				<Route exact path={`${path}/card/:id`}>
					<IndivCard path={path} />
				</Route>
			</Switch>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	min-height: 100%;
`;

export default Browse;
