const Paste = require("../models/paste.model");

const PasteRepository = {
  create: async (data) => await Paste.create(data),
  findById: async (id) =>
    await Paste.findOne({ id: id }, { accountNumber: 0 }),
  findByAccountNumber: async (accountNumber) =>
    await Paste.find({ accountNumber: accountNumber }),
  deleteById: async (id) => await Paste.deleteOne({ id: id }),
  deleteExpired: async (date) => await Paste.deleteMany({ burnAfterDate: { $lte: date } }),
};

module.exports = PasteRepository;
