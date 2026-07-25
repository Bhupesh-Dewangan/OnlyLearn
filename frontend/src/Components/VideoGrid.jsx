import VideoCard from "./VideoCard";
import EmptyPage from "./EmptyPage";
import { BiMoviePlay } from "react-icons/bi";

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800" />
      <div className="p-3.5 space-y-2.5">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
          <div className="w-6 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="w-14 h-6 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
}

function VideoGrid({ videos = [], isLoading = false, emptyTitle = "No videos found", emptyDescription = "When you import videos, they will appear here." }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <EmptyPage
        icon={<BiMoviePlay size={60} className="text-slate-400 dark:text-slate-500" />}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;

