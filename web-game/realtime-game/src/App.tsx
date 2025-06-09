import { useEffect, useState } from 'react';
import GameField from './components/GameField';
import { useRealtimePlayers } from './hooks/useRealtimePlayers';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import { db, ref, set, onDisconnect, remove } from './services/firebase';
import { generatePlayerId } from './utils/generateId';
import type { Player } from './types/player';

const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 600;

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const players = useRealtimePlayers();

  // 👇 1. При подключении игрока
  useEffect(() => {
    const id = generatePlayerId();
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const initialPlayer: Player = {
      id,
      name: 'Anonymous',
      color,
      x: FIELD_WIDTH / 2,
      y: FIELD_HEIGHT / 2,
    };

    const playerRef = ref(db, 'players/' + id);
    set(playerRef, initialPlayer);
    onDisconnect(playerRef).remove(); // удаление при разрыве соединения
    setPlayer(initialPlayer);
  }, []);

  // 👇 2. Удаление записи при размонтировании
  useEffect(() => {
    return () => {
      if (player) {
        const playerRef = ref(db, 'players/' + player.id);
        remove(playerRef);
      }
    };
  }, [player]);

  // 👇 3. Обработка движения
  function updatePosition(delta: { x: number; y: number }) {
    if (!player) return;

    const newX = Math.min(Math.max(0, player.x + delta.x), FIELD_WIDTH - 4);
    const newY = Math.min(Math.max(0, player.y + delta.y), FIELD_HEIGHT - 4);
    const updatedPlayer = { ...player, x: newX, y: newY };
    setPlayer(updatedPlayer);

    const playerRef = ref(db, 'players/' + player.id);
    set(playerRef, updatedPlayer);
  }

  // 👇 4. Хук для управления WASD
  usePlayerMovement(updatePosition);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>🟪 Multiplayer React Game</h2>
      <GameField
  players={
    player
      ? [...players.filter(p => p.id !== player.id), player] // ⚠️ заменим текущего игрока локальной версией
      : players
  }
/>

    </div>
  );
}
