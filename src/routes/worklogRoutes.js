const { Router } = require("express");
const {
  addTask,
  updateTask,
  getTaskList,
  getTaskByEmployeeId,
  getTaskByProjectCode,
  getTaskByTaskId,
  deleteTaskByTaskId,
  taskData,
} = require("../controller/workLogController");
const { authorization } = require("../middleware/auth");

const router = Router();

router
  .post("/addTask", addTask)
  .put("/updateTask/:taskId/:employeeId", updateTask)
  .get("/getTask", getTaskList)
  .get("/getTaskById/:employeeId", getTaskByEmployeeId)
  .get("/getTaskById/:projectCode", getTaskByProjectCode)
  .get("/getTask/:taskId", getTaskByTaskId)
  .delete("/task/:taskId", deleteTaskByTaskId)
  .get("/task", taskData);

module.exports = router;
