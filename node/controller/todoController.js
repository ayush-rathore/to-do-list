const mongoose = require("mongoose");
const Task = require("../models/todo");

exports.addTask = (req, res) => {
    let { taskName, taskDescription, userId } = req.body;
    userId = mongoose.Types.ObjectId(userId);
    let task = new Task({ taskName, taskDescription, userId });
    task.save()
        .then(() => {
            console.info(`New Task was created for User: ${userId}`);
            return res.status(200).send(task);
        })
        .catch((error) => {
            console.error("Error creating task");
            return res.status(500).send(error);
        });
};

exports.getTaskByUserId = (req, res) => {
    let { userId } = req.params;
    userId = mongoose.Types.ObjectId(userId);
    Task.find({ userId })
        .then((tasks) => {
            if (tasks.length == 0) {
                console.error(`No tasks found for user ${userId}`);
                return res.status(404).send([]);
            }
            console.info(`Tasks found for user ${userId}`);
            return res.status(200).send(tasks);
        })
        .catch((error) => {
            console.error("Task not found");
            return res.status(500).send(error);
        });
};

exports.removeTask = (req, res) => {
    let { taskId } = req.params;
    taskId = mongoose.Types.ObjectId(taskId);
    Task.deleteOne({ _id: taskId })
        .then(() => {
            console.info("Task deleted successfully");
            return res.status(200).send("Task deleted successfully");
        })
        .catch((error) => {
            console.error("Task not deleted");
            return res.status(500).send(error);
        });
};
