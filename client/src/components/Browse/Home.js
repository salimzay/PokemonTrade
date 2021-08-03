import React from "react";
import styled from "styled-components";

const Home = () => {
	return (
		<Wrapper>
			<Container>
				<Header>
					You can check the sidebar to browse cards depending on the category
				</Header>
				<SubHeader>
					You can also search for any card you want using the searchbar below
				</SubHeader>
			</Container>
			<div>Searchbar</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	font-size: 14px;
	margin-top: 2rem;
`;

const Container = styled.div`
	background-color: var(--background-lighten);
	text-align: center;
	line-height: 1.5;
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 5px;
	border: 1px solid var(--main-color);
`;

const Header = styled.div`
	font-size: 20px;
`;

const SubHeader = styled.h2`
	font-size: 16px;
	font-family: var(--second-font);
`;

export default Home;
