const mongoose = require("mongoose");
const Task = require("../models/task");

exports.addTask = (req, res) => {
	let { taskName, taskDescription, userID } = req.body;
	userID = mongoose.Types.ObjectId(userID);
	let task = new Task({ taskName, taskDescription, userID });
	task.save()
		.then(() => {
			console.info(`New Task was created for User: ${userID}`);
			return res.status(200).send(task);
		})
		.catch((error) => {
			console.error("Error creating task");
			return res.status(500).send(error);
		});
};

exports.getTask = (req, res) => {
	let { userID } = req.params;
	userID = mongoose.Types.ObjectId(userID);
	Task.find({ userID })
		.then((tasks) => {
			console.info(userID);
			if (tasks.length == 0) {
				console.error(`No tasks found for user ${userID}`);
				return res.status(404).send([]);
			}
			console.info(`Tasks found for user ${userID}`);
			return res.status(200).send(tasks);
		})
		.catch((error) => {
			console.error("Task not found");
			return res.status(500).send(error);
		});
};

exports.removeTask = (req, res) => {
	let { taskID } = req.params;
	taskID = mongoose.Types.ObjectId(taskID);
	Task.deleteOne({ _id: taskID })
		.then(() => {
			console.info("Task deleted successfully");
			return res.status(200).send("Task deleted successfully");
		})
		.catch((error) => {
			console.error("Task not deleted");
			return res.status(500).send(error);
		});
};
