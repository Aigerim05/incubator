import { Sidebar } from "./components/Sidebar";
import { ChatHeader } from "./components/ChatHeader";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { TypingIndicator } from "./components/TypingIndicator";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([]);
  const [aiTyping, setAiTyping] = useState(false);

  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setAiTyping(true);
    // Simulate AI typing for now
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai", text: "This is a mock AI reply." }]);
      setAiTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        <ChatHeader />
        <MessageList messages={messages} />
        {aiTyping && <TypingIndicator />}
        <MessageInput onSend={handleSend} disabled={aiTyping} />
      </main>
    </div>
  );
}

export default App;