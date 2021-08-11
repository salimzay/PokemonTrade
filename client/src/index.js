import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ChatContextProvider } from "./contexts/ChatContext";
import UserContextProvider from "./contexts/UserContext";

ReactDOM.render(
	<UserContextProvider>
		<ChatContextProvider>
			<App />
		</ChatContextProvider>
	</UserContextProvider>,
	document.getElementById("root")
);
