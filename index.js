const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// הגדרת נתיב לתיקיית הסטטיים
app.use(express.static(path.join(__dirname, 'public')));

// הגדרת נתיב לבית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

