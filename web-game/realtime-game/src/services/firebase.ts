import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  onDisconnect,
  onValue,
  remove,
  type DatabaseReference,
} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD5ZWIBhxyCHnp7RmbszzDUYEiWBCLyibI",
    authDomain: "realtime-game-ea134.firebaseapp.com",
    projectId: "realtime-game-ea134",
    storageBucket: "realtime-game-ea134.firebasestorage.app",
    messagingSenderId: "1000280937475",
    appId: "1:1000280937475:web:6458470ead156d328caa36",
    measurementId: "G-Q1X2JBCQCZ"
  };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
  db,
  ref,
  set,
  remove,
  onValue,
  onDisconnect,
  type DatabaseReference,
};
