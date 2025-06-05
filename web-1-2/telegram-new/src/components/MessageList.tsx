import type { FC } from "react";

type Message = {
  from: "user" | "ai";
  text: string;
};

export const MessageList: FC<{ messages: Message[] }> = ({ messages }) => (
  <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 bg-bg-primary">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`max-w-[70%] ${
          msg.from === "user"
            ? "self-end bg-primary-blue text-white rounded-2xl rounded-br-md px-4 py-2"
            : "self-start bg-white text-gray-900 rounded-2xl rounded-bl-md shadow-sm px-4 py-2"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>
);