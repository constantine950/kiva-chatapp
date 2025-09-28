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
import { useSync } from "./lib/hooks/useSync";
import { useEffect } from "react";
import { useAppSelector } from "./redux/hook/selectors";

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
  useSync(user);

  const mode = useAppSelector((state) => state.theme.mode);

  console.log("Current theme mode:", mode); // Debug log

  useEffect(() => {
    const root = document.documentElement;
    console.log("Applying theme for mode:", mode); // Debug log

    const applyTheme = (theme: "dark" | "light") => {
      console.log("Applying theme:", theme); // Debug log
      root.classList.remove("dark", "light");
      root.classList.add(theme);
    };

    if (mode === "dark") {
      applyTheme("dark");
    } else if (mode === "light") {
      applyTheme("light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      console.log("System prefers dark:", prefersDark); // Debug log
      applyTheme(prefersDark ? "dark" : "light");
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("Setting up system theme listener"); // Debug log

    const handler = (e: MediaQueryListEvent) => {
      console.log("System theme changed, prefers dark:", e.matches); // Debug log
      const root = document.documentElement;
      root.classList.remove("dark", "light");
      root.classList.add(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      console.log("Cleaning up system theme listener"); // Debug log
      mediaQuery.removeEventListener("change", handler);
    };
  }, [mode]);

  return <RouterProvider router={router} />;
}

export default App;
