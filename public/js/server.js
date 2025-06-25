const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');
const Login = require('./models/Login');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// חיבור למסד הנתונים
mongoose.connect('mongodb://localhost:27017/myDatabase');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// נתיב POST ליצירת כניסה חדשה
app.post('/login', async (req, res) => {
    const { username } = req.body;
    const loginDate = new Date();

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const newLogin = new Login({ username, loginDate });
        await newLogin.save();
        res.status(201).json({ message: 'Login information saved successfully' });
    } catch (error) {
        console.error('Error saving login information:', error);
        res.status(500).json({ message: 'Error saving login information' });
    }
});

// נתיב POST ליצירת קשר
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving contact information' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
