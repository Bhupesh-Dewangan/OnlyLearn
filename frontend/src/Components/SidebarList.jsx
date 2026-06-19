import { NavLink } from "react-router-dom";

function SidebarList({ icon, text, isCollapsed, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full h-10 px-3 flex items-center ${isCollapsed ? "justify-center" : "justify-start"
        } rounded-lg transition-all duration-300 ease cursor-pointer decoration-transparent ${isActive
          ? "bg-slate-100 dark:bg-slate-800 dark:text-red-400"
          : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
        }`
      }
      style={{ textDecoration: 'none' }}
      title={isCollapsed ? text : undefined}
    >
      <div className={`flex items-center justify-center text-slate-800 dark:text-slate-200 ${isCollapsed ? "" : "mr-4"}`}>
        {icon}
      </div>
      {!isCollapsed && (
        <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300">
          {text}
        </p>
      )}
    </NavLink>
  );
}

export default SidebarList;
