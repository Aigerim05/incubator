import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/Chat";
import type { Chat, Message } from "./types";
import { sendMessageToGPT4 } from "./api/openai";
import { v4 as uuidv4 } from "uuid";
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';

const initialChats: Chat[] = [
  {
    id: "gpt4",
    name: "GPT-4",
    type: "ai",
    avatar: "",
    lastMessage: "Ask me anything!",
    lastTimestamp: Date.now(),
    unread: 0
  },
  {
    id: "person1",
    name: "Alice",
    type: "person",
    avatar: "",
    lastMessage: "Hey, how are you?",
    lastTimestamp: Date.now() - 100000,
    unread: 1
  }
];

const initialMessages: Record<string, Message[]> = {
  gpt4: [
    {
      id: uuidv4(),
      chatId: "gpt4",
      sender: "ai",
      text: "Hi! I'm GPT-4. How can I help you today?",
      timestamp: Date.now() - 60000
    }
  ],
  person1: [
    {
      id: uuidv4(),
      chatId: "person1",
      sender: "person",
      text: "Hey, how are you?",
      timestamp: Date.now() - 100000
    }
  ]
};

const queryClient = new QueryClient();

function App() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string>("gpt4");
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [aiTyping, setAiTyping] = useState(false);

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setChats(cs =>
      cs.map(c =>
        c.id === id ? { ...c, unread: 0 } : c
      )
    );
  };

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const chatId = selectedChatId;
      const newMsg: Message = {
        id: uuidv4(),
        chatId,
        sender: "user",
        text,
        timestamp: Date.now()
      };
      setMessages(msgs => ({
        ...msgs,
        [chatId]: [...(msgs[chatId] || []), newMsg]
      }));
      setChats(cs =>
        cs.map(c =>
          c.id === chatId
            ? { ...c, lastMessage: text, lastTimestamp: Date.now() }
            : c
        )
      );

      if (chatId === "gpt4") {
        setAiTyping(true);
        const history = [...(messages[chatId] || []), newMsg]
          .slice(-10)
          .map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }));
        try {
          const aiReply = await sendMessageToGPT4(history);
          const aiMsg: Message = {
            id: uuidv4(),
            chatId,
            sender: "ai",
            text: aiReply,
            timestamp: Date.now()
          };
          setMessages(msgs => ({
            ...msgs,
            [chatId]: [...(msgs[chatId] || []), aiMsg]
          }));
          setChats(cs =>
            cs.map(c =>
              c.id === chatId
                ? { ...c, lastMessage: aiReply, lastTimestamp: Date.now() }
                : c
            )
          );
        } catch (e) {
          const errMsg: Message = {
            id: uuidv4(),
            chatId,
            sender: "ai",
            text: "Sorry, there was an error contacting GPT-4.",
            timestamp: Date.now()
          };
          setMessages(msgs => ({
            ...msgs,
            [chatId]: [...(msgs[chatId] || []), errMsg]
          }));
        }
        setAiTyping(false);
      }
    }
  });

  const handleSend = useCallback((text: string) => {
    sendMessageMutation.mutate(text);
  }, [sendMessageMutation]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <Sidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelect={handleSelectChat}
        />
        <main className="flex-1 flex flex-col">
          <ChatArea
            chat={chats.find(c => c.id === selectedChatId)!}
            messages={messages[selectedChatId] || []}
            onSend={handleSend}
            aiTyping={aiTyping}
          />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;