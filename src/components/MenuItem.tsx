import { Link } from "react-router";

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
  return (
    <Link to={item.link} className={className} onClick={onClick}>
      {item.text}
    </Link>
  );
}
