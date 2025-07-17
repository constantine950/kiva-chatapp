import { useState } from "react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">
              Get notified when you receive new messages
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-500 rounded-full relative transition-colors">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>

        {/* Dark Mode */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-gray-500">Toggle dark mode theme</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-500 rounded-full relative transition-colors">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
