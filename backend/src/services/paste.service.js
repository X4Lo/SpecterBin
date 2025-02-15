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
      if (pasteData.accountNumber.length != 36) {
        throw new ValidationError("Account does not exist!")
      }

      const account = await AccountRepository.findByAccountNumber(pasteData.accountNumber)

      if (!account) {
        throw new ValidationError("Account does not exist!")
      }
    }

    if (pasteData.availableDate && pasteData.availableDate < new Date()) {
      throw new ValidationError("Available date must be greater that the current date!")
    }

    pasteData.id = randomId;

    return await PasteRepository.create(pasteData);
  },

  getPasteById: async (id) => {
    const paste = await PasteRepository.findById(id);

    if (!paste) throw new NotFoundError("Paste not found.")

    const currentDate = new Date();

    // burn after date
    if (paste.burnAfterDate && paste.burnAfterDate < currentDate) {
      await PasteRepository.deleteById(id);
      throw new NotFoundError("Paste not found.")
    }

    // availableDate
    // TODO: allow paste creator to view before
    if (paste.availableDate && paste.availableDate > currentDate) {
      throw new ForbiddenError("You do not have the permission to view this paste yet!");
    }

    // burn after read
    if (paste.burnAfterRead) {
      await PasteRepository.deleteById(id);
    }

    // increase views counter
    if (!paste.burnAfterRead && (paste.burnAfterDate && paste.burnAfterDate > currentDate)) {
      paste.views += 1;
      await PasteRepository.updateById(paste.id, paste);
    }

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

  deleteExpiredPastes: async (date = new Date()) => {
    return await PasteRepository.deleteExpired(date);
  }
};

module.exports = PasteService;