import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

// TODO: STYLING

const Register = () => {
	const [formData, setFormData] = useState({ isAdmin: false, list: [] });
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const { setCurrentUser } = useContext(UserContext);

	const handleFormData = (ev, input) => {
		console.log(input, formData[input]);
		switch (input) {
			case "username":
				setFormData({ ...formData, username: ev.target.value });
				break;

			case "firstName":
				setFormData({ ...formData, firstName: ev.target.value });
				break;

			case "lastName":
				setFormData({ ...formData, lastName: ev.target.value });
				break;

			case "email":
				setFormData({ ...formData, email: ev.target.value });
				break;

			case "password":
				setFormData({ ...formData, password: ev.target.value });
				break;

			case "city":
				setFormData({ ...formData, city: ev.target.value });
				break;

			case "province/state":
				setFormData({ ...formData, "province/state": ev.target.value });
				break;

			case "country":
				setFormData({ ...formData, country: ev.target.value });
				break;

			default:
				break;
		}
	};

	const handleConfirmPassword = (ev) => {
		setConfirmPassword(ev.target.value);
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (
			!formData.username ||
			!formData.firstName ||
			!formData.lastName ||
			!formData.password
		) {
			setError("You are missing a required field");
		} else if (formData.password !== confirmPassword) {
			setError("Your passwords do not match");
		} else {
			console.log(formData);
			fetch("/api/users", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((res) => res.json())
				.then((parsed) => {
					setCurrentUser(parsed.data);
					localStorage.setItem("currentUser", JSON.stringify(parsed.data));
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={formData.username ? formData.username : ""}
					onChange={(ev) => handleFormData(ev, "username")}
					placeholder="Username*"
				></input>
				<input
					type="text"
					value={formData.firstName ? formData.firstName : ""}
					onChange={(ev) => handleFormData(ev, "firstName")}
					placeholder="First Name*"
				></input>
				<input
					type="text"
					value={formData.lastName ? formData.lastName : ""}
					onChange={(ev) => handleFormData(ev, "lastName")}
					placeholder="Last Name*"
				></input>
				<input
					type="email"
					value={formData.email ? formData.email : ""}
					onChange={(ev) => handleFormData(ev, "email")}
					placeholder="Email*"
				></input>
				<input
					type="password"
					value={formData.password ? formData.password : ""}
					onChange={(ev) => handleFormData(ev, "password")}
					placeholder="Password*"
				></input>
				<input
					type="password"
					value={confirmPassword}
					onChange={handleConfirmPassword}
					placeholder="ConfirmPassword*"
				></input>
				<input
					type="text"
					value={formData.city ? formData.city : ""}
					onChange={(ev) => handleFormData(ev, "city")}
					placeholder="City"
				></input>
				<input
					type="text"
					value={formData["province/state"] ? formData["province/state"] : ""}
					onChange={(ev) => handleFormData(ev, "province/state")}
					placeholder="Province / State"
				></input>
				<input
					type="text"
					value={formData.country ? formData.country : ""}
					onChange={(ev) => handleFormData(ev, "country")}
					placeholder="Country"
				></input>
				<button type="submit">Submit</button>
				{error && <div>{error}</div>}
			</form>
		</div>
	);
};

export default Register;
