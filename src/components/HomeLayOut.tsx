import { Outlet } from "react-router";
import Header from "./Header";

export default function HomeLayOut() {
  return (
    <div className="bg-gray-100">
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
