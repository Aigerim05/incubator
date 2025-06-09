import { useState } from 'react';
import type { ItemCreate } from '../types/item';

type Props = {
  onSubmit: (item: ItemCreate) => void;
  initial?: ItemCreate;
};

export default function ItemForm({ onSubmit, initial }: Props) {
  const [name, setName] = useState(initial?.name || '');
  const [password, setPassword] = useState(initial?.password || '');
  const [description, setDescription] = useState(initial?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, password, description });
    setName('');
    setPassword('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
