import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 flex justify-between items-center py-4 px-5 shadow-md">
      <Logo />
      <Navigation />
    </header>
  );
}
