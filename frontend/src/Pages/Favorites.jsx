import EmptyPage from "../Components/EmptyPage";
import { FaRegHeart } from "react-icons/fa";

export default function Favorites() {
    return (
        <EmptyPage
            icon={<FaRegHeart size={60} className="text-slate-400 dark:text-slate-500" />}
            title="No favorites yet"
            description="When you like videos, they'll appear here."
        />
    )
}
