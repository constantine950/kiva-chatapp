import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/">
      <img className="h-7" src="/kivaa.png" />
    </Link>
  );
}
