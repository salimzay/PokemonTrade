import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import { UserContext } from "../../contexts/UserContext";

const IndivCard = () => {
	const { id } = useParams();
	const [card, setCard] = useState(null);
	const [cardStatus, setCardStatus] = useState("idle");
	const { currentUser } = useContext(UserContext);

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
				console.log(parsed.data);
				setCardStatus("idle");
			});
	}, []);

	const capitalize = (string) => {
		return string[0].toUpperCase() + string.slice(1);
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
								<DataEntry>
									<DataName>Rarity</DataName>
									<DataValue to={`/browse/category/rarity/${card.rarity}`}>
										{card.rarity.replace("Rare ", "")}
									</DataValue>
								</DataEntry>
								<DataEntry>
									<DataName>Set</DataName>
									<DataValue to={`/browse/category/set.name/${card.set.name}`}>
										{card.set.name}
									</DataValue>
								</DataEntry>
								<DataEntry>
									<DataName></DataName>
									<DataValue></DataValue>
								</DataEntry>
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
											<Container>
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
										<StyledButton className="wishlist">
											Add to Wishlist
										</StyledButton>
										<StyledButton className="mylist">
											Add to Your List
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
										<StyledLink to="/login">Login</StyledLink>
										<StyledLink to="/register">Register</StyledLink>
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
	height: 60vh;
	min-height: fit-content;
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
	width: 9rem;
	height: 2.5rem;
	background-color: transparent;
	border: 1px solid white;
	cursor: pointer;

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
`;

const StyledLink = styled(Link)`
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
