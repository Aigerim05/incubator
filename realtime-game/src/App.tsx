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
  const [playerId, setPlayerId] = useState<string | null>(null);
  const players = useRealtimePlayers();

  // Создаем игрока при монтировании
  useEffect(() => {
    const id = generatePlayerId();
    const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const newPlayer: Player = {
      id,
      name: 'Anonymous',
      color,
      x: FIELD_WIDTH / 2,
      y: FIELD_HEIGHT / 2,
    };

    const playerRef = ref(db, 'players/' + id);
    set(playerRef, newPlayer).then(() => {
      onDisconnect(playerRef).remove();
    });
    setPlayerId(id);

    return () => {
      remove(playerRef);
    };
  }, []);

  // Обновление позиции игрока
  function updatePosition(delta: { x: number; y: number }) {
    if (!playerId) return;
    const currentPlayer = players.find(p => p.id === playerId);
    if (!currentPlayer) return;

    const newX = Math.min(Math.max(0, currentPlayer.x + delta.x), FIELD_WIDTH - 20);
    const newY = Math.min(Math.max(0, currentPlayer.y + delta.y), FIELD_HEIGHT - 20);
    const playerRef = ref(db, 'players/' + playerId);
    set(playerRef, { ...currentPlayer, x: newX, y: newY });
  }

  // Обработка WASD
  usePlayerMovement(updatePosition);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>🟪 Multiplayer React Game</h2>
      <GameField players={players} />
    </div>
  );
}
