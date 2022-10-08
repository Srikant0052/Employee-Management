const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");

router.post("/employee", employeeController.addEmployee);
router.get("/employeeList", employeeController.getGmployeeList);

module.exports = router;
