import React from "react";

function SidebarList({ icon, text, isCollapsed }) {
  return (
    <div 
      className={`w-full hover:bg-slate-200 dark:hover:bg-slate-800 h-10 px-3 flex items-center ${
        isCollapsed ? "justify-center" : "justify-start"
      } rounded-lg transition-all duration-300 ease cursor-pointer`}
      title={isCollapsed ? text : undefined}
    >
      <div className={`flex items-center justify-center text-slate-800 dark:text-slate-200 ${
        isCollapsed ? "" : "mr-4"
      }`}>
        {icon}
      </div>
      {!isCollapsed && (
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300">
          {text}
        </p>
      )}
    </div>
  );
}

export default SidebarList;
