import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function NoUser() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Kiva</h2>
      <p className="text-gray-600 mb-6">
        You need to log in or sign up to see page content.
      </p>
      <div className="flex gap-4">
        <SignInButton mode="modal">
          <button className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Log In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition">
            Sign Up
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
