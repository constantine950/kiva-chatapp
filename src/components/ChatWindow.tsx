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
    onSend();
  };

  // Auto scroll when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-sm ${
                msg.senderId === user?.id
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] opacity-70 mt-1 text-right">
                {msg.createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* invisible div used as scroll target */}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Sticky input box */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white border-t flex items-center space-x-2 sticky bottom-0"
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring focus:ring-blue-200"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
    </div>
  );
}
