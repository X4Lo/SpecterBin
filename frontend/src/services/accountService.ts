import apiClient from "@/services/apiClient";
import { Account } from "@/types/Account";

export const accountService = {
  async getAccountByAccountNumber(accountNumber: string): Promise<Account> {
    const response = await apiClient.get<Account>(`/accounts/${accountNumber}`);
    return response.data;
  },

  async createAccount(): Promise<Account> {
    const response = await apiClient.post<Account>("/accounts", {});
    return response.data;
  },
};
