import React, { useState } from 'react';
import { queryRAG } from '../services/api';

function RAGQueryBox() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await queryRAG(query);
    setAnswer(result.answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>
      <p>Answer: {answer}</p>
    </div>
  );
}

export default RAGQueryBox;