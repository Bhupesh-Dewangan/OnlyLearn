import { Link } from "react-router-dom";
import { useContent } from "../Context/ContentContext";
import VideoGrid from "../Components/VideoGrid";
import { BiMoviePlay } from "react-icons/bi";
import { FaHeart, FaFire } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";

function Home() {
  const { videos, isLoadingVideos } = useContent();

  const totalVideos = videos.length;
  const totalFavorites = videos.filter((v) => v.isFavorite).length;
  const recentVideos = videos.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/20 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-4">
            <IoSparklesOutline className="w-3.5 h-3.5" />
            <span>Distraction-Free Learning Space</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Master Skills Without Interruptions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Import tutorials, lectures, and playlists. Study without algorithmic recommendations, comments, or rabbit holes.
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center space-x-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BiMoviePlay className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Library</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{totalVideos} Videos</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/80 flex items-center justify-center text-red-500">
              <FaHeart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Favorites</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{totalFavorites} Saved</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/80 flex items-center justify-center text-amber-500">
              <FaFire className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Study Streak</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              Recently Added
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Your latest imported educational content
            </p>
          </div>

          {totalVideos > 8 && (
            <Link
              to="/videos"
              className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all ({totalVideos}) &rarr;
            </Link>
          )}
        </div>

        <VideoGrid
          videos={recentVideos}
          isLoading={isLoadingVideos}
          emptyTitle="Your library is empty"
          emptyDescription="Paste any YouTube video or lecture link in the top search bar to start your focused study session."
        />
      </div>
    </div>
  );
}

export default Home;
