import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoPlayCircle } from "react-icons/io5";
import { useContent } from "../Context/ContentContext";

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return null;
  const hrs = Math.floor(seconds / 360);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function VideoCard({ video }) {
  const { toggleFavorite, deleteVideo } = useContent();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(video._id);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Remove "${video.title}" from your library?`)) {
      deleteVideo(video._id);
    }
  };

  const durationText = formatDuration(video.duration);

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-md">
      {/* Thumbnail Container */}
      <Link
        to={`/watch/${video._id}`}
        className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 block cursor-pointer"
      >
        <img
          src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.platformId}/hqdefault.jpg`}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://img.youtube.com/vi/${video.platformId}/hqdefault.jpg`;
          }}
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <IoPlayCircle className="w-14 h-14 text-white drop-shadow-lg transform scale-90 group-hover:scale-100 transition-transform" />
        </div>

        {/* Duration Badge */}
        {durationText && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold bg-black/80 text-white backdrop-blur-sm">
            {durationText}
          </span>
        )}
      </Link>

      {/* Content Details */}
      <div className="flex flex-col flex-1 p-3.5">
        <Link
          to={`/watch/${video._id}`}
          className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-snug mb-1.5"
          title={video.title}
        >
          {video.title}
        </Link>

        {/* Channel Name */}
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-auto">
          <span className="truncate">{video.channelName || "YouTube Creator"}</span>
          <span className="mx-1.5">•</span>
          <span>{formatDate(video.createdAt)}</span>
        </div>

        {/* Card Actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={handleFavoriteClick}
            aria-label={video.isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${video.isFavorite
                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                : "text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
          >
            {video.isFavorite ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
          </button>

          <div className="flex items-center space-x-1">
            <Link
              to={`/watch/${video._id}`}
              className="px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              Watch
            </Link>

            <button
              onClick={handleDeleteClick}
              aria-label="Delete video"
              className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;

