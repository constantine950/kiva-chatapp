import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addFriends, getRandomUsers } from "../lib/dbqueries";
import { useState } from "react";

export default function AddFriends() {
  const [friends, setFriends] = useState<string[]>([]);
  const { user } = useUser();

  const { data: users, isLoading } = useQuery({
    queryKey: ["addFriends", user?.id],
    queryFn: () => getRandomUsers(user),
    enabled: !!user, // prevents running query if user is undefined
  });

  const { mutate: addFriend } = useMutation({
    mutationKey: ["addfriend"],
    mutationFn: (id: string) => addFriends(user, id),
  });

  const handleAddFriend = (id: string) => {
    if (!friends.includes(id)) {
      setFriends((prev) => [...prev, id]);
      addFriend(id);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Discover Friends</h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
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
                {isFriend ? (
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
