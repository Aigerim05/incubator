import { useState } from 'react';
import type { FormEvent } from 'react';

type FeedbackFormProps = {
  onAdd: (text: string) => void;
};

export default function FeedbackForm({ onAdd }: FeedbackFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Your idea/feedback/suggestion..."
        style={{
          padding: 14,
          width: '100%',
          border: '2px solid #4f8cff',
          borderRadius: 8,
          outline: 'none',
          fontSize: 16,
          background: '#f0f6ff',
          marginRight: 8
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #4f8cff33',
          whiteSpace: 'nowrap'
        }}
      >
        Send
      </button>
    </form>
  );
} 