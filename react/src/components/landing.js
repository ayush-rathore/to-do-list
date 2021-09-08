import React from "react";
import todo from "../components/todo.jpg";
import logo from "../components/clipboard.png";
import "./css/landing.css";

const Landing = () => {
    return (
        <div className="header">
            <img src={logo} alt={"logo"} />
            <p> To Do List</p>
        </div>
    );
};

export default Landing;
