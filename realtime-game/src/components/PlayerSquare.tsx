import React from 'react';
import type { Player } from '../types/player';

type PlayerSquareProps = {
  player: Player;
};

const PlayerSquare = React.memo(({ player }: PlayerSquareProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${player.x}px, ${player.y}px)`,
        width: 20,
        height: 20,
        backgroundColor: player.color,
      }}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.player.x === nextProps.player.x &&
    prevProps.player.y === nextProps.player.y &&
    prevProps.player.id === nextProps.player.id
  );
});

export default PlayerSquare;
