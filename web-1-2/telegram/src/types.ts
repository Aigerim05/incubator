export type Message = {
  id: string;
  chatId: string;
  sender: 'user' | 'ai' | 'person';
  text: string;
  timestamp: number;
};

export type Chat = {
  id: string;
  name: string;
  type: 'ai' | 'person';
  avatar: string;
  lastMessage?: string;
  lastTimestamp?: number;
  unread?: number;
};
