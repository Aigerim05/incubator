import type { FC } from "react";

const themeClasses = {
  chatHeader: "bg-white border-b border-gray-200 px-4 py-3 flex items-center",
  avatar: "w-10 h-10 rounded-full flex items-center justify-center bg-bg-secondary text-2xl mr-3",
  name: "font-semibold text-text-primary text-lg",
  onlineIndicator: "w-3 h-3 bg-green-500 rounded-full border-2 border-white ml-2",
};

export const ChatHeader: FC = () => (
  <header className={themeClasses.chatHeader}>
    <div className={themeClasses.avatar}>🤖</div>
    <div>
      <div className={themeClasses.name}>GPT-4</div>
      <div className="flex items-center text-xs text-text-secondary">
        <span>online</span>
        <span className={themeClasses.onlineIndicator}></span>
      </div>
    </div>
  </header>
);

