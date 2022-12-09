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
  filterTask,
} = require("../controller/workLogController");
const { authorization } = require("../middleware/auth");

const router = Router();

router
  .post("/addTask", authorization, addTask)
  .put("/updateTask/:taskId/:employeeId", authorization, updateTask)
  .get("/getTask", getTaskList)
  .get("/getTaskById/:employeeId", getTaskByEmployeeId)
  .get("/getTaskById/:projectCode", getTaskByProjectCode)
  .get("/getTask/:taskId", getTaskByTaskId)
  .delete("/task/:taskId", deleteTaskByTaskId)
  .get("/task", taskData)
  .get("/getFilteredTask", filterTask);

module.exports = router;
