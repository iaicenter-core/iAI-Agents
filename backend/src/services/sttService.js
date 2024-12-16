const axios = require('axios');
const { GOOGLE_CLOUD_STT_API_KEY } = require('../config');

async function recognize(audioData) {
  if (!GOOGLE_CLOUD_STT_API_KEY) {
    return "Hello, I recognized this speech (mock).";
  }

  // เรียก Google Speech-to-Text (Production ใช้ official libs)
  const response = await axios.post(`https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_CLOUD_STT_API_KEY}`, {
    audio: { content: audioData },
    config: { languageCode: 'en-US' }
  });

  const results = response.data.results;
  if (results && results.length > 0) {
    return results[0].alternatives[0].transcript;
  }
  
  return "I couldn't recognize your speech.";
}

module.exports = { recognize };