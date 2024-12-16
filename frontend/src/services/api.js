// frontend/src/services/api.js

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

/**
 * ฟังก์ชันช่วยสำหรับสร้าง Headers ที่มี Authorization token หากมี
 */
function getHeaders(token) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Login API เรียกใช้งานเพื่อขอ JWT token เมื่อผู้ใช้ใส่ username / password
 * @param {String} username 
 * @param {String} password 
 * @returns {Object} { token: string }
 */
export async function login(username, password) {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return await res.json(); // { token: string }
}

/**
 * ดึงข้อมูลโปรไฟล์ของผู้ใช้ที่ล็อกอินอยู่
 * @param {String} token JWT token ของผู้ใช้
 * @returns {Object} { user: {...} }
 */
export async function getUserProfile(token) {
  const res = await fetch(`${BACKEND_URL}/user/profile`, {
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error('Failed to get user profile');
  }
  return await res.json(); // { user: {...} }
}

/**
 * ส่งข้อความไปยัง NLU backend เพื่อขอคำตอบ
 * @param {String} token JWT token
 * @param {String} text ข้อความที่ผู้ใช้ส่ง
 * @param {Object} context บริบทการสนทนา (อาจเป็น optional)
 * @returns {Object} { response: string }
 */
export async function queryNLU(token, text, context = {}) {
  const res = await fetch(`${BACKEND_URL}/nlu/query`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ text, context })
  });
  if (!res.ok) {
    throw new Error('Failed to query NLU');
  }
  return await res.json(); // { response: string }
}

/**
 * ขอเสียงพูดจาก TTS API
 * @param {String} token JWT token
 * @param {String} text ข้อความที่ต้องการเปลี่ยนเป็นเสียง
 * @returns {Object} { audioUrl: string }
 */
export async function speakTTS(token, text) {
  const res = await fetch(`${BACKEND_URL}/tts/speak`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ text })
  });
  if (!res.ok) {
    throw new Error('Failed to get TTS audio');
  }
  return await res.json(); // { audioUrl: string }
}

/**
 * ส่งข้อมูลเสียง (base64) ไป STT เพื่อแปลงเสียงเป็นข้อความ
 * @param {String} token JWT token
 * @param {String} audioData base64 ของเสียงที่บันทึก
 * @returns {Object} { text: string }
 */
export async function recognizeSTT(token, audioData) {
  const res = await fetch(`${BACKEND_URL}/stt/recognize`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ audioData })
  });
  if (!res.ok) {
    throw new Error('Failed to recognize speech');
  }
  return await res.json(); // { text: string }
}
// frontend/src/services/api.js

// เรียกใช้ RAG Query
export async function queryRAG(query) {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rag/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return await res.json(); // { answer }
}

// จัดการ Knowledge Base
export async function addDocument(title, content) {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/knowledge-base/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  return await res.json();
}

export async function getDocuments() {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/knowledge-base/list`);
  return await res.json();
}

export async function deleteDocument(title) {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/knowledge-base/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return await res.json();
}