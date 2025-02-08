const AccountRepository = require("../repositories/account.repository");

const AccountService = {
  createAccount: async (accountNumber) => {
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