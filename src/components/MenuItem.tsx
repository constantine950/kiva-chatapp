import { Link, useLocation } from "react-router";

type MenuItems = {
  id: number;
  link: string;
  text: string;
};

type Props = {
  key: number;
  className: string;
  item: MenuItems;
  onClick?: () => void;
};

export default function MenuItem({ item, className, onClick }: Props) {
  const pathName = useLocation();

  return (
    <Link
      to={item.link}
      className={`${className} ${
        pathName.pathname === item.link ? "text-[#3190F8]" : "text-gray-900"
      }`}
      onClick={onClick}
    >
      {item.text}
    </Link>
  );
}
