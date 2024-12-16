import React from 'react';

function MicrophoneButton({ onVoiceInput }) {
  const handleClick = async () => {
    // Mock voice input
    const mockText = "Hello from voice input!";
    onVoiceInput(mockText);
  };

  return (
    <button onClick={handleClick} style={{ padding: '10px', margin: '10px' }}>🎤 Voice Input</button>
  );
}

export default MicrophoneButton;