const router = require("express").Router();
const payments = require("../controller");

router.post("/pay/card", payments.card);

module.exports = router;
