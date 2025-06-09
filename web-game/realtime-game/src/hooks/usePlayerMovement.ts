import { useEffect, useCallback } from 'react';

export function usePlayerMovement(updatePosition: (delta: { x: number; y: number }) => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 5; // 👈 увеличь на своё усмотрение
      switch (e.key) {
        case 'w':
          updatePosition({ x: 0, y: -step });
          break;
        case 'a':
          updatePosition({ x: -step, y: 0 });
          break;
        case 's':
          updatePosition({ x: 0, y: step });
          break;
        case 'd':
          updatePosition({ x: step, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [updatePosition]);
}
