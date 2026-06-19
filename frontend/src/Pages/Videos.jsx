import EmptyPage from "../Components/EmptyPage";
import { HiOutlineVideoCamera } from "react-icons/hi2";

function Videos() {
    return (
        <EmptyPage
            icon={<HiOutlineVideoCamera size={60} className="text-slate-400 dark:text-slate-500" />}
            title="No videos yet"
            description="When you add videos, they'll appear here so you can easily find your favourite content."
        />
    )
}

export default Videos