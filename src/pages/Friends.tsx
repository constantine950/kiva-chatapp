export default function Friends() {
  const friends = [
    { id: 1, name: "Laney Gray", status: "Online" },
    { id: 2, name: "Oscar Thomsen", status: "Offline" },
    { id: 3, name: "Jennifer Fritz", status: "Online" },
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-4">Friends</h2>
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
    </div>
  );
}
