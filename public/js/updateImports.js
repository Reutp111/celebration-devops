const fs = require('fs');
const path = require('path');

function readFilesRecursively(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    fs.statSync(full).isDirectory() ? readFilesRecursively(full, files) : files.push(full);
  });
  return files;
}

function updateImports(filePath, oldPath, newPath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`(require\\(['"])${oldPath}`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${newPath}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

const jsFiles = readFilesRecursively('.');
jsFiles.filter(f => f.endsWith('.js')).forEach(f => {
updateImports(f, './script', './public/js/script');
updateImports(f, './style.css', './public/css/style.css');
});

console.log('Import updates completed!');
