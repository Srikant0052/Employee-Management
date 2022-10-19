const router = require("express").Router();
const { addCustomer } = require("../controller/customerController");

router.post("/addCustomer", addCustomer);

module.exports = router;
