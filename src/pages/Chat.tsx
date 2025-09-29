import { Outlet, useLocation } from "react-router";
import ChatList from "../components/ChatList";
import NoChatSelected from "../components/NoChatSelected";
import { useUser } from "@clerk/clerk-react";
import NoUser from "../components/NoUser";

export default function Chat() {
  const { user } = useUser();
  const location = useLocation();
  const isChatDetailRoute = location.pathname.match(/^\/dashboard\/chat\/.+/);

  if (!user) return <NoUser />;

  return (
    <div className="pt-20 h-[calc(100vh-5rem)] flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile: only list, unless a chat is opened */}
      {!isChatDetailRoute && (
        <div className="block md:hidden w-full">
          <ChatList />
        </div>
      )}

      {/* Desktop view always shows chat list */}
      <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 border-r bg-white dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
        <ChatList />
      </div>

      {/* Chat detail or fallback */}
      <div className="flex-1 overflow-hidden">
        {isChatDetailRoute ? (
          <Outlet />
        ) : (
          <div className="hidden md:flex h-full justify-center items-center text-gray-500 dark:text-gray-400 text-lg">
            <NoChatSelected />
          </div>
        )}
      </div>
    </div>
  );
}
