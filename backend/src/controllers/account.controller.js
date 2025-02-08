const AccountService = require("../services/account.service");

const AccountController = {
  createAccount: async (req, res) => {
    try {
      const { AccountNumber } = req.body;
      const account = await AccountService.createAccount(AccountNumber);
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAccount: async (req, res) => {
    try {
      const { accountNumber } = req.params;
      const account = await AccountService.getAccountByAccountNumber(accountNumber);
      res.status(200).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = AccountController;
