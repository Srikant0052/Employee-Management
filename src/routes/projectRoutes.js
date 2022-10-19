const router = require("express").Router();
const { addProject } = require("../controller/projectController");

router.post("/addProject", addProject);


module.exports = router;
