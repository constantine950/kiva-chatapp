import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayOut from "./components/HomeLayOut";
import Home from "./pages/Home";
import AppLayOut from "./components/AppLayOut";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import ChatDetail from "./pages/ChatDetails";
import { useUser } from "@clerk/clerk-react";
import AddFriends from "./pages/AddFriends";
import { syncUserToSupabase } from "./lib/dbqueries";
import { useQuery } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/dashboard",
        Component: AppLayOut,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: "chat",
            Component: Chat,
            children: [
              {
                path: ":id",
                Component: ChatDetail,
              },
            ],
          },
          {
            path: "friends",
            Component: Friends,
          },
          {
            path: "addfriends",
            Component: AddFriends,
          },
          {
            path: "settings",
            Component: Settings,
          },
        ],
      },
    ],
  },
]);

function App() {
  const { user } = useUser();

  useQuery({
    queryKey: ["synUser", user?.id],
    queryFn: () => syncUserToSupabase(user),
    enabled: !!user,
    staleTime: Infinity,
  });

  return <RouterProvider router={router} />;
}

export default App;
