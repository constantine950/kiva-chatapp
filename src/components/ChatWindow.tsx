import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";

type Message = {
  id: number;
  sender: "me" | "other";
  text?: string;
  time: string;
  file?: {
    name: string;
    type: string;
  };
};

type Props = {
  messages: Message[];
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
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow ${
              msg.sender === "me"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-white text-gray-800 border"
            }`}
          >
            {msg.text && <p>{msg.text}</p>}
            {msg.file && (
              <div className="mt-2 bg-gray-100 rounded-md p-2 flex items-center gap-2 text-sm">
                <div className="bg-red-500 text-white px-2 py-1 rounded uppercase text-xs">
                  {msg.file.type}
                </div>
                <span className="text-gray-700 truncate">{msg.file.name}</span>
                <button className="ml-auto text-blue-500 text-sm hover:underline">
                  Download
                </button>
              </div>
            )}
            <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
          </div>
        ))}
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
