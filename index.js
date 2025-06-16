const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// הגדרת נתיב לתיקיית הסטטיים
app.use(express.static(path.join(__dirname, 'public')));

// הגדרת נתיב לבית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
