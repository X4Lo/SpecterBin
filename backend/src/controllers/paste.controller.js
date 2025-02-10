const CustomError = require("../errors/CustomError");
const PasteService = require("../services/paste.service");

const PasteController = {
  createPaste: async (req, res) => {
    try {
      const paste = await PasteService.createPaste(req.body);
      res.status(201).json(paste);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode()).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error has accured" });
        console.log(error.message)
      }
    }
  },

  getPasteById: async (req, res) => {
    try {
      const { id } = req.params;
      const paste = await PasteService.getPasteById(id);
      res.json(paste);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode()).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error has accured" });
        console.log(error.message)
      }
    }
  },

  getPastesByAccount: async (req, res) => {
    try {
      const { accountNumber } = req.params;
      const pastes = await PasteService.getPastesByAccount(accountNumber);
      res.json(pastes);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode()).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error has accured" });
        console.log(error.message)
      }
    }
  },

  deletePaste: async (req, res) => {
    try {
      const { accountNumber } = req.body;
      await PasteService.deletePaste(req.params.id, accountNumber);
      res.status(204).send();
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode()).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error has accured" });
        console.log(error.message)
      }
    }
  },
};

module.exports = PasteController;
