import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getUserFriends } from "../lib/dbqueries";
import { useUser } from "@clerk/clerk-react";
import Spinner from "../components/Spinner";
import FriendList from "../components/FriendList";
import type { Friend } from "../lib/types";
import NoUser from "../components/NoUser";

export default function Friends() {
  const { user } = useUser();

  const { data: friends, isLoading } = useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: () => getUserFriends(user?.id),
    enabled: !!user,
  });

  if (!user) return <NoUser />;

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
            <FriendList
              key={friend.friendClerk_id}
              friendClerk_id={friend.friendClerk_id}
              Users={friend.Users}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
