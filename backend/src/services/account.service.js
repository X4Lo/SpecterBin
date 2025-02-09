const AccountRepository = require("../repositories/account.repository");
const { generateStructuredNumbers } = require("../utils/randomGenerator");

const AccountService = {
  createAccount: async () => {
    const accountNumber = generateStructuredNumbers();
    const existingAccount = await AccountRepository.findByAccountNumber(accountNumber);
    if (existingAccount) throw new Error("Account already exists");
    return await AccountRepository.create({ accountNumber: accountNumber });
  },

  getAccountByAccountNumber: async (accountNumber) => {
    const existingAccount = await AccountRepository.findByAccountNumber(accountNumber);
    if (!existingAccount) throw new Error("Account doesn't exist already exists");
    return existingAccount;
  }
};

module.exports = AccountService;