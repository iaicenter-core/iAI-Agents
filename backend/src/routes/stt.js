const router = require('express').Router();
const { requireAuth } = require('../middleware/authMiddleware');
const sttService = require('../services/sttService');

router.post('/recognize', requireAuth, async (req, res, next) => {
  try {
    const { audioData } = req.body;
    const text = await sttService.recognize(audioData);
    res.json({ text });
  } catch (err) {
    next(err);
  }
});

module.exports = router;