const CustomError = require("../errors/CustomError");
const AccountService = require("../services/account.service");

const AccountController = {
  createAccount: async (req, res) => {
    try {
      const account = await AccountService.createAccount();
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode()).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error has accured" });
        console.log(error.message)
      }
    }
  },

  getAccount: async (req, res) => {
    try {
      const { accountNumber } = req.params;
      const account = await AccountService.getAccountByAccountNumber(accountNumber);
      res.status(200).json(account);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode()).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error has accured" });
        console.log(error.message)
      }
    }
  }
};

module.exports = AccountController;
