import { useEffect, useState } from 'react';
import * as api from '../api/items';
import type { Item, ItemCreate } from '../types/item';
import ItemForm from './ItemForm';

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = async () => {
    const res = await api.getItems();
    setItems(res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data: ItemCreate) => {
    await api.createItem(data);
    load();
  };

  const handleUpdate = async (data: ItemCreate) => {
    if (editingId !== null) {
      await api.updateItem(editingId, data);
      setEditingId(null);
      load();
    }
  };

  const handleDelete = async (id: number) => {
    await api.deleteItem(id);
    load();
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <ItemForm onSubmit={handleCreate} />
      <h2>Items</h2>
      {items.map(item =>
        editingId === item.id ? (
          <ItemForm key={item.id} onSubmit={handleUpdate} initial={item} />
        ) : (
          <div key={item.id}>
            <p>
              <b>{item.name}</b>: {item.description} (password: {item.password})
            </p>
            <button onClick={() => setEditingId(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        )
      )}
    </div>
  );
}
