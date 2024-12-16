import React, { useState } from 'react';

function ChatBox({ messages, onSend }) {
  const [input, setInput] = useState('');

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div style={{ flex: 1, border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '10px', textAlign: m.sender === 'user' ? 'right' : 'left' }}>
            <strong>{m.sender}:</strong> {m.text}
          </div>
        ))}
      </div>
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Type your message..."
        style={{ padding: '10px', borderTop: '1px solid #ccc' }}
      />
    </div>
  );
}

export default ChatBox;