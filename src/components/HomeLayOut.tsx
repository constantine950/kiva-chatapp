import { Outlet } from "react-router";
import Header from "./Header";

export default function HomeLayOut() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
