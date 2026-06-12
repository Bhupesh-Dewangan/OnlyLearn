import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

import { useApp } from "../Context/AppContext.jsx";

function Home() {
  const { isSidebarFolded } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex pt-[72px]">
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
