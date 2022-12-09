const router = require("express").Router();
const {
  addCustomer,
  getAllCustomer,
} = require("../controller/customerController");
const { authorization } = require("../middleware/auth");

router.post("/addCustomer",authorization, addCustomer);
router.get("/getCustomer", getAllCustomer);

module.exports = router;
