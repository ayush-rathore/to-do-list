const mongoose = require("mongoose");
const Task = require("../models/todo");

exports.addTask = (req, res) => {
	let { taskName, taskDescription, userName } = req.body;
	let task = new Task({ taskName, taskDescription, userName });
	task.save()
		.then(() => {
			console.info(`New Task was created for User: ${userName}`);
			return res.status(200).send(task);
		})
		.catch((error) => {
			console.error("Error creating task");
			return res.status(500).send(error);
		});
};

exports.getTask = (req, res) => {
	let { userName } = req.body;
	Task.find({ userName })
		.then((tasks) => {
			if (tasks.length == 0) {
				console.error(`No tasks found for user ${userName}`);
				return res.status(404).send([]);
			}
			console.info(`Tasks found for user ${userName}`);
			return res.status(200).send(tasks);
		})
		.catch((error) => {
			console.error("Task not found");
			return res.status(500).send(error);
		});
};
