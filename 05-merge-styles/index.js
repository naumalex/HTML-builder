const fs = require('fs').promises;
const path = require('path');
const PARENT_DIRECTORY = './05-merge-styles';

const buildStyles = async function (sourceDir, outputFile) {
  const files = await fs.readdir(sourceDir, { withFileTypes: true });
  let stylesContent = [];

  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let style = await fs.readFile(path.join(sourceDir, file.name), 'utf-8');
      stylesContent.push(style);
    }
  }
  fs.writeFile(outputFile, '');
  stylesContent.forEach((style) => {
    fs.appendFile(outputFile, style);
  });
};
buildStyles(
  path.join(PARENT_DIRECTORY, 'styles'),
  path.join(PARENT_DIRECTORY, 'project-dist', 'bundle.css'),
);
