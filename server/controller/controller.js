const fs = require('fs').promises;

async function deleteFile(filename) {
  try {
    await fs.unlink(`public/images/${filename}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { deleteFile };
