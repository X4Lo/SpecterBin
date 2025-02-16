export interface PasteObject {
  id?: string;
  accountNumber?: string;
  availableDate?: Date;
  burnAfterDate?: Date;
  burnAfterRead?: boolean;
  encryptedData?: string;
  createdAt?: Date;
  views?: number;

  hasBeenDecrypted?: boolean;
  password?: string;
  title?: string;
  syntaxHighlightingStyle?: string;
  content?: string;
}
