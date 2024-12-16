const router = require('express').Router();
const { requireAuth } = require('../middleware/authMiddleware');
const nluService = require('../services/nluService');

router.post('/query', requireAuth, async (req, res, next) => {
  try {
    const { text, context } = req.body;
    const responseText = await nluService.getResponse(text, context);
    res.json({ response: responseText });
  } catch (err) {
    next(err);
  }
});

module.exports = router;