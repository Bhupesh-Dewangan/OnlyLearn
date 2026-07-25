import { useMemo } from "react";
import { useContent } from "../Context/ContentContext";
import VideoGrid from "../Components/VideoGrid";
import { FaHeart } from "react-icons/fa";

export default function Favorites() {
  const { videos, isLoadingVideos } = useContent();

  const favoriteVideos = useMemo(() => {
    return videos.filter((v) => v.isFavorite);
  }, [videos]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/80 flex items-center justify-center text-red-500">
          <FaHeart className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Favorite Videos
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300">
              {favoriteVideos.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Quick revision and bookmarked lectures
          </p>
        </div>
      </div>

      {/* Grid */}
      <VideoGrid
        videos={favoriteVideos}
        isLoading={isLoadingVideos}
        emptyTitle="No favorites yet"
        emptyDescription="Click the heart icon on any video in your library to save it here for quick access."
      />
    </div>
  );
}
