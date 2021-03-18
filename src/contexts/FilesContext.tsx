import { createContext, ReactNode } from "react";

export const FilesContext = createContext({} as FilesContextProps);

interface FilesContextProps {
    uploadedFiles: [],
}

interface FilesProviderProps {
    children: ReactNode;
    uploadedFiles?: [];
}

export function FilesProvider({ children, uploadedFiles }: FilesProviderProps) {
    return (
        <FilesContext.Provider
            value={{
                uploadedFiles,
            }}
        >
            {children}
        </FilesContext.Provider>
    );
}