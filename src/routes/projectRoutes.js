const router = require("express").Router();
const {
  addProject,
  getProjectDataById,
  updateProject,
  getAllProjects,
} = require("../controller/projectController");
const { authorization } = require("../middleware/auth");

router.post("/addProject", authorization, addProject);
router.get("/getProjectById/:projectCode", getProjectDataById);
router.get("/getAllProject", getAllProjects);
router.put("/:projectCode", updateProject);

module.exports = router;
