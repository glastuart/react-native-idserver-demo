import React from "react";
import { Routes, Route } from "react-router";
import { WebsiteLayout } from "./components";
import { ErrorPage, HomePage, LoginPage, LogoutPage } from "./pages";

const App = () : React.ReactNode => (
	<Routes>
		<Route index element={<HomePage />} />
		<Route element={<WebsiteLayout />}>
			<Route path="/signin-oidc" element={<LoginPage />} />
			<Route path="/signout-oidc" element={<LogoutPage />} />
			<Route path="/error" element={<ErrorPage />} />
			<Route path="*" element={<ErrorPage message="That page could not be found." />} />
		</Route>
	</Routes>
);

export default App;