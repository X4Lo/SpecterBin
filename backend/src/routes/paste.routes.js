const express = require("express");
const PasteController = require("../controllers/paste.controller");
const router = express.Router();

router.post("/", PasteController.createPaste);
router.get("/:id", PasteController.getPasteById);
router.get("/account/:accountNumber", PasteController.getPastesByAccount);
router.delete("/:id", PasteController.deletePaste);

module.exports = router;
