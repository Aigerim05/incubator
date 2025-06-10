import { useEffect } from 'react';

type MoveHandler = (delta: { x: number; y: number }) => void;

export function usePlayerMovement(handleMove: MoveHandler) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10;
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          handleMove({ x: 0, y: -step });
          break;
        case 'a':
        case 'ArrowLeft':
          handleMove({ x: -step, y: 0 });
          break;
        case 's':
        case 'ArrowDown':
          handleMove({ x: 0, y: step });
          break;
        case 'd':
        case 'ArrowRight':
          handleMove({ x: step, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);
}
