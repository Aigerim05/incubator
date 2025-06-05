import type { Message } from "../types";
import clsx from "clsx";

type Props = {
  message: Message;
  isOut: boolean;
};

export default function MessageBubble({ message, isOut }: Props) {
  return (
    <div className={clsx(
      "flex mb-2",
      isOut ? "justify-end" : "justify-start"
    )}>
      <div className={clsx(
        "max-w-[70%] px-4 py-2 text-sm",
        isOut
          ? "bg-blue-500 text-white rounded-2xl rounded-br-md"
          : "bg-white text-gray-900 rounded-2xl rounded-bl-md shadow-sm"
      )}>
        {message.text}
        <div className="text-xs text-gray-400 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
