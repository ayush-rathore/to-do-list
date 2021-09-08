const express = require("express");
const router = express();
const taskController = require("../controller/todoController");

router.post("/", taskController.addTask);
router.get("/user/:userId", taskController.getTaskByUserId);
router.delete("/task/:taskId", taskController.removeTask);
module.exports = router;
