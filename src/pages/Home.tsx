import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 md:space-y-7">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Welcome to the best Chat Platform in the world
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
            Let's connect with each other!
          </p>
          <SignedOut>
            <div className="space-x-4">
              <SignInButton mode="modal">
                <button className="bg-[#3190F8] hover:bg-blue-600 cursor-pointer text-white px-4 py-2 md:px-8 md:py-4 rounded-md text-base md:text-lg font-medium transition-colors duration-300">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className=" cursor-pointer border-2 hover:bg-gray-200 border-gray-400 px-3 py-1.5 md:px-8 md:py-4 rounded-md text-base md:text-lg font-medium transition-colors duration-300">
                  SignUp
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <button className="bg-[#3190F8] hover:bg-blue-600 cursor-pointer text-white px-4 py-2 md:px-8 md:py-4 rounded-md text-base md:text-lg font-medium transition-colors duration-300">
              Get Started
            </button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
