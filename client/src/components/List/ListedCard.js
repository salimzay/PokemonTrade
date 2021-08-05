import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const ListedCard = ({ type, card }) => {
	const [binderMessage, setBinderMessage] = useState("");
	const { currentUser, setCurrentUser } = useContext(UserContext);

	useEffect(() => {
		card.inBinder
			? setBinderMessage("Remove from Binder")
			: setBinderMessage("Add to Binder");
	}, []);

	const removeFromMyList = (card) => {
		const user = { ...currentUser };
		const cardIndex = user.list.findIndex((userCard) => {
			return card.id === userCard.id;
		});
		user.list.splice(cardIndex, 1);
		setCurrentUser(user);
	};

	const removeFromWishList = (card) => {
		const user = { ...currentUser };
		const cardIndex = user.wishList.findIndex((userCard) => {
			return card.id === userCard.id;
		});
		user.wishList.splice(cardIndex, 1);
		setCurrentUser(user);
	};

	const handleBinder = (card) => {
		const user = { ...currentUser };
		const cardIndex = user.list.findIndex((userCard) => {
			return card.id === userCard.id;
		});
		if (card.inBinder) {
			// Remove
			user.list[cardIndex].inBinder = false;
			setBinderMessage("Removed from Binder");
			setTimeout(() => {
				setBinderMessage("Add to Binder");
			}, 500);
		} else {
			// Add
			user.list[cardIndex].inBinder = true;
			setBinderMessage("Added to Binder");
			setTimeout(() => {
				setBinderMessage("Remove from Binder");
			}, 500);
		}
		// update user
		setCurrentUser(user);
	};

	return (
		<Wrapper type={card.types ? card.types[0] : "default-card"}>
			<StyledListItem>
				<Link to={`/browse/card/${card.id}`}>
					<StyledImg src={card.images.small} alt="card"></StyledImg>
				</Link>
				<StyledInfo>
					<StyledName>{card.name}</StyledName>
					<div>Set: {card.set.name}</div>
					{card.rarity && <div>Rarity: {card.rarity}</div>}
					{card.inBinder && <div>Currently in Binder</div>}
				</StyledInfo>
				{type === "wishlist" ? (
					<ButtonsBlock>
						<StyledButton onClick={() => removeFromWishList(card)}>
							Remove from wish list
						</StyledButton>
					</ButtonsBlock>
				) : (
					<ButtonsBlock>
						<StyledButton onClick={() => removeFromMyList(card)}>
							Remove from my list
						</StyledButton>
						<StyledButton onClick={() => handleBinder(card)}>
							{binderMessage}
						</StyledButton>
					</ButtonsBlock>
				)}
			</StyledListItem>
		</Wrapper>
	);
};

const Wrapper = styled.li`
	display: flex;
	padding: 1rem;
	font-family: var(--second-font);
	font-size: 14px;
	border-bottom: 1px solid white;

	&:last-child {
		border: none;
	}

	&:hover {
		background-color: ${(props) => `var(--${props.type})`};
	}
`;

const StyledListItem = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
`;

const StyledImg = styled.img`
	height: 150px;
	margin-right: 2rem;
`;

const StyledInfo = styled.div`
	line-height: 2;
`;

const StyledName = styled.div`
	font-size: 20px;
	font-family: var(--main-font);
`;

const ButtonsBlock = styled.div`
	height: 100%;
	margin-left: auto;
	border-left: 1px solid var(--main-color);
	padding: 1rem;
	padding-right: 0;
	align-self: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const StyledButton = styled.button`
	font-size: inherit;
	color: var(--main-color);
	background-color: transparent;
	border: 1px solid var(--main-color);
	border-radius: 5px;
	padding: 1rem;
	width: 12rem;
	cursor: pointer;
	transition: all 200ms;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}

	&:active {
		transform: scale(0.98);
	}
`;

export default ListedCard;
