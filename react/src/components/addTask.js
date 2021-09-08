import React, { useState } from "react";
import Axios from "axios";
import "./css/task.css";

const AddTask = (props) => {
    const [task, setTask] = useState({});
    const { tasks, setTasks, user, setScreenType } = props;

    const onAddTask = async (event) => {
        event.preventDefault();
        await Axios.post("http://localhost:8080/todo/", {
            ...task,
            userId: user._id,
        })
            .then(({ data: addedTask }) => {
                window.alert("Task Added!");
                setTasks([...tasks, addedTask]);
                setTimeout(() => {
                    setScreenType("SHOW");
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className={"task"}>
            <h2>Let's create some tasks for you...</h2>
            <hr />
            <form>
                <label>Task Name</label> <br /> <br />
                <input
                    type={"text"}
                    placeholder={"Enter Task Name"}
                    onChange={(event) => {
                        setTask({ ...task, taskName: event.target.value });
                    }}
                />{" "}
                <br /> <br />
                <label>Task Description</label> <br /> <br />
                <input
                    type={"text"}
                    placeholder={"Enter Task Description"}
                    onChange={(event) => {
                        setTask({
                            ...task,
                            taskDescription: event.target.value,
                        });
                    }}
                />{" "}
                <br /> <br />
            </form>
            <button onClick={onAddTask}>
                {" "}
                <i class="far fa-address-card"></i> Add Task
            </button>
        </div>
    );
};
export default AddTask;
