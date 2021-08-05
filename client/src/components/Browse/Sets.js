import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import Pagination from "./Pagination";

const Sets = ({ path }) => {
	const [sets, setSets] = useState([]);
	const [setsStatus, setSetsStatus] = useState("idle");
	const [pageSize, setPageSize] = useState(30);
	const [pageNumber, setPageNumber] = useState("1");
	const [pageCount, setPageCount] = useState("1");

	useEffect(() => {
		setSetsStatus("loading");
		fetch(
			`https://api.pokemontcg.io/v2/sets?page=${pageNumber}&pageSize=${pageSize}`,
			{
				headers: {
					"content-type": "application/json",
					"X-Api-Key": process.env.REACT_APP_POKETCG_API_KEY,
				},
			}
		)
			.then((res) => res.json())
			.then((parsed) => {
				const calculatePageCount = Math.ceil(parsed.totalCount / pageSize);
				setPageCount(calculatePageCount);
				setSets(parsed.data);
				setSetsStatus("idle");
			});
	}, [pageNumber]);

	return (
		<Wrapper>
			<Banner>Sets</Banner>
			<SetsWrapper>
				{setsStatus === "loading" ? (
					<Loading />
				) : (
					sets &&
					sets.map((set) => {
						return <SetBlock key={set.id} set={set} path={path} />;
					})
				)}
			</SetsWrapper>
			<Pagination
				pageNumber={pageNumber}
				pageCount={pageCount}
				setPageNumber={setPageNumber}
			/>
		</Wrapper>
	);
};

const SetBlock = ({ set, path }) => {
	return (
		<SetBlockWrapper to={`${path}/category/set.id/${set.id}`}>
			<SetImage src={set.images.logo} alt="logo"></SetImage>
			<SetName>{set.name}</SetName>
		</SetBlockWrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100%;
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
	margin-bottom: 1rem;
	border-bottom: 1px solid var(--main-color);
`;

const SetsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
`;

const SetBlockWrapper = styled(NavLink)`
	height: 225px;
	width: 250px;
	padding: 2rem;
	margin: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	text-decoration: none;
	color: var(--main-color);
	background-color: var(--background-lighten);
	border: 1px solid transparent;
	border-radius: 100%;

	&:hover {
		text-shadow: 0 0 2px white;
		text-decoration: underline;
		box-shadow: 0 0 1px white, 0 0 2px white, 0 0 3px white;
	}
`;

const SetImage = styled.img`
	max-height: 200px;
	max-width: 200px;
	margin: auto;
`;

const SetName = styled.div`
	margin-top: 10px;
`;

export default Sets;
