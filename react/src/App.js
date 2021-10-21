import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import "./app.css";
// import Home from "./components/pages/Home";

const App = () => {
	const [user, setUserState] = useState({});
	useEffect(() => {
		let savedUser = localStorage.getItem("user");
		console.log(savedUser);
		if (savedUser && Object.keys(user).length === 0) {
			setUserState(JSON.parse(savedUser).user);
			console.log(user);
		}
	}, [user]);

	return (
		<Router>
			<Switch>
				<Route path={"/login"} exact>
					<Login setUserState={setUserState} />
				</Route>
				<Route path={"/signup"} exact>
					<Signup setUserState={setUserState} />
				</Route>
				{/* <Route path={"/home"}>
					<Home user={user} />
				</Route> */}
				<Route path={"/"}>
					<Login />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
