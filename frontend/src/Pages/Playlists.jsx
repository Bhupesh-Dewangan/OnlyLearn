import { CgPlayList } from "react-icons/cg";
import EmptyPage from "../Components/EmptyPage";

function Playlists() {
    return (
        <EmptyPage
            icon={<CgPlayList size={60} className="text-slate-400 dark:text-slate-500" />}
            title="No playlists yet"
            description="When you add playlists, they'll appear here."
        />
    )
}

export default Playlists