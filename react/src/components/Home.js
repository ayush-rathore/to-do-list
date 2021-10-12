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
				<div className={"homepage"}>
					<div className={"welcome-msg"}>
						Welcome, {user.name}
						<button
							className={"log-out"}
							onClick={() => {
								localStorage.clear();
								window.alert("User Logged out");
								history.push("/login");
							}}
						>
							<i className="far fa-user"></i> Log Out
						</button>
						<button
							onClick={() => setScreenType("ADD")}
							className={"add-task"}
						>
							<i className="far fa-address-card"></i> Add Tasks
						</button>
					</div>
					<div className={"work-image-div"}>
						<div className={"no-tasks"}>
							Seems like you don't have any tasks. Add some tasks
							and get started...
						</div>
						<div className={"work-image"}>
							<img src={work} alt={"work"} />
						</div>
					</div>
				</div>
			);
		} else if (screenType === "SHOW") {
			return (
				<div className={"show-tasks"}>
					<div className={"welcome-msg"}>Welcome, {user.name}</div>
					<button
						className={"log-out"}
						onClick={() => {
							localStorage.clear();
							window.alert("User Logged out");
							history.push("/login");
						}}
					>
						<i className="far fa-user"></i> Log Out
					</button>
					<button
						onClick={() => setScreenType("ADD")}
						className={"add-task"}
					>
						<i className="far fa-address-card"></i> Add Tasks
					</button>
					<br /> <br />
					<div className={"tasks-info"}>
						(Here are the tasks that you've created...)
					</div>
					<br /> <br />
					<div className={"cards"}>
						<div className={"render-cards"}>{renderCards}</div>
					</div>
				</div>
			);
		} else if (screenType === "ADD") {
			return (
				<div className={"add-tasks-div"}>
					<AddTask
						setTasks={setTasks}
						tasks={tasks}
						user={user}
						setScreenType={setScreenType}
					/>
					<br />
					<button
						onClick={() => setScreenType("SHOW")}
						className={"show"}
					>
						<i className="far fa-address-card"></i> Show Tasks
					</button>
				</div>
			);
		}
	};
	return <div className={"home-div"}>{renderScreen()}</div>;
};
export default Home;
