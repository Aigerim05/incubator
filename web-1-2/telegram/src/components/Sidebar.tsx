import type { Chat } from "../types";
import { FaRobot, FaUser } from "react-icons/fa";
import clsx from "clsx";

type Props = {
  chats: Chat[];
  selectedChatId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ chats, selectedChatId, onSelect }: Props) {
  return (
    <aside className="bg-white border-r border-gray-200 w-80 flex flex-col">
      <header className="px-6 py-4 border-b border-gray-200 text-lg font-bold text-primary-blue">
        Messenger
      </header>
      <ul className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <li
            key={chat.id}
            className={clsx(
              "flex items-center px-4 py-3 cursor-pointer hover:bg-bg-secondary transition",
              selectedChatId === chat.id && "bg-bg-secondary"
            )}
            onClick={() => onSelect(chat.id)}
          >
            <div className="relative mr-3">
              {chat.type === "ai" ? (
                <FaRobot className="w-10 h-10 text-primary-blue" />
              ) : (
                <FaUser className="w-10 h-10 text-gray-400" />
              )}
              {chat.type === "ai" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{chat.name}</div>
              <div className="text-xs text-text-secondary truncate">{chat.lastMessage}</div>
            </div>
            {chat.unread ? (
              <span className="ml-2 bg-primary-blue text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
