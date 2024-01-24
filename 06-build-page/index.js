const fs = require('fs/promises');
const path = require('path');
const mergeStyles = require('../05-merge-styles/index.js');
const copyDirectory = require('../04-copy-directory/index.js');

const buildPage = async function() {
  const PARENT_DIRECTORY = './06-build-page';
  let template = await fs.readFile(path.join(PARENT_DIRECTORY, 'template.html'), 'utf-8');
  let tags = template.match(/{{[^{]*}}/g);
  for (let tag of tags) {
    const component = await fs.readFile(path.join(PARENT_DIRECTORY, 'components', 
      `${tag.substring(2, tag.length - 2)}.html`));
    template = template.replace(tag, component);
  }
  fs.mkdir(path.join(PARENT_DIRECTORY, 'project-dist'), {recursive: true});
  const outputFile = path.join(PARENT_DIRECTORY, 'project-dist', 'index.html');
  fs.writeFile(outputFile, template);
  mergeStyles.buildStyles(path.join(PARENT_DIRECTORY, 'styles'), path.join(PARENT_DIRECTORY, 'project-dist', 'style.css'));
  copyDirectory.copyDir(path.join(PARENT_DIRECTORY, 'assets'), 
    path.join(PARENT_DIRECTORY, 'project-dist', 'assets'));
};
buildPage();