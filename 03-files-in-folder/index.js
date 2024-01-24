const fs = require('fs').promises;
const path = require('path');

const getFiles = async function () {
  const FOLDER_WITH_FILES = './03-files-in-folder/secret-folder';
  try {
    const files = await fs.readdir(FOLDER_WITH_FILES, {
      withFileTypes: true,
    });
    files.forEach(async (file) => {
      if (file.isFile()) {
        let stat = await fs.stat(path.join(FOLDER_WITH_FILES, file.name));
        console.log(
          `${path.basename(file.name, path.extname(file.name))} - ${path
            .extname(file.name)
            .replace('.', '')} - ${stat.size / 1000}kb`,
        );
      }
    });
  } catch (err) {
    console.error(err);
  }
};

getFiles();
