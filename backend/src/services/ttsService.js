const axios = require('axios');
const { GOOGLE_CLOUD_TTS_API_KEY } = require('../config');

async function getTTS(text) {
  if (!GOOGLE_CLOUD_TTS_API_KEY) {
    // Mock
    return "https://example.com/audio-response.mp3";
  }

  // ตัวอย่างเรียก Google Cloud TTS (Production ใช้ official client libs)
  const response = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_TTS_API_KEY}`, {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' }
  });

  const base64Audio = response.data.audioContent;
  // TODO: อัพโหลด base64Audio ไปยัง storage/CDN แล้วได้ URL จริงกลับมา
  // ณ ที่นี้จะ Mock URL ไว้เช่นเดิม
  return "https://example.com/generated-audio.mp3";
}

module.exports = { getTTS };