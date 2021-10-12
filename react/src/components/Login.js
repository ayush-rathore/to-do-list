import React, { useState } from "react";
import "./css/login.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
// import ListSvg from "./images/list-svg.svg";

const Login = ({ setUserState }) => {
	const [user, setUser] = useState({});
	const history = useHistory();
	const onSubmitClick = async (event) => {
		event.preventDefault();
		console.log({ user });
		await Axios.post("http://localhost:8080/login/", { ...user })
			.then(({ data }) => {
				console.info(`User logged in`);
				localStorage.setItem("user", JSON.stringify(data));
				setUserState(data.user);
				window.alert("Login Successful!");
				setTimeout(() => {
					history.push("/home");
				}, 1000);
			})
			.catch((error) => {
				window.alert("User doesn't exist");
				console.error(error);
			});
	};

	return (
		<div className={"login-div"}>
			{/* <div className={"list-image-div"}>
				<img src={ListSvg} alt={"list-svg"} className={"list-image"} />{" "}
			</div> */}
			<div className={"login-form"}>
				<form>
					<div className={"login-heading"}>
						<span className={"welcome"}>Welcome back</span> <br />
						<span className={"continue"}>
							Enter your credentials to continue
						</span>
					</div>
					<input
						type={"email"}
						placeholder={"Email"}
						onChange={(event) => {
							setUser({
								...user,
								email: event.target.value,
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
					<button onClick={onSubmitClick} className={"login-button"}>
						Login
					</button>
					<br /> <br />
				</form>
			</div>
			<div className={"register"}>
				Don't have an account?&nbsp;
				<span
					className={"sign-up"}
					onClick={() => history.push("/signup")}
				>
					Sign Up
				</span>
			</div>
		</div>
	);
};

export default Login;
