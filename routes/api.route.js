const router = require("express").Router();
const payments = require("../controller");
const { verifyPayload } = require("../middleware");

router.post("/pay/card",verifyPayload, payments.card);

module.exports = router;
