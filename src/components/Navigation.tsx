import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { items } from "../data/menuDataType";
import MenuItem from "./MenuItem";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <ul className="flex items-center space-x-8">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              className="hover:text-[#3190F8] font-medium transition-colors duration-300"
            />
          ))}
        </ul>

        <div className="flex items-center space-x-4 ml-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#3190F8] hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="border-2 hover:bg-gray-100 border-gray-400 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <SignedIn>
          <div className="pt-2">
            <UserButton />
          </div>
        </SignedIn>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#3190F8] focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-7 w-7 cursor-pointer" />
          ) : (
            <Bars3Icon className="h-7 w-7 cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
          <div className="px-5 py-3 space-y-1">
            {items.map((item) => (
              <MenuItem
                onClick={toggleMenu}
                key={item.id}
                item={item}
                className="block px-3 py-2 rounded-md text-base font-medium  hover:text-[#3190F8] hover:bg-gray-50"
              />
            ))}

            <SignedOut>
              <div className="pt-4 pb-2 border-t border-gray-200 space-y-3">
                <SignInButton mode="modal">
                  <button className="w-full bg-[#3190F8] hover:bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-300">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full border-2 hover:bg-gray-100 border-gray-400 px-3 py-1.5 rounded-md text-base font-medium transition-colors duration-300">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </>
  );
}
