import LocalStorageService from "./localStorageService";

class AuthService {
  // Perform login
  async login(accountNumber: string) {
    LocalStorageService.setItem("accountNumber", accountNumber);
  }
  // Perform logout
  logout(): void {
    LocalStorageService.removeItem("accountNumber");
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return LocalStorageService.getItem("accountNumber") != null;
  }
}

export default new AuthService();
