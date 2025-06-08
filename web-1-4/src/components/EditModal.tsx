import { useState, useEffect } from 'react';

type EditModalProps = {
  isOpen: boolean;
  currentText: string;
  onClose: () => void;
  onSave: (newText: string) => void;
};

export default function EditModal({ isOpen, currentText, onClose, onSave }: EditModalProps) {
  const [value, setValue] = useState(currentText);
  useEffect(() => { setValue(currentText); }, [currentText]);
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 300 }}>
        <h2>Edit Feedback</h2>
        <textarea value={value} onChange={e => setValue(e.target.value)} style={{ width: '100%', minHeight: 80 }} />
        <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => { onSave(value); onClose(); }}>Save</button>
        </div>
      </div>
    </div>
  );
} 