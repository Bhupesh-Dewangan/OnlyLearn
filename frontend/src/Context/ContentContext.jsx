import { createContext, useState, useContext } from "react";

const ContentContext = createContext();

export function ContentProvider({ children }) {
    const [contentList, setContentList] = useState([]);

    return (
        <ContentContext.Provider
            value={{
                contentList,
                setContentList,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within ContentProvider");
    }
    return context;
}