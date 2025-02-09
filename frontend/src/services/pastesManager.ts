import { PasteObject } from "@/types/PasteObject";
import { EncryptionService } from "./encryptionService";
import { pastesService } from "./pastesService";
import authService from "./authService";

export class PastesManager {
  static async createPaste(pasteObject: PasteObject) {
    // Encode Content
    if (pasteObject.isPasswordProtected && pasteObject.password) {
      const dataObject = {
        title: pasteObject.title,
        syntaxHighlightingStyle: pasteObject.syntaxHighlightingStyle,
        content: pasteObject.content,
      };

      const dataString = JSON.stringify(dataObject);

      const encryptedData = await EncryptionService.encrypt(
        dataString,
        pasteObject.password
      );

      pasteObject.encryptedData = encryptedData;
      pasteObject.title = undefined;
      pasteObject.syntaxHighlightingStyle = undefined;
      pasteObject.content = undefined;
      pasteObject.password = undefined;
    }

    if (authService.isAuthenticated()) {
      pasteObject.accountNumber = authService.getCurrentAccountNumber()!;
    }

    return pastesService.createPaste(pasteObject);
  }

  static async readPaste(
    pasteObject: PasteObject
  ): Promise<PasteObject | undefined> {
    const currentDate = new Date();
    // has already been read
    if (pasteObject.hasBeenDecrypted) {
      return pasteObject;
    }

    // expired
    if (pasteObject.burnAfterDate && pasteObject.burnAfterDate < currentDate) {
      pasteObject.encryptedData = "";
      pasteObject.title = undefined;
      pasteObject.syntaxHighlightingStyle = undefined;
      pasteObject.content = undefined;
      return undefined;
    }

    // no password given
    if (pasteObject.isPasswordProtected && !pasteObject.password) {
      return undefined;
    }

    if (
      pasteObject.isPasswordProtected &&
      pasteObject.password &&
      pasteObject.encryptedData
    ) {
      const decryptedString = await EncryptionService.decrypt(
        pasteObject.encryptedData,
        pasteObject.password
      );

      const dataObject = JSON.parse(decryptedString);

      if (dataObject.title) pasteObject.title = dataObject.title;
      if (dataObject.syntaxHighlightingStyle)
        pasteObject.syntaxHighlightingStyle =
          dataObject.syntaxHighlightingStyle;
      if (dataObject.content) pasteObject.content = dataObject.content;
      pasteObject.hasBeenDecrypted = true;
    }

    return pasteObject;
  }
}
