import { Link } from "react-router"; // use react-router-dom here

interface Friend {
  id: number;
  name: string;
  status: "Online" | "Offline";
}

export default function Friends() {
  const friends: Friend[] = [
    // Uncomment this to test empty state
    // { id: 1, name: "Laney Gray", status: "Online" },
    // { id: 2, name: "Oscar Thomsen", status: "Offline" },
    // { id: 3, name: "Jennifer Fritz", status: "Online" },
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Your Friends</h2>

      {friends.length === 0 ? (
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
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium">{friend.name}</p>
                  <p
                    className={`text-sm ${
                      friend.status === "Online"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {friend.status}
                  </p>
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
