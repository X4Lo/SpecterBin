const mongoose = require("mongoose");

const PasteSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  accountNumber: { type: String },
  encryptedData: { type: String },
  burnAfterRead: { type: Boolean, default: false },
  burnAfterDate: { type: Date },
  availableDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Paste", PasteSchema);
