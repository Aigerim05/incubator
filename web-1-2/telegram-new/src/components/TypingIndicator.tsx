import type { FC } from "react";

export const TypingIndicator: FC = () => (
  <div className="flex items-center gap-2 px-4 py-2">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
    <span className="text-xs text-text-secondary ml-2">GPT-4 is typing…</span>
  </div>
);

