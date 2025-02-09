const crypto = require("crypto");

/**
 * Generate structured pseudo-random numbers.
 * @returns {string} A string of six six-digit numbers.
 */
function generateStructuredNumbers() {
  const numbers = [];

  // Generate six six-digit numbers
  for (let i = 0; i < 6; i++) {
    numbers.push(getRandomInt(100000, 999999));
  }

  return numbers.join("");
}

/**
 * Get a secure pseudo-random integer within a range.
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @returns {number} - Random integer in the given range.
 */
function getRandomInt(min, max) {
  return crypto.randomInt(min, max + 1);
}

/**
 * Generates a random alphanumeric string of a specified length.
 *
 * @param {number} [length=10] - The desired length of the generated string. Defaults to 10.
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
function generateRandomString(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

module.exports = { generateStructuredNumbers, generateRandomString };
