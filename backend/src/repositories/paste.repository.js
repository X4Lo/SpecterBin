const Paste = require("../models/paste.model");

const PasteRepository = {
  create: async (data) => await Paste.create(data),
  findById: async (id) =>
    await Paste.findOne({ id: id }),
  findByAccountNumber: async (accountNumber) =>
    await Paste.find({ accountNumber: accountNumber }),
  deleteById: async (id) => await Paste.findByIdAndDelete(id),
};

module.exports = PasteRepository;
