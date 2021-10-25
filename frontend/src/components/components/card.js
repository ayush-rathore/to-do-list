import React from "react";
import "../css/card.css";
import Axios from "axios";

const TaskCard = (props) => {
	const { task, foundTask, setScreenType } = props;
	let dateFormatter = new Intl.DateTimeFormat("en-IN");
	const onButtonClick = async (event) => {
		event.preventDefault();
		console.log(foundTask);
		await Axios.delete(
			`http://localhost:8080/todo/task/${foundTask.current[0]._id}`
		)
			.then(() => {
				console.info("Task deleted Successfully");
				window.alert("Task Deleted");
				setScreenType("SHOW");
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<div className={"card"}>
			<p id={"name"}>{task.taskName}</p>
			<p id={"date"}>
				{dateFormatter.format(new Date(task.dateCreated))}
			</p>
			<p id={"des"}>{task.taskDescription}</p>
			<button onClick={onButtonClick}>
				<i className="far fa-trash-alt"></i> Delete Task
			</button>
		</div>
	);
};
export default TaskCard;
