import React from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ pageNumber, pageCount, setPageNumber }) => {
	// The displayed range
	const pageRange = (current, count) => {
		const pageRange = [];
		let firstPage = 0;
		let lastPage = 0;
		if (current <= 5 && current + 5 > count) {
			firstPage = 1;
			lastPage = count;
		} else if (current <= 5) {
			firstPage = 1;
			lastPage = 9;
		} else if (current + 4 > count) {
			firstPage = count - 8;
			lastPage = count;
		} else {
			firstPage = current - 4;
			lastPage = current + 4;
		}
		for (let i = firstPage; i <= lastPage; i++) {
			pageRange.push(i);
		}
		return pageRange;
	};

	const paginationRange = pageRange(pageNumber, pageCount);

	const nextPage = (ev) => {
		setPageNumber(pageNumber + 1);
	};

	const prevPage = (ev) => {
		setPageNumber(pageNumber - 1);
	};
	return (
		<StyledPagination>
			{pageNumber !== 1 && (
				<PageButton onClick={prevPage}>
					<StyledArrowLeft />
				</PageButton>
			)}
			{paginationRange.map((page) => {
				return (
					<PageButton
						onClick={() => setPageNumber(page)}
						key={page}
						className={pageNumber === page ? "active" : ""}
					>
						{page}
					</PageButton>
				);
			})}
			{pageNumber !== pageCount && (
				<PageButton onClick={nextPage}>
					<StyledArrowRight />
				</PageButton>
			)}
		</StyledPagination>
	);
};

const StyledPagination = styled.div`
	align-self: center;
	display: flex;
	align-items: center;
	margin-top: auto;
`;

const PageButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2rem;
	height: 2rem;
	padding: 10px;
	font-size: 18px;
	background-color: transparent;
	color: inherit;
	border: 1px solid transparent;
	border-right: 1px solid var(--background-darken);

	&:hover {
		&:not(.active) {
			cursor: pointer;
			border-bottom: 1px solid white;
		}
	}

	&.active {
		text-shadow: 0 0 2px white;
	}
`;

const StyledArrowLeft = styled(FiChevronLeft)`
	transform: scale(2);
`;
const StyledArrowRight = styled(FiChevronRight)`
	transform: scale(2);
`;

export default Pagination;
