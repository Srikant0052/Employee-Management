const router = require("express").Router();
const {
  addProject,
  getProjectDataById,
  updateProject,
  getAllProjects,
} = require("../controller/projectController");

router.post("/addProject", addProject);
router.get("/getProjectById/:projectCode", getProjectDataById);
router.get("/getAllProject", getAllProjects);
router.put("/:projectCode", updateProject);

module.exports = router;
