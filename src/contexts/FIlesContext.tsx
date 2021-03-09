import { createContext, ReactNode } from "react";

export const FilesContext = createContext({});

interface FilesProviderProps {
    children: ReactNode;
}

export function FilesProvider({ children }: FilesProviderProps) {
    return (
        <FilesContext.Provider
            value={{

            }}
        >
            {children}
        </FilesContext.Provider>
    );
}