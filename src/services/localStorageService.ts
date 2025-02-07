class LocalStorageService {
  // Save a value to localStorage
  static setItem(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  // Get a value from localStorage
  static getItem<T>(key: string): T | null {
    const serializedValue = localStorage.getItem(key);
    if (!serializedValue) return null;

    try {
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }

  // Remove an item from localStorage
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all localStorage entries
  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageService;
