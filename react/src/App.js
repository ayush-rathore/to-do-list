import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Landing from "./components/landing";

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
                <Route path={"/home"}>
                    <Home user={user} />
                </Route>
                <Route path={"/"}>
                    <Landing />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
