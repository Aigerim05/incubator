import type { FC } from "react";
import type { Chat } from "../types/chat";

const chats: Chat[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    avatar: "", // No avatar, will fallback to emoji or DiceBear
    lastMessage: "How can I help you today?",
    unreadCount: 0,
    isAI: true,
  },
];

const themeClasses = {
  sidebar: "bg-white border-r border-gray-200 w-80 flex flex-col",
  chatItem: "flex items-center px-4 py-3 cursor-pointer hover:bg-bg-secondary transition",
  avatar: "w-12 h-12 rounded-full mr-4 flex items-center justify-center bg-bg-secondary text-2xl",
  chatName: "font-semibold text-text-primary",
  lastMessage: "text-sm text-text-secondary truncate",
};

export const Sidebar: FC = () => (
  <aside className={themeClasses.sidebar}>
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div key={chat.id} className={themeClasses.chatItem}>
          <div className={themeClasses.avatar}>
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <div className={themeClasses.chatName}>{chat.name}</div>
            <div className={themeClasses.lastMessage}>{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  </aside>
);