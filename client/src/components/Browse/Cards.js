import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {} from "react-icons/fi";
import CardBlock from "./CardBlock";
import Pagination from "./Pagination";
import Loading from "../Loading";

const Cards = () => {
	let { name, value } = useParams();
	const [cardsPerPage, setCardsPerPage] = useState(50);
	const [cards, setCards] = useState([]);
	const [cardsStatus, setCardsStatus] = useState("idle");
	const [pageCount, setPageCount] = useState(1);
	const [pageNumber, setPageNumber] = useState(1);
	const [cardCount, setCardCount] = useState(0);
	const [headerName, setHeaderName] = useState(value);
	const [bannerImg, setBannerImg] = useState("");

	useEffect(() => {
		setCardsStatus("loading");
		let apiName = name;
		let apiValue = value;
		if (name === "name") {
			apiValue = `${value}*`;
		} else {
			apiName = `!${name}`;
		}
		fetch(
			`https://api.pokemontcg.io/v2/cards?q=${apiName}:"${apiValue}"&page=${pageNumber}&pageSize=${cardsPerPage}`,
			{
				headers: {
					"content-type": "application/json",
					"X-Api-Key": process.env.REACT_APP_POKETCG_API_KEY,
				},
			}
		)
			.then((res) => res.json())
			.then((parsed) => {
				const calculatePageCount = Math.ceil(parsed.totalCount / cardsPerPage);
				setPageCount(calculatePageCount);
				setCardCount(parsed.totalCount);
				setCards(parsed.data);
				setCardsStatus("idle");
			});
		if (name === "set.id") {
			fetch(`https://api.pokemontcg.io/v2/sets/${value}`, {
				headers: {
					"content-type": "application/json",
					"X-Api-Key": process.env.REACT_APP_POKETCG_API_KEY,
				},
			})
				.then((res) => res.json())
				.then((parsed) => {
					setHeaderName(parsed.data.name);

					setBannerImg(parsed.data.images.logo);
				});
		} else {
			name === "name"
				? setHeaderName(`Search for: ${value}`)
				: setHeaderName(value);
			setBannerImg("");
		}
	}, [name, value, pageNumber, cardsPerPage]);

	return (
		<Wrapper>
			<Banner>
				{bannerImg && <BannerImage src={bannerImg} alt="Banner"></BannerImage>}
				{headerName[0].toUpperCase() + headerName.slice(1)}
			</Banner>
			<CardsWrapper>
				{cardsStatus === "loading" ? (
					<Loading />
				) : (
					cards &&
					cards.map((card) => {
						return <CardBlock card={card} key={card.id} />;
					})
				)}
				<AlignerBlock aria-hidden="true"></AlignerBlock>
				<AlignerBlock aria-hidden="true"></AlignerBlock>
				<AlignerBlock aria-hidden="true"></AlignerBlock>
			</CardsWrapper>
			<Pagination
				pageNumber={pageNumber}
				pageCount={pageCount}
				setPageNumber={setPageNumber}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 90vw;
	min-height: 100%;
	display: flex;
	flex-direction: column;
`;

const Banner = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	min-height: 100px;
	height: fit-content;
	font-size: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: var(--background-darken);
	padding: 1rem 0;
	border-bottom: 1px solid var(--main-color);
	margin-bottom: 1rem;
`;

const BannerImage = styled.img`
	max-height: 150px;
`;

const CardsWrapper = styled.div`
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

export default Cards;
