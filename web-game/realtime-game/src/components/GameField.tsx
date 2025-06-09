import React from 'react';
import type { Player } from '../types/player';

type Props = {
  players: Player[];
};

export default function GameField({ players }: Props) {
  return (
    <div
      style={{
        width: 800,
        height: 600,
        backgroundColor: 'black',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {players.map((player) => (
        <div
          key={player.id}
          style={{
            position: 'absolute',
            left: player.x,
            top: player.y,
            width: 10, // 👈 увеличенный размер
            height: 10,
            backgroundColor: player.color,
          }}
        />
      ))}
    </div>
  );
}
