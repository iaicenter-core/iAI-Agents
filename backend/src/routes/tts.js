const router = require('express').Router();
const { requireAuth } = require('../middleware/authMiddleware');
const ttsService = require('../services/ttsService');

router.post('/speak', requireAuth, async (req, res, next) => {
  try {
    const { text } = req.body;
    const audioUrl = await ttsService.getTTS(text);
    res.json({ audioUrl });
  } catch (err) {
    next(err);
  }
});

module.exports = router;