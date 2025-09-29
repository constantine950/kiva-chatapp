import { Link } from "react-router";
import { setMenuOpen } from "../redux/slice/navSlice";
import { useAppDispatch } from "../redux/hook/selectors";

export default function Logo() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setMenuOpen(false));
  }

  return (
    <Link to="/" onClick={handleClick} className="flex items-center">
      <img
        className="h-7 dark:brightness-90 transition"
        src="/kivaa.png"
        alt="Kivaa Logo"
      />
    </Link>
  );
}
