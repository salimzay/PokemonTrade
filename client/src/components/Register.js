import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";

const Register = () => {
	const [formData, setFormData] = useState({ isAdmin: false });
	const [confirmPassword, setConfirmPassword] = useState("");
	const [registerStatus, setRegisterStatus] = useState("idle");
	const [error, setError] = useState("");
	const { setCurrentUser } = useContext(UserContext);

	const redirect = useHistory();
	const capitalize = (word) => {
		return word[0].toUpperCase() + word.slice(1);
	};

	const handleFormData = (ev, input) => {
		setError("");
		switch (input) {
			case "username":
				setFormData({ ...formData, username: ev.target.value });
				break;

			case "firstName":
				setFormData({ ...formData, firstName: capitalize(ev.target.value) });
				break;

			case "lastName":
				setFormData({ ...formData, lastName: capitalize(ev.target.value) });
				break;

			case "email":
				setFormData({ ...formData, email: ev.target.value });
				break;

			case "password":
				setFormData({ ...formData, password: ev.target.value });
				break;

			case "city":
				setFormData({ ...formData, city: capitalize(ev.target.value) });
				break;

			case "province/state":
				setFormData({
					...formData,
					"province/state": capitalize(ev.target.value),
				});
				break;

			case "country":
				setFormData({ ...formData, country: capitalize(ev.target.value) });
				break;

			default:
				break;
		}
	};

	const handleConfirmPassword = (ev) => {
		setConfirmPassword(ev.target.value);
	};

	const handleSubmit = (ev) => {
		setRegisterStatus("loading");
		ev.preventDefault();
		if (
			!formData.username ||
			!formData.firstName ||
			!formData.lastName ||
			!formData.password
		) {
			setError("You are missing a required field");
		} else if (formData.password.length < 6) {
			setError(
				"Your password is to short. Please enter a password of at least 6 characters"
			);
		} else if (formData.password !== confirmPassword) {
			setError("Your passwords do not match");
		} else {
			fetch("/api/users", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((res) => res.json())
				.then((parsed) => {
					if (parsed.status === 201) {
						setCurrentUser(parsed.data);
						redirect.goBack();
					} else {
						setError(parsed.message);
					}
					setRegisterStatus("idle");
				})
				.catch((err) => {
					setError(err.message);
					setRegisterStatus("idle");
				});
		}
	};

	return (
		<Wrapper>
			<div>Please enter your information</div>
			<StyledForm onSubmit={handleSubmit}>
				<InputBlock>
					<StyledLabel htmlFor="username">Username</StyledLabel>
					<StyledInput
						type="text"
						value={formData.username ? formData.username : ""}
						onChange={(ev) => handleFormData(ev, "username")}
						id="username"
						placeholder="Username"
						required
					></StyledInput>
				</InputBlock>
				<Row>
					<InputBlock>
						<StyledLabel htmlFor="first-name">First Name</StyledLabel>
						<StyledInput
							type="text"
							value={formData.firstName ? formData.firstName : ""}
							onChange={(ev) => handleFormData(ev, "firstName")}
							id="first-name"
							placeholder="First Name"
							required
						></StyledInput>
					</InputBlock>
					<InputBlock>
						<StyledLabel htmlFor="last-name">Last Name</StyledLabel>
						<StyledInput
							type="text"
							value={formData.lastName ? formData.lastName : ""}
							onChange={(ev) => handleFormData(ev, "lastName")}
							id="last-name"
							placeholder="Last Name"
							required
						></StyledInput>
					</InputBlock>
				</Row>
				<InputBlock>
					<StyledLabel htmlFor="email">Email</StyledLabel>
					<StyledInput
						type="email"
						value={formData.email ? formData.email : ""}
						onChange={(ev) => handleFormData(ev, "email")}
						id="email"
						placeholder="Email"
						required
					></StyledInput>
				</InputBlock>
				<Row>
					<InputBlock>
						<StyledLabel htmlFor="password">Password</StyledLabel>
						<StyledInput
							type="password"
							value={formData.password ? formData.password : ""}
							onChange={(ev) => handleFormData(ev, "password")}
							id="password"
							placeholder="Password"
							required
						></StyledInput>
					</InputBlock>
					<InputBlock>
						<StyledLabel htmlFor="confirm">Confirm Password</StyledLabel>
						<StyledInput
							type="password"
							value={confirmPassword}
							onChange={handleConfirmPassword}
							id="confirm"
							placeholder="Confirm Password"
							required
						></StyledInput>
					</InputBlock>
				</Row>
				<Row>
					<InputBlock>
						<StyledLabel htmlFor="city">City</StyledLabel>
						<StyledInput
							type="text"
							value={formData.city}
							onChange={(ev) => handleFormData(ev, "city")}
							id="city"
							placeholder="City"
							required
						></StyledInput>
					</InputBlock>
					<InputBlock>
						<StyledLabel htmlFor="province">Province/State</StyledLabel>
						<StyledInput
							type="text"
							value={formData["province/state"]}
							onChange={(ev) => handleFormData(ev, "province/state")}
							id="province"
							placeholder="Province / State"
							required
						></StyledInput>
					</InputBlock>
				</Row>
				<InputBlock>
					<StyledLabel htmlFor="Country">Country</StyledLabel>
					<StyledInput
						type="text"
						value={formData.country}
						onChange={(ev) => handleFormData(ev, "country")}
						id="country"
						placeholder="Country"
						required
					></StyledInput>
				</InputBlock>
				{registerStatus === "idle" ? (
					<StyledButton type="submit">Submit</StyledButton>
				) : (
					<Loading />
				)}
				{error && <ErrorBlock>{error}</ErrorBlock>}
			</StyledForm>
			<SmallDiv>
				Already have an account? <StyledLink to="/login">Login here</StyledLink>
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
	margin-top: 3rem;
`;

const StyledForm = styled.form`
	background-color: var(--background-lighten);
	box-shadow: 0 0 5px var(--background-lighten);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 30vw;
	padding: 1.5rem;
	margin: 1rem;
	padding-top: 1rem;
`;

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
`;

const InputBlock = styled.div`
	margin-bottom: 1rem;
	margin-right: 1rem;
	text-align: center;
`;

const StyledLabel = styled.label`
	display: block;
	text-align: left;
`;

const StyledInput = styled.input`
	padding: 10px;
	width: 12rem;
	border-radius: 3px;
	border: 1px solid black;
`;

const StyledButton = styled.button`
	align-self: center;
	border: 1px solid var(--main-color);
	background-color: transparent;
	color: var(--main-color);
	font-size: inherit;
	padding: 5px 10px;
	width: 12rem;
	cursor: pointer;
	&:hover {
		text-shadow: 0 0 2px white;
	}
`;

const ErrorBlock = styled.div`
	align-self: center;
	padding: 1rem;
	margin-top: 10px;
	background-color: rgba(200, 50, 50, 0.5);
	text-align: center;
	max-width: 25vw;
`;

const SmallDiv = styled.div`
	margin-top: 10px;
	font-size: 12px;
`;

const StyledLink = styled(Link)`
	color: inherit;
`;

export default Register;
