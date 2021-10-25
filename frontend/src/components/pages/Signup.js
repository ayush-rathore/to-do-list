import React, { useState } from "react";
import Axios from "axios";
import "../css/signup.css";
import { useHistory } from "react-router-dom";

const Signup = ({ setUserState }) => {
	const [user, setUser] = useState({});
	const history = useHistory();
	const onSubmitClick = async (event) => {
		event.preventDefault();
		await Axios.post("http://localhost:8080/user/signup", { ...user })
			.then(({ data }) => {
				console.log(data);
				localStorage.setItem("user", JSON.stringify(data));
				console.info(`User created`);
				setUserState(data.user);
				window.alert("Sign up successful");
				setTimeout(() => {
					history.push("/login");
				}, 1000);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className={"signup-div"}>
			<div className={"signup-form"}>
				<form>
					<div className={"signup-heading"}>
						<span className={"signup-head"}>Sign Up</span> <br />
						<span className={"get-started"}>
							Let's get started...
						</span>
					</div>
					<input
						type={"name"}
						placeholder={"Username"}
						onChange={(event) => {
							setUser({
								...user,
								userName: event.target.value,
							});
						}}
					/>
					<br /> <br />
					<input
						type={"password"}
						placeholder={"Password"}
						onChange={(event) => {
							setUser({
								...user,
								password: event.target.value,
							});
						}}
					/>
					<br /> <br /> <br />
					<button onClick={onSubmitClick} className={"signup-button"}>
						Signup
					</button>
					<br />
				</form>
			</div>
			<div className={"register"}>
				Already have an account?&nbsp;
				<span
					className={"sign-up"}
					onClick={() => history.push("/login")}
				>
					Login
				</span>
			</div>
		</div>
	);
};

export default Signup;
