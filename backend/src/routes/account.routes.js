const express = require("express");
const AccountController = require("../controllers/account.controller");
const router = express.Router();

router.post("/", AccountController.createAccount);
router.get("/:accountNumber", AccountController.getAccount)

module.exports = router;
