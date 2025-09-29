import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2">
          <Logo />
          <Navigation />
        </div>
      </div>
    </header>
  );
}
