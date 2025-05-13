import { createContext, useState } from "react";

// Crea il context
const GlobalContext = createContext();

// Provider
export const GlobalProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;