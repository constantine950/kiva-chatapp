import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ChatWindow from "../components/ChatWindow";
import { useNavigate, useParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useLiveMessages } from "../lib/hooks/useLiveUpdate";
import { useFriendDetail } from "../lib/hooks/useFriendDetail";
import { useSendMessage } from "../lib/hooks/useSendMessage";

export default function ChatDetail() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const { id: friendId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const messages = useLiveMessages(user?.id, friendId);
  const friendDetail = useFriendDetail(friendId);
  const sendMessages = useSendMessage();

  const handleSend = () => {
    if (!input.trim() || !user?.id || !friendId) return;
    const pic = `https://i.pravatar.cc/48?u=49947${Date.now()}`;

    sendMessages({
      senderId: user.id,
      receiverId: friendId,
      text: input,
      userImg: user.imageUrl || pic,
      userName: user.fullName || "",
      friendImg: friendDetail?.image,
      friendName: friendDetail?.full_name,
    });
    setInput("");
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white dark:bg-gray-800 dark:border-gray-700 shrink-0">
        <button
          onClick={() => navigate("/dashboard/chat")}
          className="block md:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <img
          src={friendDetail?.image || "/default-avatar.png"}
          alt={friendDetail?.full_name || "Friend"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">
            {friendDetail?.full_name}
          </p>
          <p className="text-sm text-green-500">Active now</p>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
