import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const Homepage = () => {
	const { currentUser } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (currentUser) {
			history.push("/browse");
		}
	}, []);

	const [images, setImages] = useState([]);
	useEffect(() => {
		fetch("https://api.pokemontcg.io/v2/cards?q=set.id:base1", {
			header: {
				"Content-Type": "application/json",
				"X-Api-Key": "6c67144d-43d0-47b9-8343-67158c555011",
			},
		})
			.then((res) => res.json())
			.then((parsed) => {
				const imagesArray = [];
				parsed.data.forEach((card) => {
					if (card.supertype === "Pokémon" && card.rarity === "Rare Holo") {
						imagesArray.push(card.images.large);
					}
				});
				console.log([...imagesArray, ...imagesArray]);
				setImages([...imagesArray, ...imagesArray]);
			});
	}, []);

	let key = 0;

	return (
		<SuperWrapper>
			{!currentUser && (
				<Wrapper>
					<Container>
						<ContainerHeader>Welcome to the PokemonTrade</ContainerHeader>
						<ContainerSubHeader>
							For Pokemon TCG collectors to search for Pokemon cards and keep
							track of the ones they already have.
						</ContainerSubHeader>
						<ContainerBody>
							<p>
								To experience the most out of the app, please consider creating
								an account or logging in if you already have one.
							</p>
						</ContainerBody>

						<ButtonsSection>
							<StyledLink to="/login">
								<StyledButton>Login</StyledButton>
							</StyledLink>
							<StyledLink to="/register">
								<StyledButton>Register</StyledButton>
							</StyledLink>
						</ButtonsSection>
					</Container>
				</Wrapper>
			)}
			<ImagesSlide>
				{images &&
					images.map((image) => {
						key++;
						return (
							<Image
								key={key}
								src={image}
								alt="cards"
								onAnimationEnd={() => {
									const [toEnd, ...rest] = images;
									setImages([...rest, toEnd]);
								}}
							></Image>
						);
					})}
			</ImagesSlide>
		</SuperWrapper>
	);
};

const SuperWrapper = styled.div`
	width: 100vw;
	min-height: 75vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const Wrapper = styled.div`
	display: flex;
	height: 40vh;
	width: 100vw;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	background-color: var(--background-lighten);
	padding: 2rem;
	display: flex;
	flex-direction: column;
`;

const ContainerHeader = styled.p`
	font-size: 30px;
`;

const ContainerSubHeader = styled.p`
	font-size: 20px;
	font-family: var(--second-font);
	margin-bottom: 2rem;
`;

const ContainerBody = styled.div`
	font-size: 18px;
	font-family: var(--second-font);
`;

const ButtonsSection = styled.div`
	width: 200px;
	margin-top: 1rem;
	align-self: center;
	display: flex;
	justify-content: space-around;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--main-color);
	cursor: pointer;

	&.active {
		text-shadow: 0 0 2px white;
	}

	&:hover {
		text-shadow: 0 0 1px white, 0 0 2px white, 0 0 2px white;
	}
`;

const StyledButton = styled.button`
	background-color: transparent;
	border: 1px solid white;
	font-size: inherit;
	font-family: inherit;
	color: inherit;
	padding: 3px 7px;
	border-radius: 3px;
	cursor: pointer;
	transition: all 200ms;

	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}
`;

const ImagesSlide = styled.div`
	display: flex;
	overflow: hidden;
`;

const Image = styled.img`
	@keyframes Slide {
		to {
			transform: translateX(-192vw);
		}
	}
	width: 12vw;
	animation: Slide 30s linear infinite;
`;

export default Homepage;
