import EmptyPage from "../Components/EmptyPage";
import { BiMoviePlay } from "react-icons/bi";

function Home() {
    return (
        <EmptyPage
            icon={<BiMoviePlay size={60} className="text-slate-400 dark:text-slate-500" />}
            title="No videos yet"
            description="When you add videos, they'll appear here."
        />
    )
}

export default Home