import { Link } from "react-router";
import { setMenuOpen } from "../redux/slice/navSlice";
import { useAppDispatch } from "../redux/hook/selectors";

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
