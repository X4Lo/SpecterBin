export interface PasteObject {
  id?: string;
  accountNumber?: string;
  hasBeenDecrypted?: boolean;
  availableDate?: Date;
  burnAfterDate?: Date;
  burnAfterRead?: boolean;
  encryptedData?: string;

  password?: string;
  title?: string;
  syntaxHighlightingStyle?: string;
  content?: string;

  views?: number;

  createdAt?: Date;
}
