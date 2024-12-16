const axios = require('axios');
const { OPENAI_API_KEY } = require('../config');

async function getResponse(userText, context) {
  const prompt = `User: ${userText}\nAssistant:`;
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: "text-davinci-003",
    prompt,
    max_tokens: 100,
    temperature: 0.7
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
  });
  return response.data.choices[0].text.trim();
}

module.exports = { getResponse };