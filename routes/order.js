const express = require("express");
const router = express.Router();

const {
  createOrder,
  cancelOrder,
  checkOrder,
  postPayment,
  declinedorder,
} = require("../controllers/order");

router.post("/createOrder/:id", createOrder);
router.get("/orderstatus/:id", checkOrder);
router.post("/cancelOrder/:id", cancelOrder);
outer.post("/cancelOrder/:id", cancelOrder);
router.post("/postEvents", postPayment);

module.exports = router;
