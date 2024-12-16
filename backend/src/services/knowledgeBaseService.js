// backend/src/services/knowledgeBaseService.js
const fs = require('fs');
const path = require('path');

const KB_PATH = path.resolve(__dirname, '../../data/knowledge-base'); // เก็บเอกสารในโฟลเดอร์

/**
 * เพิ่มเอกสารใหม่เข้า Knowledge Base
 * @param {String} title ชื่อเอกสาร
 * @param {String} content เนื้อหา
 */
function addDocument(title, content) {
  const filePath = path.join(KB_PATH, `${title}.txt`);
  fs.writeFileSync(filePath, content, 'utf8');
  return { success: true, message: 'Document added successfully' };
}

/**
 * ดึงเอกสารทั้งหมดใน Knowledge Base
 */
function getAllDocuments() {
  const files = fs.readdirSync(KB_PATH);
  return files.map(file => ({
    title: file.replace('.txt', ''),
    content: fs.readFileSync(path.join(KB_PATH, file), 'utf8'),
  }));
}

/**
 * ลบเอกสารออกจาก Knowledge Base
 * @param {String} title ชื่อเอกสาร
 */
function deleteDocument(title) {
  const filePath = path.join(KB_PATH, `${title}.txt`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return { success: true, message: 'Document deleted successfully' };
  }
  return { success: false, message: 'Document not found' };
}

module.exports = {
  addDocument,
  getAllDocuments,
  deleteDocument,
};