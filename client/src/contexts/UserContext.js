import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem("currentUser"));
		if (localUser) {
			setCurrentUser(localUser);
			console.log(localUser);
		}
	}, []);
	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
