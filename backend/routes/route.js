const express = require("express");
const router = express();

const userController = require("../controller/userController");
const taskController = require("../controller/taskController");

// User Routes
router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
router.get("/users", userController.users);

//To Do Routes
router.post("/todo/addTask", taskController.addTask);
router.get("/todo/getTask/:userID", taskController.getTask);
router.get("/todo/removeTask/:taskID", taskController.removeTask);

module.exports = router;
