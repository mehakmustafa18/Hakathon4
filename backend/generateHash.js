const bcrypt = require("bcryptjs");

async function generateHash() {
  try {
    const hash = await bcrypt.hash("admin123", 10);
    console.log(hash);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

generateHash();
