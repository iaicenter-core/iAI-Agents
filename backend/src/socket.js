module.exports = function initSocket(io) {
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);
  
      socket.on('user_message', async (data) => {
        // data: { token, message }
        // ในกรณี Production ตรวจสอบ token ด้วย
        // เรียกใช้ NLU ถ้าจำเป็น
        // ส่ง response กลับ
        socket.emit('assistant_response', { text: 'This is a response from server.' });
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  };