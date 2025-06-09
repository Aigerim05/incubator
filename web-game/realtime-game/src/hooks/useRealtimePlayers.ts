import { useEffect, useState } from 'react';
import { db, ref, onValue } from '../services/firebase';
import type { Player } from '../types/player';

export function useRealtimePlayers(): Player[] {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const playersRef = ref(db, 'players');
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const result = Object.values(data) as Player[];
        setPlayers(result);
      } else {
        setPlayers([]);
      }
    });

    return () => unsubscribe(); // отписка при размонтировании
  }, []);

  return players;
}
