export type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  unreadCount?: number;
  isAI?: boolean;
};
