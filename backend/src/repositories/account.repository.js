const Account = require("../models/account.model");

const AccountRepository = {
  create: async (data) => await Account.create(data),
  findByAccountNumber: async (accountNumber) =>
    await Account.findOne({ accountNumber: accountNumber }),
};

module.exports = AccountRepository;
