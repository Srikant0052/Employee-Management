const router = require("express").Router();
const {
  addEmployee,
  getEmployeeList,
  employeeLogin,
  getEmployeeByEmployeeId,
  updatePassword,
} = require("../controller/employeeController");
const { authorization } = require("../middleware/auth");

router.post("/employee", addEmployee);
router.post("/login", employeeLogin);
router.get("/employeeList", getEmployeeList);
router.get("/getEmployee/:employeeId", getEmployeeByEmployeeId);
router.put("/update", updatePassword);

module.exports = router;
