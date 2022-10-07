const router = require("express").Router();
const payments = require("../controller");
const middlewares = require("../middleware");

router.post("/pay/card", middlewares.verifyPayload, payments.card);

module.exports = router;
