import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";

// TODO: MORE VALIDATION

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("idle");
	const [error, setError] = useState("");
	const { setCurrentUser } = useContext(UserContext);

	const redirect = useHistory();

	const handleUsername = (ev) => {
		setError("");
		setUsername(ev.target.value);
	};

	const handlePassword = (ev) => {
		setError("");
		setPassword(ev.target.value);
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		setLoginStatus("loading");
		const request = JSON.stringify({ username, password });
		fetch(`/api/users/login/`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: request,
		})
			.then((res) => res.json())
			.then((parsed) => {
				if (parsed.status === 200) {
					setCurrentUser(parsed.data);
					redirect.goBack();
				} else {
					setError(parsed.message);
				}
				setLoginStatus("idle");
			})
			.catch((err) => {
				setError(err.message);
				setLoginStatus("idle");
			});
	};
	return (
		<Wrapper>
			<div>Please enter your credentials</div>
			<StyledForm onSubmit={handleSubmit}>
				<InputBlock>
					<StyledLabel htmlFor="username">Username</StyledLabel>
					<StyledInput
						type="text"
						id="username"
						value={username}
						onChange={handleUsername}
						placeholder="username"
						required
					></StyledInput>
				</InputBlock>
				<InputBlock>
					<StyledLabel htmlFor="password">Password</StyledLabel>
					<StyledInput
						type="password"
						id="password"
						value={password}
						onChange={handlePassword}
						placeholder="password"
						required
					></StyledInput>
				</InputBlock>

				{loginStatus === "idle" ? (
					<StyledButton type="submit">Submit</StyledButton>
				) : (
					<Loading />
				)}

				{error && <ErrorBlock>{error}</ErrorBlock>}
			</StyledForm>
			<SmallDiv>
				Don't have an account?{" "}
				<StyledLink to="/register">Register here</StyledLink>
			</SmallDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin-top: 5rem;
`;

const StyledForm = styled.form`
	background-color: var(--background-lighten);
	box-shadow: 0 0 5px var(--background-lighten);
	border-radius: 10px;
	min-width: 15vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.5rem;
	margin-top: 1rem;
	padding-top: 1rem;
`;

const InputBlock = styled.div`
	margin-bottom: 2rem;
	width: 100%;
	text-align: center;
`;

const StyledLabel = styled.label`
	display: block;
	text-align: left;
	text-align: center;
`;

const StyledInput = styled.input`
	padding: 10px;
	width: 12rem;
	border-radius: 3px;
	border: 1px solid black;
`;

const StyledButton = styled.button`
	border: 1px solid var(--main-color);
	background-color: transparent;
	color: var(--main-color);
	font-size: inherit;
	padding: 5px 10px;
	height: 2rem;
	width: 12rem;
	cursor: pointer;
	&:hover {
		text-shadow: 0 0 2px white;
	}
`;

const ErrorBlock = styled.div`
	padding: 1rem;
	margin-top: 10px;
	background-color: rgba(200, 50, 50, 0.5);
	width: 15vw;
`;

const SmallDiv = styled.div`
	margin-top: 10px;
	font-size: 12px;
`;

const StyledLink = styled(Link)`
	color: inherit;
`;

export default Login;
