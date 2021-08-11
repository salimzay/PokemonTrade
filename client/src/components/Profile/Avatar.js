import React from "react";
import styled from "styled-components";

// To be implemented with image
const Avatar = ({ user }) => {
	return <ProfileAvatar>{user.firstName[0]}</ProfileAvatar>;
};

const ProfileAvatar = styled.div`
	font-size: 30px;
	background-color: var(--background-darken);
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	border: 1px solid var(--main-color);
	border-radius: 50%;
	margin-bottom: 1rem;
`;

export default Avatar;
