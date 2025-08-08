import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ChatWindow from "../components/ChatWindow";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../lib/dbqueries";
import { useUser } from "@clerk/clerk-react";

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

const initalMsg: Message[] = [
  { id: 1, sender: "me", text: "Hey!", time: "3:00 PM" },
  { id: 2, sender: "other", text: "What's up?", time: "3:02 PM" },
];

export default function ChatDetail() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initalMsg);

  const { mutate: sendMessages } = useMutation({
    mutationKey: ["sendMessages"],
    mutationFn: ({
      sender_id,
      receiver_id,
      text,
    }: {
      sender_id: string | undefined;
      receiver_id: number | undefined;
      text: string;
    }) => sendMessage(sender_id, receiver_id, text),
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "me", text: input, time: "Now" },
    ]);
    sendMessages({ sender_id: user?.id, receiver_id: Number(id), text: input });
    setInput("");
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
        <button
          onClick={() => navigate("/dashboard/chat")}
          className="block md:hidden p-1 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <img src={user?.imageUrl} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-medium">{user?.fullName}</p>
          <p className="text-sm text-green-500">Active now</p>
        </div>
      </div>

      {/* Chat window */}
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
    </div>
  );
}
