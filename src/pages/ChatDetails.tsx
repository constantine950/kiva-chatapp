import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ChatWindow from "../components/ChatWindow";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFriendDetailAndMessages, sendMessage } from "../lib/dbqueries";
import { useUser } from "@clerk/clerk-react";

export default function ChatDetail() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: friendAndMessages } = useQuery({
    queryKey: ["friendAndMessages", id],
    queryFn: () => getFriendDetailAndMessages(user?.id, id || ""),
    enabled: !!user && !!id,
  });

  const { mutate: sendMessages } = useMutation({
    mutationKey: ["sendMessages"],
    mutationFn: ({
      sender_id,
      receiver_id,
      text,
    }: {
      sender_id: string | undefined;
      receiver_id: string | undefined;
      text: string;
    }) => sendMessage(sender_id, receiver_id, text),
  });

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessages({ sender_id: user?.id, receiver_id: id, text: input });
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
        <img
          src={friendAndMessages?.friend?.image}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{friendAndMessages?.friend?.full_name}</p>
          <p className="text-sm text-green-500">Active now</p>
        </div>
      </div>

      {/* Chat window */}
      <ChatWindow
        messages={friendAndMessages?.messages}
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
    </div>
  );
}
