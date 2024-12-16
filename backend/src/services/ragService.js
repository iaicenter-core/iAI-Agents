// backend/src/services/ragService.js
const axios = require('axios');
const knowledgeBaseService = require('./knowledgeBaseService');
const { OPENAI_API_KEY } = require('../config');

/**
 * ดึงข้อมูลที่เกี่ยวข้องจาก Knowledge Base
 * @param {String} query คำถามจากผู้ใช้
 */
function retrieveRelevantDocuments(query) {
  const documents = knowledgeBaseService.getAllDocuments();
  // หาข้อความที่ตรงที่สุด (Simple Matching)
  const relevantDocs = documents.filter(doc => doc.content.includes(query));
  return relevantDocs.map(doc => doc.content).join('\n');
}

/**
 * รวมข้อมูลจาก Knowledge Base และส่งไปยัง LLM
 * @param {String} query คำถาม
 */
async function generateAnswer(query) {
  const context = retrieveRelevantDocuments(query);
  const prompt = `Context:\n${context}\n\nUser Question:\n${query}\n\nAnswer:`;

  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 0.7,
  }, {
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
  });

  return response.data.choices[0].text.trim();
}

module.exports = { generateAnswer };