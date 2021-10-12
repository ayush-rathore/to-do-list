import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TaskCard from "./card";
import AddTask from "./addTask";
import "./css/home.css";
import work from "./work.svg";
import { useHistory } from "react-router-dom";

const Home = ({ user }) => {
	const [tasks, setTasks] = useState([]);
	const [screenType, setScreenType] = useState();
	const foundTask = useRef();
	const history = useHistory();
	useEffect(() => {
		if (Object.keys(user).length > 0) {
			console.log(user);
			const fetchTasks = async () => {
				await Axios.get(`http://localhost:8080/todo/user/${user._id}`)
					.then(({ data: foundTasks }) => {
						console.info(foundTasks);
						foundTask.current = foundTasks;
						if (foundTasks !== 0) {
							setScreenType("SHOW");
						}
						setTasks(foundTasks);
					})
					.catch((error) => {
						console.error(error);
					});
			};
			fetchTasks();
		}
	}, [user]);
	console.log(tasks.length);

	const renderCards = tasks.map((task, index) => {
		return (
			<TaskCard
				task={task}
				key={index}
				foundTask={foundTask}
				setScreenType={setScreenType}
			/>
		);
	});

	const renderScreen = () => {
		if (screenType === undefined) {
			return (
				<div className={"none"}>
					<p id={"welcome"}>Welcome, {user.name}</p>
					<button
						id={"add"}
						onClick={() => {
							localStorage.clear();
							window.alert("User Logged out");
							history.push("/login");
						}}
					>
						<i className="far fa-user"></i> Log Out
					</button>
					<button onClick={() => setScreenType("ADD")} id={"add"}>
						{" "}
						<i className="far fa-address-card"></i> Add Tasks
					</button>
					<br />
					<div className={"work"}>
						<p>
							<br />
							Seems like you don't have any tasks. Add some tasks
							and get started...
						</p>
						<img src={work} alt={"work"} id={"work"} />
					</div>
				</div>
			);
		} else if (screenType === "SHOW") {
			return (
				<div className={"show"}>
					<p id={"welcome"}>Welcome, {user.name}</p>
					<button
						id={"add"}
						onClick={() => {
							localStorage.clear();
							window.alert("User Logged out");
							history.push("/login");
						}}
					>
						<i className="far fa-user"></i> Log Out
					</button>
					<button onClick={() => setScreenType("ADD")} id={"add"}>
						<i className="far fa-address-card"></i> Add Tasks
					</button>
					<br /> <br />
					<p id={"p"}>(Here are the tasks that you've created...)</p>
					<br /> <br />
					<div className={"cards"}>
						<div className={"render"}>{renderCards}</div>
					</div>
				</div>
			);
		} else if (screenType === "ADD") {
			return (
				<div className={"add"}>
					<AddTask
						setTasks={setTasks}
						tasks={tasks}
						user={user}
						setScreenType={setScreenType}
					/>
					<br />
					<button onClick={() => setScreenType("SHOW")} id={"show"}>
						<i className="far fa-address-card"></i> Show Tasks
					</button>
				</div>
			);
		}
	};
	return <div className={"home"}>{renderScreen()}</div>;
};
export default Home;
