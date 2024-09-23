const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const port = 5000;
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true // Allows cookies to be sent
}));

const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURI);

// Set up session store
const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions',
});

// Configure session middleware
app.use(session({
  secret: 'random#secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'none', // Required for cross-site cookies
    secure: false // Set to true if using HTTPS
  }
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
