import { Link } from "react-router";
import type { Friend } from "../lib/types";

export default function FriendList(friend: Friend) {
  return (
    <Link
      to={`/dashboard/chat/${friend.friendClerk_id}`}
      key={friend.friendClerk_id}
      className="flex items-center justify-between p-4 
                 bg-white dark:bg-gray-800 
                 shadow rounded-lg 
                 hover:bg-gray-50 dark:hover:bg-gray-700 
                 transition-colors"
    >
      <div className="flex items-center gap-3">
        <img
          src={friend.Users?.image}
          className="w-10 h-10 rounded-full object-cover"
          alt={friend.Users?.full_name}
        />
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">
            {friend.Users?.full_name}
          </p>
        </div>
      </div>
      <button className="text-sm text-blue-500 hover:underline">Message</button>
    </Link>
  );
}
