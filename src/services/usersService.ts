import apiClient from "@/services/apiClient";
import { User } from "@/types/Account";

export const usersService = {
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },

  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  async createUser(user: Partial<User>): Promise<User> {
    const response = await apiClient.post<User>("/users/", user);
    return response.data;
  },

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, user);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
