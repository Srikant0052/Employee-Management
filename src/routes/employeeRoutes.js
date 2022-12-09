const router = require("express").Router();
const {
  addEmployee,
  getEmployeeList,
  employeeLogin,
  getEmployeeByEmployeeId,
  updatePassword,
} = require("../controller/employeeController");
const { authorization } = require("../middleware/auth");

router.post("/employee", authorization, addEmployee);
router.post("/login", employeeLogin);
router.get("/employeeList", getEmployeeList);
router.get("/getEmployee/:employeeId", getEmployeeByEmployeeId);
router.put("/update", authorization, updatePassword);

module.exports = router;
