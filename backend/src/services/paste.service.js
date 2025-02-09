const PasteRepository = require("../repositories/paste.repository");
const AccountRepository = require("../repositories/account.repository");
const { generateRandomString } = require("../utils/randomGenerator");
const ValidationError = require("../errors/ValidationError");

const PasteService = {
  createPaste: async (pasteData) => {
    let randomId = generateRandomString();

    if (await PasteRepository.findById(randomId))
      randomId = generateRandomString();

    // if the paste has an account number, verify if that account exists
    if (pasteData.accountNumber) {
      const account = await AccountRepository.findByAccountNumber(pasteData.accountNumber)

      if (!account) {
        throw new ValidationError("Account does not exist!")
      }
    }

    pasteData.id = randomId;

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