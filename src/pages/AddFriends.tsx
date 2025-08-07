import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addFriends, getRandomUsers } from "../lib/dbqueries";
import { useState } from "react";
import Spinner from "../components/Spinner";
import supabase from "../lib/supabase";

export default function AddFriends() {
  const [friends, setFriends] = useState<string[]>([]);
  const { user } = useUser();

  const { data: users, isLoading } = useQuery({
    queryKey: ["addFriends", user?.id],
    queryFn: async () => {
      // Step 1: Get random users excluding current user
      const randomUsers = await getRandomUsers(user);

      // Step 2: Get IDs of users already added as friends
      const { data: friendsData, error } = await supabase
        .from("Friends")
        .select("friend_id")
        .eq("user_id", user?.id); // Clerk ID

      if (error) {
        console.error("Error fetching friends:", error);
        return randomUsers?.map((u) => ({ ...u, isFriend: false }));
      }

      const friendIds = friendsData?.map((f) => f.friend_id) || [];

      // Step 3: Tag each user with isFriend
      const usersWithStatus = randomUsers?.map((u) => ({
        ...u,
        isFriend: friendIds.includes(u.id),
      }));

      return usersWithStatus;
    },
    enabled: !!user,
  });

  const { mutate: addFriend } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: ({
      currentUserId,
      friendId,
    }: {
      currentUserId: string;
      friendId: string;
    }) => addFriends(currentUserId, friendId),
  });

  const handleAddFriend = (id: string) => {
    if (!user?.id) return;

    if (!friends.includes(id)) {
      setFriends((prev) => [...prev, id]);
      addFriend({ currentUserId: user.id, friendId: id });
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Discover Friends</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="space-y-4">
          {users?.map((user) => {
            const isFriend = friends.includes(user.id);

            return (
              <li
                key={user.id}
                className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{user.full_name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                {isFriend || user.isFriend ? (
                  <span className="text-green-500 text-sm font-medium">
                    Added
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user.id)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Add Friend
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
