import { Link, useLocation } from "react-router";
import type { MenuItemProps } from "../lib/types";

export default function MenuItem({ item, className, onClick }: MenuItemProps) {
  const pathName = useLocation();

  return (
    <Link
      to={item.link}
      className={`${className} ${
        pathName.pathname === item.link
          ? "text-[#3190F8]"
          : "text-gray-900 dark:text-gray-100"
      }`}
      onClick={onClick}
    >
      {item.text}
    </Link>
  );
}
