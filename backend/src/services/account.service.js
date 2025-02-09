const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const AccountRepository = require("../repositories/account.repository");
const { generateStructuredNumbers } = require("../utils/randomGenerator");

const AccountService = {
  createAccount: async () => {
    const accountNumber = generateStructuredNumbers();

    return await AccountRepository.create({ accountNumber: accountNumber });
  },

  getAccountByAccountNumber: async (accountNumber) => {
    if (!accountNumber) {
      throw new BadRequestError("Account Number not provided.")
    }

    const existingAccount = await AccountRepository.findByAccountNumber(accountNumber);
    if (!existingAccount) {
      throw new NotFoundError("Account Number doesn't exist.");
    }

    return existingAccount;
  }
};

module.exports = AccountService;