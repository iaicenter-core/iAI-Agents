const router = require('express').Router();
const { signToken } = require('../utils/jwt');
const User = require('../models/User');

// Simple login route (use bcrypt in production)
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ userId: user._id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;