import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
	// Initializes currentUser to local storage's user in case it is already set from earlier
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("currentUser"))
	);

	// Updates the currentUser's info by fetching it from the dabatase
	const fetchFromDatabase = async () => {
		if (currentUser) {
			const request = JSON.stringify({
				username: currentUser.username,
				password: currentUser.password,
			});
			const res = await fetch(`/api/users/login/`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: request,
			});
			const parsed = await res.json();
			const data = await parsed.data;
			setCurrentUser(data);
		}
	};

	// On render, it updates the current user's info according to the database's info in case of change
	useEffect(() => {
		fetchFromDatabase();
	}, []);

	// Everytime any info on currentUser is changed,
	// it updates the localStorage accordingly,
	// as well as the database
	useEffect(() => {
		if (currentUser) {
			localStorage.setItem("currentUser", JSON.stringify(currentUser));
			const request = JSON.stringify(currentUser);
			fetch(`/api/users/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: request,
			})
				.then((res) => res.json())
				.then((data) => {
					data.status === 200 && console.log("Worked");
				});
		}
	}, [JSON.stringify(currentUser)]);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
