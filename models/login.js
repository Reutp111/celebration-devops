const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    loginDate: { type: Date, default: Date.now }
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;