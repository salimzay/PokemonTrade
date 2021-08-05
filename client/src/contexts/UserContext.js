import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem("currentUser"));
		if (localUser) {
			setCurrentUser(localUser);
		}
	}, []);

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
					data.status === 200 && console.log("WOrkd");
				});
		}
	}, [currentUser]);
	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
