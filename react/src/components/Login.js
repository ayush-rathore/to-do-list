import React, { useState } from "react";
import "./css/login.css";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
    const { setUserState } = props;
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
        <div className={"main"}>
            <p>
                Tired of remembering things? <br />
                Make a To-Do List and organise your tasks... <br />
            </p>
            <div className={"form"}>
                <form>
                    <h1>Login</h1>
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
                    <button onClick={onSubmitClick} id="login">
                        Login
                    </button>
                    <br /> <br />
                    <p id={"register"}>
                        Don't have an account?&nbsp;
                        <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
