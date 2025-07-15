import { Link } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ChatList() {
  const chats = [
    { id: "1", name: "Jennifer Fritz", preview: "Looking to work with..." },
    { id: "2", name: "Laney Gray", preview: "Interaction design chat..." },
    { id: "3", name: "Oscar Thomsen", preview: "Responding soon..." },
  ];

  return (
    <div className="h-full border-r w-full md:max-w-sm px-4 py-6 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>

      <ul className="space-y-4">
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link
              to={`/dashboard/chat/${chat.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium">{chat.name}</p>
                <p className="text-sm text-gray-500 truncate w-40">
                  {chat.preview}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
