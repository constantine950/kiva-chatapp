import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navigation() {
  return (
    <nav>
      <Bars3Icon className="h-8 cursor-pointer" />
      <ul className="hidden items-center space-x-10 md:flex">
        <li>Home</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
