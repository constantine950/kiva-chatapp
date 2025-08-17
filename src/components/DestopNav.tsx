import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import MenuItem from "./MenuItem";
import { items } from "../data/menuDataType";

export default function DestopNav() {
  return (
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
  );
}
