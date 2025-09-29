import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import type { MobileNavProp } from "../lib/types";

export default function MobileMenuButton({
  handleToggle,
  isMenuOpen,
}: MobileNavProp) {
  return (
    <div className="md:hidden flex items-center">
      <SignedIn>
        <div className="pt-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-8 h-8 border border-gray-300 dark:border-gray-600 rounded-full",
              },
            }}
          />
        </div>
      </SignedIn>
      <button
        onClick={handleToggle}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-100 hover:text-[#3190F8] focus:outline-none transition-colors duration-300"
      >
        {isMenuOpen ? (
          <XMarkIcon className="h-7 w-7 cursor-pointer" />
        ) : (
          <Bars3Icon className="h-7 w-7 cursor-pointer" />
        )}
      </button>
    </div>
  );
}
