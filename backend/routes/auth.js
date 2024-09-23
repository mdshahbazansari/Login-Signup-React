const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authenticate = require('../models/authenticate.js');


router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    req.session.userId = newUser._id; // Set session user ID
    res.status(201).json({ username: newUser.username, email: newUser.email });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    req.session.userId = user._id; // Set session user ID
    
    // Respond with user data
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.send('Logged out successfully');
  });
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Get current user data route
router.get('/current-user', authenticate, (req, res) => {
  User.findById(req.session.userId, 'username email', (err, user) => {
    if (err || !user) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }
    res.json(user);
  });
});

module.exports = router;
