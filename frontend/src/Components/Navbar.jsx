import logo from "../assets/OnlyLearn.png";
import { CiImport } from "react-icons/ci";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

import { useTheme } from "../Context/ThemeContext.jsx";
import { useContent } from "../Context/ContentContext.jsx";
import { useState } from "react";

function Navbar() {
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const { importVideo, isImporting, notification } = useContent();
  const [contentLink, setContentLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contentLink.trim() || isImporting) return;
    try {
      await importVideo(contentLink);
      setContentLink("");
    } catch {
      // Notification handled in context
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[72px] bg-white dark:bg-slate-900 z-50 flex items-center justify-between pl-[2%] pr-[5%] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center space-x-10">
          {/* Hamburger Menu */}
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="text-2xl text-slate-700 dark:text-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
          >
            ☰
          </button>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="OnlyLearn Logo" className="h-10" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">OnlyLearn</h1>
          </div>
        </div>

        <div className="w-full max-w-sm min-w-[50%]">
          <div className="flex items-center">
            <form onSubmit={handleSubmit} className="flex w-full h-full">
              <input
                type="url"
                required
                disabled={isImporting}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-sm border border-slate-200 dark:border-slate-800 rounded-l-full pr-12 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-300 dark:focus:border-slate-700 hover:border-slate-300 dark:hover:border-slate-700 disabled:opacity-50"
                placeholder={isImporting ? "Extracting and importing video..." : "Import YouTube video via link..."}
                value={contentLink}
                onChange={(e) => setContentLink(e.target.value)}
              />
              <button
                type="submit"
                disabled={isImporting}
                className="rounded-r-full bg-slate-100 dark:bg-slate-800 h-10 w-18 flex items-center justify-center border border-slate-200 dark:border-slate-800 transition duration-300 ease hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border-l-0 disabled:opacity-50"
              >
                {isImporting ? (
                  <CgSpinner className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                ) : (
                  <CiImport className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Profile Icon and Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition duration-300 ease"
          >
            {theme === "light" ? (
              <IoMoonOutline className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            ) : (
              <MdOutlineWbSunny className="w-5 h-5 text-yellow-500" />
            )}
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-200 select-none">
            BD
          </div>
        </div>
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div
            className={`px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium border ${
              notification.type === "error"
                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-900"
                : notification.type === "info"
                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-900"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-900"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
