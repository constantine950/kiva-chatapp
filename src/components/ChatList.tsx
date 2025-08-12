import { Link } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getChatListWithLastMessage } from "../lib/dbqueries";
import { useUser } from "@clerk/clerk-react";

type ChatList = {
  friend_id: string;
  friend_clerk_id: string;
  friend_full_name: string;
  friend_image: string;
  last_message_text: string;
  last_message_time: string;
};

export default function ChatList() {
  const { user } = useUser();

  const { data: chatList = [] } = useQuery<ChatList[]>({
    queryKey: ["chatList", user?.id],
    queryFn: () => getChatListWithLastMessage(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <div className="h-full border-r w-full md:max-w-sm px-4 py-6 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>

      {/* List or Empty State */}
      {chatList.length > 0 ? (
        <ul className="space-y-4">
          {chatList.map((chat) => (
            <li key={chat.friend_id}>
              <Link
                to={`/dashboard/chat/${chat.friend_clerk_id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={chat.friend_image}
                  alt={chat.friend_full_name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200"
                />
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {chat.friend_full_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate w-40">
                    {chat.last_message_text || "No messages yet"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            💬
          </div>
          <p className="text-sm">No chats yet</p>
          <p className="text-xs text-gray-400">
            Start a conversation to see it here
          </p>
        </div>
      )}
    </div>
  );
}
