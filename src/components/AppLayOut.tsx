import { Outlet } from "react-router";

export default function AppLayOut() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}
