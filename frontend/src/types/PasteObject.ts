export interface PasteObject {
  id?: string;
  isPasswordProtected: boolean;
  hasBeenDecrypted?: boolean;
  availableDate?: Date;
  burnAfterDate?: Date;
  burnAfterRead: boolean;
  encryptedData?: string;

  password?: string;
  title?: string;
  syntaxHighlightingStyle?: string;
  content?: string;

  createdAt?: Date;
}
