const router = require('express').Router();
const knowledgeBaseService = require('../services/knowledgeBaseService');

router.post('/add', (req, res) => {
  const { title, content } = req.body;
  const result = knowledgeBaseService.addDocument(title, content);
  res.json(result);
});

router.get('/list', (req, res) => {
  const documents = knowledgeBaseService.getAllDocuments();
  res.json(documents);
});

router.delete('/delete', (req, res) => {
  const { title } = req.body;
  const result = knowledgeBaseService.deleteDocument(title);
  res.json(result);
});

module.exports = router;