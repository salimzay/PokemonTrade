import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

// TODO: STYLING, MORE VALIDATION

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { setCurrentUser } = useContext(UserContext);

	const handleUsername = (ev) => {
		setUsername(ev.target.value);
	};

	const handlePassword = (ev) => {
		setPassword(ev.target.value);
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const request = JSON.stringify({ username, password });
		console.log(request);
		fetch(`/api/users/login/`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: request,
		})
			.then((res) => res.json())
			.then((parsed) => {
				console.log(parsed);
				if (parsed.status === 200) {
					localStorage.setItem("currentUser", JSON.stringify(parsed.data));
					setCurrentUser(parsed.data);
				} else {
					setError(parsed.message);
				}
			})
			.catch((err) => {
				setError(err.message);
			});
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={username}
					onChange={handleUsername}
					required
				></input>
				<input
					type="password"
					value={password}
					onChange={handlePassword}
					required
				></input>
				<button type="submit">Submit</button>
				{error && <div>{error}</div>}
			</form>
		</div>
	);
};

export default Login;
