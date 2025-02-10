const mongoose = require("mongoose");

const PasteSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  isPasswordProtected: { type: Boolean, default: false },
  accountNumber: { type: String },
  encryptedData: { type: String },
  burnAfterRead: { type: Boolean, default: false },
  burnAfterDate: { type: Date },
  availableDate: { type: Date },
  title: { type: String },
  content: { type: String },
  syntaxHighlightingStyle: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Paste", PasteSchema);
