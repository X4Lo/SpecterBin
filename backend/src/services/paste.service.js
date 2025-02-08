const PasteRepository = require("../repositories/paste.repository");

const PasteService = {
  createPaste: async (pasteData) => {
    return await PasteRepository.create(pasteData);
  },

  getPasteById: async (id) => {
    return await PasteRepository.findById(id);
  },

  getPastesByAccount: async (accountNumber) => {
    return await PasteRepository.findByAccountNumber(accountNumber);
  },

  deletePaste: async (pasteId) => {
    return await PasteRepository.deleteById(pasteId);
  },
};

module.exports = PasteService;