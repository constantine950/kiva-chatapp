import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import MenuItem from "./MenuItem";
import { items } from "../data/menuDataType";
import type { MobileNavProp } from "../lib/types";

export default function MobileNav({ menuRef, handleToggle }: MobileNavProp) {
  return (
    <div
      ref={menuRef}
      className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50"
    >
      <div className="px-5 py-3 space-y-1">
        {items.map((item) => (
          <MenuItem
            onClick={handleToggle}
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
  );
}
