const PasteService = require("../services/paste.service");

const PasteController = {
  createPaste: async (req, res) => {
    const paste = await PasteService.createPaste(req.body);
    res.status(201).json(paste);
  },

  getPasteById: async (req, res) => {
    const { id } = req.params;
    const paste = await PasteService.getPasteById(id);
    res.json(paste);
  },

  getPastesByAccount: async (req, res) => {
    const { accountNumber } = req.params;
    const pastes = await PasteService.getPastesByAccount(accountNumber);
    res.json(pastes);
  },

  deletePaste: async (req, res) => {
    const { accountNumber } = req.body;
    await PasteService.deletePaste(req.params.id, accountNumber);
    res.status(204).send();
  },
};

module.exports = PasteController;
