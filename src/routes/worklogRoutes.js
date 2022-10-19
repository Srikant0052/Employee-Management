const { Router } = require("express");
const {
  addTask,
  updateTask,
  getTaskList,
  getTaskByEmployeeId,
} = require("../controller/workLogController");

const router = Router();

router
  .post("/addTask", addTask)
  .put("/updateTask/:projectCode", updateTask)
  .get("/getTask", getTaskList)
  .get("/getTaskById/:employeeId", getTaskByEmployeeId);

module.exports = router;
