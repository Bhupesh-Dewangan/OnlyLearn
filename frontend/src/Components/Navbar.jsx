import React from "react";
import logo from "../assets/OnlyLearn.png";
import { CiImport } from "react-icons/ci";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";


import { useApp } from "../Context/AppContext.jsx";

function Navbar() {
  const { theme, toggleTheme, toggleSidebar } = useApp();

  return (
    <div className="fixed top-0 left-0 right-0 h-[72px] bg-white dark:bg-slate-900 z-50 flex items-center justify-between pl-[2%] pr-[5%] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center space-x-10">
        {/* Hamburger Menu */}
        <button 
          onClick={toggleSidebar}
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
          <div className="flex w-full h-full">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-sm border border-slate-200 dark:border-slate-800 rounded-l-full pr-12 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-300 dark:focus:border-slate-700 hover:border-slate-300 dark:hover:border-slate-700"
              placeholder="Import Content"
            />
            <div className="rounded-r-full bg-slate-100 dark:bg-slate-800 h-10 w-18 flex items-center justify-center border border-slate-200 dark:border-slate-800 transition duration-300 ease hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border-l-0">
              <CiImport className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Profile Icon and Theme Toggle */}
        <div 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition duration-300 ease"
        >
          {theme === "light" ? (
            <IoMoonOutline className="w-5 h-5 text-slate-800 dark:text-slate-200" />
          ) : (
            <MdOutlineWbSunny className="w-5 h-5 text-yellow-500" />
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-200">
          BD
        </div>
      </div>
    </div>
  );
}

export default Navbar;
