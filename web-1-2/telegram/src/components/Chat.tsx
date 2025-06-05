import { useRef, useState, useEffect } from "react";
import type { Chat, Message } from "../types";
import MessageBubble from "./Message";
import { FaPaperPlane } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";

type Props = {
  chat: Chat;
  messages: Message[];
  onSend: (text: string) => void;
  aiTyping: boolean;
};

export default function ChatArea({ chat, messages, onSend, aiTyping }: Props) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [chat.id]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <div className="mr-3">
          {chat.type === "ai" ? (
            <span className="inline-block w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold text-xl">G</span>
          ) : (
            <span className="inline-block w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-xl">{chat.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <div className="font-semibold">{chat.name}</div>
          {chat.type === "ai" && (
            <div className="flex items-center text-xs text-green-600">
              <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-white mr-1" />
              online
            </div>
          )}
        </div>
      </header>
      <ScrollToBottom className="flex-1 overflow-y-auto px-4 py-4 bg-bg-secondary">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOut={msg.sender === "user"}
          />
        ))}
        {aiTyping && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white mr-2">G</div>
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 text-sm text-gray-900 shadow-sm animate-pulse">
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full"></span>
            </div>
          </div>
        )}
      </ScrollToBottom>
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-end">
        <textarea
          ref={inputRef}
          className="flex-1 resize-none border-none outline-none bg-transparent text-sm max-h-24 overflow-y-auto"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
        />
        <button
          className="ml-2 p-2 rounded-full  grey-500"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
