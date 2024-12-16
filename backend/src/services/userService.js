// backend/src/services/userService.js

const User = require('../models/User');

/**
 * ดึงข้อมูล user ตาม userId
 * @param {String} userId 
 * @returns {Object|null} user document หรือ null ถ้าไม่เจอ
 */
async function getUserById(userId) {
  return await User.findById(userId).select('-password');
}

/**
 * อัพเดตข้อมูล user
 * @param {String} userId 
 * @param {Object} updateData 
 * @returns {Object} user document ที่อัพเดตแล้ว หรือ null ถ้าไม่เจอ
 */
async function updateUser(userId, updateData) {
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
}

/**
 * สร้าง user ใหม่
 * @param {Object} userData { username, password, ... }
 * @returns {Object} user document ที่สร้างใหม่
 */
async function createUser(userData) {
  const user = new User(userData);
  return await user.save();
}

module.exports = {
  getUserById,
  updateUser,
  createUser
};