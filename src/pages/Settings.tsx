import type { ThemeMode } from "../lib/types";
import { useAppDispatch, useAppSelector } from "../redux/hook/selectors";
import { setThemeMode, toggleEmail } from "../redux/slice/themeSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const emailNotifications = useAppSelector(
    (state) => state.theme.emailNotification
  );
  const mode = useAppSelector((state) => state.theme.mode);

  const options: ThemeMode[] = ["light", "dark", "system"];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center transition-colors duration-300">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get notified when you receive new messages
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => dispatch(toggleEmail())}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-500 rounded-full relative transition-colors">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>

        {/* Theme Mode */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-300">
          <p className="font-medium mb-3">Theme</p>
          <div className="grid grid-cols-3 gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch(setThemeMode(opt))}
                className={`px-4 py-2 rounded-lg text-sm capitalize border transition-colors duration-300 ${
                  mode === opt
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Choose Light, Dark, or follow your System preference
          </p>
        </div>
      </div>
    </div>
  );
}
