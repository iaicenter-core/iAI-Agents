import React, { useState, useEffect } from 'react';
import { addDocument, getDocuments, deleteDocument } from '../services/api';

function KnowledgeBaseManager() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchDocuments() {
      const docs = await getDocuments();
      setDocuments(docs);
    }
    fetchDocuments();
  }, []);

  const handleAdd = async () => {
    await addDocument(title, content);
    setTitle('');
    setContent('');
    const docs = await getDocuments();
    setDocuments(docs);
  };

  const handleDelete = async (docTitle) => {
    await deleteDocument(docTitle);
    const docs = await getDocuments();
    setDocuments(docs);
  };

  return (
    <div>
      <h3>Knowledge Base</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleAdd}>Add Document</button>
      <ul>
        {documents.map((doc) => (
          <li key={doc.title}>
            {doc.title}
            <button onClick={() => handleDelete(doc.title)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnowledgeBaseManager;