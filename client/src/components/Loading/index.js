import React from "react";
import gif from "./pokeball.gif";
import styled from "styled-components";

const Loading = () => {
	return (
		<Wrapper>
			<StyledGif src={gif} alt="Loading"></StyledGif>
			<StyledText>Loading</StyledText>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: auto;
`;

const StyledGif = styled.img`
	width: 100%;
	max-width: 100px;
`;

const StyledText = styled.div`
	margin-top: -20px;
`;

export default Loading;
