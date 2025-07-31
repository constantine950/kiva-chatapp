import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export default function AddFriends() {
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<string[]>([]); // store user IDs

  // Mock fetch (replace with Supabase or Clerk user list)
  useEffect(() => {
    const mockUsers: User[] = [
      { id: "1", name: "Ada Lovelace", email: "ada@example.com" },
      { id: "2", name: "Grace Hopper", email: "grace@example.com" },
      { id: "3", name: "Alan Turing", email: "alan@example.com" },
    ];
    setUsers(mockUsers);
  }, []);

  const handleAddFriend = (id: string) => {
    if (!friends.includes(id)) {
      setFriends((prev) => [...prev, id]);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Discover Friends</h2>

      <ul className="space-y-4">
        {users.map((user) => {
          const isFriend = friends.includes(user.id);

          return (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium">{user.name}</p>
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
    </div>
  );
}
