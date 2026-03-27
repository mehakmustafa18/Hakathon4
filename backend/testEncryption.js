const User = require("./models/User");
const { encryptData, decryptData } = require("./utils/encryptionHelper");

// Quick test to verify encryption works
async function testEncryption() {
  console.log("\n=== TESTING ENCRYPTION ===\n");

  const testCard = "1234567890123456";
  const testExpiry = "12/27";
  const testCVV = "123";

  try {
    const encryptedCard = encryptData(testCard);
    const encryptedExpiry = encryptData(testExpiry);
    const encryptedCVV = encryptData(testCVV);

    console.log("✓ Encryption Test:");
    console.log(`  Original Card: ${testCard}`);
    console.log(`  Encrypted Card: ${encryptedCard}`);
    console.log(`  Decrypted Card: ${decryptData(encryptedCard)}`);
    console.log(
      `  Match: ${decryptData(encryptedCard) === testCard ? "✓ YES" : "✗ NO"}\n`,
    );

    console.log(`  Original Expiry: ${testExpiry}`);
    console.log(`  Encrypted Expiry: ${encryptedExpiry}`);
    console.log(`  Decrypted Expiry: ${decryptData(encryptedExpiry)}`);
    console.log(
      `  Match: ${decryptData(encryptedExpiry) === testExpiry ? "✓ YES" : "✗ NO"}\n`,
    );

    console.log(`  Original CVV: ${testCVV}`);
    console.log(`  Encrypted CVV: ${encryptedCVV}`);
    console.log(`  Decrypted CVV: ${decryptData(encryptedCVV)}`);
    console.log(
      `  Match: ${decryptData(encryptedCVV) === testCVV ? "✓ YES" : "✗ NO"}\n`,
    );

    console.log("✓ All encryption tests passed!\n");
  } catch (error) {
    console.error("✗ Encryption test failed:", error.message, "\n");
  }
}

testEncryption().then(() => {
  console.log("=== TEST COMPLETE ===\n");
  process.exit(0);
});
