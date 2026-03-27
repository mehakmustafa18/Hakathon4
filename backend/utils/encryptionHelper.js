const crypto = require("crypto");

// Use environment variable or default key (in production, use env variable)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || crypto.randomBytes(16);

/**
 * Encrypt sensitive card data
 * @param {String} data - The data to encrypt (card number, CVV, etc.)
 * @returns {String} - Encrypted data in format: iv:encryptedData (both hex-encoded)
 */
const encryptData = (data) => {
  try {
    // Create a random IV for this encryption
    const iv = crypto.randomBytes(16);

    // Create cipher
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.isBuffer(ENCRYPTION_KEY)
        ? ENCRYPTION_KEY
        : Buffer.from(ENCRYPTION_KEY, "hex"),
      iv,
    );

    // Encrypt
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Return IV + encrypted data (IV is needed for decryption)
    return iv.toString("hex") + ":" + encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
};

/**
 * Decrypt sensitive card data
 * @param {String} encryptedData - The encrypted data in format: iv:encryptedData
 * @returns {String} - Decrypted original data
 */
const decryptData = (encryptedData) => {
  try {
    // Split IV and encrypted data
    const [ivHex, encrypted] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");

    // Create decipher
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.isBuffer(ENCRYPTION_KEY)
        ? ENCRYPTION_KEY
        : Buffer.from(ENCRYPTION_KEY, "hex"),
      iv,
    );

    // Decrypt
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
};

module.exports = { encryptData, decryptData };
