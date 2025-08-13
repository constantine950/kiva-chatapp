import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";

type Message = {
  id: number;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender: "me" | "other";
  text: string;
};

type Props = {
  messages: Message[] | undefined;
  input: string;
  setInput: (text: string) => void;
  onSend: () => void;
};

export default function ChatWindow({
  messages,
  input,
  setInput,
  onSend,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Track if user is near the bottom
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    setIsNearBottom(distanceFromBottom < 100); // 100px threshold
  };

  // Scroll on new messages
  useEffect(() => {
    if (!messages) return;

    if (isFirstLoad || isNearBottom) {
      bottomRef.current?.scrollIntoView({
        behavior: isFirstLoad ? "auto" : "smooth",
      });
    }

    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [messages, isFirstLoad, isNearBottom]);

  return (
    <>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow ${
              msg.sender === "me"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-white text-gray-800 border"
            }`}
          >
            {msg.text && <p>{msg.text}</p>}
            <p className="text-xs text-right mt-1 opacity-70">
              {msg.created_at}
            </p>
          </div>
        ))}

        {/* Empty div for scroll target */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white px-4 py-3 flex items-center gap-3">
        <PaperClipIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button
          onClick={onSend}
          className="bg-[#3190F8] hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-1"
        >
          Send
          <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
        </button>
      </div>
    </>
  );
}
