import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Playlists from "./Pages/Playlists";
import Videos from "./Pages/Videos";
import Favorites from "./Pages/Favorites";
import Subscriptions from "./Pages/Subscriptions";
import Analytics from "./Pages/Analytics";
import Leaderboard from "./Pages/Leaderboard";
import Settings from "./Pages/Settings";
import Feedback from "./Pages/Feedback";
import Help from "./Pages/Help";
import { useTheme } from "./Context/ThemeContext.jsx";

function App() {
  const { isSidebarFolded } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex pt-[72px]">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${isSidebarFolded ? "ml-[72px]" : "ml-60"} p-6`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
