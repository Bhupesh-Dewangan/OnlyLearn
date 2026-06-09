import React from "react";
import logo from "../assets/OnlyLearn.png";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-[5%] mt-4 w-full pb-4 border-b border-slate-200">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu */}
        <button className="text-2xl">☰</button>
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="OnlyLearn Logo" className="h-10" />
          <h1 className="text-xl font-bold">OnlyLearn</h1>
        </div>
      </div>

      <div className="w-full max-w-sm min-w-[50%]">
        <div className="flex items-center">
          <div className="flex w-full h-full">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-l-full pr-12 pl-10 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300"
              placeholder="Import Content"
            />
            <div className="rounded-r-full bg-slate-100 h-10 w-18 flex items-center justify-center border border-slate-200 transition duration-300 ease hover:bg-slate-200">
              <img
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt="Search Icon"
                className="w-5 h-5 text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Profile Icon and Theme Toggle */}
        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-sm font-bold text-slate-700"></div>
        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-sm font-bold text-slate-700">
          BD
        </div>
      </div>
    </div>
  );
}

export default Navbar;
