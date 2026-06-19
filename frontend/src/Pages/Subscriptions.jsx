import EmptyPage from "../Components/EmptyPage";
import { MdOutlineSubscriptions } from "react-icons/md";

function Subscriptions() {
    return (
        <EmptyPage
            icon={<MdOutlineSubscriptions size={60} className="text-slate-400 dark:text-slate-500" />}
            title="No subscriptions yet"
            description="When you subscribe to channels, they'll appear here."
        />
    )
}

export default Subscriptions