const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// מודלים
const Contact = require('./models/contact');
const Login = require('./models/login'); // הקפד שהקובץ models/login.js קיים!

const app = express();
const PORT = 3001;

// הגדרת תקיית קבצים סטטיים - למשל public
app.use(express.static(path.join(__dirname, 'public')));

// תמיכה בפרמטרים מהטפסים
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// חיבור למונגו (עדיף לשים ב־docker-compose: mongo:27017, אבל פה לפי הדוגמה שלך)
mongoose.connect('mongodb://mongo:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// דף בית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html')); // או 'public/homepage.html'
});

// דף צור קשר
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/contact.html'));
});

// דף שאלות ותשובות
app.get('/qa', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/qa.html'));
});

// נתיב POST ליצירת כניסה חדשה (login)
app.post('/login', async (req, res) => {
    const { username } = req.body;
    const loginDate = new Date();
    try {
        const newLogin = new Login({ username, loginDate });
        await newLogin.save();
        res.status(201).json({ message: 'Login information saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving login information' });
    }
});

// נתיב POST ליצירת פנייה חדשה (צור קשר)
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving contact' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

