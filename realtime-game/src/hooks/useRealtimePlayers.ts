import { useEffect, useState } from 'react';
import { db, ref, onValue } from '../services/firebase';
import type { Player } from '../types/player';

export function useRealtimePlayers(): Player[] {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const playersRef = ref(db, 'players');
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const parsedPlayers = Object.values(val) as Player[];
        setPlayers(parsedPlayers);
      } else {
        setPlayers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return players;
}
