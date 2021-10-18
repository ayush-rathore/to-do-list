const mongoose = require("mongoose");
const Task = new mongoose.Schema({
	taskName: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: new Date(),
	},
	taskDescription: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("task", Task, "task");
