const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// מודלים
const Contact = require('./models/contact');
const Login = require('./models/login');

const app = express();
const PORT = process.env.PORT || 3001;

// קבצים סטטיים מתוך public
app.use(express.static(path.join(__dirname, 'public')));

// תמיכה בפרמטרים
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// חיבור למונגו
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/celebration';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// דפים סטטיים
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/html/homepage.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/html/contact.html')));
app.get('/qa', (req, res) => res.sendFile(path.join(__dirname, 'public/html/qa.html')));

// POST ל־/login
app.post('/login', async (req, res, next) => {
  const { username } = req.body;
  try {
    const newLogin = new Login({ username, loginDate: new Date() });
    await newLogin.save();
    res.status(201).json({ message: 'Login saved successfully' });
  } catch (err) {
    next(err);
  }
});

// POST ל־/contact
app.post('/contact', async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (err) {
    next(err);
  }
});

// טיפול שגיאות מרכזי
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
