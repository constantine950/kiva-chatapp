import { setMenuOpen, toggleMenu } from "../redux/slice/navSlice";
import { useEffect, useRef, type RefObject } from "react";
import MobileNav from "./MobileNav";
import DestopNav from "./DestopNav";
import MobileMenuButton from "./MobileMenuButton";
import { useAppDispatch, useAppSelector } from "../redux/hook/selectors";

export default function Navigation() {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = useAppSelector((state) => state.nav.isMenuOpen);
  const dispatch = useAppDispatch();

  function handleToggle() {
    dispatch(toggleMenu());
  }

  function useClickOutside(ref: RefObject<HTMLDivElement | null>) {
    const dispatch = useAppDispatch();

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          dispatch(setMenuOpen(false));
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, dispatch]);
  }

  useClickOutside(menuRef);

  return (
    <>
      {/* Desktop Navigation */}
      <DestopNav />

      {/* Mobile menu button */}
      <MobileMenuButton handleToggle={handleToggle} isMenuOpen={isMenuOpen} />

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <MobileNav menuRef={menuRef} handleToggle={handleToggle} />
      )}
    </>
  );
}
