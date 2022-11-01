const router = require("express").Router();
const {
  addCustomer,
  getAllCustomer,
} = require("../controller/customerController");

router.post("/addCustomer", addCustomer);
router.get("/getCustomer", getAllCustomer);

module.exports = router;
