const fs = require('fs').promises;
const path = require('path');
const PARENT_DIRECTORY = './04-copy-directory';
const copyDir = async function (source, dist) {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });
  const files = await fs.readdir(source, { withFileTypes: true });
  files.forEach((file) => {
    if (file.isDirectory()) {
      copyDir(path.join(source, file.name), path.join(dist, file.name));
    } else {
      fs.copyFile(path.join(source, file.name), path.join(dist, file.name));
    }
  });
};

copyDir(
  path.join(PARENT_DIRECTORY, 'files'),
  path.join(PARENT_DIRECTORY, 'files-copy'),
);
