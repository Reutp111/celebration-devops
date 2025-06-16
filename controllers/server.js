const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('../models/contact');
const Login = require('../models/Login');


const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// נתיב POST ליצירת כניסה חדשה
app.post('..models/login', async (req, res) => {
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

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
