import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components";
import { StateProvider } from "./StateContext";
import { BrowserRouter } from "react-router-dom";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
		<StateProvider>
			<App />
		</StateProvider>
		</BrowserRouter>
	</React.StrictMode>
);
