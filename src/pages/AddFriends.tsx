import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import NoUser from "../components/NoUser";
import { useAddfriends } from "../lib/hooks/useAddfriends";
import { useAddfriend } from "../lib/hooks/useAddfriend";

export default function AddFriends() {
  const [friends, setFriends] = useState<string[]>([]);
  const { user } = useUser();

  const { users, isLoading } = useAddfriends(user);
  const addFriend = useAddfriend();

  const handleAddFriend = (id: string) => {
    if (!user?.id) return;

    if (!friends.includes(id)) {
      setFriends((prev) => [...prev, id]);
      addFriend({ currentUserId: user.id, friendClerk_id: id });
    }
  };

  if (!user) return <NoUser />;

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Discover Friends</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="space-y-4">
          {users?.map((user) => {
            const isFriend = friends.includes(user.clerkId);

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
                    onClick={() => handleAddFriend(user.clerkId)}
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
