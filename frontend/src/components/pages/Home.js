import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TaskCard from "../components/card";
import AddTask from "../components/addTask";
import "../css/home.css";
import work from "../assets/work.svg";
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
				await Axios.get(
					`http://localhost:8080/todo/getTask/${user._id}`
				)
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
				<div className={"no-task-div"}>
					<div className={"welcome-div"}>
						<div className={"welcome-msg"}>
							Welcome, {user.userName}
						</div>
						<div className={"button-div"}>
							<button
								onClick={() => setScreenType("ADD")}
								className={"add-button"}
							>
								<i className="far fa-address-card"></i> Add
							</button>
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
						</div>
					</div>
					<hr />
					<div className={"sub-div"}>
						Create some tasks and Get Started...
						<div className={"work-image"}>
							<img src={work} alt={"work"} />
						</div>
					</div>
				</div>
			);
		} else if (screenType === "SHOW") {
			return (
				<div className={"show-task-div"}>
					<div className={"welcome-div"}>
						Welcome, {user.userName}
					</div>
					<button
						className={"add-button"}
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
						className={"add-button"}
					>
						<i className="far fa-address-card"></i> Add Tasks
					</button>
					<br /> <br />
					<div>(Here are the tasks that you've created...)</div>
					<br /> <br />
					<div className={"cards"}>
						<div className={"render-cards"}>{renderCards}</div>
					</div>
				</div>
			);
		} else if (screenType === "ADD") {
			return (
				<div className={"add-task-div"}>
					<AddTask
						setTasks={setTasks}
						tasks={tasks}
						user={user}
						setScreenType={setScreenType}
					/>
					<br />
					<button
						onClick={() => setScreenType("SHOW")}
						className={"show-button"}
					>
						<i className="far fa-address-card"></i> Show Tasks
					</button>
				</div>
			);
		}
	};
	return <div className={"main-home-div"}>{renderScreen()}</div>;
};
export default Home;
