const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/myDatabase';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});
