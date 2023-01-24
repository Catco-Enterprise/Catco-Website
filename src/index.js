import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components";
import { BrowserRouter } from "react-router-dom";

// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";
import { CatcoProvider } from "./CatcoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<CatcoProvider>
				<App />
			</CatcoProvider>
		</BrowserRouter>
	</React.StrictMode>
);