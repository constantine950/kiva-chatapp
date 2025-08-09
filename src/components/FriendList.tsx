import { Link } from "react-router";

type Friend = {
  friendClerk_id: string;
  Users: {
    full_name: string;
    image: string;
  } | null;
};

export default function FriendList(friend: Friend) {
  return (
    <Link
      to={`/dashboard/chat/${friend.friendClerk_id}`}
      key={friend.friendClerk_id}
      className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
    >
      <div className="flex items-center gap-3">
        <img
          src={friend.Users?.image}
          className="w-10 h-10 rounded-full object-cover"
          alt={friend.Users?.full_name}
        />
        <div>
          <p className="font-medium">{friend.Users?.full_name}</p>
        </div>
      </div>
      <button className="text-sm text-blue-500 hover:underline">Message</button>
    </Link>
  );
}
