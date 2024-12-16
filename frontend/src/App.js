import React, { useState, useEffect } from 'react';
import AvatarDisplay from './components/AvatarDisplay';
import ChatBox from './components/ChatBox';
import MicrophoneButton from './components/MicrophoneButton';
import { initSocket } from './services/socket';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = initSocket();
    s.on('assistant_response', (data) => {
      setMessages(prev => [...prev, { sender: 'assistant', text: data.text }]);
    });
    setSocket(s);
    return () => s.disconnect();
  }, []);

  const handleUserMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
    socket.emit('user_message', { message: text });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'row' }}>
      <div style={{ flex: 2, borderRight: '1px solid #ccc' }}>
        <AvatarDisplay />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatBox messages={messages} onSend={handleUserMessage} />
        <MicrophoneButton onVoiceInput={(text) => handleUserMessage(text)} />
      </div>
    </div>
  );
}

export default App;