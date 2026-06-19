function EmptyPage({ icon, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] bg-white dark:bg-slate-900">
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">{description}</p>
        </div>
    )
}

export default EmptyPage;