// ChatDetail.tsx
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router";
import { getFriendDetailAndMessages, sendMessage } from "../lib/dbqueries";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import supabase from "../lib/supabase";
import ChatWindow from "../components/ChatWindow";

/* ---------- types ---------- */
type Message = {
  id: number;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender: "me" | "other";
  text: string;
};

type FriendRow = {
  id: number;
  clerkId: string;
  full_name: string;
  username: string;
  email: string;
  image: string;
};

type FriendAndMessages = {
  friend: FriendRow | null;
  messages: Message[];
};

type MessageRow = {
  id: number;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  text: string;
};

/* ---------- helper ---------- */
const formatMessageTime = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
};

/* ---------- component ---------- */
export default function ChatDetail() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const { id: friendId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Query friend + messages
  const { data: friendAndMessages } = useQuery<FriendAndMessages | undefined>({
    queryKey: ["friendAndMessages", friendId],
    queryFn: () => getFriendDetailAndMessages(user?.id, friendId || ""),
    enabled: !!user && !!friendId,
  });

  // Remove the onSuccess from mutation since we're using realtime
  const { mutate: sendMessages } = useMutation({
    mutationKey: ["sendMessages"],
    mutationFn: (payload: {
      sender_id?: string;
      receiver_id?: string;
      text: string;
    }) => sendMessage(payload.sender_id, payload.receiver_id, payload.text),
    // Remove the onSuccess - let realtime handle it
  });

  // Enhanced realtime subscription
  useEffect(() => {
    if (!user?.id || !friendId) return;

    console.log("Setting up realtime channel for", user.id, "and", friendId);

    const channel = supabase
      .channel(`chat:${user.id}:${friendId}`) // More standard naming
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages", // Ensure this matches your table name case
          filter: `(sender_id=eq.${user.id} AND receiver_id=eq.${friendId}) OR (sender_id=eq.${friendId} AND receiver_id=eq.${user.id})`,
        },
        (payload) => {
          console.log("Realtime payload received:", payload);
          const newMessage = payload.new as MessageRow;
          const sender: "me" | "other" =
            newMessage.sender_id === user.id ? "me" : "other";

          // Skip if we already have this message (from optimistic update)
          queryClient.setQueryData<FriendAndMessages | undefined>(
            ["friendAndMessages", friendId],
            (old) => {
              if (!old)
                return {
                  friend: null,
                  messages: [formatMessage(newMessage, sender)],
                };

              // Check if message already exists (by id or temp id)
              const exists = old.messages.some(
                (m) =>
                  m.id === newMessage.id ||
                  (m.id < 0 &&
                    m.text === newMessage.text &&
                    m.created_at === formatMessageTime(newMessage.created_at))
              );

              if (exists) return old;

              return {
                ...old,
                messages: [...old.messages, formatMessage(newMessage, sender)],
              };
            }
          );
        }
      )
      .subscribe((status) => console.log("Subscription status:", status));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, friendId, queryClient]);

  // Helper to format messages consistently
  function formatMessage(row: MessageRow, sender: "me" | "other"): Message {
    return {
      id: row.id,
      created_at: formatMessageTime(row.created_at),
      sender_id: row.sender_id,
      receiver_id: row.receiver_id,
      sender,
      text: row.text,
    };
  }

  // Optimistic update in handleSend
  const handleSend = () => {
    if (!input.trim() || !user?.id || !friendId) return;

    const tempId = Date.now() * -1;
    const optimisticMsg: Message = {
      id: tempId,
      created_at: formatMessageTime(new Date().toISOString()),
      sender_id: user.id,
      receiver_id: friendId,
      sender: "me",
      text: input,
    };

    // Optimistic update
    queryClient.setQueryData<FriendAndMessages | undefined>(
      ["friendAndMessages", friendId],
      (old) =>
        old
          ? { ...old, messages: [...old.messages, optimisticMsg] }
          : { friend: null, messages: [optimisticMsg] }
    );

    // Send to DB - realtime will handle the update
    sendMessages({
      sender_id: user.id,
      receiver_id: friendId,
      text: input,
    });

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
        messages={friendAndMessages?.messages || []}
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
    </div>
  );
}
