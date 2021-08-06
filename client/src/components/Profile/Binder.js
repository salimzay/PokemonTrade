import React from "react";
import styled from "styled-components";
import CardBlock from "../Browse/CardBlock";

const Binder = ({ user }) => {
	const inBinderArray = user.list.filter((card) => card.inBinder);
	return (
		<BinderWrapper>
			{inBinderArray.map((card) => {
				return <CardBlock card={card} />;
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
