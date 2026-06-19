import { IoIosTimer } from "react-icons/io";
import EmptyPage from "../Components/EmptyPage";
function History() {
    return (
        <EmptyPage
            icon={<IoIosTimer size={60} className="text-slate-400 dark:text-slate-500" />}
            title="Nothing recent"
            description="Content you import will appear here, sorted by when it was added."
        />
    )
}

export default History