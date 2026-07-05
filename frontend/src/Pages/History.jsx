import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import EmptyPage from "../Components/EmptyPage";
import { IoIosTimer } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoCheckmarkCircle } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

function formatSeconds(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return "00:00";
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function History() {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await api.getHistory();
        if (isMounted && res.success && Array.isArray(res.data)) {
          setHistoryItems(res.data.filter((item) => item.videoId != null));
        }
      } catch (err) {
        if (isMounted) console.error("Failed to load history:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear your entire watch history?")) {
      try {
        await api.clearHistory();
        setHistoryItems([]);
      } catch (err) {
        console.error("Failed to clear history:", err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <CgSpinner className="w-9 h-9 text-indigo-600 dark:text-indigo-400 animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading your learning history...</p>
      </div>
    );
  }

  if (historyItems.length === 0) {
    return (
      <EmptyPage
        icon={<IoIosTimer size={60} className="text-slate-400 dark:text-slate-500" />}
        title="Nothing recent"
        description="Videos you watch will appear here with your saved timestamp so you can easily resume."
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Watch History
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {historyItems.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pick up right where you left off
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-lg transition-colors cursor-pointer"
        >
          <HiOutlineTrash className="w-4 h-4" />
          <span>Clear History</span>
        </button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {historyItems.map((item) => {
          const video = item.videoId;
          const pos = item.playbackPositionSeconds || 0;
          const dur = item.durationSeconds || video.duration || 0;
          const progressPercent = dur > 0 ? Math.min(100, Math.round((pos / dur) * 100)) : 0;

          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
            >
              {/* Thumbnail Container */}
              <Link
                to={`/watch/${video._id}`}
                className="relative w-full sm:w-48 aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 group"
              >
                <img
                  src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.platformId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${video.platformId}/hqdefault.jpg`;
                  }}
                />

                {/* Progress bar overlay on thumbnail */}
                {dur > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </Link>

              {/* Video Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <Link
                  to={`/watch/${video._id}`}
                  className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 transition-colors"
                >
                  {video.title}
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {video.channelName || "YouTube Creator"} • Watched {formatDate(item.lastWatchedAt)}
                </p>

                {/* Progress Bar & Badges */}
                <div className="flex items-center space-x-3 pt-1">
                  {item.isCompleted ? (
                    <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <IoCheckmarkCircle className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : pos > 0 ? (
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Stopped at {formatSeconds(pos)} {dur > 0 ? `/ ${formatSeconds(dur)}` : ""} ({progressPercent}%)
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Resume Action */}
              <div className="shrink-0 pt-2 sm:pt-0">
                <Link
                  to={`/watch/${video._id}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  <span>{item.isCompleted ? "Replay" : "Resume"}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
