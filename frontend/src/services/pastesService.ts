import apiClient from "@/services/apiClient";
import { PasteObject } from "@/types/PasteObject";

export const pastesService = {
  async getPastesByAccountNumber(
    accountNumber: string
  ): Promise<PasteObject[]> {
    const response = await apiClient.get<PasteObject[]>(
      `/pastes/account/${accountNumber}`
    );
    return response.data;
  },

  async getPasteById(id: string): Promise<PasteObject> {
    const response = await apiClient.get<PasteObject>(`/pastes/${id}`);
    return response.data;
  },

  async createPaste(pasteObject: Partial<PasteObject>): Promise<PasteObject> {
    const response = await apiClient.post<PasteObject>("/pastes/", pasteObject);
    return response.data;
  },

  async updatePaste(
    id: string,
    pasteObject: Partial<PasteObject>
  ): Promise<PasteObject> {
    const response = await apiClient.put<PasteObject>(
      `/pastes/${id}`,
      pasteObject
    );
    return response.data;
  },

  async deletePasteById(id: string, accountNumber: string): Promise<void> {
    await apiClient.delete(`/pastes/${id}`, {
      params: { accountNumber },
    });
  },
};
