import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
	// Initializes currentUser to local storage's user in case it is already set from earlier
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("currentUser"))
	);

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
