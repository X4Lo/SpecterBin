/**
 * Generates a random alphanumeric string of a specified length.
 *
 * @param {number} length - The desired length of the generated string. Defaults to 10.
 * @returns {string} - A randomly generated string containing uppercase, lowercase letters, and digits.
 *
 * @example
 * // Generate a random string of default length (10)
 * const randomStr = generateRandomString();
 * console.log(randomStr); // Example output: "aB3dE5gH1z"
 *
 * @example
 * // Generate a random string of length 15
 * const randomStr = generateRandomString(15);
 * console.log(randomStr); // Example output: "XyZ89AbC12dEf45"
 */
export function generateRandomString(length: number = 10): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}
