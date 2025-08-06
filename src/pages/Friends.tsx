import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // Should be 'react-router-dom'
import { getUserFriends } from "../lib/dbqueries";
import { useUser } from "@clerk/clerk-react";
import Spinner from "../components/Spinner";

type Friend = {
  friend_id: string;
  Users: {
    full_name: string;
    image: string;
  } | null;
};

export default function Friends() {
  const { user } = useUser();

  const { data: friends, isLoading } = useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: () => getUserFriends(user?.id),
    enabled: !!user,
  });

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Your Friends</h2>

      {isLoading ? (
        <Spinner />
      ) : friends?.length === 0 ? (
        <div className="text-center text-gray-600 space-y-4">
          <p>You haven’t added any friends yet.</p>
          <Link
            to="/dashboard/addfriends"
            className="inline-block bg-[#3190F8] hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Find Friends
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {friends?.map((friend) => (
            <li
              key={friend.friend_id}
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
              <button className="text-sm text-blue-500 hover:underline">
                Message
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
