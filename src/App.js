import React, { useState, useEffect, useGlobal } from "reactn";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import Routing from "./core/routes";

import {
	getToken,
	getUser,
	removeUserSession,
	setUserSession
} from "./utils/common";

function App() {
	const [authLoading, setAuthLoading] = useState(true);
	const [globalUser, setGlobalUser] = useGlobal("user");
	console.log("App -> user", globalUser);

	useEffect(() => {
		setGlobalUser(getUser());
		const token = getToken();
		if (!token) {
			return;
		}

		axios
			.get(`http://localhost:4000/v1/verifyToken?token=${token}`)
			.then(response => {
				setUserSession(response.data.token, response.data.user);
				setAuthLoading(false);
			})
			.catch(error => {
				removeUserSession();
				setAuthLoading(false);
			});
	}, []);

	const handleLogout = () => {
		// removeUserSession();
		setGlobalUser(null);
		// console.log('user after', user)
		// props.history.push('/login');
		// return <Link to="/login" />
	};

	console.log("user", globalUser);
	return (
		<div className="App">
			<BrowserRouter>
				<div className="header">
					<NavLink exact activeClassName="active" to="/">
						Home
					</NavLink>
					{globalUser ? (
						<NavLink
							activeClassName="active"
							to="/logout"
							onClick={handleLogout}
						>
							Log Out
						</NavLink>
					) : (
						<NavLink activeClassName="active" to="/login">
							Log In
						</NavLink>
					)}
					{/* <NavLink activeClassName="active" to="/login">Sign Up</NavLink> */}
					<NavLink activeClassName="active" to="/dashboard">
						Dashboard
					</NavLink>
				</div>
				<div className="content">
					<Routing />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
