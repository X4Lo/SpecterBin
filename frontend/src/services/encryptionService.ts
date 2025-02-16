export class EncryptionService {
  private static encoder = new TextEncoder();
  private static decoder = new TextDecoder();

  static generateSalt(length: number = 16) {
    return window.crypto.getRandomValues(new Uint8Array(length));
  }

  static async deriveKey(
    password: string,
    salt: Uint8Array
  ): Promise<CryptoKey> {
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      this.encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  static async encrypt(
    text: string,
    password: string,
    salt: Uint8Array = this.generateSalt(),
    iv: Uint8Array = window.crypto.getRandomValues(
      new Uint8Array(12)
    )
  ): Promise<string> {
    const key = await this.deriveKey(password, salt);

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      this.encoder.encode(text)
    );

    const encryptedData = new Uint8Array([
      ...salt,
      ...iv,
      ...new Uint8Array(encrypted),
    ]);
    return btoa(String.fromCharCode(...encryptedData));
  }

  static async decrypt(
    encryptedText: string,
    password: string
  ): Promise<string> {
    const encryptedData = Uint8Array.from(atob(encryptedText), (c) =>
      c.charCodeAt(0)
    );
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 28);
    const data = encryptedData.slice(28);

    const key = await this.deriveKey(password, salt);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    return this.decoder.decode(decrypted);
  }
}
