import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import { UserContext } from "../../contexts/UserContext";

// Card page where the details are
const IndivCard = ({ path }) => {
	const { id } = useParams();
	const [card, setCard] = useState(null);
	const [cardStatus, setCardStatus] = useState("idle");
	const [inList, setInList] = useState(false);
	const [listMessage, setListMessage] = useState("");
	const [inWishList, setInWishList] = useState(false);
	const [wishListMessage, setWishListMessage] = useState("");
	const { currentUser, setCurrentUser } = useContext(UserContext);

	// Fetches the card inf from APU
	useEffect(() => {
		setCardStatus("loading");
		fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
			headers: {
				"content-type": "application/json",
				"X-Api-Key": process.env.REACT_APP_POKETCG_API_KEY,
			},
		})
			.then((res) => res.json())
			.then((parsed) => {
				setCard(parsed.data);
				if (currentUser) {
					const checkList = currentUser.list.some(
						(card) => card.id === parsed.data.id
					);
					setInList(checkList);

					checkList
						? setListMessage("Remove from List")
						: setListMessage("Add to List");

					const checkWishList = currentUser.wishList.some(
						(card) => card.id === parsed.data.id
					);
					setInWishList(checkWishList);

					checkWishList
						? setWishListMessage("Remove from Wish List")
						: setWishListMessage("Add to Wish List");
				}
				setCardStatus("idle");
			});
	}, [id]);

	const capitalize = (string) => {
		return string[0].toUpperCase() + string.slice(1);
	};

	// Add or remove the card from the user's list
	const handleMyList = (card) => {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		let indexOfCard = user.list.findIndex(
			(listCard) => listCard.id === card.id
		);
		if (indexOfCard !== -1) {
			user.list.splice(indexOfCard, 1);
		} else {
			user.list.push({ ...card, inBinder: false });
		}
		const request = JSON.stringify({ list: user.list });

		setCurrentUser(user);
		setListMessage("Loading...");
		fetch(`/api/users/${user._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: request,
		})
			.then((res) => res.json())
			.then((parsed) => {
				setInList(!inList);
				setListMessage(inList ? "Removed from List" : "Added to List");
				setTimeout(() => {
					setListMessage(inList ? "Add to List" : "Remove from List");
				}, 1000);
			});
	};

	// Add or remove the card from the user's wish list
	const handleWishList = (card) => {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		let indexOfCard = user.wishList.findIndex(
			(listCard) => listCard.id === card.id
		);
		if (indexOfCard !== -1) {
			user.wishList.splice(indexOfCard, 1);
		} else {
			user.wishList.push({ ...card });
		}
		const request = JSON.stringify({ wishList: user.wishList });

		setCurrentUser(user);
		setWishListMessage("Loading...");
		fetch(`/api/users/${user._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: request,
		})
			.then((res) => res.json())
			.then((parsed) => {
				setInWishList(!inWishList);
				setWishListMessage(
					inWishList ? "Removed from Wish List" : "Added to Wish List"
				);
				setTimeout(() => {
					setWishListMessage(
						inWishList ? "Add to Wish List" : "Remove from Wish List"
					);
				}, 1000);
			});
	};

	return (
		<Wrapper>
			{cardStatus === "loading" ? (
				<Loading />
			) : (
				card && (
					<StyledCardInfo type={card.types ? card.types[0] : "default-card"}>
						<CardImage src={card.images.large} alt="card"></CardImage>
						<StyledDescription>
							<DataBlock>
								<DataEntry>
									<StyledName>{card.name}</StyledName>
								</DataEntry>
								{card.rarity && (
									<DataEntry>
										<DataName>Rarity</DataName>
										<DataValue to={`/browse/category/rarity/${card.rarity}`}>
											{card.rarity.replace("Rare ", "")}
										</DataValue>
									</DataEntry>
								)}
								<DataEntry>
									<DataName>Set</DataName>
									<DataValue to={`/browse/category/set.name/${card.set.name}`}>
										{card.set.name}
									</DataValue>
								</DataEntry>
								{/* <DataEntry>
									<DataName></DataName>
									<DataValue></DataValue>
								</DataEntry> */}
							</DataBlock>
							<PriceBlock>
								<PriceHeader>Prices</PriceHeader>
								<div>
									Buy Now at
									<StyledAnchor
										href={card.tcgplayer.url}
										target="_blank"
										rel="noreferrer"
									>
										TcgPlayer
									</StyledAnchor>
								</div>
								<StyledPrices>
									{Object.keys(card.tcgplayer.prices).map((foil) => {
										return (
											<Container key={foil}>
												<div>{capitalize(foil)}</div>
												<div>
													{`$${Number(
														card.tcgplayer.prices[foil].market
													).toFixed(2)}`}
												</div>
											</Container>
										);
									})}
								</StyledPrices>
							</PriceBlock>
							{currentUser ? (
								<ButtonBlock>
									<div>
										<StyledButton
											className={`wishlist ${
												wishListMessage === "Added to Wish List"
													? "green"
													: wishListMessage === "Removed from Wish List"
													? "red"
													: ""
											}`}
											onClick={() => handleWishList(card)}
										>
											{wishListMessage}
										</StyledButton>
										<StyledButton
											className={`mylist ${
												listMessage === "Added to List"
													? "green"
													: listMessage === "Removed from List"
													? "red"
													: ""
											}`}
											onClick={() => handleMyList(card)}
										>
											{listMessage}
										</StyledButton>
									</div>
									<StyledButton className="search">
										Search in Social
									</StyledButton>
								</ButtonBlock>
							) : (
								<ButtonBlock>
									<div>
										Login or Register for an account if you want to add this
										card to your list or trade with other users who have this
										card
									</div>
									<div>
										<StyledLink href="/login">Login</StyledLink>
										<StyledLink href="/register">Register</StyledLink>
									</div>
								</ButtonBlock>
							)}
						</StyledDescription>
					</StyledCardInfo>
				)
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: fit-content;
	font-family: var(--second-font);
	font-size: 16px;
`;

const StyledCardInfo = styled.div`
	background-color: ${(props) => `var(--${props.type})`};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 75vw;
	min-width: fit-content;
	height: 100%;
	padding: 1rem;
	margin: 1rem;
	border-radius: 10px;
	border: 1px solid white;
`;

const CardImage = styled.img`
	/* width: 80%;
	max-width: 400px; */
	max-height: 60vh;
	max-width: 100%;
	margin: 1rem auto;
`;

const StyledDescription = styled.div`
	margin: 1rem auto;
	min-width: 300px;
	width: fit-content;
	height: 60vh;
	min-height: fit-content;
	display: flex;
	flex-direction: column;
`;

const DataBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	line-height: 1.5;
`;

const DataEntry = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const StyledName = styled.div`
	font-size: 28px;
	font-family: var(--main-font);
	width: 80%;
	text-align: center;
	margin-bottom: 1rem;
	border-bottom: 1px solid white;
`;

const DataName = styled.div``;

const DataValue = styled(Link)`
	margin-left: auto;
	color: inherit;
	text-decoration: none;

	&:hover {
		text-shadow: 0 0 1px white;
	}
`;

// Prices

const PriceBlock = styled.div`
	margin-top: 1rem;
	font-size: 14px;
	margin-top: auto;
	padding: 1rem 0;
	border-top: 1px solid white;
	border-bottom: 1px solid white;
`;

const PriceHeader = styled.div`
	font-size: 22px;
	margin-bottom: -8px;
`;

const StyledAnchor = styled.a`
	color: inherit;
	margin-left: 5px;
	&:hover {
		text-shadow: 0 0 1px white;
	}
`;

const StyledPrices = styled.div`
	display: flex;
	justify-content: space-around;
	font-size: 18px;
	margin-top: 10px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ButtonBlock = styled.div`
	width: 100%;
	max-width: 25vw;
	height: 6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	margin-top: auto;
	line-height: 1.25;
`;

const StyledButton = styled.button`
	font-size: inherit;
	color: inherit;
	width: 12rem;
	height: 2.5rem;
	background-color: transparent;
	border: 1px solid white;
	cursor: pointer;
	transition: all 100ms;

	&:hover {
		box-shadow: 0 0 2px white, 0 0 2px white;
		text-shadow: 0 0 1px white;
	}

	&.wishlist {
		margin-right: 1rem;
	}

	&.search {
		display: block;
	}

	&.green {
		background-color: rgba(50, 200, 50, 0.9);
	}

	&.red {
		background-color: rgba(200, 50, 50, 0.9);
	}
`;

const StyledLink = styled.a`
	background-color: transparent;
	border: 1px solid white;
	font-size: inherit;
	color: inherit;
	text-decoration: none;
	padding: 3px 7px;
	margin: 0 1rem;
	border-radius: 3px;
	cursor: pointer;
	transition: all 200ms;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}

	&:last-child {
		margin-right: 1rem;
	}
`;

export default IndivCard;
