import { Link } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { setMenuOpen } from "../redux/navSlice";

export default function Logo() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setMenuOpen(false));
  }
  return (
    <Link to="/" onClick={handleClick}>
      <img className="h-7" src="/kivaa.png" />
    </Link>
  );
}
