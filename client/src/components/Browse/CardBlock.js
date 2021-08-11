import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardBlock = ({ card }) => {
	return (
		<Wrapper
			to={`/browse/card/${card.id}`}
			type={card.types ? card.types[0] : "default-card"}
		>
			<StyledCard src={card.images.small} alt="card-pic"></StyledCard>
			<Name>{card.name}</Name>
			<Set>Set: {card.set.name}</Set>
		</Wrapper>
	);
};

const Wrapper = styled(Link)`
	position: relative;
	width: 225px;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2rem;
	padding: 1rem;
	background-color: var(--background-lighten);
	border-radius: 10px;
	color: inherit;
	text-decoration: none;
	border: 1px solid transparent;

	&:hover {
		text-shadow: 0 0 2px white;
		border: ${(props) => `1px solid var(--${props.type})`};
		box-shadow: ${(props) =>
			`0 0 3px var(--${props.type}), 0 0 2px var(--${props.type}), 0 0 1px var(--${props.type})`};
	}
`;

const StyledCard = styled.img`
	width: 100%;
	height: auto;
	margin-bottom: 1rem;
`;

const Name = styled.div`
	font-size: 1fr;
`;

const Set = styled.div`
	font-size: 14px;
`;

export default CardBlock;
