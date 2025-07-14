import { Link } from "react-router";
import {
  ChatBubbleLeftEllipsisIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const sections = [
    {
      title: "Chat",
      description: "Access your conversations and start a new chat.",
      link: "/dashboard/chat",
      icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Friends",
      description: "Manage your friends list and see who's online.",
      link: "/dashboard/friends",
      icon: <UserGroupIcon className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Settings",
      description: "Update your profile and customize preferences.",
      link: "/dashboard/settings",
      icon: <Cog6ToothIcon className="w-6 h-6 text-gray-600" />,
    },
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            to={section.link}
            key={section.title}
            className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-6 flex flex-col gap-3 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              {section.icon}
              <h2 className="text-lg font-semibold text-gray-700">
                {section.title}
              </h2>
            </div>
            <p className="text-sm text-gray-500">{section.description}</p>
            <span className="text-sm text-blue-600 mt-auto hover:underline">
              Go to {section.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
