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
import { useEffect } from "react";
import supabase from "./lib/supabase";
import AddFriends from "./pages/AddFriends";

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

  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (!user) return;

      const { data: existingUser, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("clerkId", user.id)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        console.error("Error fetching user:", selectError.message);
        return;
      }

      if (!existingUser) {
        const { error: insertError } = await supabase.from("Users").insert({
          full_name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username,
          clerkId: user.id,
          image: user.imageUrl,
        });

        if (insertError) {
          console.error("Insert error:", insertError.message);
        }
      }
    };

    syncUserToSupabase();
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
