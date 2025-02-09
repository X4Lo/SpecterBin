const PasteRepository = require("../repositories/paste.repository");
const AccountRepository = require("../repositories/account.repository");
const { generateRandomString } = require("../utils/randomGenerator");
const ValidationError = require("../errors/ValidationError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const PasteService = {
  createPaste: async (pasteData) => {
    let randomId;

    do {
      randomId = generateRandomString();
    } while (await PasteRepository.findById(randomId))

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
    const paste = await PasteRepository.findById(id)

    if (!paste) throw new NotFoundError("Paste not found.")

    return paste;
  },

  getPastesByAccount: async (accountNumber) => {
    return await PasteRepository.findByAccountNumber(accountNumber);
  },

  deletePaste: async (pasteId, accountNumber) => {
    const originalPaste = await PasteRepository.findById(pasteId);

    if (!accountNumber) {
      throw new ValidationError("You didn't provide an Account Number!")
    }

    if (originalPaste.accountNumber && originalPaste.accountNumber != accountNumber) {
      throw new ForbiddenError("You do not have the permission to delete this paste!");
    }

    return await PasteRepository.deleteById(pasteId);
  },
};

module.exports = PasteService;