

const router = require("express").Router()
const {addEmployee, getEmployeeList} = require("../controller/employeeController");

router.post("/employee", addEmployee);
router.get("/employeeList", getEmployeeList);

module.exports = router;
