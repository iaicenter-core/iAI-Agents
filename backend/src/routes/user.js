const router = require('express').Router();
const { requireAuth } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/profile', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;