import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Searchbar = ({ length }) => {
	const [searchValue, setSearchValue] = useState("");
	const [searchToggle, setSearchToggle] = useState(false);
	const [suggestions, setSuggestions] = useState(null);
	const redirect = useHistory();
	console.log(redirect.location.state);

	useEffect(() => {
		searchValue &&
			fetch(
				`https://api.pokemontcg.io/v2/cards?q=name:${
					searchValue + "*"
				}&page=1&pageSize=${length}`
			)
				.then((res) => res.json())
				.then((parsed) => {
					console.log(parsed);
					setSuggestions(parsed.data);
				});
	}, [searchValue, length]);

	useEffect(() => {
		setSearchValue("");
	}, [searchToggle]);

	const handleInput = (ev) => {
		setSearchValue(ev.target.value);
	};

	const handleSearch = (ev) => {
		setSearchToggle(!searchToggle);
		redirect.push(`/browse/category/name/${searchValue}`);
	};

	const handleToCard = () => {
		setSearchToggle(!searchToggle);
	};

	return (
		<Wrapper>
			<SearchBlock>
				<StyledInput
					type="text"
					value={searchValue}
					onChange={handleInput}
					placeholder="Search for a card name"
				></StyledInput>
				<StyledButton onClick={handleSearch}>Search</StyledButton>
			</SearchBlock>
			<StyledSuggestions>
				<ul>
					{suggestions &&
						searchValue &&
						(suggestions.length === 0 ? (
							<li>No card by that name found</li>
						) : (
							suggestions.map((suggestion) => {
								return (
									<StyledListItem>
										<StyledLink
											to={`/browse/card/${suggestion.id}`}
											onClick={() => handleToCard()}
										>
											{suggestion.set.name} - {suggestion.name}
										</StyledLink>
									</StyledListItem>
								);
							})
						))}
				</ul>
			</StyledSuggestions>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	width: fit-content;
`;

const SearchBlock = styled.div`
	width: 100%;
`;

const StyledInput = styled.input`
	padding: 0.5rem;
	width: 15rem;
	border: 1px solid black;
	border-radius: 5px;
	margin-right: 10px;
	font-size: inherit;
`;

const StyledButton = styled.button`
	padding: 0.5rem;
	background-color: transparent;
	color: var(--main-color);
	border: 1px solid var(--main-color);
	border-radius: 5px;
	cursor: pointer;
	transition: all 200ms;
	&:hover {
		background-color: var(--main-color);
		color: var(--background-color);
	}
`;

const StyledSuggestions = styled.div`
	z-index: 99;
	position: absolute;
	width: 16rem;
	background-color: var(--main-color);
	color: var(--background-color);
	font-size: 12px;
	border: 1px solid black;
	transition: all 1s;
`;

const StyledListItem = styled.li`
	padding: 3px;
	&:hover {
		background-color: var(--background-darken);
	}
`;

const StyledLink = styled(Link)`
	width: 100%;
	height: 100%;
	display: block;
	text-decoration: none;
	color: black;
`;

export default Searchbar;
