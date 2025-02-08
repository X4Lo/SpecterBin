const PasteService = require("../services/paste.service");

const PasteController = {
  createPaste: async (req, res) => {
    try {
      const paste = await PasteService.createPaste(req.body);
      res.status(201).json(paste);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPasteById: async (req, res) => {
    try {
      const { id } = req.params;
      const paste = await PasteService.getPasteById(id);
      res.json(paste);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPastesByAccount: async (req, res) => {
    try {
      const { accountNumber } = req.params;
      const pastes = await PasteService.getPastesByAccount(accountNumber);
      res.json(pastes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePaste: async (req, res) => {
    try {
      await PasteService.deletePaste(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = PasteController;
