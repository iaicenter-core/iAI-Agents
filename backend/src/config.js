require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongo:27017/virtual-avatar',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  GOOGLE_CLOUD_TTS_API_KEY: process.env.GOOGLE_CLOUD_TTS_API_KEY || '',
  GOOGLE_CLOUD_STT_API_KEY: process.env.GOOGLE_CLOUD_STT_API_KEY || ''
};