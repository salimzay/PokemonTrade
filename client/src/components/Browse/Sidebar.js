import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";

// Categories
// Sets
// Types
// SubTypes
// SuperTypes
// Rarities

// Page
// Size 50

const Sidebar = () => {
	return (
		<Wrapper>
			<Header>Categories</Header>
			<StyledNavLink to="/browse/sets">Sets</StyledNavLink>
			<SidebarList name="Types" />
			<SidebarList name="Subtypes" />
			<SidebarList name="Supertypes" />
			<SidebarList name="Rarities" />
		</Wrapper>
	);
};

export const SidebarList = ({ name }) => {
	const [showCategory, setShowCategory] = useState(false);
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const [nameQuery, setNameQuery] = useState("");
	const apiQuery = name.toLowerCase();

	useEffect(() => {
		setStatus("loading");
		fetch(`https://api.pokemontcg.io/v2/${apiQuery}`, {
			headers: {
				"content-type": "application/json",
				"X-Api-Key": process.env.REACT_APP_POKETCG_API_KEY,
			},
		})
			.then((res) => res.json())
			.then((parsed) => {
				setData(parsed.data);
				setStatus("idle");
			});
	}, []);

	useEffect(() => {
		switch (name) {
			case "Types":
				setNameQuery("types");
				break;
			case "Subtypes":
				setNameQuery("subtypes");
				break;
			case "Supertypes":
				setNameQuery("supertype");
				break;
			case "Rarities":
				setNameQuery("rarity");
				break;
			default:
				setNameQuery(name);
				break;
		}
	}, [nameQuery]);

	return (
		<div>
			<div>
				<DropButton onClick={() => setShowCategory(!showCategory)}>
					{name}
					<DropIcon className={showCategory && "show"} />
				</DropButton>
			</div>
			{status === "loading" ? (
				<div>Loading</div>
			) : (
				<StyledDropMenu className={showCategory && "show"}>
					{data &&
						data.map((item) => {
							return (
								<li key={item}>
									<StyledNavLink
										className="child"
										to={`/browse/category/${nameQuery}/${item}`}
									>
										{item}
									</StyledNavLink>
								</li>
							);
						})}
				</StyledDropMenu>
			)}
		</div>
	);
};

const Wrapper = styled.div`
	font-size: 18px;
	font-family: var(--second-font);
	padding: 1rem;
	width: 10vw;
	border-right: 1px solid var(--main-color);
`;

const Header = styled.div`
	font-size: 20px;
	font-family: var(--main-font);
`;

const StyledNavLink = styled(NavLink)`
	color: inherit;

	&.child {
		margin-top: 2px;
		font-size: 12px;
		opacity: 0.8;
	}

	&:hover {
		text-shadow: 0 0 1px white;
	}
`;

const DropButton = styled.button`
	background-color: transparent;
	padding: 0px;
	border: none;
	color: inherit;
	font-size: inherit;
	display: flex;
	align-items: center;
	margin-top: 5px;
	cursor: pointer;

	&:hover {
		text-shadow: 0 0 1px white;
	}
`;

const DropIcon = styled(FiChevronLeft)`
	transition: all 500ms;
	&.show {
		transform: rotate(-90deg);
	}
`;

const StyledDropMenu = styled.ul`
	@keyframes Slide {
		from {
			transform: translateX(-100px);
		}
		to {
			transform: translateX(0);
		}
	}

	max-height: 0;
	transition: all 1s;
	position: relative;
	z-index: 0;
	overflow: hidden;

	& > li {
		transition: all 500ms, opacity 500ms;
		opacity: 0;
		visibility: none;
		max-height: 0;
	}

	&.show {
		max-height: 600px;

		& > li {
			animation: Slide 400ms;
			transform-origin: top center;
			opacity: 1;
			visibility: visible;
			max-height: 100px;
		}
	}
`;

export default Sidebar;
