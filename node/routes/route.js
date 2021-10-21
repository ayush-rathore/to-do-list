const express = require("express");
const router = express();

const userController = require("../controller/userController");
const taskController = require("../controller/todoController");

// User Routes
router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
router.get("/users", userController.users);

//To Do Routes
router.post("/todo/add", taskController.addTask);
router.get("/todo/getTask", taskController.getTask);

module.exports = router;
