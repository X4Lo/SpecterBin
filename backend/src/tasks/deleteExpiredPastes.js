const PasteService = require("../services/paste.service");

const deleteExpiredPastes = async () => {
  const now = new Date();
  const deleted = await PasteService.deleteExpiredPastes(now);

  if (deleted.deletedCount > 0) {
    console.log(`[Scheduler] Deleted ${deleted.deletedCount} expired pastes at ${now}`);
  }
};

module.exports = deleteExpiredPastes;
