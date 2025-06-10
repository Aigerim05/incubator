import type { Player } from '../types/player';
import PlayerSquare from './PlayerSquare';

type GameFieldProps = {
  players: Player[];
};

export default function GameField({ players }: GameFieldProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 800,
        height: 600,
        backgroundColor: 'black',
        margin: 'auto',
        overflow: 'hidden',
      }}
    >
      {players.map((player) => (
        <PlayerSquare key={player.id} player={player} />
      ))}
    </div>
  );
}
