const fs = require('fs');
const path = require('path');

// פונקציה לקריאת כל הקבצים בתיקיה בצורה רקורסיבית
function readFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            readFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

// פונקציה לעדכון ייבוא בקבצים
function updateImports(filePath, oldPath, newPath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(`require\\('${oldPath}`, 'g');
    if (regex.test(fileContent)) {
        fileContent = fileContent.replace(regex, `require('${newPath}`);
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Updated imports in ${filePath}`);
    }
}

// רשימת כל הקבצים בפרויקט
const allFiles = readFilesRecursively('.');

// עדכון ייבוא בקבצים
allFiles.forEach((file) => {
    if (file.endsWith('.js')) {
        updateImports(file, './script', './controllers/script'); // דוגמה להחלפה
        updateImports(file, './style.css', './assets/style.css'); // דוגמה להחלפה נוספת
    }
});

console.log('Import updates completed!');
