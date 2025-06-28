const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// מודלים
const Contact = require('./models/contact');
const Login = require('./models/login');

const app = express();
const PORT = 3001;

// קבצים סטטיים מתוך public
app.use(express.static(path.join(__dirname, 'public')));

// תמיכה בפרמטרים
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// חיבור למונגו
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/celebration';
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// דף בית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/homepage.html'));
});

// דף צור קשר
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/contact.html'));
});

// דף שאלות ותשובות
app.get('/qa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/qa.html'));
});

// נתיב POST ל־login
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

// נתיב POST ל־contact
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
