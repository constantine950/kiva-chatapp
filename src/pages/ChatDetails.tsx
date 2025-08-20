import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ChatWindow from "../components/ChatWindow";
import { sendMessage } from "../lib/firebaseQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFriendDetail } from "../lib/dbqueries";
import { useNavigate, useParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useLiveMessages } from "../lib/hooks/useLiveUpdate";

export default function ChatDetail() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const { id: friendId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: friendDetail } = useQuery({
    queryKey: ["friendDetail", friendId],
    queryFn: () => getFriendDetail(friendId!),
    enabled: !!friendId,
  });

  const messages = useLiveMessages(user?.id, friendId);

  const { mutate: sendMessages } = useMutation({
    mutationKey: ["sendMessages"],
    mutationFn: ({
      senderId,
      receiverId,
      text,
      userImg,
      userName,
      friendImg,
      friendName,
    }: {
      senderId: string;
      receiverId: string;
      text: string;
      userImg: string | undefined;
      userName: string | undefined;
      friendImg: string | undefined;
      friendName: string | undefined;
    }) =>
      sendMessage(
        senderId,
        receiverId,
        text,
        userImg,
        userName,
        friendImg,
        friendName
      ),
  });

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
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white shrink-0">
        <button
          onClick={() => navigate("/dashboard/chat")}
          className="block md:hidden p-1 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <img
          src={friendDetail?.image || "/default-avatar.png"}
          alt={friendDetail?.full_name || "Friend"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{friendDetail?.full_name}</p>
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
