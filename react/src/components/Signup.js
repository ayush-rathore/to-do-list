import React, { useState } from "react";
import Axios from "axios";
import "./css/signup.css";
import { Link, useHistory } from "react-router-dom";

const Signup = (props) => {
    const { setUserState } = props;
    const [user, setUser] = useState({});
    const history = useHistory();
    const onSubmitClick = async (event) => {
        event.preventDefault();
        await Axios.post("http://localhost:8080/signup", { ...user })
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
        <div className={"main"}>
            <p>
                Sign Up and <br />
                Let's Create a To-Do List <br />
                Together...
            </p>
            <div className={"form"}>
                <form>
                    <h1>Sign Up</h1>
                    <input
                        type={"text"}
                        placeholder={"Name"}
                        onChange={(event) => {
                            setUser({
                                ...user,
                                name: event.target.value,
                            });
                        }}
                    />
                    <br /> <br />
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
                    <button onClick={onSubmitClick} id="signup">
                        Signup
                    </button>
                    <br />
                    <p id={"registered"}>
                        Already Registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
