import React from "react";
import styled from "styled-components";
import CardBlock from "../Browse/CardBlock";

// Display all cards where inBinder is true
const Binder = ({ user }) => {
	const inBinderArray = user.list.filter((card) => card.inBinder);
	return inBinderArray.length === 0 ? (
		<div>This user has no cards in the binder</div>
	) : (
		<BinderWrapper>
			{inBinderArray.map((card) => {
				return <CardBlock card={card} key={card.id} />;
			})}
			<AlignerBlock aria-hidden="true"></AlignerBlock>
			<AlignerBlock aria-hidden="true"></AlignerBlock>
			<AlignerBlock aria-hidden="true"></AlignerBlock>
		</BinderWrapper>
	);
};

const BinderWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;
`;

const AlignerBlock = styled.i`
	width: 225px;
	margin: 0 2rem;
	padding: 0 1rem;
`;

export default Binder;
