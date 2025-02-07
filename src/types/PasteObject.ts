export interface PasteObject {
  id: number;
  isPasswordProtected: boolean;
  data: string;

  availableDate: Date;
  burnDate: Date;
  burnAfterRead: boolean;
  title: string;
  formatingStyle: string;
  content: string;
}
