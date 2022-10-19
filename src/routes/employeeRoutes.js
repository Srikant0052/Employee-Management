const router = require("express").Router();
const {
  addEmployee,
  getEmployeeList,
  employeeLogin,
  getEmployeeByEmployeeId,
} = require("../controller/employeeController");

router.post("/employee", addEmployee);
router.post("/login", employeeLogin);
router.get("/employeeList", getEmployeeList);
router.get("/getEmployee/:employeeId", getEmployeeByEmployeeId);

module.exports = router;
