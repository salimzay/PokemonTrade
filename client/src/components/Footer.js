import React from "react";
import styled from "styled-components";
import {
	FiLinkedin,
	FiGithub,
	FiFacebook,
	FiTwitter,
	FiInstagram,
} from "react-icons/fi";

const Footer = () => {
	return (
		<Wrapper>
			<TopNav>
				<TopNavItem>Contact Us</TopNavItem>
				<TopNavItem>/</TopNavItem>
				<TopNavItem>About this app</TopNavItem>
				<TopNavItem>/</TopNavItem>
				<TopNavItem>Profile</TopNavItem>
			</TopNav>
			<MiddleNav>
				<MiddleNavItem>
					<FiFacebook />
				</MiddleNavItem>
				<MiddleNavItem>
					<FiInstagram />
				</MiddleNavItem>
				<MiddleNavItem>
					<FiTwitter />
				</MiddleNavItem>
				<MiddleNavItem>
					<FiLinkedin />
				</MiddleNavItem>
				<MiddleNavItem>
					<FiGithub />
				</MiddleNavItem>
			</MiddleNav>
			<div>© Salim Zaywari. All rights reserved</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	line-height: 2;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	padding: 10px 0;
	background-color: var(--background-darken);
	height: 70px;
`;

const TopNav = styled.div`
	display: flex;
`;

const TopNavItem = styled.div`
	margin-right: 1rem;
`;

const MiddleNav = styled.div`
	display: flex;
	font-size: 14px;
`;

const MiddleNavItem = styled.div`
	margin-right: 1rem;
`;

export default Footer;
