const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Account", AccountSchema);
