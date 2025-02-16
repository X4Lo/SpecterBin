const mongoose = require("mongoose");

const PasteSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  accountNumber: { type: String, index: true },
  encryptedData: { type: String },
  burnAfterRead: { type: Boolean, default: false },
  burnAfterDate: { type: Date },
  availableDate: { type: Date },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

PasteSchema.index({ burnAfterDate: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Paste", PasteSchema);
