const router = require('express').Router();
const ragService = require('../services/ragService');

router.post('/query', async (req, res, next) => {
  try {
    const { query } = req.body;
    const answer = await ragService.generateAnswer(query);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

module.exports = router;