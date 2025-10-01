import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { type FormEvent, useEffect, useRef } from "react";
import type { ChatWindowProps } from "../lib/types";
import { useUser } from "@clerk/clerk-react";

export default function ChatWindow({
  messages,
  input,
  setInput,
  onSend,
}: ChatWindowProps) {
  const { user } = useUser();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Send message via your existing onSend function
    onSend();

    // Clear input
    setInput("");
  };

  // Auto scroll when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs lg:max-w-md break-words shadow-sm ${
                msg.senderId === user?.id
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-[10px] opacity-70 mt-1 text-right">
                {msg.createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2"
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full text-white transition-colors"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
    </div>
  );
}
